/* eslint-disable */

btnChooseFileTitleOnPage.update(btnChooseFileTitle.default.message);

listOfFiles.update().then(data => listOfFilesOnPage.update(data));

// ============= UPLOAD FORM =================

buttonChooseFile.onchange = function() {
  statusMessageOnPage.deleteAll();
  const fileNameToUpload = this.value.split('fakepath\\')[1];

  if (fileNameToUpload) {
    btnChooseFileTitleOnPage.update(btnChooseFileTitle.fileName.getMessage(fileNameToUpload));
  }
}

uploadForm.onsubmit = function(e) {
  e.preventDefault();

  statusMessageOnPage.deleteAll();

  const uploadFile = e.target.sampleFile.files[0];

  if (!uploadFile) {
    statusMessageOnPage.update(statusMessage.noFileChosen.message);
    return;
  }

  const formData = new FormData();
  formData.append('sampleFile', uploadFile);

  const uploadStatusBar = new StatusBar({
    tagName: 'div',
    className: `status-bar__upload file__${uploadFile.name}`,
    parrentElClassName: 'status-bar__upload-wrapper',
    statusFunction: updateStatusBar
  });

  const config = {
    data: formData,
    onUploadProgress: uploadStatusBar.showProgress.bind(uploadStatusBar)
  };

  createHttpRequest(httpRequestParams)
    .post('/upload', config)
    .then(() => {
      btnChooseFileTitleOnPage.update(btnChooseFileTitle.default.message);
      statusMessageOnPage.update(statusMessage.fileUpload.getMessage(uploadFile.name));
      listOfFiles.update().then(data => listOfFilesOnPage.update(data));
      uploadForm.reset();
      setTimeout(() => uploadStatusBar.delete(), 500);
    });
}


// ============= DOWNLOAD FORM =================

downloadForm.onsubmit = function(e) {
  e.preventDefault();

  statusMessageOnPage.deleteAll();

  const downloadFileName = e.target.sampleFile.value;

  if (!downloadFileName) {
    statusMessageOnPage.update(statusMessage.noFileChosen.message);
    return;
  }

  if (!listOfFiles.hasItem(downloadFileName)) {
    statusMessageOnPage.update(statusMessage.noFileName.getMessage(downloadFileName));
    return;
  }

  const downloadStatusBar = new StatusBar({
    tagName: 'div',
    className: `status-bar__download file__${downloadFileName}`,
    parrentElClassName: 'textarea__choose-wrapper',
    statusFunction: updateStatusBar
  });

  const config = {
    responseType: 'blob',
    transformResponse: [data => data.response],
    onDownloadProgress: downloadStatusBar.showProgress.bind(downloadStatusBar)
  }

  createHttpRequest(httpRequestParams)
    .get('/files' + '/' + downloadFileName, config)
    .then((response) => {
      const blob = new BlobDataObject(response);

      statusMessageOnPage.deleteAll();

      if (blob.isPicture()) {
        blob.display(pictureElement);
      }

      if (!blob.isPicture()) {
        blob.download(downloadFileName);
        statusMessageOnPage.update(statusMessage.fileSaved.getMessage(downloadFileName));
      }

      setTimeout(() => {
        downloadStatusBar.delete();
        downloadForm.reset()
      }, 500);
    })
    .catch(error => console.log(error));
};
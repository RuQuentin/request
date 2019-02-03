/* eslint-disable */
const defaultFont = 'Arial';
const prettyFont = `'Major Mono Display', monospace`;


const statusMessage = new Notifications;

statusMessage.setNew([
  {'noFileChosen': `Please, choose the file at first`},
  {'noFileEntered': `Please, enter the name of the file at first`},
  {'noFileName': `There is no file with name '{placeForFileName}'`},
  {'fileUpload': `File '{placeForFileName}' was successfully uploaded to server`},
  {'fileSaved': `File '{placeForFileName}' was saved to your local disc`}
]);


const btnChooseFileTitle = new Notifications;

btnChooseFileTitle.setNew([
  {'default': `Choose a file...`},
  {'fileName': `{placeForFileName}`},
]);
  

const listOfFiles = new ListOfFiles;

const statusMessageOnPage = new ElementsOnPage('p', 'status-message', 'status-message-wrapper');
const listOfFilesOnPage = new ElementsOnPage('li', 'list-of-files__element', 'list-of-files');
const btnChooseFileTitleOnPage = new ElementsOnPage('span', 'button__file-name', 'button__choose');

btnChooseFileTitleOnPage.update(btnChooseFileTitle.default.message);

listOfFiles.update().then(data => listOfFilesOnPage.update(data));

// ============= UPLOAD FORM =================

const uploadForm = document.querySelector('.form__upload');
const buttonChooseFile = document.querySelector('.button__choose-file');

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

  let uploadFile = e.target.sampleFile.files[0];

  if (!uploadFile) {
    statusMessageOnPage.update(statusMessage.noFileChosen.message);
    return;
  }

  const formData = new FormData();
  formData.append("sampleFile", uploadFile);

  const uploadStatusBar = new StatusBar(
    'div',
    `status-bar__upload file__${uploadFile.name}`,
    'status-bar__upload-wrapper',
    updateStatusBar
    );

  let config = {
    data: formData,
    onUploadProgress: uploadStatusBar.showProgress.bind(uploadStatusBar)
  }

  createHttpRequest(httpRequestParams)
    .post('/upload', config)
      .then(response => {
        btnChooseFileTitleOnPage.update(btnChooseFileTitle.default.message);
        statusMessageOnPage.update(statusMessage.fileUpload.getMessage(uploadFile.name));
        listOfFiles.update().then(data => listOfFilesOnPage.update(data));
        uploadForm.reset();
        setTimeout(() => uploadStatusBar.delete(), 500);
      })
}


// ============= DOWNLOAD FORM =================

const downloadForm = document.querySelector('.form__download');
const downloadBar = document.querySelector('.textarea__choose');
const pictureElement = document.querySelector( ".picture" );

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

  const downloadStatusBar = new StatusBar(
    'div',
    `status-bar__download file__${downloadFileName}`,
    'textarea__choose-wrapper',
    updateStatusBar
    );

  const config = {
    responseType: 'blob',
    transformResponse: [data => data.response],
    onDownloadProgress: downloadStatusBar.showProgress.bind(downloadStatusBar)
  }

  createHttpRequest(httpRequestParams)
    .get('/files' + '/' + downloadFileName, config)
      .then(response => {

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
      .catch(error => {
        console.log(error)
      })
}
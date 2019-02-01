/* eslint-disable */
const defaultFont = 'Arial';
const prettyFont = `'Major Mono Display', monospace`;

const listOfFiles = new ListOfFiles;
console.log(listOfFiles)
listOfFiles.update()
console.log(listOfFiles)


// ============= UPLOAD FORM =================

const uploadForm = document.getElementById('uploadForm');
const uploadBar = document.querySelector( ".status-bar__upload" );
const buttonChooseFile = document.getElementById('buttonFileToUpload');
const buttonChooseFileTitle = document.querySelector( ".button__file-name" );
const statusMessage = document.querySelector( ".status-message" );
const buttonChooseFileTitleDefault = buttonChooseFileTitle.textContent;

buttonChooseFile.onchange = function() {
  clearTextContent(statusMessage);
  const fileNameToUpload = this.value.split('fakepath\\')[1];

  if (fileNameToUpload) {
    changeTextContent(buttonChooseFileTitle, fileNameToUpload);
    setElementFont(buttonChooseFileTitle, defaultFont);
  }
}

uploadForm.onsubmit = function(e) {
  e.preventDefault();

  let uploadedFile = e.target.sampleFile.files[0];

  if (!uploadedFile) {
    changeTextContent(statusMessage, `Please, choose the file at first`);
    return;
  }

  const formData = convertToFormData({"sampleFile": uploadedFile})

  const config = {
    data: formData,
    onUploadProgress: updateStatusBar.bind(uploadBar),
  }

  const request = new HttpRequest({
    baseUrl: 'http://localhost:8000',
  });
  
  request.post('/upload', config)
    .then(response => {      
      changeTextContent(buttonChooseFileTitle, buttonChooseFileTitleDefault);
      setElementFont(buttonChooseFileTitle, prettyFont);
      changeTextContent(statusMessage, `File ${uploadedFile.name} was successfully uploaded to server`);
      listOfFilesOnServer = updateListOfFiles();
    })
}


// ============= DOWNLOAD FORM =================

const downloadForm = document.getElementById('downloadForm');

downloadForm.onsubmit = function(e) {
  e.preventDefault();

  clearTextContent(statusMessage);

  const fileName = e.target.sampleFile.value;

  if (!fileName) {
    changeTextContent(statusMessage, `Please, enter the name of the file at first`);
    return;
  }

  console.log(fileName)
  console.log(listOfFilesOnServer)

  if (!isInList(fileName, listOfFilesOnServer)) {
    changeTextContent(statusMessage, `There is no file with name ${fileName}`);
    return;
  }

  const fullPath = '/files' + '/' + fileName;
  const responseType = "blob";
  const downloadBar = document.querySelector( ".textarea__choose" );

  const config = {
    responseType,
    onDownloadProgress: updateStatusBar.bind(downloadBar),
  }

  const request = new HttpRequest({
    baseUrl: 'http://localhost:8000',
  });

  request.get(fullPath, config)
    .then(response => {

      const blobObj = convertBlobToObj(response);
      const url =  convertBlobObjToUrl(blobObj);

      clearTextContent(statusMessage);

      if (isPicture(blobObj)) {
        const pictureElement = document.querySelector( ".picture" );
        displayImage(pictureElement, url);
        clearTextForm();
        return;
      } 
      
      if (!isPicture(blobObj)) {
        downloadFile(url, fileName);
        changeTextContent(statusMessage, `File ${fileName} was saved to your local disc`);
        clearTextForm();
        return;
      }

    })
    .catch(error => {
      console.log(error)
    })
}

// ========================


//   const config = {

//     // `transformResponse` allows changes to the response data to be made before
//     // it is passed to then/catch
//     transformResponse: [function (data) {
//       // Do whatever you want to transform the data
   
//       return data.responseText;
//     }],
   
//     // `headers` are custom headers to be sent
//     headers: {'X-Requested-With': 'XMLHttpRequest'},
   
//     // `params` are the URL parameters to be sent with the request
//     // Must be a plain object or a URLSearchParams object
//     params: {
//       ID: 12345
//     },
  
//     // `data` is the data to be sent as the request body
//     // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
//     // When no `transformRequest` is set, must be of one of the following types:
//     // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
//     // - Browser only: FormData, File, Blob
//     // - Node only: Stream, Buffer
  
//     data: {
//       firstName: 'Fred'
//     },
  
//     // `responseType` indicates the type of data that the server will respond with
//     // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
//     responseType: 'json', // default
  
//     // `onUploadProgress` allows handling of progress events for uploads
//     onUploadProgress: function (progressEvent) {
//       // Do whatever you want with the native progress event
//       console.log('progress')
//     },
   
//     // `onDownloadProgress` allows handling of progress events for downloads
//     onDownloadProgress: function (progressEvent) {
//       // Do whatever you want with the native progress event
//       console.log('downloading')
//     },
//   }


// reuest.get('/form', config)
//   .then(response => {
//     console.log(response);
//   })
//   .catch(e => {
//     console.log(e)
//   });

// reuest.post('/upload', config)
//   .then(response => {
//     console.log(response);
//   })
//   .catch(e => {
//     console.log(e)
//   });


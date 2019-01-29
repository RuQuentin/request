/* eslint-disable */


// document.getElementById('uploadForm').onsubmit = function(e) {
//   e.preventDefault();
//   const form = new FormData();
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "multipart/form-data");
//   form.append('sampleFile', e.target.sampleFile.files[0])
//   fetch('http://localhost:8000/upload',{
//     method: "POST",
//     body: form
//   })
// }


document.getElementById('uploadForm').onsubmit = function(e) {
  e.preventDefault();

  const uploadedFile = e.target.sampleFile.files[0];

  const data = {
    "sampleFile": uploadedFile,
  };

  const headers = {
    "Content-Type": "multipart/form-data"
  };

  const uploadBar = document.querySelector( ".status-bar__upload" );

  const config = {
    headers,
    data,
    onUploadProgress: updateStatusBar.bind(uploadBar),
  }

  const request = new HttpRequest({
    baseUrl: 'http://localhost:8000',
  });
  
  request.post('/upload', config)
    .then(response => console.log(response)) 
}

// =====================================================================

document.getElementById('downloadForm').onsubmit = function(e) {
  e.preventDefault();

  const fileName = e.target.sampleFile.value;
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

      if (isPicture(response)) {
        const url = convertBlobToUrl(response);
        const element = document.querySelector( ".picture" );
        displayImage(element, url)
      } else {

      }


    })
}

// ========================

function displayImage(element, url) {
  element.src = url
}

function convertBlobToUrl(blob) {
  const blobObj = new Blob([blob], { type: blob.type });
  return URL.createObjectURL( blobObj );
}

function isPicture(object) {
  return object.type === "image/jpeg" || object.type === "image/gif" || object.type === "image/png" ? true : false
}

function updateStatusBar(e) {
  const status = e.loaded / e.total * 100;
  this.style.setProperty('--statusValue', status + '%');
  if (status === 100) {
    setTimeout(() => {
      this.style.setProperty('--statusValue', 0 + '%');
    }, 500)
  }
}


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


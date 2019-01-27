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

const reuest = new HttpRequest({
  baseUrl: 'http://localhost:3000',
});


  const config = {

    // `transformResponse` allows changes to the response data to be made before
    // it is passed to then/catch
    transformResponse: [function (data) {
      // Do whatever you want to transform the data
   
      return data;
    }],
   
    // `headers` are custom headers to be sent
    headers: {'X-Requested-With': 'XMLHttpRequest'},
   
    // `params` are the URL parameters to be sent with the request
    // Must be a plain object or a URLSearchParams object
    params: {
      ID: 12345
    },
  
    // `data` is the data to be sent as the request body
    // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
    // When no `transformRequest` is set, must be of one of the following types:
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - Browser only: FormData, File, Blob
    // - Node only: Stream, Buffer
  
    data: {
      firstName: 'Fred'
    },
  
    // `responseType` indicates the type of data that the server will respond with
    // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default
  
    // `onUploadProgress` allows handling of progress events for uploads
    onUploadProgress: function (progressEvent) {
      // Do whatever you want with the native progress event
    },
   
    // `onDownloadProgress` allows handling of progress events for downloads
    onDownloadProgress: function (progressEvent) {
      // Do whatever you want with the native progress event
    },
  }


reuest.get('/form', config)
  .then(response => {
    console.log(response);
  })
  .catch(e => {
    console.log(e)
  });

reuest.post('/upload', config)
  .then(response => {
    console.log(response);
  })
  .catch(e => {
    console.log(e)
  });


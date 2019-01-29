/* eslint-disable */
class HttpRequest {
  // get request options({ baseUrl, headers })
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  get(url, config) {
    const {headers, responseType, onDownloadProgress} = config;
    // const {onDownloadProgress, headers} = config;
    
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      const finalUrl = new URL(url, this.baseUrl);
      xhr.open("GET", finalUrl);

      // for (const name in headers) {
      //   console.log(name, headers[name])
      //   xhr.setRequestHeader(name, headers[name]);
      // }

      xhr.responseType = responseType;

      xhr.onprogress = function(e) {
        onDownloadProgress(e);
      }

      xhr.onload = function(e) {
        resolve(xhr.response)
      }

      xhr.send();
    })
  }

  post(url, config) {
    const { data, headers, transformResponse, onUploadProgress } = config;

    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      const finalUrl = new URL(url, this.baseUrl);
      xhr.open("POST", finalUrl);

      const formData = new FormData();
      
      for (const name in data) {
        formData.append(name, data[name]);
      }

      xhr.upload.onprogress = function(e) {
        onUploadProgress(e);
      }

      xhr.onload = function() {
        const result = transformResponse ? transformResponse[0](xhr) : xhr;
        resolve(result)
      }

      xhr.send(formData);
    })
  }
}


// const reuest = new HttpRequest({
//   baseUrl: 'http://localhost:3000',
// });

// reuest.get('/form', { onDownloadProgress, headers: {contentType: undefined} })
//   .then(response => {
//     console.log(response);
//   })
//   .catch(e => {
//     console.log(e)
//   });

// reuest.post('/upload', { data: formdata, header, onUploadProgress })
//   .then(response => {
//     console.log(response);
//   })
//   .catch(e => {
//     console.log(e)
//   });

// const config = {

//   // `transformResponse` allows changes to the response data to be made before
//   // it is passed to then/catch
//   transformResponse: [function (data) {
//     // Do whatever you want to transform the data
 
//     return data;
//   }],
 
//   // `headers` are custom headers to be sent
//   headers: {'X-Requested-With': 'XMLHttpRequest'},
 
//   // `params` are the URL parameters to be sent with the request
//   // Must be a plain object or a URLSearchParams object
//   params: {
//     ID: 12345
//   },

//   // `data` is the data to be sent as the request body
//   // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
//   // When no `transformRequest` is set, must be of one of the following types:
//   // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
//   // - Browser only: FormData, File, Blob
//   // - Node only: Stream, Buffer

//   data: {
//     firstName: 'Fred'
//   },

//   // `responseType` indicates the type of data that the server will respond with
//   // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
//   responseType: 'json', // default

//   // `onUploadProgress` allows handling of progress events for uploads
//   onUploadProgress: function (progressEvent) {
//     // Do whatever you want with the native progress event
//   },
 
//   // `onDownloadProgress` allows handling of progress events for downloads
//   onDownloadProgress: function (progressEvent) {
//     // Do whatever you want with the native progress event
//   },
// }


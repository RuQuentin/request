// import { rejects } from "assert";

/* eslint-disable */
class HttpRequest {
  // get request options({ baseUrl, headers })
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  __request(method, url, config) {
    const {
      transformResponse = [
        function(data) {
          return data.response;
        }
      ],
      headers = {},
      params = {},
      data = null,
      responseType = 'json',
      onUploadProgress = null,
      onDownloadProgress = null
      } = config || {};

    const xhr = new XMLHttpRequest();
    const searchParams = new URLSearchParams();
    const finalUrl = new URL(url, this.baseUrl);
    
    Object.entries(params).map(([name, value]) => {
      searchParams.append(name, value)
    })

    finalUrl.search = searchParams.toString();
    xhr.open(method, finalUrl);

    const headersList = {...this.headers, ...headers};

    for (const name in headersList) {
      xhr.setRequestHeader(name, headersList[name]);
    }

    xhr.responseType = responseType;
    xhr.onprogress = onUploadProgress || onDownloadProgress;

    const result = new Promise( (resolve, reject) => {
      xhr.onload = () => {
        if (~~xhr.status/100 === 2) {
          resolve(xhr)
        }

        if (~~xhr.status/100 !== 2) {
          console.log(xhr)

          reject(xhr)
        }
      }
      
      xhr.send(data);
    })

    return transformResponse.reduce( (chain, func) => {
      return chain.then(data => func(data))
    }, result)
  }

  get(url, config) {
    return this.__request('GET', url, config)
  }

  post(url, config) {
    return this.__request('POST', url, config)
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

/* eslint-disable */

class HttpRequest {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  __request(method, url, config) {
    const {
      transformResponse = [
        function(data) {
          return data;
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
    xhr.upload.onprogress = onUploadProgress;
    xhr.onprogress = onDownloadProgress;

    const result = new Promise( (resolve, reject) => {
      xhr.onload = () => {
        if (~~xhr.status/100 === 2) {
          resolve(xhr)
        }

        if (~~xhr.status/100 !== 2) {
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
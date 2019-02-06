/* global HttpRequest */

(() => {
  const httpRequestParams = {
    baseUrl: 'http://localhost:8000'
  };

  const request = new HttpRequest(httpRequestParams);

  window.request = request;
})();
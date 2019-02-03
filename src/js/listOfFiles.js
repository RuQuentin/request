/* eslint-disable */

class ListOfFiles {
  constructor() {
    this.value = [];
  }

  update() {
    const request = new HttpRequest({
      baseUrl: 'http://localhost:8000',
    });

    const config = {
      transformResponse: [
        function(data) {
          return data.response;
        },
        function(data) {
          data.shift();
          return data;
        }
      ]
    };

    return request
      .get('/list', config)
      .then(data => {
        this.value = data;
        return data;
      });
  }

  hasItem(fileName) {
    return this.value.some(item => fileName.toLowerCase() === item.toLowerCase());
  }
}
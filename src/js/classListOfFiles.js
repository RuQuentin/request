class ListOfFiles {
  constructor() {
    this.value = null;
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
}
(() => {
  class BlobDataObject {
    constructor(data) {
      const convertBlobToObj = blob => new Blob([blob], { type: blob.type });

      const convertBlobObjToUrl = blobObj => {
        const url = window.URL || window.webkitURL;

        return url.createObjectURL(blobObj);
      };

      this.blobObject = convertBlobToObj(data);
      this.blobType = this.blobObject.type;
      this.blobUrl = convertBlobObjToUrl(this.blobObject);
    }

    isPicture() {
      return this.blobType === 'image/jpeg' ||
      this.blobType === 'image/gif' ||
      this.blobType === 'image/png';
    }

    display(node) {
      node.src = this.blobUrl;
    }

    download(filename) {
      const link = document.createElement('a');
      link.setAttribute('href', this.blobUrl);
      link.setAttribute('download', filename);
      onload = link.click();
    }
  }

  window.BlobDataObject = BlobDataObject;
})();
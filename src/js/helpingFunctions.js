/* eslint-disable */

function convertToFormData(dataObj) {
  const formData = new FormData();

  for (const name in dataObj) {
    formData.append(name, dataObj[name]);
  }

  return formData;
}

// ======================

function clearTextContent(element) {
  const message = '';
  changeTextContent(element, message)
}

function changeTextContent(element, value) {
  element.textContent = value;
}

function setElementFont(element, font) {
  element.style.fontFamily = font;
}

function isInList(value, array) {
  return array.some( element => {
    return element.toLowerCase() === value.toLowerCase();
  })
}

function clearTextForm() {
  const element = document.querySelector( ".textarea__choose" );
  element.value = ''
}

function downloadFile(url, filename) {
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  onload = link.click();
}

function displayImage(element, url) {
  element.src = url
}

function convertBlobToObj(blob) {
  return new Blob([blob], { type: blob.type });
}

function convertBlobObjToUrl(blobObj) {
  const url = window.URL || window.webkitURL;
  return url.createObjectURL( blobObj );
}

function isPicture(blobObj) {
  return blobObj.type === "image/jpeg" || blobObj.type === "image/gif" || blobObj.type === "image/png" ? true : false
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


// =========== UPDATING LIST OF FILES ===========

function updateListOfFiles() {
  getListOfFilesFromServer()
    .then( list => {
      updateListOfFilesOnPage(list);
    })
}

function getListOfFilesFromServer() {
  const request = new HttpRequest({
    baseUrl: 'http://localhost:8000',
  });

  config = {
    transformResponse: [
      function(data) {
        return data.response;
      },
      function(data) {
        data.shift();
        return data
      }
    ]
  }

  return request.get('/list', config)
}

function updateListOfFilesOnPage(list) {
  deleteListElements();

  const listBlock = document.querySelector(".list-of-files");

  list.forEach( element => {
    const newElement = document.createElement("li");
    newElement.classList.add('list-of-files__element');
    newElement.textContent = element;
    listBlock.append(newElement);
  })
}

function deleteListElements() {
  let elementOfList = null;

  do {
    elementOfList = document.querySelector(".list-of-files__element");

    if (elementOfList) elementOfList.remove();

  } while (elementOfList)
}
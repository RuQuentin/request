class ElementsOnPage {
  constructor(tagName, className, parrentElClassName) {
    this.elementsList = document.getElementsByClassName(className);
    this.elementsClassName = className;
    this.elementsTagName = tagName;
    this.parrentElement = document.querySelector(`.${parrentElClassName}`);
  }

  deleteAll() {
    [...this.elementsList].forEach(element => {
      element.remove();
    });
  }

  // accept separate value or Array
  showNodes(contentList) {
    const showNode = content => {
      const newElement = `
        <${this.elementsTagName} class='${this.elementsClassName}'>${content}</${this.elementsTagName}>
      `;

      this.parrentElement.insertAdjacentHTML('beforeend', newElement);
    };

    if (contentList.length === 0) {
      return;
    }

    if (typeof contentList === 'number' || typeof contentList === 'string') {
      return showNode(contentList);
    } else {
      return contentList.forEach(content => showNode(content));
    }
  }

  update(contentList) {
    this.deleteAll();
    this.showNodes(contentList);
  }
}
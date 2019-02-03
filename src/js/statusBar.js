function updateStatusBar(e) {
  const status = e.loaded / e.total * 100;
  this.elementsList[0].style.setProperty('--statusValue', `${status}%`);
}

class StatusBar {
  constructor({ tagName, className, parrentElClassName, statusFunction }) {
    const showNode = () => {
      const newElement = `
        <${this.elementsTagName} class='${this.elementsClassName}'></${this.elementsTagName}>
      `;

      this.parrentElement.insertAdjacentHTML('beforeend', newElement);
    };

    this.elementsClassName = className;
    this.elementsTagName = tagName;
    this.parrentElement = document.querySelector(`.${parrentElClassName}`);
    this.statusFunction = statusFunction;

    showNode();

    this.elementsList = document.getElementsByClassName(className);
  }

  showProgress(pack) {
    this.statusFunction(pack);
  }

  delete() {
    this.elementsList[0].remove();
  }
}
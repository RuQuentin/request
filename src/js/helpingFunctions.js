function updateStatusBar(e) {
  const status = e.loaded / e.total * 100;
  this.elementsList[0].style.setProperty('--statusValue', `${status}%`);
}


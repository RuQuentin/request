/* eslint-disable */

const uploadForm = document.querySelector('.form__upload');
const buttonChooseFile = document.querySelector('.button__choose-file');
const downloadForm = document.querySelector('.form__download');
const downloadBar = document.querySelector('.textarea__choose');
const pictureElement = document.querySelector('.picture');

const statusMessage = new Notifications([
  { 'noFileChosen': 'Please, choose the file at first' },
  { 'noFileEntered': 'Please, enter the name of the file at first' },
  { 'noFileName': 'There is no file with name `{placeForFileName}`'},
  { 'fileUpload': 'File `{placeForFileName}` was successfully uploaded to server' },
  { 'fileSaved': 'File `{placeForFileName}` was saved to your local disc' }
]);

const btnChooseFileTitle = new Notifications([
  { 'default': 'Choose a file...' },
  { 'fileName': '{placeForFileName}' }
]);

const listOfFiles = new ListOfFiles();

const statusMessageOnPage = new ElementsOnPage('p', 'status-message', 'status-message-wrapper');
const listOfFilesOnPage = new ElementsOnPage('li', 'list-of-files__element', 'list-of-files');
const btnChooseFileTitleOnPage = new ElementsOnPage('span', 'button__file-name', 'button__choose');

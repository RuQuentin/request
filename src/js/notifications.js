(() => {
  class Notification {
    constructor(message) {
      this.message = message;
    }

    getMessage(fileName = '') {
      return this.message.split('{placeForFileName}').join(fileName);
    }
  }

  class Notifications {
    // accept objects in the following format {nameOfNotification: contentOfNotification} or Array of such Objects
    constructor(notificationsList) {
      const isCorrectData = data =>
        data !== undefined &&
        typeof data !== 'number' &&
        typeof data !== 'string' &&
        typeof data !== 'function';

      if (isCorrectData(notificationsList) && isCorrectData(notificationsList[0])) {
        notificationsList.forEach(object => {
          for (const name in object) {
            this[name] = new Notification(object[name]);
          }
        });
        return;
      }

      if (isCorrectData(notificationsList)) {
        for (const name in notificationsList) {
          this[name] = new Notification(notificationsList[name]);
        }
        return;
      }

      throw new Error('Wrong data format for Notifications(data)');
    }
  }

  window.Notifications = Notifications;
})();

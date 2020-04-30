'use strict';

(function () {

  window.backend = {
    // Метод загрузки данных с сервера
    load: function (url, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 10000;
      // Открываем запрос
      xhr.open('GET', url);

      // Добавляем обработчик загрузки данных
      xhr.addEventListener('load', function () {
        // Действия при успехе
        if (xhr.status === 200) {
          // Передаем в функцию-колбек полученные данные
          onSuccess(xhr.response);
        // Действия при ошибке
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      // Добавляем на объект запроса обработчик события ошибки ожидания
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
      });
      // Отправляем запрос на сервер
      xhr.send();
    },
    // Метод выгрузки данных на сервер (форма)
    save: function (data, onSuccess, onError) {
      // Адрес сервера
      URL = 'https://javascript.pages.academy/kekstagram';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      // Добавляем обработчик выгрузки данных
      xhr.addEventListener('load', function () {
        // Действия при успехе
        if (xhr.status === 200) {
          // Передаем в функцию-колбек полученные данные
          onSuccess(xhr.response);
        // Действия при ошибке
        } else {
          // Передаем в функцию-колбек статус и текст ошибки
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      // Открываем запрос на север
      xhr.open('POST', URL);
      // Отправка данных на сервер
      xhr.send(data);
    }
  };

})();

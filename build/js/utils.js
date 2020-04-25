'use strict';

(function () {

  window.utils = {

    // Генерация случайного числа
    getRandomIndex: function (min, max) {
      var result = Math.floor(Math.random() * (max - min) + min);
      return result;
    },

    // Выбор случайного элемента в массиве
    arrayRandomElement: function (arr) {
      var rand = Math.floor(Math.random() * arr.length);
      return arr[rand];
    },

    // Создаем путь до изображения
    createPhotoUrl: function (i) {
      var url = 'photos/' + (i + 1) + '.jpg';
      return url;
    }

  };

})();


'use strict';

(function () {

  // Объявляем контейтер для помещения миниатюр
  var picturesElement = document.querySelector('.pictures');
  // Объявляем шаблон для миниатюры
  var pictureTemplate = document.querySelector('#picture-template').content;

  // Действия при успешной загрузке данных с сервера
  var onSuccess = function (postsData) {

    // Создаем на основе массива 'postsData' миниатюры на странице
    for (var i = 0; i < postsData.length; i++) {
      // Клонируем шаблон в новый элемент и записиваем в переменную
      var photoElement = pictureTemplate.cloneNode(true);
      // Устанавливаем путь до изображения
      photoElement.querySelector('.picture__img').src = postsData[i].url;

      // Записываем в переменную дом-элемент с лайками на миниатюре
      var photoLikes = photoElement.querySelector('.picture__stat--likes');
      // Устанавливаем количество лайков из объекта дом-элементу
      photoLikes.textContent = postsData[i].likes;

      // Записываем в переменную дом элемент с коментариями
      var photoComments = photoElement.querySelector('.picture__stat--comments');
      // Устанавливаем длинну массива комментариев как их количество на дом-элементе
      photoComments.textContent = postsData[i].comments.length;

      // Помещаем в контейтер созданный элемент миниатюры
      picturesElement.append(photoElement);

      // Обрабочик клика по миниатюре.
      var onSmallPhotoCLick = function (index) {
        return function curriedFunction(evt) {
          evt.preventDefault();
          // Показываем большое изображение с коментариями
          openBigPhoto(index);
          // Добавляем обработчик нажатия Esc
          document.addEventListener('keydown', onBigPhotoEscKeydown);
        };
      };

      // Записываем в псевдомассив все миниатюры
      var pictureElement = document.querySelectorAll('.picture__link');
      // Задаем миниатюре с текущим индексом обработчик клика и передаем внутрь функции текущий индекс цикла параметром (иначе, из-за замыкания передается всегда 6);
      pictureElement[i].addEventListener('click', onSmallPhotoCLick(i), false);
    }
  };

  // Действия при ошибке загрузки данных с сервера
  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; padding: 10px 0; text-align: center; background-color: tomato;';
    node.style.position = 'abolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Адрес json-файла с данными
  var dataUrl = 'https://javascript.pages.academy/kekstagram/data';

  // Загружаем данные
  window.backend.load(dataUrl, onSuccess, onError);

})();



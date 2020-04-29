'use strict';

(function () {

  // Контейнер для коментариев
  window.commentsElement = document.querySelector('.social__comments');
  // Модальное окно с постом с фото и комментариями
  var postElement = document.querySelector('.big-picture');
  // 'body' страницы
  var pageBody = document.querySelector('body');

  // Действия при успрешной загрузке данных с сервера

  var onSuccess = function (postsData) {

    // Открываем модал с фотографией
    window.openBigPhoto = function (postIndex) {
      // Подставляем данные поста из json файла с сервера
      postElement.querySelector('.big-picture__img img').src = postsData[postIndex].url;
      postElement.querySelector('.likes-count').textContent = postsData[postIndex].likes;
      postElement.querySelector('.comments-count').textContent = postsData[postIndex].comments.length;
      postElement.querySelector('.social__caption').textContent = postsData[postIndex].description;

      window.postCommentsCreation = function (postIndex) {
        var commentTemplate = document.querySelector('#comment-template').content;
        // Запускаем цикл до длины массива с коментариями для текущей миниатюры
        for (var i = 0; i < postsData[postIndex].comments.length; i++) {
          var commentElement = commentTemplate.cloneNode(true);
          commentElement.querySelector('.social__picture').src = postsData[postIndex].comments[i].avatar;

          var commentName = commentElement.querySelector('.social__name');
          commentName.textContent = postsData[postIndex].comments[i].name;

          var commentText = commentElement.querySelector('.social__text');
          commentText.textContent = postsData[postIndex].comments[i].message;

          // commentElement.append(postsData[postIndex].comments[i].name);
          commentsElement.append(commentElement);
        }
      };
      postCommentsCreation(postIndex);


      postElement.classList.remove('hidden');
      pageBody.classList.add('modal-open');
    };

    // ВРЕМЕННО скрываем поля в модале с большой фотографией
    document.querySelector('.social__comment-count').classList.add('visually-hidden');
    document.querySelector('.social__loadmore').classList.add('visually-hidden');


    var bigPhotoCloseButton = postElement.querySelector('.big-picture__cancel');

    // Обработчик клика кнопки "х" закрытия модала с большой фотографией
    var onBigPhotoCloseClick = function () {
      closeBigPhotoScreen();
    };

    // Удаление элементов комментариев с модала большого изображения
    function deleteComments() {
      for (var i = commentsElement.children.length; i > 0; i--) {
        commentsElement.children[0].remove(); // [0] - удаление до первого элемента в псевдомассиве
      }
    }

    // Закрыть модал с большой фотографией
    function closeBigPhotoScreen() {
      postElement.classList.add('hidden');
      pageBody.classList.remove('modal-open');
      // Удаляем обрабочик Esc для модала
      deleteComments();
      document.removeEventListener('keydown', onBigPhotoEscKeydown, false);
    }

    // Закрываем модал с большой фотографией по клику кнопки "x"
    bigPhotoCloseButton.addEventListener('click', onBigPhotoCloseClick, false);

    window.onBigPhotoEscKeydown = function (evt) {
      if (evt.keyCode === 27) {
        closeBigPhotoScreen();
      }
    };

  };
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

  // Адрес до json файла с данными
  var dataUrl = 'https://javascript.pages.academy/kekstagram/data';
  // Отправляем запрос на сервер
  window.backend.load(dataUrl, onSuccess, onError);

})();

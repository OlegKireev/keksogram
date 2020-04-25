'use strict';

(function () {

  window.commentsElement = document.querySelector('.social__comments');
  var postElement = document.querySelector('.big-picture');
  var pageBody = document.querySelector('body');

  // Показываем большое фото
  window.load(function (userPhotos) {

    window.openBigPhoto = function (postIndex) {
      postElement.querySelector('.big-picture__img img').src = userPhotos[postIndex].url;
      postElement.querySelector('.likes-count').textContent = userPhotos[postIndex].likes;
      postElement.querySelector('.comments-count').textContent = userPhotos[postIndex].comments.length;
      postElement.querySelector('.social__caption').textContent = userPhotos[postIndex].description;

      window.postCommentsCreation = function (postIndex) {
        var commentTemplate = document.querySelector('#comment-template').content;
        // Запускаем цикл до длины массива с коментариями для текущей миниатюры
        for (var i = 0; i < userPhotos[postIndex].comments.length; i++) {
          var commentElement = commentTemplate.cloneNode(true);
          commentElement.querySelector('.social__picture').src = userPhotos[postIndex].comments[i].avatar;

          var commentText = commentElement.querySelector('.social__text');
          commentText.textContent = userPhotos[postIndex].comments[i].comment;

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

  });

})();

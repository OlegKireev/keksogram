'use strict';

(function () {

  window.commentsElement = document.querySelector('.social__comments');
  var postElement = document.querySelector('.big-picture');

  // Показываем большое фото
  window.openBigPhoto = function (postIndex) {
    postElement.querySelector('.big-picture__img img').src = userPhotos[postIndex].url;
    postElement.querySelector('.likes-count').textContent = userPhotos[postIndex].likes;
    postElement.querySelector('.comments-count').textContent = userPhotos[postIndex].comment.length;
    postElement.querySelector('.social__caption').textContent = userPhotos[postIndex].description;

    postCommentsCreation(postIndex);
    postElement.classList.remove('hidden');
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

})();

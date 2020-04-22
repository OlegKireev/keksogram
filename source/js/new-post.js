'use strict';

(function () {

  var imageEditScreen = document.querySelector('.img-upload__overlay');
  var uploadImageInput = document.querySelector('#upload-file');
  var imageEditScreenCloseButton = imageEditScreen.querySelector('.img-upload__cancel');

  imageEditScreen.classList.remove('hidden');

  // Открыть модал редактирования изображения
  var closeUploadScreen = function () {
    imageEditScreen.classList.add('hidden');
    // Удалить обработчик клика Esc
    document.removeEventListener('keydown', onUploadEscKeydown);
  };

  // Закрыть модал редактирования изображения
  function openUploadScreen() {
    imageEditScreen.classList.remove('hidden');
  }

  // Обработчик нажатия Esc
  var onUploadEscKeydown = function (evt) {
    if (evt.keyCode === 27) {
      closeUploadScreen();
    }
  };

  // Открываем окно редактирования при загрузке любого фото
  uploadImageInput.addEventListener('change', function () {
    openUploadScreen();
    // Обнуляем инпут для возможности повторной загрузки того же изображения
    uploadImageInput.value = '';

    // Добавляем обработчик нажатия Esc
    document.addEventListener('keydown', onUploadEscKeydown);
  });


  // Добавляем обработчик клика по кнопке 'x'
  imageEditScreenCloseButton.addEventListener('click', closeUploadScreen);

})();

'use strict';

(function () {

  var imageEditScreen = document.querySelector('.img-upload__overlay');
  var uploadImageInput = document.querySelector('#upload-file');
  var imageEditScreenCloseButton = imageEditScreen.querySelector('.img-upload__cancel');

  // imageEditScreen.classList.remove('hidden');

  // Закрыть модал редактирования изображения
  var closeUploadScreen = function () {
    imageEditScreen.classList.add('hidden');
    // Удаляем фильтры с большого превью фото
    resetPhotoFilter();
    // Прячем ползунок интенсивности эффекта
    effectScaleContainer.classList.add('hidden');
    // Удалить обработчик клика Esc
    document.removeEventListener('keydown', onUploadEscKeydown);
  };

  // Открыть модал редактирования изображения
  var openUploadScreen = function () {
    imageEditScreen.classList.remove('hidden');
    // Устанавливаем выбранный эффект на оригинал
    previewEffectInputs[0].checked = true;
  };

  // Обработчик нажатия Esc записываем в глобальную область видимости
  window.onUploadEscKeydown = function (evt) {
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

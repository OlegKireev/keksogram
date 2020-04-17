'use strict';

var imageEditScreen = document.querySelector('.img-upload__overlay');
var uploadImageInput = document.querySelector('#upload-file');
var imageEditScreenCloseButton = imageEditScreen.querySelector('.img-upload__cancel');
var previewBigImageContainer = imageEditScreen.querySelector('.img-upload__preview');
var previewSmallImages = imageEditScreen.querySelectorAll('.effects__preview');

var effectPin = imageEditScreen.querySelector('.scale__pin');

// imageEditScreen.classList.remove('hidden');

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
  uploadImageInput.value = '';

  // Добавляем обработчик нажатия Esc
  document.addEventListener('keydown', onUploadEscKeydown);
});


// Добавляем обработчик клика по кнопке 'x'
imageEditScreenCloseButton.addEventListener('click', closeUploadScreen);


function onEffectPreviewClick(i) {
  return function () {
    var effectClassIndex = 1; // Порядковый номер класса который добавляем и удаляем большому изображению
    if (previewBigImageContainer.classList.length > effectClassIndex) {
      previewBigImageContainer.classList.remove(previewBigImageContainer.classList[effectClassIndex]);
    }
    previewBigImageContainer.classList += ' ' + previewSmallImages[i].classList[effectClassIndex];
  };
}

for (var i = 0; i < previewSmallImages.length; i++) {
  previewSmallImages[i].addEventListener('click', onEffectPreviewClick(i));
}


// var onEffectPinMouseup = function (evt) {
//   effectPin.offsetLeft;
// };

// effectPin.addEventListener('mouseup', onEffectPinMouseup);




'use strict';

var imageEditScreen = document.querySelector('.img-upload__overlay');
var uploadImageInput = document.querySelector('#upload-file');
var imageEditScreenCloseButton = imageEditScreen.querySelector('.img-upload__cancel');
var previewBigImageContainer = imageEditScreen.querySelector('.img-upload__preview');
var previewSmallImages = imageEditScreen.querySelectorAll('.effects__preview');

var effectPin = imageEditScreen.querySelector('.scale__pin');

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

// var hashtagInput = document.querySelector('.text__hashtags');

// hashtagInput.addEventListener('focus', function () {
//   document.removeEventListener('keydown', onUploadEscKeydown);
// });

// var onEffectPinMouseup = function () {
//   console.log('mouseup');

// };

// effectPin.addEventListener('mouseup', onEffectPinMouseup);

// // Получаем CSS-свойство filter из класса превью эффекта
// window.getComputedStyle(document.querySelector('.effects__preview--chrome')).filter;

// var getFilterFill = function() {

// };

// Нахожу кнопки с превью эффектов
// Вешаю на них обработчик событий
//   Нажимаю на кнопку превью фильтра
//     Беру css-свойство filter нажатого превью
//     Приминяю это свойство к большому изображению

'use strict';

var imageEditScreen = document.querySelector('.img-upload__overlay');
var uploadImageInput = document.querySelector('#upload-file');
var imageEditScreenCloseButton = imageEditScreen.querySelector('.img-upload__cancel');
var previewBigImageContainer = imageEditScreen.querySelector('.img-upload__preview');
var previewSmallImages = imageEditScreen.querySelectorAll('.effects__preview');

var effectPin = imageEditScreen.querySelector('.scale__pin');
var effectInput = document.querySelector('.scale__value');

var effectScaleContainer = document.querySelector('.img-upload__scale');


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
    // Обработчик содержания превью изображения больше одного класса
    if (previewBigImageContainer.classList.length > effectClassIndex) {
      // Обнуляем инлайн стили
      previewBigImageContainer.style = '';
      // Удаляем предыдущий примененный класс
      previewBigImageContainer.classList.remove(previewBigImageContainer.classList[effectClassIndex]);
    }
    // Добавляем класс аналогичный соответсвующего превью эффекта
    previewBigImageContainer.classList.add(previewSmallImages[i].classList[effectClassIndex]);
  };
}

// Добавляем обработчики на все превью эффектов
for (var i = 0; i < previewSmallImages.length; i++) {
  previewSmallImages[i].addEventListener('click', onEffectPreviewClick(i));
  // Добавляем на первое превью эффекта с оригиналом обработчик
  // на скрытие слайдера интенсивности примененного эффекта
  if (i === 0) {
    previewSmallImages[i].addEventListener('click', function () {
      effectScaleContainer.classList.add('hidden');
    });
    // Добавляем на все остальные обработчик на показ слайдера
  } else {
    previewSmallImages[i].addEventListener('click', function () {
      effectScaleContainer.classList.remove('hidden');
    });
  }
}

'use strict';

(function () {

  var imageEditScreen = document.querySelector('.img-upload__overlay');
  var uploadImageInput = document.querySelector('#upload-file');
  var imageEditScreenCloseButton = imageEditScreen.querySelector('.img-upload__cancel');

  // Закрыть модал редактирования изображения
  var closeUploadScreen = function () {
    imageEditScreen.classList.add('hidden');
    // Удаляем фильтры с большого превью фото
    resetPhotoFilter();
    // Прячем ползунок интенсивности эффекта
    effectScaleContainer.classList.add('hidden');
    window.pageBody.classList.remove('modal-open');
    // Удалить обработчик клика Esc
    document.removeEventListener('keydown', onUploadEscKeydown);
  };

  // Открыть модал редактирования изображения
  var openUploadScreen = function () {
    window.pageBody.classList.add('modal-open');
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

  var form = document.querySelector('.img-upload__form');

  // Добавляем обработчик при отправке данных
  form.addEventListener('submit', function (evt) {

    evt.preventDefault();
    // Функция-колбек при успешно переданных данных
    var onSuccess = function () {
      // Скрываем модальное окно
      imageEditScreen.classList.add('hidden');
    };

    // Функция-колбек при ошибке отправки данных
    var onError = function (errorMessage) {
      // Создаем DOM-элемент с текстом ошибки
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; padding: 10px 0; text-align: center; background-color: tomato;';
      node.style.position = 'abolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      // Добавляем в DOM этот объект
      document.body.insertAdjacentElement('afterbegin', node);
    };

    // Отправляем данные формы на сервер
    window.backend.save(new FormData(form), onSuccess, onError);

  });

})();

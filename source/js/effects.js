'use strict';

(function () {

  var photoEditContainer = document.querySelector('.img-upload__wrapper');
  var effectScaleContainer = document.querySelector('.img-upload__scale');

  var effectScale = photoEditContainer.querySelector('.scale__line');
  var effectPin = effectScale.querySelector('.scale__pin');
  var effectScaleCurrentLevel = effectScale.querySelector('.scale__level');
  var effectInput = effectScaleContainer.querySelector('.scale__value');
  var previewBigPhoto = photoEditContainer.querySelector('.img-upload__preview');
  var previewEffectInputs = photoEditContainer.querySelectorAll('.effects__radio');

  var previewEffectImages = photoEditContainer.querySelectorAll('.effects__preview');

  var effects = [
    '0',
    'grayscale(',
    'sepia(',
    'invert(',
    'blur(',
    'brightness('
  ];

  // Изначально скрываем ползунок силы эффекта
  effectScaleContainer.classList.add('hidden');

  // Устанавливает превью фотографии класс соответствующего превью эффекта
  function onEffectPreviewClick(i) {
    return function () {
      var effectClassIndex = 1; // Порядковый номер класса который добавляем и удаляем большому изображению
      // Обработчик содержания превью изображения больше одного класса
      if (previewBigPhoto.classList.length > effectClassIndex) {
        // Обнуляем инлайн стили
        previewBigPhoto.style = '';
        // Удаляем предыдущий примененный класс
        previewBigPhoto.classList.remove(previewBigPhoto.classList[effectClassIndex]);
      }
      // Добавляем класс аналогичный соответсвующего превью эффекта
      previewBigPhoto.classList.add(previewEffectImages[i].classList[effectClassIndex]);
      // Устанавливаем ползунок в конец шкалы
      effectPin.style.left = effectScale.offsetWidth + 'px';
      // Устанавливаем ширину заполненной части слайдера в конец шкалы
      effectScaleCurrentLevel.style.width = effectScale.offsetWidth + 'px';
      // Устанавливаем значение скрытого инпута силы эффекта на максимум
      effectInput.defaultValue = 100;
    };
  }

  // Добавляем обработчики на все превью эффектов
  for (var i = 0; i < previewEffectImages.length; i++) {
    previewEffectImages[i].addEventListener('click', onEffectPreviewClick(i));
    // Добавляем на первое превью эффекта с оригиналом обработчик
    // на скрытие слайдера интенсивности примененного эффекта
    if (i === 0) {
      previewEffectImages[i].addEventListener('click', function () {
        effectScaleContainer.classList.add('hidden');
      });
      // Добавляем на все остальные обработчик на показ слайдера
    } else {
      previewEffectImages[i].addEventListener('click', function () {
        effectScaleContainer.classList.remove('hidden');
      });
    }
  }

  // Устанавливаем превью фотографии стиль как в выбранном превью эффекта
  var changeEffectIntensity = function () {
    if (previewEffectInputs[0].checked) {
      return;
    } else if (previewEffectInputs[1].checked) {
      // Значения (0 - 1.00)
      previewBigPhoto.style.filter = effects[1] + (effectInput.value / 100).toFixed(2) + ')';
    } else if (previewEffectInputs[2].checked) {
      // Значения (0 - 1.00)
      previewBigPhoto.style.filter = effects[2] + (effectInput.value / 100).toFixed(2) + ')';
    } else if (previewEffectInputs[3].checked) {
      // Значения (0 - 100)
      previewBigPhoto.style.filter = effects[3] + Math.round(effectInput.value) + '%)';
    } else if (previewEffectInputs[4].checked) {
      // Значения (0 - 3.00)
      previewBigPhoto.style.filter = effects[4] + (effectInput.value / 33.3).toFixed(2) + 'px)';
    } else if (previewEffectInputs[5].checked) {
      // Значения (1.00 - 3.00)
      previewBigPhoto.style.filter = effects[5] + (1 + effectInput.value / 50).toFixed(2) + ')';
    }
  };

  // Шкала интенсивности эффекта
  effectPin.onmousedown = function (evt) {
    evt.preventDefault();

    // Вычисление смещения курсора относительно центра ползунка
    // var shiftX = evt.clientX - effectPin.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(evt) {
      var newLeft = evt.clientX - effectScale.getBoundingClientRect().left;

      // Ограничения области ползунка
      if (newLeft < 0) {
        newLeft = 0;
      }
      // Задаем правую границу шкалы
      var rightEdge = effectScale.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      // Устанавливаем смещение слайдера
      effectPin.style.left = newLeft + 'px';
      // Устанавливаем ширину заполненной части слайдера
      effectScaleCurrentLevel.style.width = newLeft + 'px';
      // Задаем значение value скрытому инпуту чтобы использовать
      // его для интенсивности филтра
      effectInput.defaultValue = (newLeft / (effectScale.offsetWidth / 100)).toFixed(2);

      // Устанавливаем превью фотографии стиль как в выбранном превью эффекта
      changeEffectIntensity();

    }

    // Удаляем обработчики событий при отпускании кнопки мыши
    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  };

  // На всякий случай предотвращаем встроенный в браузер dnd
  effectPin.ondragstart = function () {
    return false;
  };

  // Перемещение ползунка по клику по линии
  effectScale.addEventListener('click', function (evt) {
    // Вычисляем нажатый пиксель на шкале
    var clickedPoint = evt.clientX - effectScale.getBoundingClientRect().left;
    // Проверка для того чтобы ползунок не мог уехать за пределы шкалы
    if (clickedPoint > effectScale.offsetWidth || clickedPoint < 0) {
      return;
    } else {
      // Устанавливаем ползунок на эту точку
      effectPin.style.left = clickedPoint + 'px';
      // Устанавливаем ширину заполненной части слайдера
      effectScaleCurrentLevel.style.width = clickedPoint + 'px';
      // Задаем value скрытому инпуту
      effectInput.defaultValue = clickedPoint;
      effectInput.defaultValue = Math.round(clickedPoint / (effectScale.offsetWidth / 100));
      changeEffectIntensity();
    }
  });
})();

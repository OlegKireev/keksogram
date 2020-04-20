'use strict';

var resizeButtonMinus = document.querySelector('.resize__control--minus');
var resizeButtonPlus = document.querySelector('.resize__control--plus');
var resizeValue = document.querySelector('.resize__control--value');
var resizeStep = 25;
var resizeMin = 25;
var resizeMax = 100;

var uploadPreviewImage = document.querySelector('.img-upload__preview img');

// Уменьшение значения инпута с масштабом и самого изображения
var decreaseScale = function (min, step) {
  // Записываем во временную переменную значение инпута без процентов и приводим его к числу с помощью '+'
  var tempValue = +resizeValue.value.replace('%', '');
  if (tempValue > min) {
    // Онимаем значение шага
    tempValue -= step;
    // Ресайзим изображение
    // uploadPreviewImage.style.transform = 'scale(0.50)';
    uploadPreviewImage.style.transform = 'scale(' + (tempValue / 100) + ')';
    // Возвращаем знак процента
    tempValue += '%';
    // Присваеваем инпуту значение временной переменной
    resizeValue.value = tempValue;
  }
};

// Увеличение значения инпута с масштабом и самого изображения
var increaseScale = function (max, step) {
  // Записываем во временную переменную значение инпута без процентов и приводим его к числу с помощью '+';
  var tempValue = +resizeValue.value.replace('%', '');
  if (tempValue < max) {
    // Прибавляем значение шага
    tempValue += step;
    // Ресайзим изображение
    uploadPreviewImage.style.transform = 'scale(' + (tempValue / 100) + ')';
    // Возвращаем знак процента
    tempValue += '%';
    // uploadPreviewImage.style.transform = 'scale(1)';
    // Присваеваем инпуту значение временной переменной
    resizeValue.value = tempValue;
  }
};

// Обработчики кликов
var onMinusButtonClick = function () {
  decreaseScale(resizeMin, resizeStep);
};

var onPlusButtonClick = function () {
  increaseScale(resizeMax, resizeStep);
};

// ВРЕМЕННО, добавляем обработчики сразу, после приминения модульности
// необходимо добавлять из в момент загрузки фото, и удалять при закрытии окна
resizeButtonMinus.addEventListener('click', onMinusButtonClick);
resizeButtonPlus.addEventListener('click', onPlusButtonClick);


'use strict';

var effectScale = document.querySelector('.scale__line');
var effectPin = effectScale.querySelector('.scale__pin');
var effectScaleCurrentLevel = effectScale.querySelector('.scale__level');
var effectInput = document.querySelector('.scale__value');


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
    effectInput.defaultValue = Math.round(newLeft / (effectScale.offsetWidth / 100));
  }

  function onMouseUp() {
    // Удаляем обработчики событий
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  }

};

// На всякий случай предотвращаем встроенный в браузер dnd
effectPin.ondragstart = function () {
  return false;
};

// Перемещение ползунка по клику по линии
effectScale.addEventListener('click', function(evt) {
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
  }
});

'use strict';

// (function () {

//  Записываем объект запроса на сервер в переменную
var xhr = new XMLHttpRequest();
var DATA_URL = 'https://flucky.design/server/userPhotosData.json';
console.log(xhr.readyState);
// xhr.responseType = 'json';
// Указываем метод и адрес куда отправляем запрос
xhr.open('GET', DATA_URL);

console.log(xhr.readyState);

xhr.send();

xhr.addEventListener('load', function () {
  console.log(xhr.readyState);
  console.log(xhr.responseText);

  console.log(xhr.status + ' ' + xhr.statusText);
});
// })();

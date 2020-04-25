// 'use strict';

// (function () {

//   window.load = function (url, onSuccess, onError) {
//     //  Записываем объект запроса на сервер в переменную
//     var xhr = new XMLHttpRequest();
//     xhr.responseType = 'json';

//     xhr.addEventListener('load', function () {
//       switch (xhr.status) {
//         case 200:
//           onSuccess(xhr.response);
//           break;

//         default:
//           onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
//       }
//     });

//     // Добавляем на объект запроса обработчик события ошибки
//     xhr.addEventListener('error', function () {
//       onError('Произошла ошибка соединения');
//     });

//     // Добавляем на объект запроса обработчик события ошибки ожидания
//     xhr.addEventListener('timeout', function () {
//       onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
//     });

//     // Установим таймаут ожидания ответа в мс.
//     xhr.timeout = 1000;

//     // Указываем метод и адрес куда отправляем запрос
//     xhr.open('GET', url);
//     // Отправляем запрос
//     xhr.send();
//   };
// })();



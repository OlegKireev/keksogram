/* eslint-disable no-undef */
'use strict';

// Примеры предложений для создания коментариев
var commentsVariants = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Примеры описаний фотографий
var descriptions = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

// Создаем пустой массив в миниатюрами фотографий
var userPhotos = [];

// Цикл для наполнения массива 'userPhotos' обектами с данными о фото
function postsArrayGeneration(photosQuantity) {
  for (var i = 0; i < photosQuantity; i++) {
    userPhotos[i] = {};
    userPhotos[i].url = createPhotoUrl(i);
    userPhotos[i].likes = getRandomIndex(15, 200);
    userPhotos[i].comment = сommentsGeneration(getRandomIndex(1, 11));
    userPhotos[i].description = arrayRandomElement(descriptions);
  }
}

// Наполняем массив созданными объектами
postsArrayGeneration(25);

// Объявляем контейтер для помещения миниатюр
var picturesElement = document.querySelector('.pictures');
// Объявляем шаблон для миниатюры
var pictureTemplate = document.querySelector('#picture-template').content;

// Создаем на основе массива 'userPhotos' миниатюры на странице
for (var i = 0; i < userPhotos.length; i++) {
  // Клонируем шаблон в новый элемент и записиваем в переменную
  var photoElement = pictureTemplate.cloneNode(true);
  // Устанавливаем путь до изображения
  photoElement.querySelector('.picture__img').src = userPhotos[i].url;

  // Записываем в переменную дом-элемент с лайками на миниатюре
  var photoLikes = photoElement.querySelector('.picture__stat--likes');
  // Устанавливаем количество лайков из объекта дом-элементу
  photoLikes.textContent = userPhotos[i].likes;

  // Записываем в переменную дом элемент с коментариями
  var photoComments = photoElement.querySelector('.picture__stat--comments');
  // Устанавливаем длинну массива комментариев как их количество на дом-элементе
  photoComments.textContent = userPhotos[i].comment.length;

  // Помещаем в контейтер созданный элемент миниатюры
  picturesElement.appendChild(photoElement);

  // Обрабочик клика по миниатюре.
  var onSmallPhotoCLick = function (index) {
    return function curriedFunction(evt) {
      evt.preventDefault();
      // Показываем большое изображение с коментариями
      openBigPhoto(index);
      // Добавляем обработчик нажатия Esc
      document.addEventListener('keydown', onBigPhotoEscKeydown);
    };
  };

  // Записываем в псевдомассив все миниатюры
  var pictureElement = document.querySelectorAll('.picture__link');
  // Задаем миниатюре с текущим индексом обработчик клика и передаем внутрь функции текущий индекс цикла параметром (иначе, из-за замыкания передается всегда 6);
  pictureElement[i].addEventListener('click', onSmallPhotoCLick(i), false);
}

// Генерация случайного числа
function getRandomIndex(min, max) {
  var result = Math.floor(Math.random() * (max - min) + min);
  return result;
}

// Выбор случайного элемента в массиве
function arrayRandomElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

// Создаем путь до изображения
function createPhotoUrl(i) {
  var url = 'photos/' + (i + 1) + '.jpg';
  return url;
}

// Создание одного коментария из шаблона
function getRandomComment() {
  var comment;
  // Кидаем монетку
  var coinFlip = Math.floor(Math.random() * 2);
  // Если 1 тогда делаем коментарий из двух предложений
  if (coinFlip) {
    comment = commentsVariants[getRandomIndex(0, commentsVariants.length)] + ' ' + commentsVariants[getRandomIndex(0, commentsVariants.length)];
  } else {
    comment = commentsVariants[getRandomIndex(0, commentsVariants.length)];
  }
  return comment;
}

// Создание массива с комментариями
function сommentsGeneration(commentsQuantity) {
  var comments = [];
  comments.splice(0, comments.length); // Не понимаю почему без удаления всех значений временного массива с коментариями все работает
  for (var i = 0; i < commentsQuantity; i++) {
    comments[i] = getRandomComment();
  }
  return comments;
}

var commentsElement = document.querySelector('.social__comments');
var commentTemplate = document.querySelector('#comment-template').content;
var postElement = document.querySelector('.big-picture');

function openBigPhoto(postIndex) {
  postElement.classList.remove('hidden');
  postElement.querySelector('.big-picture__img img').src = userPhotos[postIndex].url;
  postElement.querySelector('.likes-count').textContent = userPhotos[postIndex].likes;
  postElement.querySelector('.comments-count').textContent = userPhotos[postIndex].comment.length;
  postElement.querySelector('.social__caption').textContent = userPhotos[postIndex].description;

  postCommentsCreation(postIndex);
}

// Генерация случайных комментариев
function postCommentsCreation(postIndex) {
  // Запускаем цикл до длины массива с коментариями для текущей миниатюры
  for (var i = 0; i < userPhotos[postIndex].comment.length; i++) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomIndex(1, 6) + '.svg';

    var commentText = commentElement.querySelector('.social__text');
    commentText.textContent = userPhotos[postIndex].comment[i];

    commentsElement.append(commentElement);
  }
}

// ВРЕМЕННО скрываем поля в модале с большой фотографией
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__loadmore').classList.add('visually-hidden');


var bigPhotoCloseButton = postElement.querySelector('.big-picture__cancel');

// Обработчик клика кнопки "х" закрытия модала с большой фотографией
var onBigPhotoCloseClick = function () {
  closeBigPhotoScreen();
  deleteComments();
};

// Удаление элементов комментариев с модала большого изображения
function deleteComments() {
  for (var i = commentsElement.children.length; i > 0; i--) {
    commentsElement.children[0].remove(); //[0] - удаление до первогор элемента в псевдомассиве
  }
}

// Закрыть модал с большой фотографией
function closeBigPhotoScreen() {
  postElement.classList.add('hidden');
  // Удаляем обрабочик Esc для модала
  console.log('removed');
  document.removeEventListener('keydown', onBigPhotoEscKeydown, false);
}

// Закрываем модал с большой фотографией по клику кнопки "x"
bigPhotoCloseButton.addEventListener('click', onBigPhotoCloseClick, false);

var onBigPhotoEscKeydown = function (evt) {
  if (evt.keyCode === 27) {
    closeBigPhotoScreen();
  }
};


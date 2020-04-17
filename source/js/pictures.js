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
    userPhotos[i].url = getPhotoUrl(i);
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

  // Обрабочик клика по миниатюре
  var onSmallPhotoCLick = function (index) {
    console.log(index);
    // Показываем большое изображение с коментариями
    bigPhotoGenerate(index);
  };

  // Записываем в псевдомассив все миниатюры
  var pictureElement = document.querySelectorAll('.picture__link');
  Задаем миниатюре с текущим индексом обработчик клика и передаем внутрь текущий индекс цикла вторым параметром (иначе, из-за замыкания передается всегда 6);
  pictureElement[i].addEventListener('click', onSmallPhotoCLick.bind(null, i), false);
}


function getRandomIndex(min, max) {
  var result = Math.floor(Math.random() * (max - min) + min);
  return result;
}

function arrayRandomElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

// eslint-disable-next-line no-shadow
function getPhotoUrl(i) {
  var url = 'photos/' + (i + 1) + '.jpg';
  return url;
}

function getRandomComment() {
  var comment;
  var coinFlip = Math.floor(Math.random() * 2);
  if (coinFlip) {
    comment = commentsVariants[getRandomIndex(0, commentsVariants.length)] + ' ' + commentsVariants[getRandomIndex(0, commentsVariants.length)];
  }
  comment = commentsVariants[getRandomIndex(0, commentsVariants.length)];
  return comment;
}

function сommentsGeneration(commentsQuantity) {
  var comments = [];
  comments.splice(0, comments.length); // Не понимаю почему без удаления всех значений временного массива с коментариями все работает
  for (var j = 0; j < commentsQuantity; j++) {
    comments[j] = getRandomComment();
  }
  return comments;
}

var commentsElement = document.querySelector('.social__comments');
var commentTemplate = document.querySelector('#comment-template').content;
var postElement = document.querySelector('.big-picture');

function bigPhotoGenerate(postIndex) {

  postElement.classList.remove('hidden');
  postElement.querySelector('.big-picture__img img').src = userPhotos[postIndex].url;
  postElement.querySelector('.likes-count').textContent = userPhotos[postIndex].likes;
  postElement.querySelector('.comments-count').textContent = userPhotos[postIndex].comment.length;
  postElement.querySelector('.social__caption').textContent = userPhotos[postIndex].description;

  postCommentsGenerate(postIndex);
}
// bigPhotoGenerate(3);


function postCommentsGenerate(postIndex) {
  for (var i = 0; i < userPhotos[postIndex].comment.length; i++) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomIndex(1, 6) + '.svg';

    var commentText = commentElement.querySelector('.social__text');
    commentText.textContent = userPhotos[postIndex].comment[i];

    commentsElement.appendChild(commentElement);
  }
}

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__loadmore').classList.add('visually-hidden');


var onPhotoPreviewClick = function (evt) {

};

var bigPhotoCloseButton = postElement.querySelector('.big-picture__cancel');

var onBigPhotoCloseClick = function () {
  postElement.classList.add('hidden');
};

bigPhotoCloseButton.addEventListener('click', onBigPhotoCloseClick);




// при создании превью фотографии
//   повесить на нее обработчик клика
//     в котором i = bigPhotoGenerate(i);

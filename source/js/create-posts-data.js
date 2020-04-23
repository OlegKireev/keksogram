'use strict';

(function () {

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
  window.userPhotos = [];

  // Цикл для наполнения массива 'userPhotos' обектами с данными о фото
  function postsArrayGeneration(photosQuantity) {
    for (var i = 0; i < photosQuantity; i++) {
      userPhotos[i] = {};
      userPhotos[i].url = window.utils.createPhotoUrl(i);
      userPhotos[i].likes = window.utils.getRandomIndex(15, 200);
      userPhotos[i].comment = сommentsGeneration(window.utils.getRandomIndex(1, 11));
      userPhotos[i].description = window.utils.arrayRandomElement(descriptions);
    }
  }

  // Наполняем массив созданными объектами
  postsArrayGeneration(25);

  var commentTemplate = document.querySelector('#comment-template').content;
  // Создание одного коментария из шаблона
  function getRandomComment() {
    var comment;
    // Кидаем монетку
    var coinFlip = Math.floor(Math.random() * 2);
    // Если 1 тогда делаем коментарий из двух предложений
    if (coinFlip) {
      comment = commentsVariants[window.utils.getRandomIndex(0, commentsVariants.length)] + ' ' + commentsVariants[window.utils.getRandomIndex(0, commentsVariants.length)];
    } else {
      comment = commentsVariants[window.utils.getRandomIndex(0, commentsVariants.length)];
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


  // Генерация случайных комментариев
  window.postCommentsCreation = function (postIndex) {
    // Запускаем цикл до длины массива с коментариями для текущей миниатюры
    for (var i = 0; i < userPhotos[postIndex].comment.length; i++) {
      var commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').src = 'img/avatar-' + window.utils.getRandomIndex(1, 6) + '.svg';

      var commentText = commentElement.querySelector('.social__text');
      commentText.textContent = userPhotos[postIndex].comment[i];

      commentsElement.append(commentElement);
    }
  };

})();

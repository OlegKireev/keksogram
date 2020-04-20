'use strict';

var hashtagInput = document.querySelector('.text__hashtags');
var newCommentInput = document.querySelector('.text__description');

// Кастомные сообщения при невалидном поле ввода хештегов
hashtagInput.addEventListener('invalid', function () {
  if (hashtagInput.validity.tooShort) {
    hashtagInput.setCustomValidity('Хештег должен содержать хотябы один символ после "#"');
    hashtagInput.style.borderColor = 'red';
  } else if (hashtagInput.validity.patternMismatch) {
    hashtagInput.setCustomValidity('Хештег должен начинаться с символа "#". Хештеги должны разделяться между собой пробелом. Хештегов не должно быть более пяти. Максимальное количество символов в одном хештеге - 20.');
    hashtagInput.style.borderColor = 'red';
  } else {
    // Сбрасываем поле при валидности
    hashtagInput.setCustomValidity('');
    hashtagInput.style.borderColor = 'green';
  }
});

// Добавляем обработчик отмены закрытия модала при фокусе в поле добавления хештега
hashtagInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onUploadEscKeydown);

  // При срабатывании добавляем обработчик на возврат закрытия по ESC
  hashtagInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onUploadEscKeydown);
  });
});

// Добавляем обработчик отмены закрытия модала при фокусе в поле добавления комментария
newCommentInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onUploadEscKeydown);

  // При срабатывании добавляем обработчик на возврат закрытия по ESC
  newCommentInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onUploadEscKeydown);
  });
});



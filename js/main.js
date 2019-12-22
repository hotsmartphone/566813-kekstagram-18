'use strict';

var NUMBERS_OF_AVATARS = 6; // Кколичество аватарок в папке img проекта
var NUMBERS_OF_COMMENTS = 10; // мксимальное количество комментариев к фото
var NUMBERS_OF_POSTS = 25; // количество постов для МОК-данных
var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;
var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var userNames = ['Амат', 'Афанасий', 'Берта', 'Брайн', 'Глеб', 'Ефим', 'Зоя', 'Иларий', 'Кассий', 'Лука', 'Матильда', 'Мервина', 'Назар', 'Пахом', 'Пий', 'Теобальд', 'Савва', 'Фаина'];

// Функция рандомного числа
var random = function (min, max) {
  if (max) {
    return Math.round (min - 0.5 + Math.random() * (max - min + 1));
  } else {
    return Math.floor(Math.random() * min + 1);
  }
};

// Функция генерации комментариев к постам
var generateComments = function (numbersOfComments) {
  var comments = [];
  for (var i = 0; i < numbersOfComments; i++) comments[i] = {
    avatar: 'img/avatar-' + random(NUMBERS_OF_AVATARS) + '.svg',
    message: messages[random(0, messages.length - 1)] + '\n' + messages[random(0, messages.length - 1)],
    name: userNames[random(0, userNames.length)]
  };
  return comments;
};

// Фугкция генерации поста
var generatePost = function () {
  return {
    url: 'photos/' + random(25) + '.jpg',
    description: 'Превосходное описание фотографии',
    likes: random(15, 200),
    comments: generateComments(random(NUMBERS_OF_COMMENTS))
  };
};

// Функция генерации массива постов
var generatePosts = function (numbersOfPosts) {
  var posts = [];
  for (var i = 0; i < numbersOfPosts; i++) {
    posts[i] = generatePost();
  }
  return posts;
};

var fakePosts = generatePosts(NUMBERS_OF_POSTS);

// Отрисовка фотограции-поста
var renderOnePicture = function (post) {
  var pictureTemplate = document.querySelector('#picture');
  var picture = pictureTemplate.content.cloneNode(true);
  picture.querySelector('.picture__img').src = post.url;
  picture.querySelector('.picture__likes').textContent = post.likes;
  picture.querySelector('.picture__comments').textContent = post.comments.length;
  return picture;
};

// Функция генерации постов-картинок
var renderPictures = function (posts) {
  var fragment = document.createDocumentFragment();
  var pictures = document.querySelector('.pictures');
  for (var i = 0; i < posts.length; i++) {
    fragment.appendChild(renderOnePicture(posts[i]));
  };
pictures.appendChild(fragment);
};

renderPictures(fakePosts);

// Показ превью первой картинки
var bigPicturePost = document.querySelector('.big-picture');
var postBigImg = bigPicturePost.querySelector('.big-picture__img > img');
var likesCountPost = document.querySelector('.likes-count');
var commentsCountNumberPost = document.querySelector('.comments-count');
var pictureCaption = document.querySelector('.social__caption');

//bigPicturePost.classList.remove('hidden');
postBigImg.src = fakePosts[0].url;
likesCountPost.textContent = fakePosts[0].likes;
commentsCountNumberPost.textContent = fakePosts[0].comments.length;
pictureCaption.textContent = fakePosts[0].description;

var insertCommentsToPost = function (comments) {
  var commentsPostBlock = document.querySelector('.social__comments');
  var commentPostClone = commentsPostBlock.firstElementChild.cloneNode(true);
  var commentPostCloneAvatar = commentPostClone.querySelector('.social__picture');
  var commentPostCloneText = commentPostClone.querySelector('.social__text');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < comments.length; i++) {
    commentPostCloneAvatar.src = comments[i].avatar;
    commentPostCloneAvatar.alt = comments[i].name;
    commentPostCloneText.textContent = comments[i].message;
    fragment.appendChild(commentPostClone);
  }

  while (commentsPostBlock.hasChildNodes()) {
    commentsPostBlock.removeChild(commentsPostBlock.lastChild);
  }

  commentsPostBlock.appendChild(fragment);
};

insertCommentsToPost(fakePosts[0].comments);

var commentsCountPost = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');

commentsCountPost.classList.add('visually-hidden');
commentsLoader.classList.add('visually-hidden');



// Обработчики событий на поле выбора файла
var uploadButton = document.querySelector('#upload-file');
var uploadBox = document.querySelector('.img-upload__overlay');
var closeBox = document.querySelector('#upload-cancel');

// Функция обработки собтия по клику на Esc
var oncloseBoxEscButtonPress = function (evt) {
  if (evt.key === 'Escape') {
    onCloseButtonClick();
  }
};

// Функция обработки собтия по клику на Esc
var onCloseBoxEnterButtonPress = function (evt) {
  if (evt.key === 'Enter') {
    onCloseButtonClick();
  }
};

// Функция обработчика открытия окна редактирования фото
var onUploadButtonChange = function () {
  uploadBox.classList.remove('hidden');
  // Обработчик события закрытия окна по нажатию на ESC
  document.addEventListener('keydown', oncloseBoxEscButtonPress);
  // Обработчик закрытия окна по нажатию на крестик
  closeBox.addEventListener('click', onCloseButtonClick);
// Обработчик закрытия окна по нажатию клавишей Enter на крестик
  closeBox.addEventListener('keydown', onCloseBoxEnterButtonPress);
  // Обработчик событий на отпускание ползунка насыщенности
  effectList.addEventListener('change', onEffectListChange);
    // Обработчик событий на смену эффекта
  effectLevelPin.addEventListener('mouseup', onEffectLevelPinMouseup);
  // Обработчик событий на потерю фокусе в поле ввода хэш-тегов
  hashtagInput.addEventListener('input', onHashtagInputBlur);
};

// Функция обработчика закрытия окна редактирования фото
var onCloseButtonClick = function () {
  var activeElement = document.activeElement;
  if (hashtagInput === activeElement) { // Не знаю почему, но проверка hashtagInput === document.ActiveElement всегда показывает false
    return;
  };
  uploadBox.classList.add('hidden');
  closeBox.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', oncloseBoxEscButtonPress);
  closeBox.removeEventListener('keydown', onCloseBoxEnterButtonPress);
  effectList.removeEventListener('change', onEffectListChange);
  effectLevelPin.removeEventListener('mouseup', onEffectLevelPinMouseup);
  hashtagInput.removeEventListener('input', onHashtagInputBlur);
  uploadButton.value = '';
};

// Обработчик события на загрузку фото
uploadButton.addEventListener('change', onUploadButtonChange);

// Событие на отпускание ползунка насыщенности эффекта
var effectLevelLineBlock = document.querySelector('.img-upload__effect-level');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelValueNumber = document.querySelector('.effect-level__value');
var effectLevelDepthLine = document.querySelector('.effect-level__depth');
var originalEffectButton = document.querySelector('#effect-none');
var checkedEffect = document.querySelector('.effects__radio:checked');

var EFFECT_MIN_MAX_LEVEL = {
  chrome: {
    nameOfStyle: 'grayscale',
    from: 0,
    to: 1,
    measure: ''
  },
  sepia: {
    nameOfStyle: 'sepia',
    from: 0,
    to: 1,
    measure: ''
  },
  marvin: {
    nameOfStyle: 'invert',
    from: 0,
    to: 100,
    measure: '%'
  },
phobos: {
  nameOfStyle: 'blur',
  from: 0,
  to: 3,
  measure: 'px'
},
heat: {
  nameOfStyle: 'brightness',
  from: 1,
  to: 3,
  measure: ''
}
};

var imgUploadPreview = document.querySelector('.img-upload__preview');

// Функция обработчика событий на отпускание ползунка насыщенности
var onEffectLevelPinMouseup = function (evt) {
  var pinOnEffectLinePosition = (effectLevelPin.offsetLeft +  effectLevelPin.offsetWidth / 2) - effectLevelLine.offsetLeft; // Высчитываем разницу в положении линии насыщенности и ползунка. Добавляем половину ширины ползунка, чтобы отсчитывать от его центра
  effectLevelValueNumber.value = Math.round(pinOnEffectLinePosition / effectLevelLine.offsetWidth  * 100); // Глубина эффекта в процентах
  effectLevelDepthLine.width = pinOnEffectLinePosition; // Ширина линии глубины равна положению ползунка на линии эффекта

checkedEffect = document.querySelector('.effects__radio:checked');
// Смотрим на то, какой эффект был выбран, берем таблицу стилей, смотрим в ней макс и мин значение для нужного стиля и применяем выбранный уровень эффекта
  imgUploadPreview.style.filter = EFFECT_MIN_MAX_LEVEL[checkedEffect.value].nameOfStyle + '(' + (effectLevelValueNumber.value * EFFECT_MIN_MAX_LEVEL[checkedEffect.value].to / 100 + EFFECT_MIN_MAX_LEVEL[checkedEffect.value].from) + EFFECT_MIN_MAX_LEVEL[checkedEffect.value].measure + ')';
};

// Сбрасываем уровень насыщенности эффекта при выборе нового эффекта.
var effectList = document.querySelector('.effects__list');

// Функция обработчика смены эффекта
var onEffectListChange = function () {
  imgUploadPreview.style.filter = ''; // При смене фильтра сбрасываем эффект
  effectLevelValueNumber.value = 0;
  checkOriginalCloseLevelLine();
  // Здесь будет функция смены координат ползунка
};

var checkOriginalCloseLevelLine = function () {// Фнукция проверяет выбран ли оригинальный эффект. Если выбран, то скрываем линию эффекта
checkedEffect = document.querySelector('.effects__radio:checked');
  if (checkedEffect === originalEffectButton) {
    effectLevelLineBlock.classList.add('hidden');
  } else {
    effectLevelLineBlock.classList.remove('hidden');
  }
};

checkOriginalCloseLevelLine(); // Запускаем функцию проверки выбран ли оригинальный эффект сразу при открытии окна, чтобы убрать линию уровня эффекта

// Надо вовремя навесить и убрать обработчики

// ВАЛИДАЦИЯ ХЭШ-ТЕГОВ
var hashtagInput = document.querySelector('.text__hashtags');
var hashtagsUploadImage = [];
var invalidities = [];

var onHashtagInputBlur = function () {
  var value = hashtagInput.value;
  hashtagInput.setCustomValidity('');
  invalidities = [];

  if (value.length !== 0) {
    value.trim().toLowerCase();
    hashtagsUploadImage = value.split(' ');
  };
  checkValidityHashtag(hashtagsUploadImage);
};

var checkValidityHashtag = function (hashtags) {

  if (hashtags.length > 5) {
    invalidities.push('Допускается не более 5-ти хэш-тегов.');
  };
  hashtagsUploadImage.forEach(function (it) {

    if (it[0] !== '#') {
      invalidities.push('Хэш-тег должен начинаться с решетки "#".');
    };

    if (it === '#') {
      invalidities.push('Хэш-тег не может состоять только из одной решетки "#".');
    };

    if (it.length > 20) {
      invalidities.push('Длина хэш-тега не должна превышать 20 символов, включая решетку "#".');
    };

    if (it.includes(',')) {
      invalidities.push('В качестве разделителя необходимо использовать пробел, запятые недопускаются.');
    };

    if (hashtags.filter(function(hashtag) {
      return hashtag === it;
    }).length > 1) {
      var containsError = 'Один и тот же хэш-тег не может быть использован дважды.';
      if (!invalidities.includes(containsError)) {
        invalidities.push(containsError);
      };
    };

  });

  if (invalidities.length > 0) {
      hashtagInput.setCustomValidity(invalidities.toString());
  };
};

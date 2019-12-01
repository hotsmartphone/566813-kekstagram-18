'use strict';

var NUMBERS_OF_AVATARS = 6; // Кколичество аватарок в папке img проекта
var NUMBERS_OF_COMMENTS = 10; // мксимальное количество комментариев к фото
var NUMBERS_OF_POSTS = 25; // количество постов для МОК-данных
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

console.log(fakePosts);

// Показ превью первой картинки
var bigPicturePost = document.querySelector('.big-picture');
var postBigImg = bigPicturePost.querySelector('.big-picture__img > img');
var likesCountPost = document.querySelector('.likes-count');
var commentsCountNumberPost = document.querySelector('.comments-count');
var pictureCaption = document.querySelector('.social__caption');

bigPicturePost.classList.remove('hidden');
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

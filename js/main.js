'use strict';

var NUMBERS_OF_AVATARS = 6; // Кколичество аватарок в папке img проекта
var NUMBERS_OF_COMMENTS = 10; // мксимальное количество комментариев к фото
var NUMBERS_OF_POSTS = 25; // количество постов для МОК-данных
var messages = ['Всё отлично!','В целом всё неплохо. Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.','Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var userNames = ['Амат', 'Афанасий', 'Берта', 'Брайн', 'Глеб', 'Ефим', 'Зоя', 'Иларий', 'Кассий', 'Лука', 'Матильда', 'Мервина', 'Назар', 'Пахом', 'Пий', 'Теобальд', 'Савва', 'Фаина'];

var random = function (min, max) {
  if (max) {
    return Math.round (min - 0.5 + Math.random() * (max - min + 1));
  } else {
    return Math.floor(Math.random() * min + 1);
  }
};

var generateComments = function (numbersOfComments) {
  var comments = [];
  for (var i = 0; i < numbersOfComments; i++) comments[i] = {
    avatar: 'img/avatar-' + random(NUMBERS_OF_AVATARS) + '.svg',
    message: messages[random(0, messages.length)] + '\n' + messages[random(0, messages.length)],
    name: userNames[random(0, userNames.length)]
  };
  return comments;
};

var generatePost = function () {
  return {
    url: 'photos/' + random(25) + '.jpg',
    description: '',
    likes: random(15, 200),
    comments: generateComments(random(NUMBERS_OF_COMMENTS))
  };
};

var generatePosts = function (numbersOfPosts) {
  var posts = [];
  for (var i = 0; i < numbersOfPosts; i++) {
    posts[i] = generatePost();
  }
  return posts;
};

var fakePosts = generatePosts(NUMBERS_OF_POSTS);

var renderOnePicture = function (post) {
  var pictureTemplate = document.querySelector('#picture');
  var picture = pictureTemplate.content.cloneNode(true);
  console.log(picture);
  console.log(picture.querySelector('.picture__img'));
  picture.querySelector('.picture__img').src = post.url;
  picture.querySelector('.picture__likes').textContent = post.likes;
  picture.querySelector('.picture__comments').textContent = post.comments.length;
  return picture;
};

var renderPictures = function (posts) {
  var fragment = document.createDocumentFragment();
  var pictures = document.querySelector('.pictures');
  for (var i = 0; i < posts.length; i++) {
    fragment.appendChild(renderOnePicture(posts[i]));
  };
pictures.appendChild(fragment);
};

renderPictures(fakePosts);

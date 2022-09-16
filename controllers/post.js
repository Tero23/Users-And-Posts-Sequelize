const { post: Post, user: User } = require('../models/index');
const { Op, Sequelize } = require('sequelize');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const multer = require('multer');

exports.multerConfig = {
  storage: multer.diskStorage({
    //Setup where the user's file will go
    destination: function (req, file, next) {
      next(null, 'images');
    },

    //Then give the file a unique name
    filename: function (req, file, next) {
      next(null, Date.now() + '.' + file.originalname);
    },
  }),

  //A means of ensuring only images are uploaded.
  fileFilter: function (req, file, next) {
    if (!file) {
      next();
    }
    const image = file.mimetype.startsWith('image/');
    if (image) {
      next(null, true);
    } else {
      return next();
    }
  },
};

exports.getAllPendingPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.findAll({
    where: { status: 'Pending' },
    include: [
      {
        model: User,
        attributes: ['username', 'email'],
      },
    ],
  });
  res.status(200).json({ count: posts.length, posts });
});

exports.rejectPostById = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({
    where: { id: req.params.id, status: 'Pending' },
  });
  if (!post)
    return next(new AppError('There is no pending post with that ID!', 404));
  await post.destroy();
  res.status(200).json({
    status: 'success',
    message: 'Post Rejected and removed!',
    post: post.text,
  });
});

exports.getAllApprovedPosts = catchAsync(async (req, res, next) => {
  const { text, userId, likes, rating } = req.query;
  let likesKey;
  let likesValue;
  let ratingKey;
  let ratingValue;

  let where = {
    where: { status: 'Approved' },
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  };
  likes &&
    ((likesKey = Object.keys(likes)[0]),
    (likesValue = Number(Object.values(likes)[0])),
    (where = {
      where: {
        likes: { [Op[likesKey]]: likesValue },
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [['likes', 'DESC']],
    }));

  rating &&
    ((ratingKey = Object.keys(rating)[0]),
    (ratingValue = Number(Object.values(rating)[0])),
    (where = {
      where: {
        rating: { [Op[ratingKey]]: likesValue },
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [['rating', 'DESC']],
    }));
  text && (where.where.text = text);
  userId && (where.where.userId = userId);

  console.log(where);

  const posts = await Post.findAll(where);

  res.status(200).json({
    message: 'success',
    data: {
      count: posts.length,
      posts,
    },
  });
});

exports.approvePost = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({ where: { id: req.params.id } });
  if (!post) return next(new AppError('There is no post with that ID!', 404));
  if (post.status === 'Approved')
    return next(new AppError('Post already Approved!', 400));
  post.status = 'Approved';
  await post.save();
  res.status(200).json({
    status: 'success',
    message: 'Post Approved!',
    post: post.text,
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const post = await Post.create({
    image: req.file.filename,
    text: req.body.text,
    userId: req.user.id,
    status: 'Pending',
  });
  res.status(201).json({
    status: 'success',
    message: 'Post created, wait for approval!',
    data: {
      post,
    },
  });
});

exports.deletePostById = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: User,
        attributes: ['username', 'email'],
      },
    ],
  });
  if (!post) return next(new AppError('There is no post with that ID!', 404));
  if (req.user.role === 'user' && req.user.id !== post.userId) {
    return next(new AppError("You cannot delete other's posts!", 403));
  }
  await post.destroy();
  res.status(200).json({
    message: 'Post deleted!',
    post: post.text,
  });
});

exports.getPostById = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: User,
        attributes: ['username', 'email'],
      },
    ],
  });
  if (!post) return next(new AppError('There is no post with that ID!', 404));
  res.status(200).json({ post });
});

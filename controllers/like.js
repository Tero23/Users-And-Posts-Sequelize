const { post: Post, user: User, like: Like } = require('../models/index');
const { Op, Sequelize } = require('sequelize');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.likePost = catchAsync(async (req, res, next) => {
  const like = await Like.create({
    userId: req.user.id,
    postId: req.params.id,
  });
  const post = await Post.findOne({ where: { id: like.postId } });
  const likes = post.likes + 1;
  await post.update({ likes });
  await res.status(201).json({
    status: 'success',
    message: 'You liked this post.',
  });
});

exports.disLikePost = catchAsync(async (req, res, next) => {
  const like = await Like.findOne({ where: { userId: req.user.id } });
  if (!like)
    return next(new AppError('You have not liked this post before!', 400));
  await Like.destroy({ where: { id: like.id } });
  const post = await Post.findOne({ where: { id: like.postId } });
  const likes = post.likes - 1;
  await post.update({ likes });
  await res.status(201).json({
    status: 'success',
    message: 'You Unliked this post.',
  });
});

exports.getAllLikesOfAPost = catchAsync(async (req, res, next) => {
  const likes = await Like.findAll({
    where: { postId: req.params.postId },
    attributes: { exclude: ['id', 'userId', 'postId', 'updatedAt'] },
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
    order: [['createdAt', 'DESC']],
  });
  const post = await Post.findOne({ where: { id: req.params.postId } });
  res.status(200).json({
    status: 'success',
    message: `Here are all the likes of the post: ${post.text}`,
    count: likes.length,
    likes: likes,
  });
});

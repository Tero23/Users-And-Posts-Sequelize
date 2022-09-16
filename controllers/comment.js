const {
  post: Post,
  user: User,
  like: Like,
  comment: Comment,
} = require('../models/index');
const { Op, Sequelize } = require('sequelize');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.commentOnPost = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const comment = await Comment.create({
    text: req.body.text,
    userId: req.user.id,
    postId: req.params.postId,
  });
  const post = await Post.findOne({ where: { id: comment.postId } });
  let rating = post.rating;
  switch (comment.text) {
    case 'veryBad':
      rating -= 0.1;
      break;
    case 'bad':
      rating -= 0.5;
      break;
    case 'normal':
      break;
    case 'good':
      rating += 0.05;
      break;
    case 'veryGood':
      rating += 0.1;
      break;
    default:
      rating += 0.2;
      break;
  }

  console.log(rating);
  await post.update({ rating });
  res.status(201).json({
    status: 'success',
    message: 'You commented this post.',
    comment: comment.text,
  });
});

exports.getAllCommentsOfPost = catchAsync(async (req, res, next) => {});

exports.deleteComment = catchAsync(async (req, res, next) => {});

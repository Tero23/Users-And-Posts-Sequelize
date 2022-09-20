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
  const comment = await Comment.create({
    text: req.body.text,
    userId: req.user.id,
    postId: req.params.postId,
  });
  const post = await Post.findOne({ where: { id: comment.postId } });
  let rating = post.rating;

  if (comment.text === 'bad') rating -= 0.1;
  if (comment.text === 'good') rating += 0.1;
  console.log(rating);

  await post.update({ rating });
  res.status(201).json({
    status: 'success',
    message: 'You commented this post.',
    comment: comment.text,
  });
});

exports.getAllCommentsOfPost = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({ where: { id: req.params.postId } });
  const comments = await Comment.findAll({
    where: { postId: post.id },
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    message: `Here are all the comments of the post: ${post.text}`,
    comments,
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({ where: { id: req.params.postId } });
  if (!post) return next(new AppError('There is no such post!', 400));
  let rating = post.rating;
  console.log(rating);
  const comment = await Comment.findOne({
    where: {
      [Op.and]: [{ postId: req.params.postId }, { userId: req.user.id }],
    },
  });
  if (!comment) return next(new AppError('There is no such comment!', 400));
  console.log(comment.text);
  if (comment.text === 'bad') rating += 0.1;

  if (comment.text === 'good') rating -= 0.1;

  await post.update({ rating });

  console.log(rating);
  await comment.destroy();
  res.status(200).json({
    status: 'success',
    message: 'Comment deleted successfully!',
  });
});

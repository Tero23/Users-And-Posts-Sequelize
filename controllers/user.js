require('dotenv').config();
const { Op, Sequelize, UUIDV4 } = require('sequelize');
const { user: User, post: Post } = require('../models/index');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  sendWelcomeEmail,
  sendVerificationCode,
} = require('../utils/emails/accounts');
const { v4 } = require('uuid');
const user = require('../models/user');

exports.createUser = catchAsync(async (req, res, next) => {
  const { username, age, email, password, role } = req.body;
  // const hashedPassword = await bcrypt.hash(password, 8);
  const user = await User.create({
    id: v4(),
    username,
    age,
    email,
    password,
    role,
  });
  sendWelcomeEmail(user.email, user.username);
  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  if (user.role === 'superAdmin') {
    await User.destroy({ where: { id: req.user.id } });
    return res.status(200).clearCookie('token').clearCookie('user_id').json({
      status: 'success',
      message: 'You tried to delete your boss... Now you are FIRED!!!',
    });
  }
  // return next(
  //   new AppError('You cannot delete the owner of the company!!! Watch your back from now on!', 403)
  // );
  if (req.user.role === 'admin' && user.role !== 'user')
    return next(new AppError('You Cannot Delete Admins!', 403));
  await User.destroy({ where: { id: req.params.id } });
  res.status(200).json({
    status: 'success',
    message: 'User successfully deleted!',
  });
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const { username, role, email, age } = req.query;
  let ageKey;
  let ageValue;

  let where = {
    where: { role: { [Op.ne]: 'superAdmin' } },
    attributes: { exclude: ['password', 'deletedAt'] },
    order: [['role', 'DESC']],
  };
  age &&
    ((ageKey = Object.keys(age)[0]),
    (ageValue = Number(Object.values(age)[0])),
    (where = {
      where: {
        role: { [Op.ne]: 'superAdmin' },
        age: { [Op[ageKey]]: ageValue },
      },
      attributes: { exclude: ['password', 'deletedAt'] },
      order: [['role', 'DESC']],
    }));
  username && (where.where.username = username);
  role && (where.where.role = role);
  email && (where.where.email = email);

  console.log(where);

  const users = await User.findAll(where);

  res.status(200).json({
    message: 'success',
    data: {
      count: users.length,
      users,
    },
  });
});

exports.getMyProfile = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.user.id } });
  if (!user) return next(new AppError('Invalid ID!', 403));
  res.status(200).json({
    status: 'success',
    message: 'Here is your profile',
    data: {
      user,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!user || user.deletedAt !== null)
    return next(new AppError('There is no such user with that Id!', 404));
  if (req.user.role === 'admin' && user.role !== 'user')
    return next(new AppError('You cannot read other admin profile!', 403));
  res.status(200).json({
    status: 'success',
    message: `Here is ${user.username}'s profile!`,
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['username', 'email', 'role'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Update!',
    });
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!user) {
    return next(new AppError('No user found with that ID!', 404));
  }
  if (req.user.role === 'admin' && user.role !== 'user')
    return next(new AppError('You cannot update other admins!', 403));
  updates.forEach((update) => (user[update] = req.body[update]));
  await user.save();
  res.status(200).json({
    status: 'success',
    message: 'User Updated!',
    data: {
      user,
    },
  });
});

// exports.login = catchAsync(async (req, res, next) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ where: { email } });
//   if (!user) return next(new AppError('Invalid email/password', 400));
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return next(new AppError('Invalid email/password', 400));
//   sendVerificationCode(email);
//   res.status(200).json({
//     status: 'success',
//     message: `We have sent you a verification code to: ${email}, you have 3 minutes to insert that code and login. It's for your own security.`,
//   });
// });

// exports.verifyLogin = catchAsync(async (req, res, next) => {
//   const { email, code } = req.body;
//   const user = await User.findOne({ where: { email } });
//   const time = (Date.now() - user.codeCreatedAt) / 1000 / 60;
//   if (time > 3) return next(new AppError('Verification Code expired!', 400));
//   console.log(code, user.verificationCode);
//   if (code !== user.verificationCode)
//     return next(new AppError('Invalid verification code!', 400));
//   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
//   res
//     .cookie('token', token, { maxAge: 5 * 60 * 60 * 1000, httpOnly: true })
//     .cookie('user_id', user.id, { maxAge: 5 * 60 * 60 * 1000 })
//     .status(200)
//     .json({
//       status: 'success',
//       message: 'Logged In successfully!',
//       data: {
//         user,
//       },
//     });
// });

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return next(new AppError('Invalid email/password', 400));
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError('Invalid email/password', 400));
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res
    .cookie('token', token, { maxAge: 5 * 60 * 60 * 1000, httpOnly: true })
    .cookie('user_id', user.id, { maxAge: 5 * 60 * 60 * 1000 })
    .status(200)
    .json({
      status: 'success',
      message: 'Logged In successfully!',
      data: {
        user,
      },
    });
});

exports.logout = catchAsync(async (req, res, next) => {
  req.user.verificationCode = null;
  req.user.codeCreatedAt = null;
  await req.user.save();
  res
    .status(200)
    .clearCookie('token')
    .clearCookie('user_id')
    .json({
      status: 'success',
      message: `${req.user.username} logged out successfully`,
    });
});

exports.getUserStats = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  const numberOfPosts = await Post.count({ where: { userId: req.params.id } });
  const averageLikesPerPost = await Post.findAll({
    attributes: [
      'userId',
      [Sequelize.fn('avg', Sequelize.col('likes')), 'averageLikes'],
    ],
    where: { userId: req.params.id },
    raw: true,
  });
  const averagePostRating = await Post.findAll({
    attributes: [
      'userId',
      [Sequelize.fn('avg', Sequelize.col('rating')), 'averageRating'],
    ],
    where: { userId: req.params.id },
    raw: true,
  });
  const totalNumberOfLikes = await Post.findAll({
    attributes: [
      'userId',
      [Sequelize.fn('sum', Sequelize.col('likes')), 'totalLikes'],
    ],
    where: { userId: req.params.id },
    raw: true,
  });
  res.status(200).json({
    status: 'success',
    message: `Here are the stats of: ${user.username}`,
    stats: {
      numberOfPosts,
      totalNumberOfLikes: +totalNumberOfLikes[0]['totalLikes'],
      averageLikesPerPost:
        Math.round(+averageLikesPerPost[0]['averageLikes'] * 100) / 100,
      averagePostRating:
        Math.round(+averagePostRating[0]['averageRating'] * 100) / 100,
    },
  });
});

require('dotenv').config();
const { user: User } = require('../models/index');
const { Op, Sequelize } = require('sequelize');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
  });
  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  res.status(200).json({
    status: 'success',
    message: 'User successfully deleted!',
  });
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ['password', 'deletedAt'] },
  });
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
  res
    .status(200)
    .clearCookie('token')
    .clearCookie('user_id')
    .json({
      status: 'success',
      message: `${req.user.username} logged out successfully`,
    });
});

require('dotenv').config();
const { user: User } = require('../models/index');
const { Op, Sequelize } = require('sequelize');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
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
  const users = await User.findAll();
  res.status(200).json({
    message: 'success',
    data: {
      count: users.length,
      users,
    },
  });
});

exports.getMyProfile = catchAsync(async (req, res, next) => {});

exports.getUser = catchAsync(async (req, res, next) => {});

exports.updateUser = catchAsync(async (req, res, next) => {});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.find({ where: { email } });
  if (!user) return next(new AppError('Invalid email/password', 400));
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError('Invalid email/password', 400));
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '5h' }
  );
  res
    .cookie('token', token, { maxAge: 5 * 60 * 60 * 1000, httpOnly: true })
    .cookie('user_id', user.id, { maxAge: 5 * 60 * 60 * 1000 })
    .status(200)
    .json({
      status: 'success',
      data: {
        user,
      },
    });
});

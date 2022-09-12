require('dotenv').config();
const { promisify } = require('util');
const { user: User } = require('../models/index');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.auth = catchAsync(async function (req, res, next) {
  const token = req.cookies.token;
  if (!token) return next(new AppError('You are not logged in!', 401));

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  if (decoded) {
    const user = await User.findOne({ where: { id: decoded.id } });
    req.user = user;
    return next();
  }
  return next(new AppError('Token Expired!', 401));
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError('You cannot perform this task!', 403));
    next();
  };
};

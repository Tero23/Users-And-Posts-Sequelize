const { post: Post } = require('../models/index');
const { Op, Sequelize } = require('sequelize');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllPendingPosts = catchAsync(async (req, res, next) => {});

exports.getPendingPostById = catchAsync(async (req, res, next) => {});

exports.rejectPostById = catchAsync(async (req, res, next) => {});

exports.getAllApprovedPosts = catchAsync(async (req, res, next) => {});

exports.createPost = catchAsync(async (req, res, next) => {});

exports.deletePostById = catchAsync(async (req, res, next) => {});

exports.getPostById = catchAsync(async (req, res, next) => {});

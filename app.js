require('dotenv').config();
const {
  userRouter,
  postRouter,
  likeRouter,
  commentRouter,
} = require('./routes/index');
const globalErrorHandler = require('./controllers/error');
const AppError = require('./utils/appError');
const cookieParser = require('cookie-parser');
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception!!! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/posts', likeRouter);
app.use('/api/v1/posts', commentRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is up and running at port ${port}!`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! Shutting down...');
  console.log(err.name, err.message);
  app.close(() => {
    process.exit(1);
  });
});

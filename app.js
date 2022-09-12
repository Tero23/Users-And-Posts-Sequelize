require('dotenv').config();
const UserRouter = require('./routes/user');
const PostRouter = require('./routes/post');
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
app.use(cookieParser());
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/posts', PostRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is up and running at port keziInch!');
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! Shutting down...');
  console.log(err.name, err.message);
  app.close(() => {
    process.exit(1);
  });
});

require('dotenv').config();

const postController = require('../controllers/post');
const auth = require('../middlewares/auth');

const express = require('express');
const router = express.Router();

//Accessable by Everyone. Case of users it is simply getting all the posts... Since pending posts are not accessable by users.
router
  .route('/')
  .get(
    auth.auth,
    auth.restrictTo('user', 'admin', 'superAdmin'),
    postController.getAllApprovedPosts
  )
  .post(
    auth.auth,
    auth.restrictTo('user', 'admin', 'superAdmin'),
    postController.createPost
  );

//Accessable by admins and the superAdmin
router
  .route('/pending')
  .get(
    auth.auth,
    auth.restrictTo('admin', 'superAdmin'),
    postController.getAllPendingPosts
  );

//Accessable by admins and the superAdmin
router
  .route('/pending/:id')
  .get(
    auth.auth,
    auth.restrictTo('admin', 'superAdmin'),
    postController.getPendingPostById
  )
  .delete(
    auth.auth,
    auth.restrictTo('admin', 'superAdmin'),
    postController.rejectPostById
  );

router
  .route('/:id')
  .delete(
    auth.auth,
    auth.restrictTo('user', 'admin', 'superAdmin'),
    postController.deletePostById
  )
  .get(
    auth.auth,
    auth.restrictTo('user', 'admin', 'superAdmin'),
    postController.getPostById
  );

module.exports = router;

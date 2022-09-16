require('dotenv').config();
const commentController = require('../controllers/comment');
const auth = require('../middlewares/auth');
const express = require('express');

const router = express.Router();

router.use(auth.auth);

router
  .route('/:postId')
  .post(commentController.commentOnPost)
  .get(commentController.getAllCommentsOfPost);

router.route('/:postId/:commentId').delete(commentController.deleteComment);

module.exports = router;

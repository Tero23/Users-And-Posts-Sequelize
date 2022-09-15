require('dotenv').config();
const likeController = require('../controllers/like');
const auth = require('../middlewares/auth');
const express = require('express');

const router = express.Router();

router.route('/:id/like').get(auth.auth, likeController.likePost);
router.route('/:id/disLike').get(auth.auth, likeController.disLikePost);
router
  .route('/:postId/allLikes')
  .get(auth.auth, likeController.getAllLikesOfAPost);

module.exports = router;

require('dotenv').config();
const userController = require('../controllers/user');
const auth = require('../middlewares/auth');
const express = require('express');

const router = express.Router();

router.route('/login').post(userController.login);
router.route('/login/verify').post(userController.verifyLogin);

router.use(auth.auth);

router
  .route('/')
  .post(auth.restrictTo('admin', 'superAdmin'), userController.createUser)
  .get(auth.restrictTo('admin', 'superAdmin'), userController.getUsers);
router
  .route('/me')
  .get(
    auth.restrictTo('user', 'admin', 'superAdmin'),
    userController.getMyProfile
  );
router
  .route('/:id')
  .get(auth.restrictTo('admin', 'superAdmin'), userController.getUser)
  .patch(auth.restrictTo('admin', 'superAdmin'), userController.updateUser)
  .delete(auth.restrictTo('admin', 'superAdmin'), userController.deleteUser);

router.route('/:id/stats').get(userController.getUserStats);

router.get('/me/logout', userController.logout);

module.exports = router;

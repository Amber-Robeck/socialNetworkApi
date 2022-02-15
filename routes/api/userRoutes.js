const router = require('express').Router();
const {
  getUser,
  // getSingleUser,
  // createUser,
  // deleteUser,
  // addFriend,
  // removeFriend,
} = require('../../controllers/userController');

// /api/users endpoint
router.route('/')
  .get(getUser)
// .post(createUser);

// // /api/users/:userId
// router.route('/:userId').get(getSingleUser).delete(deleteUser);

// // /api/users/:userId/friends
// router.route('/:userId/friends').post(addFriend);

// // /api/students/:userId/friends/:friendId
// router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;

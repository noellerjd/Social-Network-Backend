const router = require("express").Router();
// from userController methods
const {
  getUsers,
  getAUser,
  updateUser,
  createUser,
  addFriend,
  removeFriend,
  deleteUser,
} = require("../../controllers/userController");

//  router to get users and create user
router.route("/").get(getUsers).post(createUser);

// user router by id
router.route("/:userId").get(getAUser).put(updateUser).delete(deleteUser);

// routes to add and remove friend
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;

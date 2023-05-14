const router = require("express").Router();

//using object destructuring to import controller functions
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addNewFriend,
  deleteFriend,
} = require("../../controller");

// api/users
//all functions without id
router.route("/").get(getUsers).post(createUser);

//functions need id
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// api/users/userId/friends/:friendId
router
  .route("/:userId/friends/:friendId")
  .post(addNewFriend)
  .delete(deleteFriend);

module.exports = router;

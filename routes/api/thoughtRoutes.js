const router = require("express").Router();
// from userController methods
const {
  getUserThoughts,
  getAUserThought,
  createUserThought,
  updateAUserThought,
  deleteAUserThought,
  addReaction,
  removeReaction,
} = require("../../controllers/userController");

// get all thoughts
router.route("/").get(getUserThoughts).post(createUserThought);

// thoughts by id
router
  .route("/:thoughtId")
  .get(getAUserThought)
  .put(updateAUserThought)
  .delete(deleteAUserThought);

//reactions via ThoughtId
router.route("/:thoughtId/reactions").post(addReaction);
//interaction id and reaction id to delete interaction
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;

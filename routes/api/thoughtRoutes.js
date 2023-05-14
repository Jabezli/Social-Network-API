const router = require("express").Router();

//using object destructuring to import controller functions
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controller/thoughtsController");

// /api/thought
router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction);

// /api/:thoughtId/reaction/:reactionId

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;

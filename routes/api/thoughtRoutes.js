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
} = require("../../controller");

// /api/thought
router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/:thoughtId/reactions
router.route("/api/:thoughtId/reactions").post(createReaction);

// /api/:thoughtId/reaction/:reactionId

router.route("/api/:thoughtId/reaction/:reactionId").delete(deleteReaction);

module.exports = router;

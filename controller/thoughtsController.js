const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");
const { findOne } = require("../models/User");

module.exports = {
  //get all thoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find().select("-__v");
      return res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // get single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      !thought
        ? res.status(404).json({ message: "No thought with this ID" })
        : res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );
      !user
        ? res.status(404).json({
            message: "No user with this ID. Cannot create this thought",
          })
        : res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //update thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      !thought
        ? res.status(404).json({ message: "No thought with this ID" })
        : res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // delete thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      !thought
        ? await res.status(404).json({ message: "No thought with this ID" })
        : await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } }
          );
      return res.json({ message: `Thought has been deleted.` });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //create a reaction
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      !thought
        ? res.status(404).json({ message: "No thought with this ID" })
        : res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //delete a reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true, runValidators: true }
      );
      !thought
        ? res.status(404).json({ message: "No thought with this ID" })
        : res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};

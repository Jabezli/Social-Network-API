const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  //get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().select("-__v");
      //return here is not necessary but to improve readability.
      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      console.log(req.params);
      //populate is to get relevent thoughts for the user. select is to exclude '__v' field from returned data
      const user = await User.findOne({ _id: req.params.userId }).populate({
        path: "thoughts",
        select: "-__v",
      });

      if (!user) {
        return res.status(404).json({ message: "No user with this ID" });
      }

      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //create new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //update an user
  async updateUser(req, res) {
    try {
      //new option returns the updated document instead of the original document. If new is set to true, findOneAndUpdate() will return the updated user document.
      //If new is not set or set to false, it will return the original document before the update was applied.
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this ID" });
      }

      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //delete an user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      !user
        ? res.status(404).json({ message: "No user with this ID" })
        : res.json({ message: "User was deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // let's make A friend!
  async addNewFriend(req, res) {
    try {
      console.log(req.params);
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      !user
        ? res.status(404).json({ message: "No user with this ID" })
        : res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //It happens that people are not longer friends...
  async deleteFriend(req, res) {
    try {
      console.log(req.params);
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      !user
        ? res.status(404).json({ message: "No user with this ID" })
        : res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};

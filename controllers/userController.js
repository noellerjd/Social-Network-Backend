const { User, Thought } = require("../models");

module.exports = {
  // User Controllers
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getAUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Invalid user ID" })
          : res.json(user)
      );
  },
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }).then(
      (user) =>
        !user
          ? res.status(404).json({ message: "Invalid user ID" })
          : res.json(user)
    );
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user_db) => res.json(user_db))
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } }
    )
      .then((user_db) => res.json(user_db))
      .catch((err) => res.status(500).json(err));
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } }
    )
      .then((user_db) => res.json(user_db))
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "There is no user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //  Thought Controllers
  getUserThoughts(req, res) {
    Thought.find()
      .then((Thought) => res.json(Thought))
      .catch((err) => res.status(500).json(err));
  },
  getAUserThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "Invalid Thought ID",
            })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUserThought(req, res) {
    Thought.create(req.body).then((thought) => {
      return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      )
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    });
  },
  updateAUserThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body })
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "Invalid user thought ID",
            })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reaction: req.body } }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Invalid user thought ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  removeReaction(req, res) {
    Thought.deleteOne(
      { _id: req.params.thoughtId },
      { $pull: { reaction: { reactionId: req.params.reactionId } } }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "Invalid user thought ID",
            })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteAUserThought(req, res) {
    Thought.deleteOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "Invalid user thought ID",
            })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};

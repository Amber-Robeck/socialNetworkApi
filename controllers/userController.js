const { User, Thought } = require('../models');


module.exports = {
    // Get all users
    getUser(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // get single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            // .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Could not find a user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    //user create
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Delete User
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then(() => res.json({ message: 'User was deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // Add a friend
    // needs to have a friend key in object or always returns error
    addFriend(req, res) {
        console.log('You are adding a new friend');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friends } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'Could not find a user with that ID!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete friend :(
    removeFriend(req, res) {
        console.log(req.params.friendId)
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { userId: req.params.friendId } } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'Could not find a user with that ID :(' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }
}

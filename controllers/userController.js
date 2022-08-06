const { User, Thought } = require('../models');
const gooseHelper = require('goose-helper');

module.exports = {
    // Get all users
    getUser(req, res) {
        gooseHelper(req, res, User.find());
    },

    // get single user by _id in params
    getSingleUser(req, res) {
        gooseHelper(req, res, User.findOne({ _id: req.params.userId }), 'Could not find user with that ID');
    },

    //user create post in req.body
    createUser(req, res) {
        gooseHelper(req, res, User.create(req.body), 'Could not create user');
    },


    // Delete User
    deleteUser(req, res) {
        // delete the user by id in params
        // gooseHelper(req, res, User.findByIdAndDelete(req.params.userId), 'Could not delete user');
        User.findOneAndDelete({ _id: req.params.userId })
            .then(user => {
                if (!user) {
                    res.status(404).json({ message: 'Could not find a user with that Id!' });
                    return;
                }
                // updates other users to remove this user from the list
                User.updateMany(
                    { _id: { $in: user.friends } },
                    { $pull: { friends: req.params.userId } }
                )//end update many bracket
                    .then(() => {
                        // remove any of this users thoughts by username, only if thought username is correct username
                        Thought.deleteMany({ username: user.username })
                            .then(() => {
                                res.json({ message: "User was deleted!" });
                            })
                            //thought delete many error
                            .catch(err => res.status(500).json(err));
                    })//user update many error
                    .catch(err => res.status(500).json(err));
            })//user find one and delete error
            .catch(err => res.status(500).json(err));
    },


    //update user by _id in params with req.body info
    updateUser(req, res) {
        gooseHelper(req, res, User.findByIdAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true }), 'Could not update user');
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

    // Delete friend :( with current user _id/friends/deletedfriend _id
    removeFriend(req, res) {
        console.log(req.params.friendId)
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
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

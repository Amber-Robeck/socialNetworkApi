const { User, Thought, } = require('../models');
const { getData } = require('./testController');
const gooseHelper = require('goose-helper');

module.exports = {
    // Get all thoughts
    getThought(req, res) {
        gooseHelper(req, res, Thought.find());
    },
    // get single thought
    getSingleThought(req, res) {
        gooseHelper(req, res, Thought.findOne({ _id: req.params.thoughtId }), 'Could not find thought with that ID');
    },
    //Thought create
    createThought(req, res) {
        // let originalData = req._id.valueOf();
        // getData(req, res, Thought.create(req.body), User.findOneAndUpdate(
        //     { _id: req.body.userId },
        //     { $push: { thoughts: originalData } },
        //     { new: true }
        // ));
        // getData(req, res, Thought.create(req.body).then(function (response) {
        //     getData(req, res, User.findOneAndUpdate(
        //         { _id: req.body.userId },
        //         { $addToSet: { thoughts: response._id.valueOf() } },
        //         { runValidators: true, new: true }
        //     ))
        // }))
        // User.findOneAndUpdate(
        //     { _id: req.body.userId },
        //     { $addToSet: { thoughts: response._id.valueOf() } },
        //     { runValidators: true, new: true }
        // )


        // )
        // .then(function (response) {
        //     getData(req, res, User.findOneAndUpdate(
        //         { _id: req.body.userId },
        //         { $addToSet: { thoughts: response._id.valueOf() } },
        //         { runValidators: true, new: true }
        //     ));

        // }
        // )

        Thought.create(req.body)
            .then(function (response) {
                // console.log(response._id.valueOf())
                // console.log(req.body.userId)
                User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: response._id.valueOf() } },
                    { runValidators: true, new: true }
                ).then(() => res.json(response))
            })

            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //update thought through thoughtId in params and set to req.body
    updateThought(req, res) {
        gooseHelper(req, res, Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { new: true }), 'Could not find thought with that ID');
    },


    // Delete thought
    deleteThought(req, res) {
        gooseHelper(req, res, Thought.findOneAndDelete({ _id: req.params.thoughtId }), 'Could not find thought with that ID', 'Your thought has been deleted');
    },
    // Create reaction
    createReaction(req, res) {
        gooseHelper(req, res, Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { new: true }), 'Could not find thought with that ID');
    },
    // Delete reaction
    deleteReaction(req, res) {
        gooseHelper(req, res, Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { _id: req.body.reactionId } } }, { new: true }), 'Could not find thought with that ID', 'Your reaction has been deleted');
    }
}
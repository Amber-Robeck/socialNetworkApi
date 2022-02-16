const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')
const moment = require('moment');

// const dateString = function () {
//     const d = new Date()
//     return d.toDateString()
// }
// console.log(dateString())
// Schema to create user model
const thoughtSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        thoughtText: {
            type: String,
            required: true,
            unique: true,
            max_length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (created) => moment(created).format('LLLL')
            // get: dateString
        },
        reactions: [reactionSchema],

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;

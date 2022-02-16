const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

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
        },
        reactions: [reactionSchema],

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


const Thought = model('thought', thoughtSchema);

module.exports = Thought;

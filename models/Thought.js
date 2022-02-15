const { Schema, model } = require('mongoose');

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
        // reactions: [reactionSchema],

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;

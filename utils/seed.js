const { test } = require('media-typer');
const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Drop existing Users
    await User.deleteMany({});

    //data for users
    //TODO: thoughts and reactions
    const users = [{ username: "test1", email: "test1@test.com" }, { username: "test2", email: "test2@test.com" }, { username: "test3", email: "test3@test.com" }];


    // Add users to the collection and await the results
    await User.collection.insertMany(users);


    // show seeded info
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});
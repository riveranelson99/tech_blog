const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const users = require('./userData');
const posts = require('./postData');
const comments = require('./commentData');


const seedDb = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await User.bulkCreate(users);
    console.error();
    console.log('\n----- USERS SEEDED -----\n');

    await Post.bulkCreate(posts);
    console.log('\n----- POSTS SEEDED -----\n');

    await Comment.bulkCreate(comments);
    console.log('\n----- COMMENTS SEEDED -----\n');

    process.exit(0);
};

seedDb();
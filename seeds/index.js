const comments = require('./commentData');
const posts = require('./postData');
const users = require('./userData');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n')
    await comments();
    console.log('\n----- COMMENTS SEEDED -----\n');
    await posts();
    console.log('\n----- POSTS SEEDED -----\n');
    await users();
    console.log('\n----- USERS SEEDED -----\n');

    process.exit(0);
};

seedAll();
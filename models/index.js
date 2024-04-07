// models/index.js
const path = require('path');
const Sequelize = require('sequelize');

// Get the current directory
const currentDirectory = __dirname;

// Define the path to the database file
const databasePath = path.join(currentDirectory, 'db.sqlite');

// Define the database URL
const url = process.env.DATABASE_URL || `sqlite:${databasePath}`;

const sequelize = new Sequelize('sqlite:db.sqlite');

// Require your models here
const Post = require('./post')(sequelize);
const Attachment = require('./attachment')(sequelize);

Post.hasOne(Attachment, {as: 'attachment', foreignKey: 'attachmentId'});
Attachment.belongsTo(Post, {as: 'post', foreignKey: 'attachmentId'});

module.exports = sequelize
/*module.exports = {
  Sequelize,
  Post,
  Attachment
};
*/
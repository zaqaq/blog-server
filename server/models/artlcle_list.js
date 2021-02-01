const {DataTypes} = require('sequelize')
const db = require('../config/db')

module.exports = db.define("article_lists", {
  tag: DataTypes.STRING(20),
  nav_id: DataTypes.INTEGER,
  img_href: DataTypes.STRING(300),
  title: DataTypes.STRING(50),
  des: DataTypes.STRING(255),
  content: DataTypes.TEXT,
  publish_date: DataTypes.DATE,
  comment_count: DataTypes.INTEGER,
  read_count: DataTypes.INTEGER,
  praise_count: DataTypes.INTEGER,
  details_id: DataTypes.INTEGER
});


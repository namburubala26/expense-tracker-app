const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('node-complete', 'root', '8985@Yash', {
    dialect:'mysql',
    host: 'localhost',
  })

module.exports = sequelize
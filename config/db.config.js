const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todo_db', 'todo_user', 'todo_password', {
    host: 'localhost', // This should match the Kubernetes service name
    dialect: 'postgres',
});

module.exports = sequelize;

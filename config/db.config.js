const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todo_db', 'todo_user', 'secure_password', {
    host: 'postgres', // This should match the Kubernetes service name
    dialect: 'postgres',
});

module.exports = sequelize;

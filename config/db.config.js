const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME || 'todo_db',
    process.env.DB_USER || 'todo_user',
    process.env.DB_PASSWORD || 'todo_password',
    {
        host: process.env.DB_HOST || 'localhost', // This should match the Kubernetes service name
        dialect: 'postgres',
    }
);

module.exports = sequelize;

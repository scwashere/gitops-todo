const express = require('express');
const sequelize = require('./config/db.config');
const todoRoutes = require('./routes/todo.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', todoRoutes);

// Connect to the database and start the server
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => console.error('Database connection failed:', err));

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

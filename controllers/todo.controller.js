const Todo = require('../models/todo.model');

// Create a new todo
exports.createTodo = async (req, res) => {
    try {
        const todo = await Todo.create(req.body);
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all todos
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.findAll();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single todo by ID
exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        todo ? res.json(todo) : res.status(404).json({ error: 'Todo not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a todo
exports.updateTodo = async (req, res) => {
    try {
        const [updated] = await Todo.update(req.body, { where: { id: req.params.id } });
        updated ? res.json({ message: 'Todo updated' }) : res.status(404).json({ error: 'Todo not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
    try {
        const deleted = await Todo.destroy({ where: { id: req.params.id } });
        deleted ? res.json({ message: 'Todo deleted' }) : res.status(404).json({ error: 'Todo not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

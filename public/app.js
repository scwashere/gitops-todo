const apiUrl = '/api/todos';

async function fetchTodos() {
    try {
        const response = await fetch(apiUrl);
        const todos = await response.json();
        displayTodos(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

function displayTodos(todos) {
    const todosContainer = document.getElementById('todos');
    todosContainer.innerHTML = '';
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo-item';
        if (todo.completed) todoDiv.classList.add('completed');
        todoDiv.innerHTML = `
      <strong>${todo.title}</strong>: ${todo.description}
      <button onclick="toggleTodoCompletion(${todo.id}, ${todo.completed})">Toggle Complete</button>
      <button onclick="deleteTodo(${todo.id})">Delete</button>
    `;
        todosContainer.appendChild(todoDiv);
    });
}

async function addTodo() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    if (!title) return alert('Title is required');

    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });
        fetchTodos();
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

async function toggleTodoCompletion(id, completed) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !completed })
        });
        fetchTodos();
    } catch (error) {
        console.error('Error toggling todo completion:', error);
    }
}

async function deleteTodo(id) {
    try {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        fetchTodos();
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
}

// Fetch todos when the page loads
window.onload = fetchTodos;

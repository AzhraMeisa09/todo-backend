const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let todos = [];

app.get('/api/todos', (req, res) => {
  res.json({
    status: 'success',
    message: 'Data retrieved successfully',
    data: todos
  });
});

app.post('/api/todos', (req, res) => {
  const { title, description, dueDate } = req.body;
  if (!title || !dueDate) {
    return res.status(400).json({
      status: 'error',
      message: 'Title and dueDate are required',
      data: null
    });
  }
  const newTodo = {
    id: todos.length + 1,
    title,
    description: description || '',
    completed: false,
    dueDate,
    createdAt: new Date().toISOString()
  };
  todos.push(newTodo);
  res.json({
    status: 'success',
    message: 'To-do created successfully',
    data: newTodo
  });
});

app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({
      status: 'error',
      message: 'To-do with the given ID not found',
      data: null
    });
  }
  res.json({
    status: 'success',
    message: 'Data retrieved successfully',
    data: todo
  });
});

app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({
      status: 'error',
      message: 'To-do with the given ID not found',
      data: null
    });
  }
  todo.title = req.body.title || todo.title;
  todo.description = req.body.description || todo.description;
  todo.dueDate = req.body.dueDate || todo.dueDate;
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
  res.json({
    status: 'success',
    message: 'To-do updated successfully',
    data: todo
  });
});

app.delete('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({
      status: 'error',
      message: 'To-do with the given ID not found',
      data: null
    });
  }
  const deletedTodo = todos.splice(index, 1)[0];
  res.json({
    status: 'success',
    message: 'To-do deleted successfully',
    data: deletedTodo
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 

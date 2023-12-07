const express = require('express');
const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));

let todoList = [
    { "id": "1", "task": "description" },
    { "id": "2", "task": "description2" }
];

function getTaskById(id) {
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id === id) {
            return todoList[i].task;
        }
    }
    return "Task not found";
}

app.get('/', (req, res) => {
    res.end("Welcome to the todolist!");
});

app.get('/getTodo/:id', (req, res) => {
    const id = req.params.id;
    const finalTask = getTaskById(id);
    return res.end(finalTask);
});

app.get('/getTodo', (req, res) => {
    return res.json(todoList);
});

app.post('/createTodo', (req, res) => {
    const { task } = req.body;
    const newTask = {
        id: String(todoList.length + 1), // Convert ID to string for consistency
        task: task
    };
    todoList.push(newTask);
    res.status(201).end(`New task has been created: ${task}`);
});

app.delete('/deleteTodo/:id', (req, res) => {
    const id = req.params.id;
    const taskToDelete = getTaskById(id); // Fetch the task by ID
    const indexToDelete = todoList.findIndex(item => item.id === id); // Find the index

    if (indexToDelete !== -1) {
        todoList.splice(indexToDelete, 1);
        res.end(`Your task has been deleted: ${taskToDelete}`);
    } else {
        res.status(404).end(`Task with ID ${id} not found.`);
    }
});

app.listen(port, () => {
    console.log(`The server is up and running on port ${port}!`);
});

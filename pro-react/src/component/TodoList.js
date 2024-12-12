import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
    const [tasks, setTasks] = useState(() => {
        // Initialize tasks from localStorage or as an empty array
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [task, setTask] = useState('');
    const [editIndex, setEditIndex] = useState(null); // For tracking the task being edited
    const [showCompleted, setShowCompleted] = useState(false);

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Function to add a new task or edit an existing one
    const addOrEditTask = () => {
        if (task) {
            if (editIndex !== null) {
                // Edit existing task
                const updatedTasks = tasks.map((t, index) =>
                    index === editIndex ? { ...t, text: task } : t
                );
                setTasks(updatedTasks);
                setEditIndex(null); // Reset edit index
            } else {
                // Add new task
                setTasks([...tasks, { text: task, done: false }]);
            }
            setTask(''); // Clear input field
        }
    };

    // Function to toggle task completion
    const toggleTask = (index) => {
        const newTasks = [...tasks];
        newTasks[index].done = !newTasks[index].done;
        setTasks(newTasks);
    };

    // Function to remove a task
    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    // Function to start editing a task
    const startEditing = (index) => {
        setTask(tasks[index].text);
        setEditIndex(index);
    };

    // Function to toggle visibility of completed tasks
    const toggleShowCompleted = () => {
        setShowCompleted(!showCompleted);
    };

    return (
        <div className="todo-container">
            <h1>Adam's To Do List ({tasks.length} Items to do)</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="task-input"
                />
                <button onClick={addOrEditTask} className="add-button">
                    {editIndex !== null ? 'Update' : 'Add'}
                </button>
            </div>
            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={index} className={`task-item ${task.done ? 'completed' : ''}`}>
                        <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => toggleTask(index)}
                            className="checkbox"
                        />
                        <span className="task-text">{task.text}</span>
                        <button onClick={() => startEditing(index)} className="edit-button">Edit</button>
                        <button onClick={() => deleteTask(index)} className="delete-button">Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={toggleShowCompleted} className="toggle-button">
                {showCompleted ? 'Hide' : 'Show'} Completed Tasks
            </button>
            {showCompleted && (
                <div className="completed-tasks">
                    <h2>Completed Tasks:</h2>
                    <ul className="completed-list">
                        {tasks.filter(task => task.done).map((task, index) => (
                            <li key={index} className="completed-item">
                                <span>{task.text}</span>
                                <span><input type="checkbox" checked readOnly /></span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TodoList;
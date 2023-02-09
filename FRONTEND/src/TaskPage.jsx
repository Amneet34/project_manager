import React, { useState, useEffect } from "react";

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ name: "", priority_level: "", user_id: "", project_id: "" });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await fetch("http://localhost:3000/tasks");
        const tasks = await response.json();
        setTasks(tasks);
    };

    const handleTaskCreate = async () => {
        await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        });

        setNewTask({ name: "", priority_level: "", user_id: "", project_id: "" });
        fetchTasks();
    };

    const handleTaskUpdate = async (task) => {
        await fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: task.name,
                priority_level: task.priority_level,
                user_id: task.user_id,
                project_id: task.project_id,
            }),
        });

        fetchTasks();
    };

    const handleTaskDelete = async (task) => {
        await fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: "DELETE",
        });

        fetchTasks();
    };

    return (
        <div>
            <h1>Task List</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.name} - Priority: {task.priority_level} - User ID: {task.user_id} - Project ID: {task.project_id}
                        <button onClick={() => handleTaskDelete(task)}>Delete</button>
                        <button onClick={() => handleTaskUpdate(task)}>Update</button>
                    </li>
                ))}
            </ul>
            <h2>Create Task</h2>
            <input
                type="text"
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            />
            <input
                type="number"
                value={newTask.priority_level}
                onChange={(e) =>
                    setNewTask({ ...newTask, priority_level: e.target.value })
                }
            />
            <input
                type="text"
                value={newTask.user_id}
                onChange={(e) =>
                    setNewTask({ ...newTask, user_id: e.target.value })
                }
            />


        </div>
    );
};

export default TaskPage;



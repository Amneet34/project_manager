import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TaskPage() {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [completed, setCompleted] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        priority_level: ""
    });


    useEffect(() => {
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error(error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (selectedTask.id) {
            updateTask();
        } else {
            createTask();
        }
    };

    const handleComplete = (task) => {
        setCompleted(!completed);
        fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                completed: !task.completed
            }),
        })
            .then(response => response.json())
            .then(data => {
                setTasks(tasks.map(t => t.id === data.id ? data : t));
            })
            .catch(error => console.error(error));
    };

    const createTask = () => {
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                description,
                priority_level: priority,
            }),
        })
            .then(response => response.json())
            .then(data => {
                setTasks([...tasks, data]);
                setName('');
                setDescription('');
                setPriority('');
            })
            .catch(error => console.error(error));
    };

    const updateTask = () => {
        fetch(`http://localhost:3000/tasks/${selectedTask.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                description,
                priority_level: priority,
            }),
        })
            .then(response => response.json())
            .then(data => {
                setTasks(tasks.map(task => task.id === data.id ? data : task));
                setName('');
                setDescription('');
                setPriority('');
                setSelectedTask({});
            })
            .catch(error => console.error(error));
    };

    const handleDelete = (task) => {
        fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    setTasks(tasks.filter(t => t.id !== task.id));
                }
            })
            .catch(error => console.error(error));
    };

    const handleEdit = (task) => {
        setName(task.name);
        setDescription(task.description);
        setPriority(task.priority_level);
        setSelectedTask(task);
    };
    const logout = () => {
        navigate('/')
    }

    function getPriorityColor(priority) {
  switch (priority) {
    case "Low":
      return "blue";
    case "Medium":
      return "orange";
    case "High":
      return "red";
    default:
      return "black";
  }
}


    return (
        <div>
            <nav>
                <ul>
                    <li><button onClick={() => navigate('/project')}>Projects</button></li>
                    <li><button onClick={() => navigate('/task')}>Task</button></li>
                    <li><button onClick={() => navigate('/request')}>Request</button></li>
                    <li><button onClick={logout}>Logout</button></li>
                </ul>
            </nav>
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Task Name"
                />
                <textarea
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Task Description"
                />
                    <select
                        name="priority"
                        value={priority}
                        onChange={e => setPriority(e.target.value)}
                    >
                        <option value="">Select Priority Level</option>
                        <option value="Low" style={{ color: getPriorityColor("Low") }}>
                            Low
                        </option>
                        <option value="Medium" style={{ color: getPriorityColor("Medium") }}>
                            Medium
                        </option>
                        <option value="High" style={{ color: getPriorityColor("High") }}>
                            High
                        </option>
                    </select>

                <button type="submit">Submit</button>
            </form>
            {tasks.map(task => (
                <div key={task.id}>
                    <p style={{ color: getPriorityColor(task.priority_level) }}>
                        Name: {task.name} | Description: {task.description} | Priority: {task.priority_level}
                    </p>
                    <button className="task-btn" onClick={() => handleDelete(task)}>Delete</button>
                    <button className="task-btn" onClick={() => handleComplete(task)}>
                        {task.completed ? <p style={{ color: 'green' }}>Completed</p> : 'Mark Complete'}
                    </button>
                </div>
            ))}
        </div>
    </div>
    );


}
export default TaskPage;



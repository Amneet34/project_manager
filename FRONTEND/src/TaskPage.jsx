import React, { useState, useEffect } from 'react';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3000/tasks');
            const data = await response.json();
            setTasks(data);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Tasks</h1>
            {tasks.map(task => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    );
};


export default TaskPage;
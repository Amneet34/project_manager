import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectPage = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        name: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        fetch('http://127.0.0.1:3000/projects')
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.log(err));
    }, []);

    const handleChange = event => {
        setNewProject({ ...newProject, [event.target.name]: event.target.value });
    };

    const handleImageChange = event => {
        setNewProject({ ...newProject, image: event.target.files[0] });
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', newProject.name);
        formData.append('description', newProject.description);
        formData.append('image', newProject.image);

        try {
            const res = await fetch('http://127.0.0.1:3000/projects', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            setProjects([...projects, data]);
            setNewProject({ name: '', description: '', image: '' });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <h1>Project List</h1>
            <ul>
                {projects.map(project => (
                    <li key={project.id}>
                        <h2>{project.name}</h2>
                        <p>{project.description}</p>
                        <img src={project.image_url} alt={project.name} />
                    </li>
                ))}
            </ul>
            <h2>Add a new project</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={newProject.name} onChange={handleChange} />
                <br />
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={newProject.description} onChange={handleChange} />
                <br />
                <label htmlFor="image">Image:</label>
                <input type="file" id="image" name="image" onChange={handleImageChange} />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ProjectPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectPage = () => {
    const navigate = useNavigate()
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        name: '',
        description: '',
        image: ''
    });
    const [formOpen, setFormOpen] = useState(false);

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
            setFormOpen(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <button onClick={() => navigate('/')}>Signout</button>
            <div>
                <button onClick={() => navigate('/task')}>Task</button>
                <button onClick={() => setFormOpen(!formOpen)}>Create Project</button>

            </div>
            {formOpen && (
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
            )}
            <h1>Project List</h1>
            <div>
                <ul>
                    {projects.map(project => (
                        <li key={project.id} onClick={() => setSelectedProject(project.id)}>
                            <h2>{project.name}</h2>
                            {selectedProject === project.id && (
                                <>
                                    <p>{project.description}</p>
                                    <img src={project.image_url} alt={project.name} />
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            
        </div>
    );
};

export default ProjectPage;

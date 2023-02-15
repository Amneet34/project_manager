import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const ProjectPage = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
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

    const logout = () => {
        Cookies.remove('token')
        setUser(null)
        navigate('/')
    }

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
                body: formData,
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });
            const data = await res.json();
            console.log(data)
            setProjects([...projects, data]);
            setNewProject({ name: '', description: '', image: '' });
            setFormOpen(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (projectId) => {
        try {
            await fetch(`http://127.0.0.1:3000/projects/${projectId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });
            setProjects(projects.filter(project => project.id !== projectId));
            setSelectedProject(null);
        } catch (err) {
            console.log(err);
        }
    };

    

    return (
        <div>
            <nav>
                <ul>
                    <button onClick={() => setFormOpen(!formOpen)}>Create Project</button>
                    <li><button onClick={() => navigate('/task')}>Task</button></li>
                    <li><button onClick={() => navigate('/request')}>Request</button></li>
                    <li><button onClick={logout}>Logout</button></li>
                </ul>
            </nav>
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
          
                <div className="project-container">
                <div className="project-list">
                    <ul>
                        {projects.map(project => (
                            <li
                            key={project.id}
                            className={selectedProject === project.id ? 'selected' : ''}
                            onClick={() => setSelectedProject(project.id)}
                            >
                                <h2>{project.name}</h2>
                            <button onClick={() => handleDelete(project.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="project-details">
                    {selectedProject && (
                        <>
                            <h2>{projects.find(project => project.id === selectedProject).name}</h2>
                            <p>{projects.find(project => project.id === selectedProject).description}</p>
                            <img src={`http://localhost:3000/${projects.find(project => project.id === selectedProject).image}`} alt={projects.find(project => project.id === selectedProject).name} />
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ProjectPage;

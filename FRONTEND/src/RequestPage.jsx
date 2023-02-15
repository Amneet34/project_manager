import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RequestPage = () => {
    const navigate = useNavigate()
    const [requests, setRequests] = useState([]);
    const [newRequest, setNewRequest] = useState({ name: '', content: '', accepted: false });

    useEffect(() => {
        fetch('http://localhost:3000/requests')
            .then(res => res.json())
            .then(data => setRequests(data));
    }, []);

    const handleSubmit = async event => {
        event.preventDefault();
        const res = await fetch('http://localhost:3000/requests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRequest)
        });
        const request = await res.json();
        setRequests([...requests, request]);
        setNewRequest({ name: '', content: '', accepted: false });
    };

    const handleAccept = async id => {
        const requestIndex = requests.findIndex(r => r.id === id);
        const request = requests[requestIndex];
        const res = await fetch(`http://localhost:3000/requests/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...request, accepted: true })
        });
        const updatedRequest = await res.json();
        setRequests([
            ...requests.slice(0, requestIndex),
            updatedRequest,
            ...requests.slice(requestIndex + 1)
        ]);
    };
    const logout = () => {
        navigate('/')
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
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newRequest.name}
                    onChange={event => setNewRequest({ ...newRequest, name: event.target.value })}
                />
                <input
                    type="text"
                    placeholder="Request"
                    value={newRequest.content}
                    onChange={event => setNewRequest({ ...newRequest, content: event.target.value })}
                />
                <button type="submit">Create Request</button>
            </form>
            <h2>Requests</h2>
            <div>
            <ul>
                {requests.map(request => (
                    <li key={request.id}>
                        <p>
                        Name: {request.name}{' '} | Request: {request.content}{' '} 
                        </p>
                        {request.accepted ? (
                            <span style={{ color: "green" }}>Request Accepted</span>
                        ) : (
                            <button onClick={() => handleAccept(request.id)}>Accept</button>
                        )}
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default RequestPage;
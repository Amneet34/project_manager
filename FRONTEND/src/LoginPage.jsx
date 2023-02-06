import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response = await fetch('http://localhost:3000/users');
            let users = await response.json();
            let match = users.find(user => user.username === username);
            if (match) {
                if (match) {
                    navigate('/project');
                } else {
                    setError('Invalid username or password');
                }
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            setError(err);
            console.log("No Such Route");
        }
    }


    return (
        <div className="login-box">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="user-box">
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                    <label>Username</label>
                </div>
                <div className="user-box">
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <label>Password</label>
                </div >
                <button style={{ background: 'none', border: 'none', padding: '30px' }} type="submit">
                    <a>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        login
                    </a></button>
                <button style={{ background: 'none', border: 'none' }} type="submit" onClick={() => navigate('/Signup')}>
                    <a >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Signup
                    </a>
                </button>
                {error && <p style={{ color: 'red' }}>{error.toString()}</p>}
            </form>
        </div>
    );
}

export default LoginPage;

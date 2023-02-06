import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newUser, setNewUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const request = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    username: newUser,
                    password: password
                }),
            });
            if (!request.ok) {
                const error = await request.json();
                setError(error.error);
            } else {
                navigate("/");
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <div className="login-box">
                <form onSubmit={handleSubmit}>
                    <h2>SignUp</h2>
                    <div className="user-box">
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <label>Email</label>
                    </div>
                    <div className="user-box">
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                        <label>Name</label>
                    </div>
                    <div className="user-box">
                        <input type="text" value={newUser} onChange={e => setNewUser(e.target.value)} required />
                        <label>Username</label>
                    </div >
                    <div className="user-box">
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                        <label>Password</label>
                    </div >
                    <button style={{ background: 'none', border: 'none' }} type="submit">
                        <a >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Create Account
                        </a>
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </div>

    );
}

export default SignupPage;
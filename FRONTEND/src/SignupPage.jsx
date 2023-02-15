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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="login-box">
                <form onSubmit={handleSubmit}>
                    <h2>SignUp</h2>
                    <div className="user-box">
                        <label>Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="user-box">
                        <label>Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                    <div className="user-box">
                        <label>Username</label>
                        <input type="text" value={newUser} onChange={e => setNewUser(e.target.value)} required />
                    </div >
                    <div className="user-box">
                        <label>Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div >
                    <button type="submit">Create Account</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </div>
    );

}

export default SignupPage;
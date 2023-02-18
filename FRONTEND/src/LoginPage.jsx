import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Profile({ user }) {
    return (
        <>
            <h3>{user.username}</h3>
        </>
    );
}

function LoginPage() {
    const [user, setUser] = useState(null);
    const form = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            let req = await fetch("http://127.0.0.1:3000/me", {
                headers: { 'Authorization': Cookies.get('token') }
            })
            let res = await req.json()
            if (res.user) setUser(res.user)
        }
        if (Cookies.get('token'))
            loadUser()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData(form.current)
        let req = await fetch("http://127.0.0.1:3000/login", {
            method: "POST",
            body: formData
        }
        )
        let res = await req.json()
        Cookies.set('token', res.token)
        setUser(res.user)
    }

    useEffect(() => {
        if (user) {
            navigate('/project')
        }
    }, [user])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <form onSubmit={handleSubmit} ref={form} style={{ width: '400px', padding: '20px' }}>
                <h3>Construction Management </h3>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" required />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" required />
            <br />
            <button type="submit">Log in</button>
            <button onClick={() => navigate('/signup')}>Signup</button>
        </form>
  { user && <Profile user={user} /> }
  </div>
);


}
export default LoginPage;





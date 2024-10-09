import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('user')) || [];
        setUsers(storedUsers);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            setSuccess("Login successful!");
            setError("");
            console.log('Login successful:', user);
            navigate('/products');
        } else {
            setError("Invalid email or password. Please try again.");
            setSuccess("");
            console.log('Login failed');
            alert(error)
        }
    };

    return (
        <div className="container">
            <div className="form">
                <header>Login</header>
                <form onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Enter your password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <a onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Forgot password?</a>
                    <input type="submit" className="button" value="Login" />
                </form>
                {error && <div className="error-message" style={{ textAlign: 'center'}}>{error}</div>}
                {success && <div className="success-message" style={{ textAlign: 'center'}}>{success}</div>} {/* Show success message */}
                <div className="signup">
                    <span className="signup">Don't have an account?
                        <label onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Signup</label>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
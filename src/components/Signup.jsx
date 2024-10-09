import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("user")) || [];
        setUsers(storedUsers);
    }, []);

    const handleData = (e) => {
        e.preventDefault();

        console.log(email);
        console.log(password);

        const newUsers = [...users, { email, password }];
        setUsers(newUsers);

        localStorage.setItem("user", JSON.stringify(newUsers));

        navigate('/login');

        setEmail("");
        setPassword("");
    }

    return (
        <div className="container">
            <div className="form">
                <header>Signup</header>
                <form onSubmit={handleData}>
                    <input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="text" 
                        placeholder="Enter your email"  
                        required
                    />
                    <input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" 
                        placeholder="Create a password"  
                        required
                    />
                    <input 
                        type="submit" 
                        className="button" 
                        value="Signup" 
                    />
                </form>
                <div className="signup">
                    <span className="signup">Already have an account?
                        <label onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Login</label>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Signup;

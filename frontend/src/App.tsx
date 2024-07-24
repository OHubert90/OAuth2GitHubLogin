import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    id: string;
    username: string;
    email: string;
}

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/user');
                if (response.data) {
                    setUser(response.data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            setUser(null);
            window.location.href = '/';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleLogin = () => {
        window.location.href = '/oauth2/authorization/github';
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {user ? (
                <>
                    <h1>Welcome, {user.username}</h1>
                    <p>Email: {user.email}</p>
                    <button onClick={handleLogout} style={{ fontSize: '16px', padding: '10px 20px', cursor: 'pointer' }}>
                        Logout
                    </button>
                </>
            ) : (
                <button onClick={handleLogin} style={{ fontSize: '16px', padding: '10px 20px', cursor: 'pointer' }}>
                    Login with GitHub
                </button>
            )}
        </div>
    );
};

export default App;

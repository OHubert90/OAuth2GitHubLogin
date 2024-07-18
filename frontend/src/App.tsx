import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GitHubLoginButton from './GitHubLoginButton';

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
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div>
            {user ? (
                <>
                    <h1>Welcome, {user.username}</h1>
                    <p>Email: {user.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <GitHubLoginButton />
            )}
        </div>
    );
};

export default App;

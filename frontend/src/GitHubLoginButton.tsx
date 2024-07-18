import React from 'react';

const GitHubLoginButton: React.FC = () => {
    const handleLogin = () => {
        window.location.href = '/oauth2/authorization/github';
    };

    return (
        <button onClick={handleLogin}>
            Login with GitHub
        </button>
    );
};

export default GitHubLoginButton;

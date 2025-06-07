// src/components/LogoutButton.jsx
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <p
            onClick={handleLogout}
            className="danger"
            style={{ cursor: 'pointer' }}
        >
            Log out
        </p>
    );
}

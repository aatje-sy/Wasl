import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebase";
import UserIcon from '/src/assets/user-icon.svg';
import quotesData from '/src/data/quotes.json';
import LogoutButton from './LogoutButton';

const UpperNav = () => {
    const [quote, setQuote] = useState('');
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Load random quote
        const randomIndex = Math.floor(Math.random() * quotesData.quotes.length);
        const randomQuote = quotesData.quotes[randomIndex];
        setQuote(`${randomQuote.quote} — ${randomQuote.author}`);
    }, []);

    useEffect(() => {
        // Check if user is logged in
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe(); // Clean up listener
    }, []);

    return (
        <header className="upper-nav-container">
            <div className="upper-nav-left">Wasl</div>
            <div className="upper-nav-center">{quote}</div>
            <div className="upper-nav-right">
                <img
                    src={UserIcon}
                    alt="Profile"
                    onClick={() => setOpen(!open)}
                    style={{ cursor: 'pointer' }}
                />
                {open && (
                    <div className="dropdown-menu">
                        {isLoggedIn ? (
                            <>
                                <Link to="/profile">
                                    <p>Profile</p>
                                </Link>
                                <p>Settings</p>
                                <LogoutButton />
                            </>
                        ) : (
                            <Link to="/login">
                                <p>Login</p>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default UpperNav;
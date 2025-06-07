import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserIcon from '/src/assets/user-icon.svg';
import quotesData from '/src/data/quotes.json';
import LogoutButton from './LogoutButton';

const UpperNav = () => {
    const [quote, setQuote] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * quotesData.quotes.length);
        const randomQuote = quotesData.quotes[randomIndex];
        setQuote(`${randomQuote.quote} — ${randomQuote.author}`);
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
                />
                {open && (
                    <div className="dropdown-menu">
                        <Link to="/profile">
                            <p>Profile</p>
                        </Link>
                        <p>Settings</p>
                        <LogoutButton />
                    </div>
                )}
            </div>
        </header>
    );
};

export default UpperNav;

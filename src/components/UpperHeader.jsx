import UserIcon from '/src/assets/user-icon.svg'
import {useEffect, useState} from "react";

const UpperNav = () => {
    const [quote, setQuote] = useState("");
    useEffect(() => {
        fetch("https://api.quotable.io/random")
            .then(res => res.json())
            .then(data => setQuote(`${data.content} — ${data.author}`))
            .catch(() => setQuote("Stay consistent. Small steps lead to big results."));
    }, []);
    return (
        <header className="upper-nav-container">
            <div className="upper-nav-left">Wasl</div>
            <div className="upper-nav-center">{quote}</div>
            <div className="upper-nav-right">
                <img src={UserIcon} alt="Profile"/>
            </div>
        </header>
    );
};

export default UpperNav;
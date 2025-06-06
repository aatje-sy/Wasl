import UserIcon from '/src/assets/user-icon.svg'
import quotesData from '/src/data/quotes.json'
import {useEffect, useState} from "react";


const UpperNav = () => {
    const [quote, setQuote] = useState("");
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
                <img src={UserIcon} alt="Profile"/>
            </div>
        </header>
    );
};

export default UpperNav;
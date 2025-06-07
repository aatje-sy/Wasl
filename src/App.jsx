import { Routes, Route } from "react-router-dom";
import UpperHeader from './components/UpperHeader.jsx';
import SideHeader from './components/SideHeader.jsx';
import Feed from './components/Feed.jsx';
import Goals from "./components/Goals.jsx";
import Register from "./components/auth/Register.jsx";
import Login from "./components/auth/Login.jsx";
import Profile from "/src/components/ProfilePage.jsx";
import './styling/styling.css';

function App() {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={
                <>
                    <UpperHeader />
                    <main>
                        <SideHeader />
                        <Feed />
                        <Goals />
                    </main>
                </>
            } />
        </Routes>
    );
}

export default App;

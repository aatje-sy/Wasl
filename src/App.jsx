import { Routes, Route } from "react-router-dom";
import UpperHeader from './components/UpperHeader.jsx';
import SideHeader from './components/SideHeader.jsx';
import Feed from './components/Feed.jsx';
import Goals from "./components/Goals.jsx";
import Register from "./components/auth/Register.jsx";
import Login from "./components/auth/Login.jsx"; // ← deze was je vergeten
import './styling/styling.css';

function App() {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
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

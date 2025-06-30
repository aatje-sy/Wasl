import { Routes, Route } from "react-router-dom";
import Feed from './components/Feed.jsx';
import Goals from "./components/Goals.jsx";
import Register from "./components/auth/Register.jsx";
import Login from "./components/auth/Login.jsx";
import Profile from "/src/components/ProfilePage.jsx";
import OtherUserProfilePage from "./components/OtherUserProfilePage.jsx";
import MainLayout from "./components/MainLayout";
import HabitTracker from "./components/HabitTracker.jsx";
import './styling/styling.css';

function App() {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route element={<MainLayout />}>
                <Route path="/" element={
                    <>
                        <Feed />
                        <Goals />
                    </>
                } />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:uid" element={<OtherUserProfilePage />} />
                <Route path="/habits" element={<HabitTracker />} />
            </Route>
        </Routes>
    );
}

export default App;

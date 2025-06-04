//import { db } from './firebase';
//import { Routes, Route } from "react-router-dom";
import UpperHeader from './components/UpperHeader.jsx';
import SideHeader from './components/SideHeader.jsx';
import Feed from './components/Feed.jsx'
import Goals from "./components/Goals.jsx";
import './styling/styling.css'
//import image from '../public/assets/profile-photo.png';

function App() {
    return (
        <>
            <UpperHeader />
            <main>
                <SideHeader />
                <Feed />
                <Goals />
            </main>
        </>
    )
}

export default App;
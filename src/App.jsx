//import { db } from './firebase';
//import { Routes, Route } from "react-router-dom";
import UpperHeader from './components/UpperHeader.jsx';
import SideHeader from './components/SideHeader.jsx';
import Feed from './components/Feed.jsx'
import './styling/styling.css'

function App() {
    return (
        <>
            <UpperHeader />
            <SideHeader />
            <Feed />
        </>
    )
}

export default App;
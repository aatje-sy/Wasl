//import { db } from './firebase';
//import { Routes, Route } from "react-router-dom";
import './styling/styling.css'

function app() {
    return (
        <>
            <header>
                <h1>Wasl</h1>
                <div className="quotes-container">
                    <p>Here will come a quote</p>
                </div>
                <div className={"Profile-icon x"}></div>
            </header>
            <main>
                <div className={"Nav-bar"}>
                    <nav>
                        <div className="x"></div>
                        <div className="x"></div>
                        <div className="x"></div>
                    </nav>
                </div>
                <div className={"Posts-container"}>
                    <section className={"container"}>

                    </section>
                </div>
                <div className="Contents-container">
                    <div className="Content-bar">

                    </div>
                    <div className="Content-bar">

                    </div>
                </div>
            </main>
        </>
    )
}

export default app;
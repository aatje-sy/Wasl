import React, {useState} from "react";
import HabitModal from './HabitModal.jsx';

function HabitTracker() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="habit-page">
            <div className="goals-header">
                <h1>Today’s Goals 🎯</h1>
            </div>
            <hr/>
            <div className="date-and-action">
                <h3 className="goals-date">30 June</h3>
                <button
                    className="post-btn"
                    onClick={() => setShowModal(true)}
                >
                    New Task
                </button>
            </div>
            {showModal && <HabitModal onClose={() => setShowModal(false)} />}

            <div className="container habits-container">
                <h3>Habits</h3>
                <div className="habits-list-container">
                    <ul className="habit-list">
                        <li className="habit-item done">
                            <div className="checkbox-name-contaienr">
                                <input type="checkbox"/>
                                <span className="habit-name">Reading</span>
                            </div>
                            <span className="habit-count">5 🔥</span>
                        </li>
                        <li className="habit-item">
                            <div className="checkbox-name-contaienr">
                                <input type="checkbox"/>
                                <span className="habit-name">Reading</span>
                            </div>
                            <span className="habit-count">5 🔥</span>
                        </li>
                        <li className="habit-item">
                            <div className="checkbox-name-contaienr">
                                <input type="checkbox"/>
                                <span className="habit-name">Reading</span>
                            </div>
                            <span className="habit-count">5 🔥</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HabitTracker;
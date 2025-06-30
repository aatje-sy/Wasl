import React, {useEffect, useState} from "react";
import {doc, addDoc, collection, getDocs, serverTimestamp, updateDoc} from "firebase/firestore";
import HabitModal from "./HabitModal.jsx";
import {db} from "../firebase";
import {getAuth} from "firebase/auth";


function HabitTracker() {
    const [showModal, setShowModal] = useState(false);
    const [habits, setHabits] = useState([]);

    async function addHabit(habitName) {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user || !habitName.trim()) return;

        try {
            await addDoc(collection(db, "users", user.uid, "habits"), {
                name: habitName,
                done: false,
                createdAt: serverTimestamp(),
            });
            console.log("Habit saved in Firebase")
        } catch (err) {
            console.error("Error saving habit:", err);
        }
    }

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) return;

            const snapshot = await getDocs(collection(db, "users", user.uid, "habits"));
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setHabits(data);
        });

        return () => unsubscribe(); // opruimen
    }, []);

    async function handleToggle(habitId, currentDone) {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const habitRef = doc(db, "users", user.uid, "habits", habitId);
        await updateDoc(habitRef, {done: !currentDone})

        setHabits(prevState =>
            prevState.map(h =>
                h.id === habitId ? {...h, done: !currentDone} : h
            )
        );

    }

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
            {showModal && (
                <HabitModal
                    onClose={() => setShowModal(false)}
                    onSubmit={(addHabit)}
                />
            )}

            <div className="container habits-container">
                <h3>Habits</h3>
                <div className="habits-list-container">
                    <ul className="habit-list">
                        {habits.map((habit) => (
                            <li key={habit.id} className={`habit-item ${habit.done ? "done" : ""}`}>
                                <div className="checkbox-name-contaienr">
                                    <input
                                        type="checkbox"
                                        checked={habit.done}
                                        onChange={() => handleToggle(habit.id, habit.done)}
                                    />
                                    <span className="habit-name">{habit.name}</span>
                                </div>
                                <span className="habit-count">🔥</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HabitTracker;
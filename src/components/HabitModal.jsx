import SubmitIcon from "/src/assets/submit-icon.svg"
import React, {use, useState} from "react";

export default function HabitModal({onClose, onSubmit}) {
    const [inputValue, setInputValue] = useState("");

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="habit-modal" onClick={(e) => e.stopPropagation()}>
                <form
                    className="habit-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!inputValue.trim()) return;
                        onSubmit(inputValue);
                        setInputValue("");
                        onClose();
                    }}
                >
                    <input className="add-habit-input"
                           type="text"
                           placeholder="New habit..."
                           value={inputValue}
                           onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button className="habit-submit-btn"><img src={SubmitIcon} alt=""/></button>
                </form>
            </div>
        </div>
    );
}
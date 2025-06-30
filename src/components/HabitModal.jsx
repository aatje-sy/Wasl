import SubmitIcon from "/src/assets/submit-icon.svg"

export default function HabitModal({onClose}) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="habit-modal" onClick={(e) => e.stopPropagation()}>
                <form className="habit-form" action="">
                    <input className="add-habit-input" type="text" placeholder="New habit..."/>
                    <button className="habit-submit-btn"><img src={SubmitIcon} alt=""/></button>
                </form>
            </div>
        </div>
    );
}
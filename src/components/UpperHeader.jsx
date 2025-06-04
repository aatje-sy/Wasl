import UserIcon from '/src/assets/user-icon.svg'

const UpperHeader = () => {
    return (
        <header className="upper-header">
            <h1>Wasl</h1>
            <div className="quotes-container">
                <p>Here will come a quote</p>
            </div>
            <div className="profile-icon">
                <img src={UserIcon} alt="User icon"/>
            </div>
        </header>
    );
}

export default UpperHeader;
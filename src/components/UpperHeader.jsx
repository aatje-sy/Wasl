import UserIcon from '/src/assets/user-icon.svg'

const UpperNav = () => {
    return (
        <header className="upper-nav-container">
            <div className="upper-nav-left">Wasl</div>
            <div className="upper-nav-center">Vandaag is een nieuwe kans.</div>
            <div className="upper-nav-right">
                <img src={UserIcon} alt="Profile" />
            </div>
        </header>
    );
};

export default UpperNav;
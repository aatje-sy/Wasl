import HomeIcon from '/src/assets/home-icon.svg'
import GoalIcon from '/src/assets/goal-icon.svg'
import SearchIcon from '/src/assets/search-icon.svg'


function SideHeader() {
    return (
        <>
            <nav className="side-nav-container">
                <div className="side-nav">
                    <div className="side-nav-icon-container">
                        <img src={HomeIcon} alt=""/>
                    </div>
                    <div className="side-nav-icon-container">
                        <img src={GoalIcon} alt=""/>
                    </div>
                    <div className="side-nav-icon-container">
                        <img src={SearchIcon} alt=""/>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default SideHeader;
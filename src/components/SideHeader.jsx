import { useState } from 'react';
import HomeIcon from '/src/assets/home-icon.svg';
import GoalIcon from '/src/assets/goal-icon.svg';
import SearchIcon from '/src/assets/search-icon.svg';
import AddPostIcon from '/src/assets/addPost.svg';
import PostingModal from './PostingModal';
import SearchModal from './SearchModal';

function SideHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

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
                    <div
                        className="side-nav-icon-container"
                        onClick={() => setIsModalOpen(true)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={AddPostIcon} alt="Add Post" />
                    </div>
                    <div
                        className="side-nav-icon-container"
                        onClick={() => setIsSearchOpen(true)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={SearchIcon} alt="Search" />
                    </div>
                </div>
            </nav>

            <PostingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
        </>
    );
}

export default SideHeader;
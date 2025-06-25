import React, {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {doc, getDoc, collection, query, where, getDocs} from "firebase/firestore";
import {db} from "../firebase";
import PostCard from "../components/PostCard";
import EditProfileModal from "./EditProfileModal";

export default function ProfileCard() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userPosts, setUserPosts] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserData(data);

                    const postsRef = collection(db, "posts");
                    const q = query(postsRef, where("userId", "==", user.uid));
                    const qs = await getDocs(q);
                    const arr = qs.docs.map((d) => ({id: d.id, ...d.data()}));
                    setUserPosts(arr);
                }
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const handleEditClick = () => {
        setShowEditModal(true);
    };

    const handleProfileUpdate = (updatedData) => {
        setUserData(updatedData);
    };

    if (loading) return <p>Loading...</p>;
    if (!userData) return <p>No user data found.</p>;

    return (
        <section className="Profile-page-container">
            <div className="Profile-card">
                <div className="User-information">
                    <div className="User-info-top-section">
                        <img className="Profile-page-pfp" src="/assets/profile-photo.png" alt="Profile"/>
                        <div>
                            <h2>{userData.username}</h2>
                            <p className="User-real-name">
                                {userData.firstname} {userData.lastname}
                            </p>
                        </div>
                        <div className="actions-button-container">
                            <button className="follow-button">Follow</button>
                            <div onClick={handleEditClick} className="follow-button edit-profile-button">Edit Profile</div>
                        </div>
                    </div>
                    <div className="description-container">
                        <p>{userData.description}</p>
                    </div>
                    <div className="connections-container">
                        <p>699 <span className="connection-label">Following</span></p>
                        <p>15.5K <span className="connection-label">Followers</span></p>
                    </div>
                </div>

                <hr className="profile-page-hr"/>

                <div className="profile-post-container">
                    {userPosts.map((post) => (
                        <div key={post.id} className="profile-post-card">
                            <PostCard post={post}/>
                        </div>
                    ))}
                </div>
            </div>

            {showEditModal && (
                <EditProfileModal
                    userData={userData}
                    onClose={() => setShowEditModal(false)}
                    onUpdate={handleProfileUpdate}
                />
            )}
        </section>
    );
}

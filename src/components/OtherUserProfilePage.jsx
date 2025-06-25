import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import PostCard from "../components/PostCard";

export default function OtherUserProfilePage() {
    const { uid } = useParams();
    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userRef = doc(db, "users", uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                setUserData(userSnap.data());
            }

            const postsRef = collection(db, "posts");
            const q = query(postsRef, where("userId", "==", uid));
            const qs = await getDocs(q);
            const arr = qs.docs.map((d) => ({ id: d.id, ...d.data() }));
            setUserPosts(arr);
        };

        fetchData();
    }, [uid]);

    if (!userData) return <p>Loading profile...</p>;

    return (
        <section className="Profile-page-container">
            <div className="Profile-card">
                <div className="User-information">
                    <div className="User-info-top-section">
                        <img
                            className="Profile-page-pfp"
                            src={userData.userAvatarUrl || "/assets/profile-photo.png"}
                            alt="Profile"
                        />
                        <div>
                            <h2>{userData.username}</h2>
                            <p className="User-real-name">
                                {userData.firstname} {userData.lastname}
                            </p>
                        </div>
                        <div className="actions-button-container">
                            <button className="follow-button">Follow</button>
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
                    <div className="posts-container">
                        {userPosts.map((post) => (
                            <div key={post.id} className="post-card">
                                <PostCard post={post} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

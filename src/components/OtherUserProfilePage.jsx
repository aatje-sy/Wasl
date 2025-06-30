import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import PostCard from "../components/PostCard";

export default function OtherUserProfilePage() {
    const { uid } = useParams();
    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [followStatus, setFollowStatus] = useState(""); // "not-following", "requested", "following", "own-profile"

    // Ingelogde gebruiker ophalen
    const currentUserUid = getAuth().currentUser?.uid;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const userRef = doc(db, "users", uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const data = userSnap.data();
                setUserData(data);

                // Check follow status
                if (currentUserUid === uid) {
                    setFollowStatus("own-profile");
                } else if (data.followers?.includes(currentUserUid)) {
                    setFollowStatus("following");
                } else if (data.followRequests?.includes(currentUserUid)) {
                    setFollowStatus("requested");
                } else {
                    setFollowStatus("not-following");
                }

                // Posts alleen ophalen als profiel niet privé is, of als je volger bent, of jezelf bent
                if (
                    !data.isPrivate ||
                    (data.followers && data.followers.includes(currentUserUid)) ||
                    currentUserUid === uid
                ) {
                    const postsRef = collection(db, "posts");
                    const q = query(postsRef, where("userId", "==", uid));
                    const qs = await getDocs(q);
                    const arr = qs.docs.map((d) => ({ id: d.id, ...d.data() }));
                    setUserPosts(arr);
                } else {
                    setUserPosts([]);
                }
            } else {
                setUserData(null);
                setUserPosts([]);
            }
            setLoading(false);
        };

        fetchData();
    }, [uid, currentUserUid, followStatus]);

    // Volgen of verzoek sturen
    const handleFollow = async () => {
        if (!userData || !currentUserUid) return;
        const userRef = doc(db, "users", uid);

        if (userData.isPrivate) {
            // Privé: stuur verzoek
            await updateDoc(userRef, {
                followRequests: arrayUnion(currentUserUid)
            });
            setFollowStatus("requested");
        } else {
            // Openbaar: volg direct
            await updateDoc(userRef, {
                followers: arrayUnion(currentUserUid)
            });
            setFollowStatus("following");
        }
    };

    if (loading) return <p>Loading profile...</p>;
    if (!userData) return <p>Profile not found.</p>;

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
                            {followStatus === "not-following" && (
                                <button className="follow-button" onClick={handleFollow}>Follow</button>
                            )}
                            {followStatus === "requested" && (
                                <button className="follow-button requested" disabled>Wachten op goedkeuring</button>
                            )}
                            {followStatus === "following" && (
                                <button className="follow-button following" disabled>Volgend</button>
                            )}
                            {/* Geen knop tonen op eigen profiel */}
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

                <hr className="profile-page-hr" />

                <div className="profile-post-container">
                    {(userData.isPrivate && followStatus !== "following" && followStatus !== "own-profile") ? (
                        <div className="private-profile-message">
                            <p>Dit account is privé.</p>
                        </div>
                    ) : (
                        <div className="posts-container">
                            {userPosts.map((post) => (
                                <div key={post.id} className="post-card">
                                    <PostCard post={post} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

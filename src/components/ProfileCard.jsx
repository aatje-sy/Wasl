import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";
import PostCard from "../components/PostCard";
import EditProfileModal from "./EditProfileModal";

export default function ProfileCard() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userPosts, setUserPosts] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [requestsInfo, setRequestsInfo] = useState([]); // Voor volgverzoeken info

    // Haal user data + posts op
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserData({ ...data, uid: user.uid });

                    // Posts ophalen
                    const postsRef = collection(db, "posts");
                    const q = query(postsRef, where("userId", "==", user.uid));
                    const qs = await getDocs(q);
                    const arr = qs.docs.map((d) => ({ id: d.id, ...d.data() }));
                    setUserPosts(arr);
                }
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    // Haal info op van users die een verzoek hebben gestuurd
    useEffect(() => {
        async function fetchRequestsInfo() {
            if (!userData?.followRequests || userData.followRequests.length === 0) {
                setRequestsInfo([]);
                return;
            }
            const requests = await Promise.all(
                userData.followRequests.map(async (uid) => {
                    const snap = await getDoc(doc(db, "users", uid));
                    if (snap.exists()) {
                        const data = snap.data();
                        return {
                            uid,
                            username: data.username || "Onbekend",
                            userAvatarUrl: data.userAvatarUrl || "/assets/profile-photo.png"
                        };
                    } else {
                        return { uid, username: "Onbekend", userAvatarUrl: "/assets/profile-photo.png" };
                    }
                })
            );
            setRequestsInfo(requests);
        }
        fetchRequestsInfo();
    }, [userData?.followRequests]);

    const handleEditClick = () => setShowEditModal(true);

    const handleProfileUpdate = (updatedData) => setUserData(updatedData);

    // Volgverzoek accepteren
    const handleAccept = async (requestUid) => {
        if (!userData?.uid) return;
        const userRef = doc(db, "users", userData.uid);
        await updateDoc(userRef, {
            followers: arrayUnion(requestUid),
            followRequests: arrayRemove(requestUid)
        });
        setUserData((prev) => ({
            ...prev,
            followers: [...(prev.followers || []), requestUid],
            followRequests: (prev.followRequests || []).filter(uid => uid !== requestUid)
        }));
    };

    // Volgverzoek weigeren
    const handleDecline = async (requestUid) => {
        if (!userData?.uid) return;
        const userRef = doc(db, "users", userData.uid);
        await updateDoc(userRef, {
            followRequests: arrayRemove(requestUid)
        });
        setUserData((prev) => ({
            ...prev,
            followRequests: (prev.followRequests || []).filter(uid => uid !== requestUid)
        }));
    };

    if (loading) return <p style={{ color: "#fff", textAlign: "center" }}>Loading...</p>;
    if (!userData) return <p style={{ color: "#fff", textAlign: "center" }}>No user data found.</p>;

    return (
        <section className="Profile-page-container" style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
            <div className="Profile-card" style={{
                background: "#191919",
                borderRadius: 18,
                padding: "32px 32px 0 32px",
                minWidth: 400,
                color: "#fff",
                boxShadow: "0 8px 24px #0008",
                maxWidth: 520
            }}>
                <div className="User-information">
                    <div className="User-info-top-section" style={{ display: "flex", alignItems: "center", gap: 18 }}>
                        <img
                            className="Profile-page-pfp"
                            src={userData.userAvatarUrl || "/assets/profile-photo.png"}
                            alt="Profile"
                            style={{ width: 70, height: 70, borderRadius: "50%", objectFit: "cover", border: "2px solid #444" }}
                        />
                        <div style={{ flex: 1 }}>
                            <h2 style={{ fontSize: 28, margin: 0, fontWeight: 600 }}>{userData.username}</h2>
                            <p className="User-real-name" style={{ color: "#bbb", margin: "6px 0 0 0" }}>
                                {userData.firstname} {userData.lastname}
                            </p>
                        </div>
                        <div className="actions-button-container" style={{ marginLeft: "auto" }}>
                            <button
                                onClick={handleEditClick}
                                style={{
                                    background: "none",
                                    border: "1px solid #777",
                                    color: "#fff",
                                    borderRadius: 20,
                                    padding: "8px 18px",
                                    cursor: "pointer",
                                    fontWeight: 500,
                                    transition: "0.2s"
                                }}
                                onMouseOver={e => e.currentTarget.style.border = "1px solid #fff"}
                                onMouseOut={e => e.currentTarget.style.border = "1px solid #777"}
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                    <div className="description-container" style={{ marginTop: 18, marginBottom: 8 }}>
                        <p style={{ color: "#ccc" }}>{userData.description}</p>
                    </div>
                    <div className="connections-container" style={{ display: "flex", gap: 36, marginBottom: 8 }}>
                        <p>{userData.following?.length || 0} <span className="connection-label" style={{ color: "#888" }}>Following</span></p>
                        <p>{userData.followers?.length || 0} <span className="connection-label" style={{ color: "#888" }}>Followers</span></p>
                    </div>
                </div>

                {/* Volgverzoeken */}
                {userData.isPrivate && requestsInfo.length > 0 && (
                    <div className="requests-container" style={{ margin: "32px 0 0 0" }}>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: 500, marginBottom: 14 }}>Followers requests</h3>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {requestsInfo.map(({ uid, username, userAvatarUrl }) => (
                                <li
                                    key={uid}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "16px",
                                        marginBottom: "14px",
                                        background: "#232323",
                                        padding: "8px 12px",
                                        borderRadius: "8px"
                                    }}
                                >
                                    <img src={userAvatarUrl} alt="pfp" style={{ width: 36, height: 36, borderRadius: "50%" }} />
                                    <span style={{ fontWeight: 500, fontSize: 17 }}>{username}</span>
                                    <button
                                        onClick={() => handleAccept(uid)}
                                        style={{
                                            marginLeft: "auto",
                                            background: "#29d292",
                                            color: "#222",
                                            border: "none",
                                            borderRadius: 6,
                                            padding: "7px 15px",
                                            fontWeight: 600,
                                            cursor: "pointer",
                                            transition: ".2s"
                                        }}
                                    >Accepteren</button>
                                    <button
                                        onClick={() => handleDecline(uid)}
                                        style={{
                                            marginLeft: 7,
                                            background: "#ff6060",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: 6,
                                            padding: "7px 15px",
                                            fontWeight: 600,
                                            cursor: "pointer",
                                            transition: ".2s"
                                        }}
                                    >Weigeren</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <hr className="profile-page-hr" style={{ border: "none", borderTop: "1.5px solid #222", margin: "32px 0 16px 0" }} />

                <div className="profile-post-container" style={{ minHeight: 100 }}>
                    {userPosts.map((post) => (
                        <div key={post.id} className="profile-post-card" style={{ marginBottom: 18 }}>
                            <PostCard post={post} />
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

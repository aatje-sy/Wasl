import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import PostCard from "../components/PostCard";

export default function UserProfilePage() {
    const { uid } = useParams();
    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState([]);

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
            const userPosts = qs.docs.map((d) => ({ id: d.id, ...d.data() }));
            setPosts(userPosts);
        };

        fetchData();
    }, [uid]);

    if (!userData) return <p>Loading profile...</p>;

    return (
        <div className="profile-page">
            <div className="user-header">
                <img src={userData.userAvatarUrl || "/assets/profile-photo.png"} alt="Avatar" />
                <h2>{userData.username}</h2>
                <p>{userData.firstname} {userData.lastname}</p>
                <p>{userData.description}</p>
            </div>

            <div className="user-posts">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
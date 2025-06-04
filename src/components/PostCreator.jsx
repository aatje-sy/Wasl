import { useState } from "react";
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";

const PostCreator = () => {
    const [content, setContent] = useState("");

    const handlePost = async () => {
        if (!content.trim()) return;

        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            alert("You must be logged in.");
            return;
        }

        // Fetch user data from /users/{uid}
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        // Create new post
        await addDoc(collection(db, "posts"), {
            userId: user.uid,
            username: userData?.username || "Unknown",
            userAvatarUrl: userData?.avatarUrl || "",
            content: content,
            imageUrl: "", // optional for now
            createdAt: serverTimestamp(),
            likes: 0,
            comments: 0,
            shares: 0
        });

        setContent(""); // Clear input
    };

    return (
        <div className="post-creator" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                style={{ width: "100%", minHeight: "100px", padding: "10px", borderRadius: "10px" }}
            />
            <button onClick={handlePost} style={{ padding: "10px", borderRadius: "5px", cursor: "pointer" }}>
                Post
            </button>
        </div>
    );
};

export default PostCreator;
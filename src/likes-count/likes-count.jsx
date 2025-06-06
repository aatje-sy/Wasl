// src/likes-count/likes-count.jsx

import React, { useState, useEffect } from "react";
import HeartIcon from "/src/assets/heart-icon.svg";
import { auth, db } from "../firebase";
import "./like-count.css";
import {
    doc,
    getDoc,
    updateDoc,
    increment,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";

export default function LikesCount({ postId }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [busy, setBusy] = useState(false);

    // watch auth state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    // fetch initial like data
    useEffect(() => {
        const ref = doc(db, "posts", postId);
        getDoc(ref).then(snap => {
            const data = snap.data() || {};
            setLikeCount(data.likes || 0);
            setHasLiked(data.likedBy?.includes(auth.currentUser?.uid));
        });
    }, [postId]);

    const handleLike = async () => {
        // 1. require login
        if (!isLoggedIn) {
            alert("You need to log in first");
            window.location.href = "/login";
            return;
        }

        setBusy(true);
        const ref = doc(db, "posts", postId);

        if (hasLiked) {
            // unlike
            await updateDoc(ref, {
                likes: increment(-1),
                likedBy: arrayRemove(auth.currentUser.uid),
            });
            setHasLiked(false);
            setLikeCount(prev => prev - 1);
        } else {
            // like
            await updateDoc(ref, {
                likes: increment(1),
                likedBy: arrayUnion(auth.currentUser.uid),
            });
            setHasLiked(true);
            setLikeCount(prev => prev + 1);
        }

        setBusy(false);
    };

    return (
        <button
            onClick={handleLike}
            disabled={busy}
            className={`heart-btn ${hasLiked ? "liked" : ""}`}
            style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "transparent", border: "none", padding: 0 }}
        >
            <img src={HeartIcon} alt="Like" />
            <span style={{ color: "#fff" }}>{likeCount}</span>
        </button>
    );
}

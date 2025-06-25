import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import CommentIcon from "/src/assets/comment-icon.svg";
import ShareIcon from "/src/assets/share-icon.svg";
import LikesCount from "/src/likes-count/likes-count";
import Comments from "./Comments.jsx";
import {Link} from "react-router-dom";

const PostCard = ({post}) => {
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [commentCount, setCommentCount] = useState(0);

    const {
        username,
        createdAt,
        content,
        imageUrl,
        comments,
        shares,
        userAvatarUrl,
        id,
    } = post;

    const date = createdAt
        ?.toDate()
        .toLocaleDateString("nl-NL", { day: "numeric", month: "short" });

    useEffect(() => {
        async function fetchComments(){
            const snapshot = await getDocs(collection(db, "posts", id, "comments"))
            setCommentCount(snapshot.size);
        }
        fetchComments();
    },[id]);

    function increasCommentCount(){
        setCommentCount(prev => prev + 1);
    }

    return (
        <>
            <div className="post-card">
                <div className="details-container">
                    <div className="user-info-container">
                        <Link to={`/profile/${post.userId}`} className="user-link">
                            <img
                                className="user-avatar-icon"
                                src={userAvatarUrl || "/assets/profile-photo.png"}
                                alt="Profile"
                            />
                            <h4>{username || "Unknown"}</h4>
                        </Link>
                        <p className="post-date">{date || "Unknown date"}</p>
                    </div>

                    <p>{content}</p>

                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Post"
                            style={{
                                maxWidth: "100%",
                                marginTop: "10px",
                                borderRadius: "10px",
                            }}
                        />
                    )}

                    <div className="actions-container">
                        {/* Like button */}
                        <div className="actions-box">
                            <LikesCount postId={id} />
                        </div>

                        {/* Comments */}
                        <div className="actions-box" onClick={() => setIsCommentModalOpen(true)}>
                            <img  src={CommentIcon} alt="Comment" />
                            <p>{commentCount}</p>
                        </div>

                        {/* Shares */}
                        <div className="actions-box">
                            <img src={ShareIcon} alt="Share"/>
                            <p>{shares}</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="divider"/>
            <Comments
                isOpen={isCommentModalOpen}
                onClose={() => setIsCommentModalOpen(false)}
                postId={id}
                commentCount={increasCommentCount}
            />
        </>
    );
};

export default PostCard;
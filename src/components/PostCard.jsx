import React, {useState} from "react";
import CommentIcon from "/src/assets/comment-icon.svg";
import ShareIcon from "/src/assets/share-icon.svg";
import LikesCount from "/src/likes-count/likes-count";
import Comments from "./Comments.jsx";

const PostCard = ({ post }) => {
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

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

    return (
        <>
            <div className="post-card">
                <div className="side-container">
                    <img
                        src={userAvatarUrl || "/assets/profile-photo.png"}
                        alt="Profile"
                    />
                </div>

                <div className="details-container">
                    <div className="user-info-container">
                        <h4>{username || "Unknown"}</h4>
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
                            <p>{comments}</p>
                        </div>

                        {/* Shares */}
                        <div className="actions-box">
                            <img src={ShareIcon} alt="Share" />
                            <p>{shares}</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="divider" />
            <Comments
            isOpen={isCommentModalOpen}
            onClose={() => setIsCommentModalOpen(false)}
            postId={post.id}
            />
        </>
    );
};

export default PostCard;

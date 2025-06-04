const PostCard = ({ post }) => {
    const {
        username,
        createdAt,
        content,
        imageUrl,
        likes,
        comments,
        shares,
        userAvatarUrl
    } = post;

    const date = createdAt?.toDate().toLocaleDateString("nl-NL", {
        day: 'numeric', month: 'short'
    });

    return (
        <>
            <div className="post-card">
                <div className="side-container">
                    <img src={userAvatarUrl || "/assets/profile-photo.png"} alt="Profile" />
                </div>

                <div className="details-container">
                    <div className="user-info-container">
                        <h4>{username || "Unknown"}</h4>
                        <p>{date || "Unknown date"}</p>
                    </div>

                    <p>{content}</p>

                    {imageUrl && (
                        <img src={imageUrl} alt="Post" style={{ maxWidth: "100%", marginTop: "10px", borderRadius: "10px" }} />
                    )}

                    <div className="actions-container">
                        <div className="actions-box">
                            <img className="action-images" src="/assets/heart-icon.png" alt="" />
                            <p>{likes}</p>
                        </div>
                        <div className="actions-box">
                            <img className="action-images" src="/assets/comments-icon.png" alt="" />
                            <p>{comments}</p>
                        </div>
                        <div className="actions-box">
                            <img className="action-images" src="/assets/share-icon.png" alt="" />
                            <p>{shares}</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="divider" />
        </>
    );
};

export default PostCard;
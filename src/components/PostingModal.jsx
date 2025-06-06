import {useState} from "react";
import PropTypes from 'prop-types';
import CloseButtonIcon from '/src/assets/close-btn.svg';
import AddImageIcon from '/src/assets/add-image.svg';
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from "../firebase";

PostingModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

function PostingModal({isOpen, onClose}) {
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const userAvatarUrl = "";

    if (!isOpen) return null;

    const handlePost = async () => {
        if (!content.trim()) return;

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "posts"), {
                userId: "test-user-id",
                username: "TestUser",
                userAvatarUrl: userAvatarUrl || "",
                content,
                imageUrl: "",
                createdAt: serverTimestamp(),
                likes: 0,
                comments: 0,
                shares: 0,
            });

            setContent("");
            onClose();
        } catch (err) {
            console.error("Failed to post:", err);
            alert("Failed to post. Try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className={"buttons-container"}>
                    <button className="close-btn" onClick={onClose}>
                        <img src={CloseButtonIcon} alt="Close"/>
                    </button>
                </div>

                <div className="input-container">
                    <div className={"userAvatar-container"}>
                        <img
                            src={userAvatarUrl || "/assets/profile-photo.png"}
                            alt="Profile"
                            style={{width: "40px", height: "40px", borderRadius: "50%"}}
                        />
                    </div>
                    <textarea
                        className={"Post-input"}
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <hr/>

                <div className={"buttons-container post-btn-container"}>
                    <label htmlFor="image-upload">
                        <img src={AddImageIcon} alt="Add" className="add-image-icon" />
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                    />
                    <button onClick={handlePost} disabled={isSubmitting} className="post-btn">
                        {isSubmitting ? "Posting..." : "Post"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PostingModal;
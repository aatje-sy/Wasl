import PropTypes from "prop-types";
import {useState, useEffect} from 'react';
import {addDoc, collection, getDoc, getDocs, doc, serverTimestamp} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {db} from "../firebase.js"
import CloseButtonIcon from '/src/assets/close-btn.svg';
import SendIcon from '/src/assets/send-icon.svg';
import userIcon from '/src/assets/user-icon.svg'


const Comments = ({isOpen, onClose, postId}) => {
    const [commentTxt, setCommentTxt] = useState("");
    const [comments, setComments] = useState([]);
    const auth = getAuth();
    const user = auth.currentUser;

    // Comment logic to send
    async function submitComment(postId, user, content) {
        if (!content.trim()) return;

        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.exists() ? userDoc.data() : {};
            await addDoc(collection(db, "posts", postId, "comments"), {
                userId: user.uid,
                // username opgehaald via firestore en niet via firebase, want soms is username null
                username: userData.username,
                avatar: userData.avatarUrl || user.photoURL || userIcon,
                content: content,
                createdAt: serverTimestamp(),
            })
            console.log('comment added')
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    // useEffect to fetch the comments
    useEffect(() => {
        if (!isOpen) return;
        getDocs(collection(db, "posts", postId, "comments"))
            .then(snapshot => {
                const allComments = snapshot.docs.map(doc => doc.data());
                setComments(allComments);
            })
            .catch(err => console.error("Error: ", err));
    }, [isOpen, postId])
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="buttons-container">
                    <button className="close-btn" onClick={onClose}>
                        <img src={CloseButtonIcon} alt="Close"/>
                    </button>
                </div>

                {/* Comments fetch */}
                <div className="comments-list">
                    {comments.map((comment, i) => (
                        <div key={i} className="comment-item">
                            <img src={comment.avatar} alt=""/>
                            <strong>{ comment.username || "Onbekend"}:</strong> {comment.content}
                        </div>
                    ))}
                </div>

                <hr/>
                <div className="comment-input-row">
                    <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentTxt}
                        onChange={(e) => setCommentTxt(e.target.value)}
                        className="comment-input"
                    />
                    <div className="post-btn-container">
                        <button
                            className="post-btn comment-send-icon"
                            onClick={() => {
                                submitComment(postId, user, commentTxt);
                                setCommentTxt("")
                            }}>
                            <img src={SendIcon} alt="Send"/>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Comments;
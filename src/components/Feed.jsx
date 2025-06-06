import { collection, onSnapshot, query} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import PostCard from "./PostCard";

const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "posts"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPosts(fetchedPosts);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="Posts-container">
            <section className="container">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </section>
        </div>
    );
};

export default Feed;
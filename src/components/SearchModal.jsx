import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // pas aan als jouw firebase config ergens anders staat
import '../styling/styling.css'; // voor styling consistentie

export default function SearchModal({ onClose }) {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            if (input.trim() === '') return setResults([]);

            const userQuery = query(
                collection(db, 'users'),
                where('username', '>=', input),
            );

            const postQuery = query(
                collection(db, 'posts'),
                where('content', '>=', input),
                where('content', '<=', input + '\uf8ff')
            );

            const [userSnap, postSnap] = await Promise.all([
                getDocs(userQuery),
                getDocs(postQuery),
            ]);

            const users = userSnap.docs.map(doc => ({
                type: 'user',
                id: doc.id,
                ...doc.data(),
            }));

            const posts = postSnap.docs.map(doc => ({
                type: 'post',
                id: doc.id,
                ...doc.data(),
            }));

            setResults([...users, ...posts]);
        };

        const delay = setTimeout(fetchResults, 300);
        return () => clearTimeout(delay);
    }, [input]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Zoek naar gebruikers of posts..."
                    className="search-input"
                />
                <div className="search-results">
                    {results.map(item => (
                        <div key={item.id} className="search-result-item">
                            {item.type === 'user' ? (
                                <div>👤 {item.username || item.firstName}</div>
                            ) : (
                                <p>📝 {item.content}</p>                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
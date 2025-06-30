// File: src/components/auth/Login.jsx

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";        // Firebase Auth function
import { collection, query, where, getDocs } from "firebase/firestore"; // Firestore lookup
import { useNavigate } from "react-router-dom";                    // React Router redirect
import './login.css';                                              // Corresponding CSS
import { auth, db } from "../../firebase";                        // Your Firebase instances
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";


/**
 * Login form that accepts either "email" or "username" in a single field.
 * If the value contains "@", we treat it as an email. Otherwise, we query Firestore
 * to find the user’s email by the username field in "users" collection.
 */
function Login() {
    // State: single field for email/username, password, and errors
    const [identifier, setIdentifier] = useState(""); // Could be email OR username
    const [password, setPassword]     = useState("");
    const [err, setErr]               = useState("");

    const navigate = useNavigate(); // To redirect on successful login

    // When the form is submitted:
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr(""); // Clear previous error

        let emailToUse = "";

        try {
            // 1️Check if identifier contains '@' => treat as email:
            if (identifier.includes("@")) {
                emailToUse = identifier.trim();
            } else {
                // 2️⃣ Otherwise, treat as username => look up in Firestore:
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("username", "==", identifier.trim()));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    throw new Error("No user found with that username.");
                }

                // If multiple users have same username (unlikely), pick the first:
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();

                if (!userData.email) {
                    throw new Error("User record is missing email field.");
                }
                emailToUse = userData.email;
            }

            // 3️⃣ Sign in with the resolved email + password
            const userCredential = await signInWithEmailAndPassword(auth, emailToUse, password);
            console.log("User logged in:", userCredential.user);

            // 4️⃣ Redirect to home (or "/profile", etc.)
            navigate("/");
        } catch (error) {
            console.error(error);
            // Display a friendly message (Firebase errors are often verbose):
            setErr(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        setErr(""); // Clear error
        const provider = new GoogleAuthProvider();

        try {
            // 1. Inloggen met Google
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // 2. Check of gebruiker al in Firestore staat
            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);

            // 3. Zo niet, sla op in Firestore (of update)
            if (!docSnap.exists()) {
                await setDoc(userRef, {
                    uid: user.uid,
                    displayName: user.displayName || "",
                    email: user.email || "",
                    photoURL: user.photoURL || "",
                    username: user.displayName ? user.displayName.replace(/\s/g, '').toLowerCase() : ""
                });
            }
            // 4. Redirect
            navigate("/");
        } catch (error) {
            setErr(error.message);
        }
    };


    return (
        <div className="page-wrapper">
            <div className="container-login">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>

                    {/* Single “identifier” input: either email or username */}
                    <label htmlFor="identifier">Email or Username</label>
                    <input
                        type="text"
                        id="identifier"
                        placeholder="Enter email or username"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                    />

                    {/* Password input */}
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />




                    {/* Submit button */}
                    <button type="submit">Login</button>

                    <p style={{ marginLeft: 147, marginTop: 4  }}>Or</p>


                    <button
                        type="button"
                        className="google-login-btn"
                        onClick={handleGoogleLogin}
                                >
                    <span className="google-icon">
                          <img
                               src="https://developers.google.com/identity/images/g-logo.png"
                               alt="Google"
                    width={24}
                    height={24}

                />
              </span>
                                    <span className="google-btn-text" >Log in with Google</span>
                                </button>

                    {/* Link to Register page */}
                    <p className="login-link">
                        Don’t have an account?{" "}
                        <a href="/register">Register</a>
                    </p>




                    {/* Show any error message */}
                    {err && <p className="error">{err}</p>}
                </form>
            </div>
        </div>
    );

}

export default Login;

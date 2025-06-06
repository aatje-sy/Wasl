// Import React hook to manage state
import { useState } from "react";

// Import Firebase function to log in a user
import { signInWithEmailAndPassword } from "firebase/auth";

// Import useNavigate to redirect user after login
import { useNavigate } from "react-router-dom";

// Import CSS styling
import './login.css';

// Import Firebase auth instance
import { auth } from "../../firebase"; // Update this path if needed

function Login() {
    // State variables for form input and error messages
    const [email, setEmail] = useState("");           // Stores user's email
    const [password, setPassword] = useState("");     // Stores user's password
    const [err, setErr] = useState("");               // Stores any login error messages

    const navigate = useNavigate(); // Used to navigate to a different route after login

    // Function that handles the form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the page from refreshing

        try {
            // Try to sign in the user with the provided email and password
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Print user info to the console (for debugging)
            console.log("User logged in:", user);

            // Redirect the user to the homepage or profile page
            navigate("/login");

        } catch (error) {
            // If something goes wrong, show error in console and on screen
            console.log(error.message);
            setErr(error.message);
        }
    };

    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>

                {/* Email input field */}
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password input field */}
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Login button */}
                <button type="submit">Login</button>

                {/* Link to register page if user doesn’t have an account */}
                <p className="login-link">
                    Dont have an account? <a href="/register">Register</a>
                </p>

                {/* Display error message if any */}
                {err && <p className="error">{err}</p>}
            </form>
        </div>
    );
}

export default Login;

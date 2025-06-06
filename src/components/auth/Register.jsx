import { useState } from "react"; // React hook om component state te beheren
import './register.css'; // CSS styling voor het formulier
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase functie om gebruikers te registreren
import { useNavigate } from "react-router-dom"; // Voor redirect na registratie
import { auth, db } from '../../firebase.js'; // Firebase authenticatie en database
import { doc, setDoc } from 'firebase/firestore'; // Firestore functies om documenten op te slaan

function Register() {
    // States om de inputwaarden van het formulier op te slaan
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [err, setErr] = useState(""); // Hier slaan we fouten op

    const navigate = useNavigate(); // Hiermee sturen we de gebruiker naar een andere pagina

    // Deze functie voert alles uit wanneer je op "Register" klikt
    const handleSubmit = async (e) => {
        e.preventDefault(); // voorkomt dat de pagina herlaadt

        try {
            // Maak gebruiker aan met email en wachtwoord
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Sla extra gegevens van de gebruiker op in Firestore
            await setDoc(doc(db, "users", user.uid), {
                firstname,
                lastname,
                phonenumber,
                email,
                createdAt: new Date() // tijdstip van registratie
            });

            // Als alles lukt, stuur gebruiker naar login pagina
            navigate("/login");

        } catch (error) {
            // Als iets fout gaat, toon de fout in console en op het scherm
            console.log(error.message);
            setErr(error.message);
        }
    };

    return (
        <div className="registration-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Create Account</h2>

                <label htmlFor="firstname">First Name</label>
                <input
                    type="text"
                    id="firstname"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />

                <label htmlFor="lastname">Last Name</label>
                <input
                    type="text"
                    id="lastname"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />

                <label htmlFor="phonenumber">Phone Number</label>
                <input
                    type="text"
                    id="phonenumber"
                    placeholder="Phone Number"
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Register</button>

                <p className="login-link">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </form>

            {/* Als er een fout is, toon die dan */}
            {err && <p className="error">{err}</p>}
        </div>
    );
}

export default Register;

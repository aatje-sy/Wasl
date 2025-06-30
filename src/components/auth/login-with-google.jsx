// Nodige dingen importeren
import { auth, db } from "../../firebase"; // Jouw Firebase bestanden
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Google login functies
import { doc, getDoc, setDoc } from "firebase/firestore"; // Firestore functies

// Dit is de login-functie voor Google
async function handleGoogleLogin() {
    // Maak een Google login provider aan
    const provider = new GoogleAuthProvider();

    try {
        // Laat de gebruiker inloggen met Google (er komt een pop-up)
        const result = await signInWithPopup(auth, provider);

        // Haal de gebruiker op die is ingelogd
        const user = result.user;

        // Zoek in Firestore of deze gebruiker al bestaat
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        // Als de gebruiker nog niet bestaat, sla hem op in Firestore
        if (!userSnap.exists()) {
            await setDoc(userRef, {
                uid: user.uid,                 // Gebruiker ID
                email: user.email,             // E-mail
                displayName: user.displayName, // Naam
                photoURL: user.photoURL        // Foto
            });
        }

        // Stuur de gebruiker na het inloggen naar de homepage (of naar /profile)
        // Bijv. als je useNavigate gebruikt:
        // navigate("/");
    } catch (error) {
        // Als er iets fout gaat, print de fout in de console
        console.error(error);
        // Je kunt ook een foutmelding laten zien op de pagina
    }
}

export default handleGoogleLogin;
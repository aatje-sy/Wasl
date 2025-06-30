import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function EditProfileModal({ userData, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        firstname: userData.firstname || "",
        lastname: userData.lastname || "",
        username: userData.username || "",
        email: userData.email || "",
        isPrivate: userData.isPrivate || false,
    });

    const [activeTab, setActiveTab] = useState("Algemeen");

    // Input changes voor zowel text als checkbox
    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Profiel opslaan naar Firestore
    const handleSave = async () => {
        const uid = auth.currentUser.uid;
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
            firstname: formData.firstname,
            lastname: formData.lastname,
            username: formData.username,
            email: formData.email,
            isPrivate: formData.isPrivate,
        });
        onUpdate({ ...userData, ...formData });
        onClose();
    };

    return (
        <div className="modal-overlay profile-edit-modal-overlay">
            <div className="modal-content profile-edit-modal-content">

                {/* Header */}
                <div className="modal-header">
                    <h2>Profiel bewerken</h2>
                </div>

                {/* Tabs */}
                <div className="modal-tabs">
                    {["Algemeen", "Beveiliging", "Privacy", "Instellingen"].map((tab) => (
                        <button
                            key={tab}
                            className={`tab-button ${activeTab === tab ? "active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="modal-tab-content">
                    {activeTab === "Algemeen" && (
                        <>
                            <div className="real-name-inputs">
                                <label>
                                    Voornaam:
                                    <input
                                        type="text"
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                        placeholder="Voornaam"
                                    />
                                </label>
                                <label>
                                    Achternaam:
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        placeholder="Achternaam"
                                    />
                                </label>
                            </div>
                            <label>
                                Gebruikersnaam:
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Gebruikersnaam"
                                />
                            </label>
                            <label>
                                E-mail:
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="E-mail"
                                />
                            </label>
                        </>
                    )}

                    {activeTab === "Beveiliging" && (
                        <p>Wachtwoord wijzigen wordt hier later toegevoegd.</p>
                    )}

                    {activeTab === "Privacy" && (
                        <label className="privacy-toggle">
                            <input
                                type="checkbox"
                                name="isPrivate"
                                checked={formData.isPrivate}
                                onChange={handleChange}
                            />
                            Privé profiel
                        </label>
                    )}

                    {activeTab === "Instellingen" && (
                        <p>Instellingen komen hier binnenkort.</p>
                    )}
                </div>

                {/* Modal buttons */}
                <div className="modal-buttons">
                    <button type="button" onClick={onClose}>Annuleren</button>
                    <button type="button" onClick={handleSave}>Opslaan</button>
                </div>
            </div>
        </div>
    );
}

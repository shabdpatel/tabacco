import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import signup from "../assets/signup.png";
import { MdOutlineDiamond } from "react-icons/md";
import { GoLaw } from "react-icons/go";
import logo from "../assets/tobacco_nobg.png";
import google from "../assets/google.png";
import { VscWorkspaceTrusted } from "react-icons/vsc";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDg2TyBN8wmhcC_7_70HpBJG6Hth6FTRp0",
    authDomain: "nithhub-bc619.firebaseapp.com",
    projectId: "nithhub-bc619",
    storageBucket: "nithhub-bc619.firebasestorage.app",
    messagingSenderId: "488001460745",
    appId: "1:488001460745:web:eab3cbf10c57b185c1b6d8",
    measurementId: "G-TZ50RPTDMS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [formData, setFormData] = useState({
        fullName: "",
        mobileNumber: "",
        address: "",
        state: "",
        city: "",
        pincode: "",
    });

    // Check if the user is already logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
        } catch (error) {
            console.error("Error during Google login:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Save form data to Firestore
            await addDoc(collection(db, "userDetails"), {
                ...formData,
                userId: user?.uid, // Add user ID to associate form data with the logged-in user
                createdAt: new Date(), // Add a timestamp for when the document is created
            });

            alert("Details submitted successfully!");
            setFormData({
                fullName: "",
                mobileNumber: "",
                address: "",
                state: "",
                city: "",
                pincode: "",
            }); // Clear form inputs after successful submission
            navigate("/"); // Redirect to the homepage or desired page
        } catch (error) {
            console.error("Error saving details to Firestore:", error);
            alert("There was an error submitting your details. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
            <div className="w-full p-6 md:p-12 flex font-bold items-center justify-center">
                <img src={logo} alt="Tobacco Logo" className="h-28 w-auto" />
            </div>
            {!user ? (
                <div className="flex flex-col md:flex-row gap-5 items-center w-full max-w-5xl px-6">
                    <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Your Gateway to Premium
                        </h1>
                        <p className="text-gray-600 mb-8">
                            Experience a curated marketplace of trusted Instagram sellers,
                            vintage treasures, and premium goods.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center">
                                <span className="mr-4 text-black text-lg">
                                    <VscWorkspaceTrusted />
                                </span>
                                <div>
                                    <h3 className="font-semibold">Trusted Sellers</h3>
                                    <p className="text-sm text-gray-600">
                                        Shop from your favorite Instagram brands and creators.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-center">
                                <span className="mr-4 text-black text-lg">
                                    <GoLaw />
                                </span>
                                <div>
                                    <h3 className="font-semibold">Live Auctions</h3>
                                    <p className="text-sm text-gray-600">
                                        Bid on unique vintage and premium items.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-center">
                                <span className="mr-4 text-black text-lg">
                                    <MdOutlineDiamond />
                                </span>
                                <div>
                                    <h3 className="font-semibold">Premium Quality</h3>
                                    <p className="text-sm text-gray-600">
                                        Curated collection of high-quality thrift and vintage goods.
                                    </p>
                                </div>
                            </li>
                        </ul>
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full bg-black text-white py-3 font-semibold mt-7 rounded-full hover:bg-gray-800 transition"
                        >
                            <img
                                src={google}
                                alt="Google Logo"
                                className="h-8 w-8 inline-block mr-3"
                            />
                            Continue with Google
                        </button>
                    </div>
                    <div className="md:w-1/2 bg-gradient-to-r from-gray-200 to-white p-8 shadow-lg rounded-lg">
                        <img
                            src={signup}
                            alt="Sample Item"
                            className="h-80 w-full object-cover rounded-lg"
                        />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center w-full max-w-lg md:max-w-3xl">
                    <h2 className="text-2xl font-bold mb-4">Welcome, {user.displayName}</h2>
                    <form
                        className="bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-3/4"
                        onSubmit={handleFormSubmit}
                    >
                        <div className="grid grid-cols-2 gap-6">
                            <div className="mb-4 md:mb-0">
                                <label
                                    htmlFor="fullName"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4 md:mb-0">
                                <label
                                    htmlFor="mobileNumber"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Mobile Number
                                </label>
                                <input
                                    type="text"
                                    name="mobileNumber"
                                    id="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4 md:mb-0">
                                <label
                                    htmlFor="address"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4 md:mb-0">
                                <label
                                    htmlFor="state"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    State
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    id="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4 md:mb-0">
                                <label
                                    htmlFor="city"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4 md:mb-0">
                                <label
                                    htmlFor="pincode"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Pincode
                                </label>
                                <input
                                    type="text"
                                    name="pincode"
                                    id="pincode"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Logout
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default LoginPage;

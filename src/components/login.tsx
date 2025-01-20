import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
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
            // Sign in with Google
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            navigate("/");
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

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
            {/* Logo Section */}
            <div className="w-full p-6 md:p-12 flex font-bold items-center justify-center">
                <img
                    src={logo}
                    alt="Tobacco Logo"
                    className="h-28 w-auto"
                />
            </div>

            {!user ? (
                // Login Page Content
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
                                <span className="mr-4 text-black text-lg"><VscWorkspaceTrusted /></span>
                                <div>
                                    <h3 className="font-semibold">Trusted Sellers</h3>
                                    <p className="text-sm text-gray-600">
                                        Shop from your favorite Instagram brands and creators.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-center">
                                <span className="mr-4 text-black text-lg"><GoLaw /></span>
                                <div>
                                    <h3 className="font-semibold">Live Auctions</h3>
                                    <p className="text-sm text-gray-600">
                                        Bid on unique vintage and premium items.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-center">
                                <span className="mr-4 text-black text-lg"><MdOutlineDiamond /></span>
                                <div>
                                    <h3 className="font-semibold">Premium Quality</h3>
                                    <p className="text-sm text-gray-600">
                                        Curated collection of high-quality thrift and vintage goods.
                                    </p>
                                </div>
                            </li>
                        </ul>
                        <p
                            className="mt-6 mb-5 text-xs text-gray-500 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 p-4"
                        >
                            Note: If login doesn't work in Instagram's browser, please open in your
                            default browser.
                        </p>
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full bg-black text-white py-3 font-semibold mt-5 rounded-full hover:bg-gray-800 transition"
                        >
                            <img
                                src={google}
                                alt="Google Logo"
                                className="h-8 w-8 inline-block mr-3"
                            />
                            Continue with Google
                        </button>
                    </div>
                    <div
                        className="md:w-1/2 bg-gradient-to-r from-gray-200 to-white p-8 shadow-lg rounded-lg"
                    >
                        <img
                            src={signup}
                            alt="Sample Item"
                            className="h-80 w-full object-cover rounded-lg"
                        />
                    </div>
                </div>
            ) : (
                // Profile Page Content
                <div className="flex flex-col items-center">
                    <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="h-24 w-24 rounded-full mx-auto mb-4"
                    />
                    <h1 className="text-3xl font-bold">{user.displayName}</h1>
                    <p className="text-gray-600 mb-4">{user.email}</p>
                    <button
                        className="px-6 py-2 mb-4 bg-black text-white rounded-full hover:bg-gray-800 transition"
                        onClick={() => navigate("/delivery-details")}
                    >
                        Delivery Details
                    </button>
                    <button
                        className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export { db };
export default LoginPage;

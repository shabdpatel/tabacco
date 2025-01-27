import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "./firebaseconfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const DeliveryDetailsPage: React.FC = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState<any>({
        fullName: "",
        mobileNumber: "",
        address: "",
        state: "",
        city: "",
        pincode: "",
    });
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const auth = getAuth();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const currentUser = auth.currentUser;
            if (!currentUser) {
                alert("User not logged in.");
                navigate("/login"); // Redirect to the login page if not logged in
                return;
            }

            try {
                const docRef = doc(db, "users", currentUser.email); // Assuming email is used as the document ID
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
                } else {
                    console.error("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            } finally {
                setLoading(false);
            }
        };

        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                fetchUserDetails();
            } else {
                navigate("/login");
            }
        });
    }, [auth, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) {
                alert("User not logged in.");
                navigate("/login");
                return;
            }

            const docRef = doc(db, "users", currentUser.email);
            await setDoc(docRef, userDetails);
            alert("Details updated successfully!");
        } catch (error) {
            console.error("Error updating user details:", error);
            alert("Failed to update details. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="text-center">
                    <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 mb-4 animate-spin"></div>
                    <p className="text-lg font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl bg-slate-100 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-500">Edit Delivery Details</h1>
                <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-lg font-medium mb-2">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={userDetails.fullName}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">Mobile Number</label>
                            <input
                                type="text"
                                name="mobileNumber"
                                value={userDetails.mobileNumber}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-lg font-medium mb-2">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={userDetails.address}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-lg font-medium mb-2">State</label>
                            <input
                                type="text"
                                name="state"
                                value={userDetails.state}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">City</label>
                            <input
                                type="text"
                                name="city"
                                value={userDetails.city}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                value={userDetails.pincode}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </form>
                <div className="text-center mt-8 space-x-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`px-6 py-3 mb-3 rounded-lg shadow ${isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                            } text-white`}
                    >
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg shadow hover:bg-gray-400"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeliveryDetailsPage;


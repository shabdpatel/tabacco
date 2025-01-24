import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseconfig";

const DeliveryDetailsPage = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState<any>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const userId = localStorage.getItem("userId"); // Get userId from localStorage
            if (!userId) {
                console.error("No userId found in localStorage.");
                return;
            }

            try {
                const userDocRef = doc(db, "userDetails", userId);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserDetails(userDoc.data()); // Set user details
                } else {
                    console.error("No such document in Firestore!");
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <button
                className="absolute top-4 left-4 text-2xl text-gray-600 hover:text-gray-900 transition"
                onClick={() => navigate(-1)}
            >
                ←
            </button>

            <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">Delivery Details</h1>
                {userDetails ? (
                    <div className="text-lg text-gray-800 space-y-4">
                        <p>
                            <strong>Full Name:</strong> {userDetails.fullName}
                        </p>
                        <p>
                            <strong>Mobile Number:</strong> {userDetails.mobileNumber}
                        </p>
                        <p>
                            <strong>Address:</strong> {userDetails.address}
                        </p>
                        <p>
                            <strong>State:</strong> {userDetails.state}
                        </p>
                        <p>
                            <strong>City:</strong> {userDetails.city}
                        </p>
                        <p>
                            <strong>Pincode:</strong> {userDetails.pincode}
                        </p>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Loading delivery details...</p>
                )}
            </div>
        </div>
    );
};

export default DeliveryDetailsPage;

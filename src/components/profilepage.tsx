import { useNavigate } from "react-router-dom";
import image from "../assets/avatar2.png";

const ProfilePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userId"); // Clear userId
        navigate("/login");
    };

    const handleDeliveryDetails = () => {
        navigate("/deliverydetails"); // Navigate to Delivery Details Page
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
            {/* Back Button */}
            <button
                className="absolute top-4 left-4 text-2xl text-gray-600 hover:text-gray-900 transition"
                onClick={() => navigate(-1)}
            >
                ←
            </button>

            {/* Profile Section */}
            <div className="bg-slate-100 shadow-lg rounded-lg p-6 max-w-md w-full">
                <div className="flex flex-col items-center">
                    <img
                        src={image}
                        alt="Profile"
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 object-cover"
                    />
                    <h2 className="text-2xl font-semibold text-gray-800">Shabd Patel</h2>
                    <p className="text-gray-500 mb-4 text-center">shabdpatel0@gmail.com</p>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex flex-col gap-4">
                    <button
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
                        onClick={handleDeliveryDetails}
                    >
                        Delivery Details
                    </button>
                    <button
                        className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

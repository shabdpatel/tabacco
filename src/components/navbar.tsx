import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdSearch, IoMdPerson } from "react-icons/io";
import { FaHome, FaShoppingCart, FaMoneyCheckAlt, FaRegFileAlt, FaRegQuestionCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import logo from "../assets/tobacco_nobg.png";
import { IoMdCart } from "react-icons/io";
import { AiFillDollarCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate user login state
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Simulate form submission state

    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Simulate fetching user login and form status (Replace this with actual logic)
    useEffect(() => {
        // For example, fetch this info from local storage, API, or context
        const userLoggedIn = true; // Simulated: Replace with real logic
        const formSubmitted = true; // Simulated: Replace with real logic
        setIsLoggedIn(userLoggedIn);
        setIsFormSubmitted(formSubmitted);
    }, []);

    // Redirect logic for the profile button
    const handleProfileClick = () => {
        if (isLoggedIn && isFormSubmitted) {
            navigate("/profile");
        } else {
            navigate("/login");
        }
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full bg-white flex items-center justify-between px-6 py-1 border-b shadow-md z-50">
                {/* Left Section: Hamburger Menu and Logo */}
                <div className="flex items-center">
                    <button
                        onClick={toggleSidebar}
                        className="text-2xl focus:outline-none"
                    >
                        <GiHamburgerMenu />
                    </button>
                    <img
                        src={logo}
                        alt="Tobacco Logo"
                        className="ml-6 h-16 w-auto cursor-pointer"
                        onClick={() => navigate("/")} // Navigate to homepage on click
                    />
                </div>

                {/* Right Section: Search Icon and Login Button */}
                <div className="flex items-center">
                    <button
                        className="text-2xl focus:outline-none"
                        onClick={() => navigate("/explore")} // Navigate to Explore page on click
                    >
                        <IoMdSearch />
                    </button>
                    {/* Hide these icons on mobile view */}
                    <button
                        className="hidden sm:flex ml-1 px-2 py-2 h-6 rounded-lg items-center focus:outline-none"
                        onClick={() => navigate("/bid")}
                    >
                        <AiFillDollarCircle className="text-3xl" />
                    </button>
                    <button className="hidden sm:flex ml-1 px-2 py-2 h-6 rounded-lg items-center focus:outline-none"
                        onClick={() => navigate("/order")}>
                        <IoMdCart className="text-3xl" />
                    </button>
                    <button
                        className="ml-1 px-2 py-2 h-6 rounded-lg flex items-center focus:outline-none"
                        onClick={handleProfileClick} // Navigate to profile or login based on status
                    >
                        <IoMdPerson className="text-3xl" />
                    </button>
                </div>
            </nav>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-white shadow-md transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } z-50 w-80`}
            >
                <div className="p-6 border-b border-gray-200">
                    <img
                        src={logo}
                        alt="Tobacco Logo"
                        className="h-16 w-auto mx-auto mb-6"
                    />
                </div>
                <ul className="space-y-4 px-6 py-4">
                    <li className="flex items-center space-x-4 text-gray-700 hover:text-black transition">
                        <FaHome className="text-xl" />
                        <a href="/" className="text-lg font-medium">
                            Home
                        </a>
                    </li>
                    <li className="flex items-center space-x-4 text-gray-700 hover:text-black transition">
                        <FaShoppingCart className="text-xl" />
                        <a href="/explore" className="text-lg font-medium">
                            Explore
                        </a>
                    </li>
                    <li className="flex items-center space-x-4 text-gray-700 hover:text-black transition">
                        <FaMoneyCheckAlt className="text-xl" />
                        <a href="/bid" className="text-lg font-medium">
                            Bids
                        </a>
                    </li>
                    <li className="flex items-center space-x-4 text-gray-700 hover:text-black transition">
                        <FaRegFileAlt className="text-xl" />
                        <a href="/order" className="text-lg font-medium">
                            Orders
                        </a>
                    </li>
                    <li className="flex items-center space-x-4 text-gray-700 hover:text-black transition">
                        <FaRegQuestionCircle className="text-xl" />
                        <a href="/terms" className="text-lg font-medium">
                            Terms & Conditions
                        </a>
                    </li>
                    <li className="flex items-center space-x-4 text-gray-700 hover:text-black transition">
                        <FaRegQuestionCircle className="text-xl" />
                        <a href="/policy" className="text-lg font-medium">
                            Refund Policy
                        </a>
                    </li>
                    <li className="flex items-center space-x-4 text-gray-700 hover:text-black transition">
                        <FaRegQuestionCircle className="text-xl" />
                        <a href="/contact" className="text-lg font-medium">
                            Contact Us
                        </a>
                    </li>
                </ul>
                <div className="mt-6 px-6">
                    <button className="w-full bg-black text-white py-2 flex items-center justify-center space-x-2 rounded-md hover:bg-gray-800 transition">
                        <BiLogOut className="text-xl" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
};

export default Navbar;

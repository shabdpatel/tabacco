import React from "react";

const Contact: React.FC = () => {
    return (
        <div className="bg-white text-gray-800 min-h-screen">
            <div className="max-w-4xl mx-auto p-6 bg-slate-100 shadow-md rounded-md mt-8">
                <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
                <p className="mb-4">
                    If you need to get in touch with us, please use the contact details below. We are happy to assist you with any inquiries or concerns.
                </p>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Merchant Legal Entity Name</h2>
                    <p>PRANAV ARVIND RAJMANE</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Registered Address</h2>
                    <p>
                        Plot No 141, Kachare Housing Society, Jaysingpur, Jaysingpur, Maharashtra, PIN: 416101
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Operational Address</h2>
                    <p>
                        Plot No 141, Kachare Housing Society, Jaysingpur, Jaysingpur, Maharashtra, PIN: 416101
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Telephone Number</h2>
                    <p>8600879165</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">E-Mail Address</h2>
                    <p>
                        <a href="mailto:official@tobac.co.in" className="text-blue-500 hover:underline">
                            official@tobac.co.in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;

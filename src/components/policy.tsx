import React from "react";

const Policy: React.FC = () => {
    return (
        <div className="bg-white text-gray-800 min-h-screen">
            <div className="max-w-4xl mx-auto p-6 bg-slate-100 shadow-md rounded-md mt-8">
                <h1 className="text-2xl font-bold mb-2">Refund Policy</h1>
                <p className="text-sm text-gray-500 mb-6">Last updated: January 8, 2025</p>

                <h2 className="text-xl font-semibold mb-2">Our No-Refund Policy</h2>
                <p className="mb-4">
                    We maintain a strict no-refund policy for all our services and products. This decision
                    has been made to ensure the highest quality of service delivery and to maintain the
                    integrity of our business operations. We encourage all our customers to carefully
                    review our services and products before making a purchase decision.
                </p>

                <h2 className="text-xl font-semibold mb-2">Why We Have This Policy</h2>
                <p className="mb-4">
                    Our services and products are delivered with the utmost care and professional attention.
                    Due to the nature of our digital services and the immediate access provided upon
                    purchase, we are unable to process refunds once the service has been delivered or access
                    has been granted.
                </p>

                <h2 className="text-xl font-semibold mb-2">Before You Purchase</h2>
                <p className="mb-4">
                    We strongly recommend that you:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>Carefully review all service descriptions</li>
                    <li>Read through our terms and conditions</li>
                    <li>Contact our support team if you have any questions</li>
                    <li>Ensure our services meet your requirements</li>
                </ul>

                <h2 className="text-xl font-semibold mb-2">Exception Cases</h2>
                <p className="mb-4">
                    While we maintain a no-refund policy, we understand that exceptional circumstances may
                    arise. In cases of technical issues from our end or service unavailability, we will
                    review each case individually and may offer appropriate compensation or service
                    adjustments.
                </p>

                <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
                <p>
                    If you have any questions about our refund policy or need clarification before making a
                    purchase, please don’t hesitate to contact our customer support team. We’re here to help
                    you make an informed decision about our services.
                </p>
            </div>
        </div>
    );
};

export default Policy;

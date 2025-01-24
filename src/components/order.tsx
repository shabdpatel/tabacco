import React, { useState } from "react";

interface Order {
    id: number;
    productName: string;
    quantity: number;
    price: number;
}

const OrderPage: React.FC = () => {
    const [orders] = useState<Order[]>([]); // Start with an empty order list

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center text-gray-600 text-lg">
                    <p>No orders placed yet.</p>
                </div>
            ) : (
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="flex justify-between items-center border-b pb-4"
                        >
                            <div>
                                <h2 className="font-semibold text-xl">
                                    {order.productName}
                                </h2>
                                <p className="text-gray-600">
                                    Quantity: {order.quantity}
                                </p>
                            </div>
                            <div className="text-lg font-bold text-gray-800">
                                ₹{(order.price * order.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;

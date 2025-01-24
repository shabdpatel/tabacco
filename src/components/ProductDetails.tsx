import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseconfig";

interface Product {
    id: string;
    image: string;
    title: string;
    author: string;
    size: string;
    condition: string;
    price: number;
    stock: boolean; // Add stock status
    description?: string;
}

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (id) {
                    const docRef = doc(db, "products", id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
                    } else {
                        console.error("No such document!");
                    }
                }
            } catch (error) {
                console.error("Error fetching product details: ", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-8">
            {/* Left Section: Product Image */}
            <div className="flex-shrink-0">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-[300px] md:w-[400px] lg:w-[500px] rounded-lg shadow-md"
                />
            </div>

            {/* Right Section: Product Info */}
            <div className="flex flex-col gap-4 max-w-lg">
                <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
                <p className="text-gray-600 text-sm">by @{product.author}</p>
                <p className="text-lg font-semibold">Size - {product.size}</p>
                <p className="text-sm text-gray-600">Condition - {product.condition}</p>

                {/* Size Availability */}
                <div>
                    <h3 className="text-md font-semibold mb-1">Size</h3>
                    <button
                        className={`px-4 py-2 border rounded-md ${product.stock
                            ? "border-black text-black"
                            : "border-gray-300 text-gray-400"
                            }`}
                        disabled={!product.stock}
                    >
                        {product.size} {product.stock ? "" : "Out of stock"}
                    </button>
                </div>

                {/* Quantity Selection */}
                <div className="flex items-center gap-4">
                    <h3 className="text-md font-semibold">Quantity</h3>
                    <div className="flex items-center border rounded-lg">
                        <button className="px-3 py-1 text-lg font-bold">-</button>
                        <span className="px-4">1</span>
                        <button className="px-3 py-1 text-lg font-bold">+</button>
                    </div>
                </div>

                {/* Price and Buy Now */}
                <div>
                    <p className="text-xl font-bold">₹{product.price}</p>
                    <button className="bg-black text-white px-6 py-2 mt-4 rounded-lg shadow-md hover:bg-gray-800 transition">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

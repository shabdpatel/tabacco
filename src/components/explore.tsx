import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebaseconfig";
import { useNavigate } from "react-router-dom";

interface Product {
    id: string;
    productPhotoUrls: string;
    product_name: string;
    seller: string;
    price: number;
}

const ExplorePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, "NormalProducts"));
                const querySnapshot = await getDocs(q);
                const productsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Product[];

                // Filter results in frontend
                const filteredProducts = productsData.filter((product) =>
                    product.product_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                );

                setProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [debouncedSearchTerm]);

    const handleCardClick = (productId: string) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="bg-white min-h-screen">
            <section className="px-4 md:px-6 lg:px-10">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <h1 className="text-3xl md:text-4xl font-semibold mb-4 md:mb-0">
                        Explore Tobac Store
                    </h1>
                    <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="search"
                            placeholder="Search products"
                            className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-gray-200 hover:bg-gray-300 text-sm font-medium text-black py-2 px-4 rounded-lg shadow transition ml-2"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </section>

            <section className="mt-6 px-4 md:px-6 lg:px-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Products</h2>
                {loading ? (
                    <p className="text-gray-500">Loading products...</p>
                ) : products.length === 0 ? (
                    <p className="text-gray-500">No products found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-slate-50 rounded-xl shadow-md overflow-hidden cursor-pointer"
                                onClick={() => handleCardClick(product.id)}
                            >
                                <div className="relative">
                                    <img
                                        src={product.productPhotoUrls}
                                        alt={product.product_name}
                                        className="w-full h-36 md:h-40 lg:h-48 object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-sm font-semibold truncate">
                                        {product.product_name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-2">
                                        By {product.seller}
                                    </p>
                                    <p className="text-lg font-bold mb-4">₹{product.price}</p>
                                    <button
                                        className="w-full bg-slate-600 text-white text-xs px-3 py-2 rounded-lg shadow hover:bg-gray-800 transition"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default ExplorePage;

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseconfig";

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

    // Debounce Effect: Updates `debouncedSearchTerm` after user stops typing for 300ms
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300); // Adjust debounce delay as needed (e.g., 300ms)

        return () => {
            clearTimeout(handler); // Cleanup timeout on every new keystroke
        };
    }, [searchTerm]);

    // Fetch products when `debouncedSearchTerm` changes
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let q;
                if (debouncedSearchTerm.trim() === "") {
                    q = query(collection(db, "NormalProducts"));
                } else {
                    const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase();
                    q = query(
                        collection(db, "NormalProducts"),
                        where("titleLower", ">=", lowerCaseSearchTerm),
                        where("titleLower", "<=", lowerCaseSearchTerm + "\uf8ff")
                    );
                }

                console.log("Executing query:", q);

                const querySnapshot = await getDocs(q);
                const productsData = querySnapshot.docs.map((doc) => {
                    const data = doc.data() as Omit<Product, "id">;
                    return { id: doc.id, ...data };
                });

                console.log("Fetched products:", productsData);

                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [debouncedSearchTerm]);

    return (
        <div className="bg-white min-h-screen">
            <section className="px-4 md:px-6 lg:px-10">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <h1 className="text-3xl md:text-4xl font-semibold mb-4 md:mb-0 break-words">
                        Explore Tobac Store
                    </h1>
                    <form
                        className="flex items-center"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="search"
                            name="search"
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
                                className="bg-slate-50 rounded-xl shadow-md overflow-hidden"
                            >
                                <div className="relative">
                                    <img
                                        src={product.productPhotoUrls}
                                        alt={product.product_name}
                                        className="w-full h-36 md:h-40 lg:h-48 object-cover"
                                    />
                                    <button className="absolute top-2 right-2 bg-black text-slate-400 text-xs px-3 py-1 rounded-lg shadow hover:bg-gray-800 transition">
                                        Buy Now
                                    </button>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-sm font-semibold truncate">
                                        {product.product_name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-2">
                                        By {product.seller}
                                    </p>
                                    <p className="text-lg font-bold mb-4">₹{product.price}</p>
                                    <button className="w-full bg-gray-200 hover:bg-gray-300 text-sm font-medium text-black py-2 rounded-lg shadow transition">
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

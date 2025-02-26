import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaGlassMartiniAlt } from "react-icons/fa";
import { MdOutlineStorefront } from "react-icons/md";
import { GrDeliver } from "react-icons/gr";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseconfig";
import { useNavigate } from "react-router-dom";

interface Product {
    id: string;
    image: string;
    title: string;
    author: string;
    price: number;
}

interface Auction {
    id: string;
    image: string;
    title: string;
    currentBid: number;
    endTime: string;
}

const Homepage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [auctions, setAuctions] = useState<Auction[]>([]);

    const navigate = useNavigate(); // Initialize navigate

    const handleCardClick = (productId: string) => {
        navigate(`/product/${productId}`);
    };

    const handleGetStarted = () => {
        window.open("https://console.tobac.co.in/", "_blank"); // Navigate to the console page in a new tab
        navigate("https://console.tobac.co.in/"); // Navigate to the console page
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "NormalProducts"));
                const productsData: Product[] = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        image: Array.isArray(data.productPhotoUrls) ? data.productPhotoUrls[0] : data.productPhotoUrls,
                        title: data.product_name || "Untitled",
                        author: data.seller || "Unknown",
                        price: data.price || 0,
                    };
                });
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };
        const fetchAuctions = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Auctions"));
                const auctionsData: Auction[] = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        image: Array.isArray(data.productPhotoUrls) ? data.productPhotoUrls[0] : data.productPhotoUrls,
                        title: data.product_name || "Untitled",
                        currentBid: data.currentBid || 0,
                        endTime: data.BiddingEnd ? data.BiddingEnd.toString() : "Unknown",
                    };
                });
                setAuctions(auctionsData);
            } catch (error) {
                console.error("Error fetching auctions: ", error);
            }
        };

        fetchProducts();
        fetchAuctions();
    }, []);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white px-2 py-6 md:p-10 w-full h-60 md:h-72 rounded-2xl mx-auto shadow-lg flex flex-col md:flex-row items-center md:justify-between overflow-hidden">
                <div className="text-center md:text-left max-w-full">
                    <h1 className="text-3xl md:text-4xl font-semibold mb-4 break-words">
                        Open Tobac Store
                    </h1>
                    <p className="text-base md:text-lg mb-6 break-words">
                        Sell your vintage, thrift, antique products on Tobac
                    </p>
                    <button
                        onClick={handleGetStarted}
                        className="flex items-center mx-auto md:mx-0 bg-white text-black font-medium px-4 md:px-6 py-2 rounded-full shadow hover:bg-gray-200 transition"
                    >
                        Get Started{" "}
                        <span className="ml-2 text-lg">
                            <FaArrowRight />
                        </span>
                    </button>
                </div>
                <div className="text-gray-500 text-6xl md:text-8xl mt-6 md:mt-0">
                    <MdOutlineStorefront />
                </div>
            </section>

            {/* Live Auction Section */}
            <div className="relative flex items-center justify-center my-8 md:my-12">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-500"></div>
                </div>
                <div className="relative bg-white px-4 text-lg font-medium flex items-center space-x-2">
                    <span>Live Auction</span>
                    <span className="text-xl">
                        <GrDeliver />
                    </span>
                </div>
            </div>

            <section className="mt-8 px-2 md:px-6 lg:px-10">
                <div className="flex overflow-x-scroll space-x-4 scrollbar-hide p-2 md:p-6 rounded-lg">
                    {auctions.map((auction) => (
                        <div
                            key={auction.id}
                            className="min-w-[260px] md:min-w-[280px] lg:min-w-[300px] max-w-[320px] bg-slate-50 rounded-xl shadow-md overflow-hidden"
                        >
                            <div className="relative">
                                <img
                                    src={auction.image}
                                    alt={auction.title}
                                    className="w-full h-44 md:h-52 lg:h-56 object-cover"
                                />
                                <div className="absolute bottom-2 left-2 bg-black text-white text-xs px-3 py-1 rounded-lg shadow">
                                    BiddingEnd: {auction.endTime}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-sm font-semibold truncate">
                                    {auction.title}
                                </h3>
                                <p className="text-lg font-bold mb-4">
                                    Current Bid: ₹{auction.currentBid}
                                </p>
                                <button className="w-full bg-gray-200 hover:bg-gray-300 text-sm font-medium text-black py-2 rounded-lg shadow transition">
                                    Place Bid
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Buy Now Section */}
            <div className="relative flex items-center justify-center my-8 md:my-12">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-500"></div>
                </div>
                <div className="relative bg-white px-4 text-lg font-medium flex items-center space-x-2">
                    <span>Buy Now</span>
                    <span className="text-xl">
                        <FaGlassMartiniAlt />
                    </span>
                </div>
            </div>

            <section className="mt-6 px-2 md:px-6 lg:px-10">
                <div className="flex overflow-x-scroll space-x-4 scrollbar-hide p-2 md:p-6 rounded-lg">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="min-w-[260px] md:min-w-[220px] lg:min-w-[250px] max-w-[250px] bg-slate-50 rounded-xl shadow-md overflow-hidden"
                        >
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-36 md:h-40 lg:h-48 object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-sm font-semibold truncate">
                                    {product.title}
                                </h3>
                                <p className="text-xs text-gray-500 mb-2">
                                    By {product.author}
                                </p>
                                <p className="text-lg font-bold mb-4">₹{product.price}</p>
                                <button
                                    className="w-full bg-slate-600 text-white text-xs px-3 py-2 rounded-lg shadow hover:bg-gray-800 transition"
                                    onClick={() => handleCardClick(product.id)}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Some More Products Section */}
            <div className="relative flex items-center justify-center my-8 md:my-12">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-500"></div>
                </div>
                <div className="relative bg-white px-4 text-lg font-medium flex items-center space-x-2">
                    <span>Some More Products</span>
                    <span className="text-xl">
                        <HiMiniShoppingBag />
                    </span>
                </div>
            </div>

            <section className="mt-6 px-2 md:px-6 lg:px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 md:p-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-slate-50 rounded-xl shadow-md overflow-hidden"
                        >
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-36 md:h-40 lg:h-48 object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-sm font-semibold truncate">
                                    {product.title}
                                </h3>
                                <p className="text-xs text-gray-500 mb-2">
                                    By {product.author}
                                </p>
                                <p className="text-lg font-bold mb-4">₹{product.price}</p>
                                <button
                                    className="w-full bg-slate-600 text-white text-xs px-3 py-2 rounded-lg shadow hover:bg-gray-800 transition"
                                    onClick={() => handleCardClick(product.id)}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Homepage;
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseconfig";

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, "NormalProducts", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const productData = docSnap.data();
                    setProduct(productData);
                    if (productData.productPhotoUrls?.length > 0) {
                        setSelectedImage(productData.productPhotoUrls[0]); // Default to first image
                    }
                } else {
                    console.error("No such product!");
                }
            } catch (error) {
                console.error("Error fetching product details: ", error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg md:flex md:gap-8">
            {/* Left Side - Product Images */}
            <div className="md:w-1/2">
                {/* Main Image */}
                {selectedImage ? (
                    <img src={selectedImage} alt={product.product_name} className="w-full h-96 object-cover rounded-lg shadow" />
                ) : (
                    <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg shadow">
                        <span className="text-gray-500">No Image Available</span>
                    </div>
                )}

                {/* Thumbnail Images */}
                {product.productPhotoUrls && product.productPhotoUrls.length > 1 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto">
                        {product.productPhotoUrls.map((url: string, index: number) => (
                            <img
                                key={index}
                                src={url}
                                alt={`Thumbnail ${index + 1}`}
                                className={`h-20 w-20 object-cover rounded-md cursor-pointer border-2 ${selectedImage === url ? "border-black" : "border-transparent"}`}
                                onClick={() => setSelectedImage(url)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Right Side - Product Details */}
            <div className="md:w-1/2 flex flex-col justify-between">
                <div>
                    {/* Product Name & Seller */}
                    <h1 className="text-3xl font-bold">{product.product_name || "Untitled Product"}</h1>
                    <p className="text-gray-500 mt-1">By {product.seller || "Unknown Seller"}</p>

                    {/* Price */}
                    <p className="text-xl font-semibold mt-4">₹{product.price || "N/A"}</p>

                    {/* Description */}
                    <p className="text-gray-700 mt-4">{product.description || "No description available."}</p>

                    {/* Additional Details */}
                    <div className="mt-6 space-y-2 text-gray-600">
                        <p><strong>Type:</strong> {product.type || "N/A"}</p>
                        <p><strong>Size:</strong> {product.size_stocks ? Object.keys(product.size_stocks).join(", ") : "N/A"}</p>
                        <p><strong>Stock:</strong> {product.total_stock || "Out of Stock"}</p>
                        <p><strong>Status:</strong> {product.status || "Unavailable"}</p>
                        <p><strong>Weight:</strong> {product.weight ? `${product.weight}g` : "N/A"}</p>
                        <p><strong>Seller Email:</strong> {product.seller_email || "N/A"}</p>
                        <p><strong>Listed Date:</strong> {product.listed_date ? new Date(product.listed_date.seconds * 1000).toLocaleString() : "N/A"}</p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="mt-6 flex items-center gap-4">
                        <p className="text-lg font-medium">Quantity:</p>
                        <div className="flex items-center border border-gray-400 rounded-lg px-3">
                            <button
                                className="text-lg px-3 py-1 hover:bg-gray-200"
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                            >
                                −
                            </button>
                            <span className="px-4">{quantity}</span>
                            <button
                                className="text-lg px-3 py-1 hover:bg-gray-200"
                                onClick={() => setQuantity(prev => prev + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                {/* Buy Now Button */}
                <button className="mt-6 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition w-full">
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;

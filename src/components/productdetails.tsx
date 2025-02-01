import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseconfig";
import { MdVerified } from "react-icons/md";
import { getAuth } from "firebase/auth";

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any>(null);
    const [shippingDetails, setShippingDetails] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showOrderSummary, setShowOrderSummary] = useState(false);

    const auth = getAuth(); // Initialize Firebase Auth

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
                        setSelectedImage(productData.productPhotoUrls[0]);
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

    const fetchShippingDetails = async () => {
        const user = auth.currentUser; // Get the currently logged-in user
        if (!user || !user.email) {
            console.error("User not logged in or email not available.");
            return;
        }

        try {
            const userDocRef = doc(db, "users", user.email); // Use user's email as the document ID
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                setShippingDetails(userDocSnap.data()); // Set shipping details from Firestore
            } else {
                console.error("No shipping details found for this user.");
            }
        } catch (error) {
            console.error("Error fetching shipping details: ", error);
        }
    };

    const handleBuyNow = async () => {
        await fetchShippingDetails(); // Fetch shipping details before showing the order summary
        setShowOrderSummary(true);
    };

    const handlePlaceOrder = async () => {
        const user = auth.currentUser;
        if (!user || !user.email) {
            console.error("User not logged in or email not available.");
            return;
        }

        const orderId = Math.random().toString(36).substring(2, 15); // Generate a random order ID

        const orderData = {
            address_line_1: shippingDetails.address,
            created_at: serverTimestamp(),
            email: user.email,
            is_auction: false,
            name: shippingDetails.fullName,
            order_id: orderId,
            payment_date: serverTimestamp(),
            payment_id: "", // Since we're skipping Razorpay, this can be empty
            payment_status: "success", // Assuming the payment is successful
            pdf: "", // No PDF generated yet
            phone_number: shippingDetails.mobileNumber,
            pincode: shippingDetails.pincode,
            price_per_unit: product.price.toString(),
            product_id: id,
            product_image: selectedImage,
            product_name: product.product_name,
            quantity: quantity.toString(),
            seller_email: product.seller_email || "imhvss@gmail.com", // Replace with actual seller email if available
            size: Object.keys(product.size_stocks).join(", "), // Assuming size_stocks is an object
            status: "pending",
            total_price: (product.price * quantity + 100).toString(), // Adding delivery charge
        };

        try {
            const orderRef = doc(db, "orders", orderId);
            await setDoc(orderRef, orderData);
            alert("Order placed successfully!");
            setShowOrderSummary(false);
        } catch (error) {
            console.error("Error saving order details: ", error);
            alert("Failed to place order. Please try again.");
        }
    };

    if (!product) return <div className="text-center py-10">Loading...</div>;

    const isOutOfStock = product.total_stock <= 0;

    return (
        <div className="w-full p-3 bg-slate-100 shadow-lg rounded-lg md:flex md:gap-8 md:max-w-5xl md:mx-auto">
            {/* Left Side - Product Images */}
            <div className="md:w-1/2">
                {/* Main Image */}
                {selectedImage ? (
                    <img
                        src={selectedImage}
                        alt={product.product_name}
                        className="w-full h-96 object-cover rounded-lg shadow"
                    />
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
                                className={`h-20 w-20 object-cover rounded-md cursor-pointer border-2 ${selectedImage === url ? "border-black" : "border-transparent"
                                    }`}
                                onClick={() => setSelectedImage(url)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Right Side - Product Details */}
            <div className="md:w-1/2 flex flex-col justify-between mt-6 md:mt-0">
                <div>
                    {/* Product Name & Seller */}
                    <h1 className="text-3xl font-bold">{product.product_name || "Untitled Product"}</h1>
                    <p className="text-gray-500 mt-1">
                        By {product.seller || "Unknown Seller"} <MdVerified className="inline text-green-500" />
                    </p>

                    {/* Price */}
                    <p className="text-xl font-semibold mt-4">₹{product.price || "N/A"}</p>

                    {/* Description */}
                    <p className="text-gray-700 mt-4">{product.description || "No description available."}</p>

                    {/* Additional Details */}
                    <div className="mt-6 space-y-4 text-gray-600">
                        <p><strong>Type:</strong> {product.type || "N/A"}</p>

                        {/* Size Box */}
                        <div>
                            <strong>Size:</strong>
                            <div className="flex flex-wrap gap-2 mt-1 justify-center">
                                {product.size_stocks
                                    ? Object.keys(product.size_stocks).map((size) => (
                                        <div
                                            key={size}
                                            className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                                        >
                                            {size}
                                        </div>
                                    ))
                                    : "N/A"}
                            </div>
                        </div>

                        {/* Stock Box */}
                        <div>
                            <strong>Stock:</strong>
                            <div className="mt-1">
                                <div className="px-4 py-2 border border-gray-300 rounded-lg inline-block">
                                    {product.total_stock || "Out of Stock"}
                                </div>
                            </div>
                        </div>

                        <p><strong>Weight:</strong> {product.weight ? `${product.weight}g` : "N/A"}</p>
                    </div>

                    {/* Quantity Selector */}
                    {!isOutOfStock && (
                        <div className="mt-6 flex items-center gap-4 justify-center">
                            <p className="text-lg font-medium">Quantity:</p>
                            <div className="flex items-center border border-gray-400 rounded-lg px-3">
                                <button
                                    className="text-lg px-3 py-1 hover:bg-gray-200"
                                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                >
                                    −
                                </button>
                                <span className="px-4">{quantity}</span>
                                <button
                                    className="text-lg px-3 py-1 hover:bg-gray-200"
                                    onClick={() => setQuantity((prev) => prev + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Buy Now Button */}
                {isOutOfStock ? (
                    <div className="mt-6 bg-gray-400 text-white px-6 py-3 rounded-md text-center">
                        Out of Stock
                    </div>
                ) : (
                    <button
                        className="mt-6 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition w-full"
                        onClick={handleBuyNow}
                    >
                        Buy Now
                    </button>
                )}
            </div>

            {/* Order Summary Modal */}
            {showOrderSummary && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl shadow-xl overflow-hidden relative">
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-gray-800 transition"
                            onClick={() => setShowOrderSummary(false)}
                        >
                            &times;
                        </button>

                        {/* Title */}
                        <h2 className="text-3xl font-bold mb-6 text-center">Order Summary</h2>

                        {/* Scrollable Content */}
                        <div className="max-h-[65vh] overflow-y-auto px-4">
                            {/* Product Image and Details */}
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                {selectedImage && (
                                    <img
                                        src={selectedImage}
                                        alt={product.product_name}
                                        className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg shadow-md"
                                    />
                                )}
                                <div className="space-y-2 text-center md:text-left">
                                    <p className="text-xl font-semibold">{product.product_name}</p>
                                    <p><strong>Size:</strong> {product.size_stocks ? Object.keys(product.size_stocks).join(", ") : "N/A"}</p>
                                    <p><strong>Quantity:</strong> {quantity}</p>
                                    <p><strong>Price:</strong> ₹{product.price}</p>
                                </div>
                            </div>

                            {/* Shipping Details */}
                            {shippingDetails && (
                                <div className="bg-gray-100 p-4 rounded-lg mt-6">
                                    <h3 className="text-lg font-bold mb-2">Shipping Details</h3>
                                    <p><strong>Name:</strong> {shippingDetails.fullName}</p>
                                    <p><strong>Email:</strong> {shippingDetails.email || "N/A"}</p>
                                    <p><strong>Phone:</strong> {shippingDetails.mobileNumber || "N/A"}</p>
                                    <p><strong>Address:</strong> {shippingDetails.address}</p>
                                    <p><strong>City:</strong> {shippingDetails.city}</p>
                                    <p><strong>State:</strong> {shippingDetails.state}</p>
                                    <p><strong>Pincode:</strong> {shippingDetails.pincode}</p>
                                </div>
                            )}

                            {/* Payment Details */}
                            <div className="bg-gray-100 p-4 rounded-lg mt-6">
                                <h3 className="text-lg font-bold mb-2">Payment Details</h3>
                                <p><strong>Price:</strong> ₹{product.price}</p>
                                <p><strong>Units:</strong> {quantity}</p>
                                <p><strong>Delivery:</strong> ₹100</p>
                                <p className="text-xl font-semibold"><strong>Total:</strong> ₹{product.price * quantity + 100}</p>
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <button
                            className="mt-6 bg-black text-white px-6 py-3 rounded-md hover:bg-slate-900 transition w-full text-lg"
                            onClick={handlePlaceOrder}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
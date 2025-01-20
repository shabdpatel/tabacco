import React from "react";
import image from "../assets/image.webp";

const Console: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-black text-white p-6 md:p-12">
            {/* Logo Section */}
            <div className="flex justify-start mb-8">
                <h1 className="text-2xl font-semibold">
                    <span className="text-gray-300">T</span>
                    <span className="px-2 py-1 border rounded-md text-white border-gray-300">
                        CONSOLE
                    </span>
                    <span className="text-gray-300">BACCO</span>
                </h1>
            </div>

            {/* Header Section */}
            <header className="mb-12">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to Tobacco{" "}
                    <span className="ml-2 text-4xl" role="img" aria-label="party">
                        🎉
                    </span>
                </h1>
                <p className="text-lg">
                    Join our thriving community of thrift store sellers!
                </p>
            </header>

            {/* Why Sellers Love Section */}
            <section className="flex flex-col md:flex-row md:justify-between">
                {/* Text Section */}
                <div className="md:w-1/2">
                    <h2 className="text-2xl font-semibold mb-6">Why Sellers Love Tobacco:</h2>
                    <div className="space-y-6">
                        {/* Card 1 */}
                        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-4">Effortless Listing</h3>
                            <p className="text-gray-400">
                                Quickly upload single items or bulk batches in just a few clicks. Bulk
                                uploads are hassle-free and come with a fixed price—perfect for managing
                                large inventories.
                            </p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-4">Wide Appeal</h3>
                            <p className="text-gray-400">
                                Cater to vintage lovers from all walks of life with a diverse array of
                                products—whether it's retro fashion, antique furniture, or rare
                                collectibles.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className="md:w-1/2 mt-8 md:mt-0 flex justify-end">
                    <img
                        src={image}
                        alt="Thrift Store Example"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </section>
        </div>
    );
};

export default Console;

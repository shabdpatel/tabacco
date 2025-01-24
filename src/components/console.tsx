import React from 'react';
import image from '../assets/image.webp';

const Console: React.FC = () => {
    return (
        <div className="mt-16 md:mt-16 fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6 md:p-12 overflow-auto">
            {/* Header Section */}
            <header className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight antialiased">
                    Welcome to Tobacco{' '}
                    <span role="img" aria-label="party" className="ml-2">
                        🎉
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 antialiased">
                    Join our thriving community of thrift store sellers!
                </p>
            </header>

            {/* Why Sellers Love Section */}
            <section className="flex flex-col md:flex-row md:items-center md:justify-between">
                {/* Text Section */}
                <div className="md:w-1/2 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-1 text-center md:text-left antialiased">
                        Why Sellers Love Tobacco:
                    </h2>

                    {/* Card 1 */}
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 transition hover:shadow-2xl hover:bg-gray-700 antialiased">
                        <h3 className="text-xl font-bold mb-3 text-white antialiased">
                            Effortless Listing
                        </h3>
                        <p className="text-gray-400 leading-relaxed antialiased">
                            Quickly upload single items or bulk batches in just a few clicks. Bulk
                            uploads are hassle-free and come with a fixed price—perfect for
                            managing large inventories.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 transition hover:shadow-2xl hover:bg-gray-700 antialiased">
                        <h3 className="text-xl font-bold mb-3 text-white antialiased">
                            Wide Appeal
                        </h3>
                        <p className="text-gray-400 leading-relaxed antialiased">
                            Cater to vintage lovers from all walks of life with a diverse array of
                            products—whether it's retro fashion, antique furniture, or rare
                            collectibles.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 transition hover:shadow-2xl hover:bg-gray-700 antialiased">
                        <h3 className="text-xl font-bold mb-3 text-white antialiased">
                            Global Marketplace
                        </h3>
                        <p className="text-gray-400 leading-relaxed antialiased">
                            Gain explore to the worldwide audience passionate about unique,
                            one-of-a-kind treasure.
                        </p>
                    </div>
                </div>

                {/* Image Section */}
                <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center md:justify-end">
                    <img
                        src={image}
                        alt="Thrift Store Example"
                        className="rounded-lg shadow-xl max-w-full md:max-w-md lg:max-w-lg"
                    />
                </div>
            </section>
        </div>
    );
};

export default Console;
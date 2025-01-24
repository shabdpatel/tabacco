
const Bid = () => {
    return (
        <div className="min-h-screen bg-white p-6 md:p-12">
            <h1 className="text-3xl font-bold text-center mb-10">Your Bid</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-10">
                {/* Pending Payment */}
                <div className="bg-red-50 border border-red-300 rounded-lg p-6 text-center md:p-8 md:text-lg">
                    <div className="text-red-500 text-2xl md:text-4xl">🛑</div>
                    <h2 className="text-lg font-bold mt-4 md:mt-6">Pending Payment</h2>
                    <p className="text-4xl font-bold mt-2 md:text-6xl">0</p>
                </div>

                {/* Highest Bidder */}
                <div className="bg-green-50 border border-green-300 rounded-lg p-6 text-center md:p-8 md:text-lg">
                    <div className="text-green-500 text-2xl md:text-4xl">📈</div>
                    <h2 className="text-lg font-bold mt-4 md:mt-6">Highest Bidder</h2>
                    <p className="text-4xl font-bold mt-2 md:text-6xl">0</p>
                </div>

                {/* Active Bids */}
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 text-center md:p-8 md:text-lg">
                    <div className="text-blue-500 text-2xl md:text-4xl">⏰</div>
                    <h2 className="text-lg font-bold mt-4 md:mt-6">Active Bids</h2>
                    <p className="text-4xl font-bold mt-2 md:text-6xl">0</p>
                </div>

                {/* Won Auctions */}
                <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 text-center md:p-8 md:text-lg">
                    <div className="text-yellow-500 text-2xl md:text-4xl">🏆</div>
                    <h2 className="text-lg font-bold mt-4 md:mt-6">Won Auctions</h2>
                    <p className="text-4xl font-bold mt-2 md:text-6xl">0</p>
                </div>
            </div>
        </div>
    );
};

export default Bid;


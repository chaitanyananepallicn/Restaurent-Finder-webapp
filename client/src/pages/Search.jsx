import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [activeTab, setActiveTab] = useState("id");
  const [inputValue, setInputValue] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (activeTab === "id" && inputValue) {
      navigate(`/restaurant/${inputValue}`);
    } else if (activeTab === "name" && inputValue) {
      navigate(`/restaurant/name/${encodeURIComponent(inputValue)}`);
    } else if (activeTab === "location" && latitude && longitude) {
      navigate(`/location?lat=${latitude}&lng=${longitude}&radius=5`);
    } else if (activeTab === "image" && image) {
      navigate(`/image-search`, { state: { image } });
    } else {
      alert("Please enter valid input.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="flex w-4/5 max-w-6xl p-8 rounded-2xl shadow-lg border border-gray-800 bg-gray-900">
        {/* Left Side: Search Panel */}
        <div className="w-1/2 p-6">
          <h2 className="text-3xl font-bold mb-6">🍽️ Discover Restaurants</h2>
          <div className="flex gap-2 mb-6">
            {["id", "name", "location", "image"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab
                    ? "bg-pink-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="mb-6">
            {activeTab === "location" ? (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter Latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-pink-500"
                />
                <input
                  type="text"
                  placeholder="Enter Longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-pink-500"
                />
              </div>
            ) : activeTab === "image" ? (
              <div className="border-2 border-dashed border-gray-600 p-6 rounded-lg text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer text-gray-400">
                  {image ? image.name : "Upload Restaurant Image"}
                </label>
              </div>
            ) : (
              <input
                type="text"
                placeholder={`Search by ${activeTab}...`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-pink-500"
              />
            )}
          </div>

          <button
            onClick={handleSearch}
            className="w-full py-3 bg-pink-600 rounded-lg text-lg font-semibold hover:bg-pink-700 transition-all"
          >
            Explore Restaurants →
          </button>
        </div>

        {/* Right Side: Image */}
        <div className="w-1/2 flex justify-center items-center">
          <img
            src="https://tb-static.uber.com/prod/image-proc/processed_images/ee1f2b0f114d429ef65aad37b4850a48/16bb0a3ab8ea98cfe8906135767f7bf4.jpeg"
            alt="Restaurant Search"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
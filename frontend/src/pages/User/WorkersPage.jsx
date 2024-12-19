import { useState } from "react";

const workers = {
  Electric: [
    { id: 1, name: "John Doe", image: "https://via.placeholder.com/100" },
    { id: 2, name: "Jane Smith", image: "https://via.placeholder.com/100" },
    { id: 3, name: "Robert White", image: "https://via.placeholder.com/100" },
  ],
  Sanitary: [
    { id: 4, name: "Mark Spencer", image: "https://via.placeholder.com/100" },
    { id: 5, name: "Linda Black", image: "https://via.placeholder.com/100" },
  ],
  Carpentry: [
    { id: 6, name: "Anna Brown", image: "https://via.placeholder.com/100" },
  ],

  Painting: [
    { id: 7, name: "Chris Paul", image: "https://via.placeholder.com/100" },
    { id: 8, name: "Tom Green", image: "https://via.placeholder.com/100" },
    { id: 9, name: "John Doe", image: "https://via.placeholder.com/100" },
  ],

  Plumbing: [
    { id: 10, name: "Mark Spencer", image: "https://via.placeholder.com/100" },
    { id: 11, name: "Linda Black", image: "https://via.placeholder.com/100" },
    { id: 12, name: "Anna Brown", image: "https://via.placeholder.com/100" },
  ],

  Gardening: [
    { id: 13, name: "Chris Paul", image: "https://via.placeholder.com/100" },
    { id: 14, name: "Tom Green", image: "https://via.placeholder.com/100" },
    { id: 15, name: "John Doe", image: "https://via.placeholder.com/100" },
  ],
};

const WorkersPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category); // Toggle selected category
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 mt-16">
        Workers by Category
      </h1>
      <div className="flex justify-center flex-wrap gap-4 mb-6">
        <button
          onClick={() => handleCategoryClick("Electric")}
          className={`px-6 py-2 text-white rounded-lg transition ${
            selectedCategory === "Electric"
              ? "bg-blue-700"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Electric Workers
        </button>
        <button
          onClick={() => handleCategoryClick("Sanitary")}
          className={`px-6 py-2 text-white rounded-lg transition ${
            selectedCategory === "Sanitary"
              ? "bg-green-700"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Sanitary Workers
        </button>
        <button
          onClick={() => handleCategoryClick("Carpentry")}
          className={`px-6 py-2 text-white rounded-lg transition ${
            selectedCategory === "Carpentry"
              ? "bg-yellow-700"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          Carpentry Workers
        </button>

        <button
          onClick={() => handleCategoryClick("Painting")}
          className={`px-6 py-2 text-white rounded-lg transition ${
            selectedCategory === "Painting"
              ? "bg-purple-700"
              : "bg-purple-500 hover:bg-purple-600"
          }`}
        >
          Painting Workers
        </button>
        <button
          onClick={() => handleCategoryClick("Plumbing")}
          className={`px-6 py-2 text-white rounded-lg transition ${
            selectedCategory === "Plumbing"
              ? "bg-red-700"
              : "bg-red-800 hover:bg-red-700"
          }`}
        >
          Plumbing Workers
        </button>
        <button
          onClick={() => handleCategoryClick("Gardening")}
          className={`px-6 py-2 text-white rounded-lg transition ${
            selectedCategory === "Gardening"
              ? "bg-teal-700"
              : "bg-teal-800 hover:bg-teal-700"
          }`}
        >
          Gardening Workers
        </button>
      </div>

      {selectedCategory && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {selectedCategory} Workers
          </h2>
          {workers[selectedCategory]?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {workers[selectedCategory].map((worker) => (
                <div
                  key={worker.id}
                  className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() =>
                    alert(`Navigating to ${worker.name}'s detail page`)
                  }
                >
                  <img
                    src={worker.image}
                    alt={worker.name}
                    className="w-full h-24 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-gray-800 font-medium text-sm text-center">
                    {worker.name}
                  </h3>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No workers available in this category.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkersPage;

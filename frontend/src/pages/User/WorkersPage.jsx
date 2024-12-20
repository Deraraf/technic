import { useNavigate } from "react-router-dom";
import { useState } from "react";
import workerData from "../../data/workers.json";

const WorkersPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category); // Toggle selected category
  };

  const handleWorkerClick = (id) => {
    navigate(`/worker-page/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 ">
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
          onClick={() => handleCategoryClick("Painter")}
          className={`px-6 py-2 text-white rounded-lg transition ${
            selectedCategory === "Painter"
              ? "bg-pink-600"
              : "bg-pink-700 hover:bg-pink-800"
          }`}
        >
          Painter Workers
        </button>
        <button
          onClick={() => handleCategoryClick("Iron")}
          className={`px-6 py-2 text-white rounded-lg transition ${
            selectedCategory === "Painter"
              ? "bg-teal-500"
              : "bg-teal-500 hover:bg-teal-600"
          }`}
        >
          Iron Workers
        </button>
        <button
          onClick={() => handleCategoryClick("Construction")}
          className={`px-6 py-2 text-white rounded-lg transition ${
            selectedCategory === "Painter"
              ? "bg-violet-600"
              : "bg-violet-600 hover:bg-violet-800"
          }`}
        >
          Construction Workers
        </button>
      </div>

      {selectedCategory && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {selectedCategory} Workers
          </h2>
          {workerData.filter((worker) => worker.category === selectedCategory)
            .length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {workerData
                .filter((worker) => worker.category === selectedCategory)
                .map((worker) => (
                  <div
                    key={worker.id}
                    className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                    onClick={() => handleWorkerClick(worker.id)}
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

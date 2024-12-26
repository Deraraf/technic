import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import workerData from "../../data/workers.json";
import PropTypes from "prop-types";
const WorkersPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const images = import.meta.glob("../../images/*");

  const getImagePath = async (imageName) => {
    const imagePath = `../../images/${imageName}`;
    if (images[imagePath]) {
      const module = await images[imagePath]();
      return module.default || module; // Return the resolved URL of the image
    }
    return null; // Return null if image is not found
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category); // Toggle selected category
  };

  const handleWorkerClick = (id) => {
    navigate(`/worker-page/${id}`);
  };

  const WorkerCard = ({ worker, onClick }) => {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
      const loadImage = async () => {
        const src = await getImagePath(worker.image);
        setImageSrc(src);
      };
      loadImage();
    }, [worker.image]);

    return (
      <div
        className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
        onClick={onClick}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={worker.name}
            className="w-full  object-cover rounded-lg mb-3"
          />
        ) : (
          <div className="w-full h-24 bg-gray-300 rounded-lg mb-3" />
        )}
        <h3 className="text-gray-800 font-medium text-sm text-center">
          {worker.name}
        </h3>
      </div>
    );
  };

  WorkerCard.propTypes = {
    worker: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 mt-16">
        Workers by Category
      </h1>
      <div className="flex justify-center flex-wrap gap-4 mb-6">
        {[
          "Electric",
          "Sanitary",
          "Carpentry",
          "Painter",
          "Iron",
          "Construction",
        ].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-6 py-2 text-white rounded-lg transition ${
              selectedCategory === category
                ? "bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {`${category} Workers`}
          </button>
        ))}
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
                  <WorkerCard
                    key={worker.id}
                    worker={worker}
                    onClick={() => handleWorkerClick(worker.id)}
                  />
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

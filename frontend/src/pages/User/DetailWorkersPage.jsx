import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import workerData from "../../data/workers.json";

const WorkerPage = () => {
  const { id } = useParams(); // Extract worker ID from the route
  const [worker, setWorker] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const images = import.meta.glob("../../images/*");

  useEffect(() => {
    const getImagePath = async (imageName) => {
      const imagePath = `../../images/${imageName}`;
      if (images[imagePath]) {
        const module = await images[imagePath]();
        return module.default || module; // Resolved image URL
      }
      return null;
    };

    // Fetch worker details based on ID
    const selectedWorker = workerData.find((worker) => worker.id === id);
    setWorker(selectedWorker);

    if (selectedWorker?.image) {
      const loadImage = async () => {
        const src = await getImagePath(selectedWorker.image);
        setImageSrc(src);
      };
      loadImage();
    }
  }, [id, images]);

  if (!worker) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Worker not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8  flex flex-col items-center">
      <div className="bg-white p-6 mt-16 rounded-lg shadow-lg w-full max-w-3xl">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={worker.name}
            className="w-full object-cover mt-8 rounded-lg mb-4"
          />
        ) : (
          <div className="w-full h-64 bg-gray-300 rounded-lg mb-4" />
        )}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{worker.name}</h1>
        <h2 className="text-lg text-gray-500 mb-4">{worker.category}</h2>
        <p className="text-gray-700">{worker.description}</p>

        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-600 transition">
          <Link to="/worker-page">Back to Workers</Link>
        </button>
      </div>
    </div>
  );
};

export default WorkerPage;

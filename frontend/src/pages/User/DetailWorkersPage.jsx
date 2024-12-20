import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import workersData from "../../data/workers.json";

const DetailWorkersPage = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    const foundWorker = workersData.find((worker) => worker.id === id);
    setWorker(foundWorker);
  }, [id]);

  if (!worker) {
    return <p className="text-center mt-10 text-gray-600">Worker not found.</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen ">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 mt-10">
        <img
          src={worker.image}
          alt={worker.name}
          className="w-full h-64 object-cover rounded-t-lg mb-6"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{worker.name}</h1>
        <p className="text-lg text-gray-700 mb-4">
          <strong>Category:</strong> {worker.category}
        </p>
        <p className="text-lg text-gray-700">{worker.description}</p>
        <Link
          to="/worker-page"
          className="block mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-600 transition"
        >
          Back to Workers
        </Link>
      </div>
    </div>
  );
};

export default DetailWorkersPage;

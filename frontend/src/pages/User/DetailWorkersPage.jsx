import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const workers = [
  {
    id: 1,
    name: "John Doe",
    image: "https://via.placeholder.com/150",
    category: "Electric",
    contact: "johndoe@gmail.com",
    phone: "+123456789",
    skills: ["Wiring", "Switch Installation", "Repair"],
    experience: "5 years",
    description: "Expert in electrical installations and repair services.",
  },
  // Add more workers as needed...
];

const WorkerDetails = () => {
  const { id } = useParams(); // Extract worker ID from URL
  const navigate = useNavigate();

  const worker = workers.find((worker) => worker.id === parseInt(id));

  if (!worker) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Worker Not Found</h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      <div className="bg-white max-w-3xl w-full rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            src={worker.image}
            alt={worker.name}
            className="w-40 h-40 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{worker.name}</h1>
            <p className="text-sm text-gray-500">Category: {worker.category}</p>
            <p className="mt-2 text-gray-700">{worker.description}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">Details</h2>
          <ul className="mt-3 space-y-2">
            <li>
              <span className="font-medium text-gray-600">Contact:</span>{" "}
              {worker.contact}
            </li>
            <li>
              <span className="font-medium text-gray-600">Phone:</span>{" "}
              {worker.phone}
            </li>
            <li>
              <span className="font-medium text-gray-600">Experience:</span>{" "}
              {worker.experience}
            </li>
            <li>
              <span className="font-medium text-gray-600">Skills:</span>{" "}
              <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-sm">
                {worker.skills.join(", ")}
              </span>
            </li>
          </ul>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default WorkerDetails;

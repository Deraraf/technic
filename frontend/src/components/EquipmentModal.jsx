import PropTypes from "prop-types";
import { useGetRequestsQuery } from "../redux/api/requestApiSlice";
import { useEffect, useState } from "react";

const EquipmentModal = ({ equipment, onClose }) => {
  const { data: requests, isLoading } = useGetRequestsQuery();
  const [uniqueProfessionals, setUniqueProfessionals] = useState([]);

  useEffect(() => {
    if (requests) {
      const uniqueProfsSet = new Set();

      requests.forEach((req) => {
        if (req.professional && Array.isArray(req.professional)) {
          req.professional.forEach((prof) => {
            if (prof) {
              uniqueProfsSet.add(prof);
            }
          });
        }
      });
      setUniqueProfessionals([...uniqueProfsSet]);
    }
  }, [requests]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Equipment Details</h2>

        {equipment.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {equipment.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong> - {item.quantity} - ({item.status})
              </li>
            ))}
            {uniqueProfessionals.length > 0 && (
              <div className="border border-gray-300 rounded-md bg-white p-4">
                <p>
                  <strong>professionals (ሙያተኛ):</strong>
                </p>
                <div className="ml-4">
                  {uniqueProfessionals.map((professional) => (
                    <p key={professional}>{professional}</p>
                  ))}
                </div>
              </div>
            )}
          </ul>
        ) : (
          <p>No equipment added for this request.</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

EquipmentModal.propTypes = {
  equipment: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EquipmentModal;

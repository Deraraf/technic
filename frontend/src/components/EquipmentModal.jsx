import PropTypes from "prop-types";

const EquipmentModal = ({
  equipment = { name: "Default Equipment", _id: "default-id" },
  professional = { name: "Default Professional", _id: "default-id" },
  onClose,
}) => {
  console.log(professional);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Equipment Details</h2>

        {equipment?.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {equipment.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong> - {item.quantity} - ({item.status})
              </li>
            ))}
            {professional?.length > 0 && (
              <div className="border border-gray-300 rounded-md bg-white p-4">
                <p>
                  <strong>Professionals (ሙያተኛ):</strong>
                </p>
                <div className="ml-4">
                  {professional.map((prof, index) => (
                    <p key={index}>{prof.name}</p>
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
  professional: PropTypes.array, // no default value, but ensure it’s an array
  onClose: PropTypes.func.isRequired,
};

export default EquipmentModal;

import { useState } from "react";
import { useUpdateRequestMutation } from "../redux/api/requestApiSlice";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const UpdateRequestModal = ({ request, onClose }) => {
  const [updateRequest] = useUpdateRequestMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: request.username || "",
    contact: request.contact || "",
    department: request.department || "",
    place: request.place || "",
    blockNumber: request.blockNumber || 0,
    biroNumber: request.biroNumber || 0,
    typeOfRequest: request.typeOfRequest || "",
    description: request.description || "",
    systemNumber: request.systemNumber || "",
  });
  const [professionals, setProfessionals] = useState(
    request.professional || []
  );

  const [equipmentList, setEquipmentList] = useState(request.equipment || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEquipment = () => {
    setEquipmentList([
      ...equipmentList,
      { name: "", quantity: 1, status: "Used" },
    ]);
  };

  const handleChangeEquipment = (index, key, value) => {
    const updatedList = [...equipmentList];
    updatedList[index][key] = value;
    setEquipmentList(updatedList);
  };

  const handleRemoveEquipment = (index) => {
    const updatedList = equipmentList.filter((_, i) => i !== index);
    setEquipmentList(updatedList);
  };
  const handleAddProfessional = () => {
    setProfessionals([...professionals, ""]);
  };
  const handleRemoveProfessional = (index) => {
    const updatedProfessionals = professionals.filter((_, i) => i !== index);
    setProfessionals(updatedProfessionals);
  };
  const handleProfessionalChange = (index, value) => {
    const updatedProfessionals = [...professionals];
    updatedProfessionals[index] = value;
    setProfessionals(updatedProfessionals);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRequest = {
        ...formData,
        equipment: equipmentList,
        professional: professionals,
      };
      await updateRequest({
        id: request._id,
        formData: updatedRequest,
      }).unwrap();
      toast.success("Request updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update request.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-h-[80vh] overflow-y-auto w-full md:w-3/4 lg:w-1/2 ">
        <h2 className="text-xl font-bold mb-4">Update Request</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => {
            // Skip systemNumber if user is not an admin
            if (!userInfo?.isAdmin && key === "systemNumber") {
              return null;
            }

            return (
              <div key={key} className="mb-4">
                <label className="block text-sm font-medium mb-1">{key}</label>
                <input
                  type={
                    key === "contact" ||
                    key === "blockNumber" ||
                    key === "biroNumber" ||
                    key === "systemNumber"
                      ? "number"
                      : "text"
                  }
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>
            );
          })}

          <h3 className="text-lg font-semibold mt-4 mb-2">Equipment</h3>
          {equipmentList.map((item, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder="Equipment Name"
                value={item.name}
                onChange={(e) =>
                  handleChangeEquipment(index, "name", e.target.value)
                }
                className="w-full border rounded p-2 mb-2"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) =>
                  handleChangeEquipment(index, "quantity", e.target.value)
                }
                className="w-full border rounded p-2 mb-2"
              />
              <select
                value={item.status}
                onChange={(e) =>
                  handleChangeEquipment(index, "status", e.target.value)
                }
                className="w-full border rounded p-2 mb-2"
              >
                <option value="Used">Used</option>
                <option value="Not Used">Not Used</option>
              </select>
              <button
                type="button"
                onClick={() => handleRemoveEquipment(index)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddEquipment}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Equipment
          </button>
          <h3 className="text-lg font-semibold mt-4 mb-2">Professionals</h3>
          {professionals.map((professional, index) => (
            <div key={index} className="mb-4 flex items-center">
              <input
                type="text"
                placeholder="Professional Name"
                value={professional}
                onChange={(e) =>
                  handleProfessionalChange(index, e.target.value)
                }
                className="w-full border rounded p-2 mr-2"
              />
              <button
                type="button"
                onClick={() => handleRemoveProfessional(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddProfessional}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          >
            Add Professional
          </button>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

UpdateRequestModal.propTypes = {
  request: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateRequestModal;

import { useGetRequestsQuery } from "../../redux/api/requestApiSlice";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useDeleteRequestMutation } from "../../redux/api/requestApiSlice";
import { toast } from "react-toastify";
import { useMarkRequestsSeenMutation } from "../../redux/api/requestApiSlice";
import { useState } from "react";
import UpdateRequestModal from "../../components/UpdateRequestList";
import PropTypes from "prop-types";

const EquipmentModal = ({ equipment, onClose }) => {
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

const RequestList = () => {
  const { data: requests, isLoading } = useGetRequestsQuery();
  const [deleteRequest] = useDeleteRequestMutation();
  const [markRequestsSeen] = useMarkRequestsSeenMutation();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [equipmentToShow, setEquipmentToShow] = useState(null);

  const handleRequestSeen = async (id) => {
    try {
      await markRequestsSeen(id).unwrap();
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  const deleteHandler = async (id) => {
    // "are you sure you want to delete this request?"
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        const res = await deleteRequest(id);
        toast.success(`Request ${res.data.username} deleted successfully`);
      } catch (error) {
        console.error("Error deleting request:", error);
      }
    }
  };
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center h-screen bg-slate-500">
      <h1 className="text-2xl mt-16">Requests List</h1>
      <table className="table-auto mt-16">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">USERNAME</th>
            <th className="px-4 py-2 text-left">CONTACT</th>
            <th className="px-4 py-2 text-left">DEPARTMENT</th>
            <th className="px-4 py-2 text-left">PLACE</th>
            <th className="px-4 py-2 text-left">OTHER</th>
            <th className="px-4 py-2 text-left">BLOCK </th>
            <th className="px-4 py-2 text-left">BIRO</th>
            <th className="px-4 py-2 text-left">REQUEST TYPE</th>
            <th className="px-4 py-2 text-left">DESCRIPTION</th>
            <th className="px-4 py-2 text-left">STATUS</th>
            <th className="px-4 py-2 text-left">EQUIPMENT</th>
            <th className="px-4 py-2 text-left">STM NUM</th>
            <th className="px-4 py-2 text-left">UPDATE</th>
            <th className="px-4 py-2 text-left">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {requests?.map((request) => (
            <tr key={request._id}>
              <td className="px-4 py-2 text-left">{request.username}</td>
              <td className="px-4 py-2 text-left">{request.contact}</td>
              <td className="px-4 py-2 text-left">{request.department}</td>
              <td className="px-4 py-2 text-left">{request.place}</td>
              <td className="px-4 py-2 text-left">{request.otherPlace}</td>
              <td className="px-8 py-2 text-left">{request.blockNumber}</td>
              <td className="px-8 py-2 text-left">{request.biroNumber}</td>
              <td className="px-4 py-2 text-left">{request.typeOfRequest}</td>
              <td className="px-4 py-2 text-left">{request.description}</td>
              <td className="px-4 py-2 text-left ">
                {
                  <p
                    className={`${
                      request.status === "Completed"
                        ? "bg-green-700 text-emerald-50 p-2 rounded px-8"
                        : "bg-red-700 text-rose-50 p-2 rounded px-8"
                    }`}
                  >
                    {request.status}
                  </p>
                }
              </td>
              <td className="px-4 py-2 text-left">
                {request.equipment?.length > 0 ? (
                  <button
                    onClick={() => setEquipmentToShow(request.equipment)}
                    className="text-sm bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    View Equipment
                  </button>
                ) : (
                  <p className="text-white p-2 bg-blue-700">No Equipment</p>
                )}
              </td>
              <td className="px-4 py-2 text-left">{request.systemNumber}</td>
              <td
                className="px-4 py-2 text-left"
                onClick={() => setSelectedRequest(request)}
              >
                <button className="text-sm rounded px-8 p-2">
                  <FaEdit className="text-white bg-orange-700" />
                </button>
              </td>
              <td className="px-4 py-2 text-left">
                <button
                  onClick={() => handleRequestSeen(request._id)}
                  className={`text-sm rounded px-2 p-2 ${
                    request.seenByAdmins
                      ? "bg-blue-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {request.seenByAdmins ? "Seen" : "Unseen"}
                </button>
              </td>
              <td>
                <div className="flex space-x-4">
                  <button
                    onClick={() => deleteHandler(request._id)}
                    className="bg-red-500 hover:bg-red-700 text-white rounded-md px-4 py-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRequest && (
        <UpdateRequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
      {equipmentToShow && (
        <EquipmentModal
          equipment={equipmentToShow}
          onClose={() => setEquipmentToShow(null)}
        />
      )}
    </div>
  );
};

export default RequestList;

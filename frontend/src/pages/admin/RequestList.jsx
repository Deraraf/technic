import { useGetRequestsQuery } from "../../redux/api/requestApiSlice";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useDeleteRequestMutation } from "../../redux/api/requestApiSlice";
import { toast } from "react-toastify";
import { useMarkRequestsSeenMutation } from "../../redux/api/requestApiSlice";
import { useState } from "react";
import UpdateRequestModal from "../../components/UpdateRequestList";
import EquipmentModal from "../../components/EquipmentModal";

const RequestList = () => {
  const { data: requests, isLoading } = useGetRequestsQuery();
  const [deleteRequest] = useDeleteRequestMutation();
  const [markRequestsSeen] = useMarkRequestsSeenMutation();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [equipmentToShow, setEquipmentToShow] = useState(null);
  const [professionalToShow, setProfessionalToShow] = useState([]);
  const [visibleRequests, setVisibleRequests] = useState(2);

  const handleRequestSeen = async (id) => {
    try {
      await markRequestsSeen(id).unwrap();
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  const deleteHandler = async (id) => {
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

  const paginationPage = requests?.slice(0, visibleRequests);
  const hasMoreRequests = visibleRequests < (requests?.length || 0);
  console.log(paginationPage);

  const handleSeeMore = () => {
    setVisibleRequests((prev) => prev + 2);
  };

  const handleViewLess = () => {
    setVisibleRequests((prev) => Math.max(prev - 2, 2));
  };
  const handleViewEquipment = (request) => {
    setEquipmentToShow(request.equipment);
    setProfessionalToShow(request.professional || []); // Ensure professionalToShow is updated
    console.log(request.equipment);
    console.log(request.professional);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-slate-500">
      <h1 className="text-2xl mt-16">Requests List</h1>
      {/* Table Layout (Hidden on Small Screens) */}
      <div className="mt-8 pb-36 w-full overflow-x-auto sm:block hidden">
        <table className="table-auto w-full border-collapse border border-slate-400">
          <thead className=" bg-gray-800 text-white">
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
            {paginationPage?.map((request) => (
              <tr key={request._id} className="border-t border-gray-300">
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
                          ? "bg-green-700 text-emerald-50 p-2 rounded"
                          : "bg-red-700 text-rose-50 p-2 rounded"
                      }`}
                    >
                      {request.status}
                    </p>
                  }
                </td>
                <td className="px-4 py-2 text-left">
                  {request.equipment?.length > 0 ? (
                    <button
                      onClick={() => handleViewEquipment(request)}
                      className="text-sm bg-green-500 hover:bg-green-700 ml-8 text-white px-4 py-2 rounded"
                    >
                      View
                    </button>
                  ) : (
                    <p className="text-white p-2 bg-blue-700">No Equipment</p>
                  )}
                </td>
                <td className="px-4 py-2 text-left">{request.systemNumber}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => setSelectedRequest(request)}
                    className="text-sm rounded px-8 p-2"
                  >
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
        <div className="mt-4 flex space-x-4 ml-8">
          {hasMoreRequests && (
            <button
              onClick={handleSeeMore}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              See More
            </button>
          )}
          {visibleRequests > 2 && (
            <button
              onClick={handleViewLess}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              View Less
            </button>
          )}
        </div>
      </div>
      {selectedRequest && (
        <UpdateRequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
      {equipmentToShow && (
        <EquipmentModal
          equipment={equipmentToShow}
          professional={professionalToShow}
          onClose={() => setEquipmentToShow(null)}
        />
      )}
      {/* Vertical layout for very small screens */}
      <div className="mt-8 w-full sm:hidden flex flex-col space-y-4">
        {requests?.map((request) => (
          <div
            key={request._id}
            className="border border-gray-300 rounded-md bg-white p-4"
          >
            <p>
              <strong>Username:</strong> {request.username}
            </p>
            <p>
              <strong>Contact:</strong> {request.contact}
            </p>
            <p>
              <strong>Department:</strong> {request.department}
            </p>
            <p>
              <strong>Place:</strong> {request.place}
            </p>
            <p>
              <strong>Other Place:</strong> {request.otherPlace}
            </p>
            <p>
              <strong>Block:</strong> {request.blockNumber}
            </p>
            <p>
              <strong>Biro:</strong> {request.biroNumber}
            </p>
            <p>
              <strong>Request Type:</strong> {request.typeOfRequest}
            </p>
            <p>
              <strong>Description:</strong> {request.description}
            </p>
            <p>
              <strong>Status:</strong> {request.status}
            </p>
            <p>
              <strong>Equipment:</strong>{" "}
              {request.equipment?.length > 0 ? (
                <button
                  onClick={() => handleViewEquipment(request)}
                  className="text-sm bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  View
                </button>
              ) : (
                "No Equipment"
              )}
            </p>
            <p>
              <strong>STM Num:</strong> {request.systemNumber}
            </p>
            <div className="flex space-x-4 mt-2">
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white rounded px-4 py-2"
                onClick={() => setSelectedRequest(request)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white rounded px-4 py-2"
                onClick={() => deleteHandler(request._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestList;

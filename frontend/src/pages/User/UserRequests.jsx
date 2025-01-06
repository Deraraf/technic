import { useGetUserRequestsQuery } from "../../redux/api/requestApiSlice";
import UpdateRequestModal from "../../components/UpdateRequestList";
import EquipmentModal from "../../components/EquipmentModal";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";

const UserRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [equipmentToShow, setEquipmentToShow] = useState(null);
  const [visibleRequests, setVisibleRequests] = useState(2);
  const [professionalToShow, setProfessionalToShow] = useState([]);

  const {
    data: requests,
    isLoading,
    isFetching,
    refetch,
  } = useGetUserRequestsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const paginationPage = requests?.slice(0, visibleRequests);
  const hasMoreRequests = visibleRequests < (requests?.length || 0);

  const handleSeeMore = () => {
    setVisibleRequests((prev) => prev + 2);
  };

  const handleViewLess = () => {
    setVisibleRequests((prev) => Math.max(prev - 2, 2));
  };
  const handleViewEquipment = (request) => {
    setEquipmentToShow(request.equipment);
    setProfessionalToShow(request.professional); // Pass professionals for the selected request
  };

  if (isLoading || isFetching) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center h-screen bg-slate-500">
      <h1 className="text-2xl mt-16">Your Requests List</h1>
      <div className="mt-8 pb-36 w-full overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-slate-400">
          <thead className="bg-gray-800 text-white">
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
              <th className="px-4 py-2 text-left">UPDATE</th>
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
                <td className="px-4 py-2 text-left">
                  {request.description.length > 19
                    ? request.description.slice(0, 19) + "..."
                    : request.description}
                </td>
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

                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => setSelectedRequest(request)}
                    className="text-sm rounded px-8 p-2"
                  >
                    <FaEdit className="text-white bg-orange-700" />
                  </button>
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
      {Array.isArray(equipmentToShow) && Array.isArray(professionalToShow) && (
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
              <strong>Description:</strong>{" "}
              {request.description.length > 19
                ? request.description.slice(0, 19) + "..."
                : request.description}
            </p>
            <p>
              <strong>Status:</strong> {request.status}
            </p>
            <p>
              <strong>Equipment:</strong>{" "}
              {request.equipment?.length > 0 ? (
                <button
                  onClick={() => setEquipmentToShow(request.equipment)}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRequests;

import { useEffect, useState } from "react";
import { useGetRequestsQuery } from "../../redux/api/requestApiSlice";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { useDeleteRequestMutation } from "../../redux/api/requestApiSlice";
import { toast } from "react-toastify";

const RequestList = () => {
  const [deleteRequest] = useDeleteRequestMutation();

  const deleteHandler = async (id) => {
    try {
      const res = await deleteRequest(id);
      console.log(res);
      toast.success(`Request ${res.data.username} deleted successfully`);
    } catch (error) {
      console.log(error);
    }
  };
  const { data: requests, isLoading } = useGetRequestsQuery();

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col items-center  h-screen bg-slate-500">
      <h1 className="text-2xl mt-16">Requests List</h1>
      <table className="table-auto mt-16 ">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">USERNAME</th>
            <th className="px-4 py-2 text-left">CONTACT</th>
            <th className="px-4 py-2 text-left">DEPARTMENT</th>
            <th className="px-4 py-2 text-left">PLACE</th>
            <th className="px-4 py-2 text-left">OTHER PLACE</th>
            <th className="px-4 py-2 text-left">BLOCK </th>
            <th className="px-4 py-2 text-left">BIRO</th>
            <th className="px-4 py-2 text-left">REQUEST</th>
            <th className="px-4 py-2 text-left">DESCRIPTION</th>
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
              <td className="px-4 py-2 text-left">{request.blockNumber}</td>
              <td className="px-4 py-2 text-left">{request.biroNumber}</td>
              <td className="px-4 py-2 text-left">{request.typeOfRequest}</td>
              <td className="px-4 py-2 text-left">{request.description}</td>
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
    </div>
  );
};

export default RequestList;

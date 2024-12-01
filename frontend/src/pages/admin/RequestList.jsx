import { useEffect, useState } from "react";
import { useGetRequestsQuery } from "../../redux/api/requestApiSlice";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

const RequestList = () => {
  const { data: requests, isLoading } = useGetRequestsQuery();
  console.log(requests);

  if (isLoading) return <div>Loading...</div>;
  return <div>RequestList</div>;
};

export default RequestList;

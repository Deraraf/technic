import { useEffect, useState } from "react";
import { useGetUsersQuery } from "../../redux/api/userApiSlice";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

const UserList = () => {
  const { data: users, isLoading } = useGetUsersQuery();

  useEffect(() => {
    console.log(users);
  }, [users]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col items-center justify-center h-[400px]">
      <h1>Users List</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">NAME</th>
            <th className="px-4 py-2 text-left">EMAIL</th>
            <th className="px-4 py-2 text-left">ADMIN</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "Yes" : "No"}</td>
              <td>
                <div className="flex space-x-4">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                    <FaEdit />
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md">
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

export default UserList;

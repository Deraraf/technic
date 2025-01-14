import { useEffect, useState } from "react";
import { useGetUsersQuery } from "../../redux/api/userApiSlice";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../redux/api/userApiSlice";
import { toast } from "react-toastify";

const UserList = () => {
  const [editableId, setEditableId] = useState("");
  const [editableName, setEditableName] = useState("");
  const [editableLastName, setEditableLastName] = useState("");
  const [editableEmail, setEditableEmail] = useState("");
  const [visibleUsers, setVisibleUsers] = useState(2);

  const { data: users, refetch } = useGetUsersQuery();
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    const confirmed = window.confirm(
      "are you sure you want to delete the user"
    );

    if (confirmed) {
      try {
        const res = await deleteUser(id);
        toast.success(`User ${res.data.username} deleted successfully`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateHandler = async (id) => {
    try {
      const res = await updateUser({
        userId: id,
        username: editableName,
        lastName: editableLastName,
        email: editableEmail,
      });

      setEditableId("");
      toast.success(`User ${res.data.username} updated successfully`);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleEdit = (id, username, lastName, email) => {
    setEditableId(id);
    setEditableName(username);
    setEditableLastName(lastName);
    setEditableEmail(email);
  };

  // Pagination logic
  const paginationPage = users?.slice(0, visibleUsers);
  const hasMoreUsers = visibleUsers < (users?.length || 0);

  const handleSeeMore = () => {
    setVisibleUsers((prev) => prev + 2);
  };

  const handleViewLess = () => {
    if (visibleUsers > 2) {
      setVisibleUsers((prev) => Math.max(prev - 2, 2));
    }
  };

  if (isLoadingUpdate) return <div>Loading...</div>;
  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-500 p-4">
      <h1 className="text-2xl mb-4">Users List</h1>
      {/* Table (Hidden on Small Screens) */}
      <div className="overflow-x-auto w-full sm:block hidden">
        <table className="table-auto w-full">
          <thead>
            <tr className="text-left">
              <th className="px-2 py-2 md:px-4">ID</th>
              <th className="px-2 py-2 md:px-4">Username</th>
              <th className="px-2 py-2 md:px-4">Last Name</th>
              <th className="px-2 py-2 md:px-4">Email</th>
              <th className="px-2 py-2 md:px-4">Admin</th>
              <th className="px-2 py-2 md:px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginationPage?.map((user) => (
              <tr key={user._id} className="border-b border-slate-400">
                <td className="px-2 py-2 md:px-4">{user._id}</td>
                <td className="px-2 py-2 md:px-4">
                  <div className="flex items-center justify-between">
                    {editableId === user._id ? (
                      <div>
                        <input
                          type="text"
                          value={editableName}
                          onChange={(e) => setEditableName(e.target.value)}
                          className="border-2 border-black rounded-md px-2 py-1"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full">
                        <span>{user.username}</span>
                        <button
                          onClick={() =>
                            toggleEdit(
                              user._id,
                              user.username,
                              user.lastName,
                              user.email
                            )
                          }
                          className="ml-2 bg-blue-500 hover:bg-blue-700  text-white  rounded-md px-2 py-1"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-2 py-2 md:px-4">
                  <div className="flex items-center justify-between">
                    {editableId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableLastName}
                          onChange={(e) => setEditableLastName(e.target.value)}
                          className="w-full p-1 border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-1 px-2 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full">
                        {user.lastName}
                        <button
                          onClick={() =>
                            toggleEdit(
                              user._id,
                              user.username,
                              user.lastName,
                              user.email
                            )
                          }
                          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white  rounded-md px-2 py-1"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-2 py-2 md:px-4">
                  <div className="flex items-center justify-between">
                    {editableId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="email"
                          value={editableEmail}
                          onChange={(e) => setEditableEmail(e.target.value)}
                          className="w-full p-1 border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-1 px-2 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full">
                        <span>{user.email}</span>
                        <button
                          onClick={() =>
                            toggleEdit(
                              user._id,
                              user.username,
                              user.lastName,
                              user.email
                            )
                          }
                          className="ml-2 bg-blue-500 hover:bg-blue-700  text-white  rounded-md px-2 py-1"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </div>
                </td>

                <td className="px-2 py-2 md:px-4 text-center">
                  {user.isAdmin ? (
                    <FaCheck className="text-green-500 mx-auto" />
                  ) : (
                    <FaTimes className="text-red-500 mx-auto" />
                  )}
                </td>
                <td className="px-2 py-2 md:px-4">
                  <div className="flex space-x-2 justify-center">
                    {!user.isAdmin && (
                      <button
                        onClick={() => deleteHandler(user._id)}
                        className="bg-red-500 hover:bg-red-700 text-white rounded-md px-2 py-1"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Vertical Layout for small screens */}
      <div className="sm:hidden w-full flex flex-col space-y-4 mt-8">
        {paginationPage?.map((user) => (
          <div
            key={user._id}
            className="bg-white border border-gray-300 rounded-md p-4"
          >
            <p>
              <strong>ID:</strong> {user._id}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Last Name:</strong> {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Admin:</strong>{" "}
              {user.isAdmin ? (
                <FaCheck className="text-green-500 inline-block" />
              ) : (
                <FaTimes className="text-red-500 inline-block" />
              )}
            </p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() =>
                  toggleEdit(user._id, user.username, user.lastName, user.email)
                }
                className="bg-blue-500 hover:bg-blue-700 text-white rounded px-2 py-1"
              >
                Edit
              </button>
              {!user.isAdmin && (
                <button
                  onClick={() => deleteHandler(user._id)}
                  className="bg-red-500 hover:bg-red-700 text-white rounded px-2 py-1"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        {hasMoreUsers && (
          <button
            onClick={handleSeeMore}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            See More
          </button>
        )}
        {visibleUsers > 2 && (
          <button
            onClick={handleViewLess}
            className="bg-red-500 text-white px-4 py-2  mt-4 rounded-lg"
          >
            View Less
          </button>
        )}
      </div>
    </div>
  );
};

export default UserList;

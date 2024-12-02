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
  const [editableEmail, setEditableEmail] = useState("");

  const { data: users, refetch } = useGetUsersQuery();
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    try {
      const res = await deleteUser(id);
      console.log(res.data.username);
      toast.success(`User ${res.data.username} deleted successfully`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = async (id) => {
    try {
      const res = await updateUser({
        userId: id,
        username: editableName,
        email: editableEmail,
      });
      console.log(res.data.username);
      setEditableId("");
      toast.success(`User ${res.data.username} updated successfully`);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableId(id);
    setEditableName(username);
    setEditableEmail(email);
  };

  if (isLoadingUpdate) return <div>Loading...</div>;
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-500">
      <h1>Users List</h1>
      <table className="table-auto ">
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
              <td className="px-4 py-2 text-left">{user._id}</td>
              <td className="px-4 py-2 text-left">
                {editableId === user._id ? (
                  <div>
                    <input
                      type="text"
                      value={editableName}
                      onChange={(e) => setEditableName(e.target.value)}
                      className="border-2 border-black rounded-md px-4 py-2"
                    />
                    <button onClick={() => updateHandler(user._id)}>
                      <FaCheck />
                    </button>
                  </div>
                ) : (
                  <>
                    {user.username}{" "}
                    <button
                      onClick={() =>
                        toggleEdit(user._id, user.username, user.email)
                      }
                      className="bg-blue-500 hover:bg-blue-700 ml-2 text-white  rounded-md"
                    >
                      {" "}
                      <FaEdit />
                    </button>
                  </>
                )}
              </td>
              <td className="px-4 py-2 text-left">
                {editableId === user._id ? (
                  <div className="flex items-center">
                    <input
                      type="email"
                      value={editableEmail}
                      onChange={(e) => setEditableEmail(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />
                    <button
                      onClick={() => updateHandler(user._id)}
                      className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                    >
                      <FaCheck />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    {user.email}{" "}
                    <button
                      onClick={() =>
                        toggleEdit(user._id, user.username, user.email)
                      }
                    >
                      <FaEdit className="ml-[1rem]" />
                    </button>
                  </div>
                )}
              </td>
              <td className="px-4 py-2 text-left">
                {user.isAdmin ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <FaTimes className="text-red-500" />
                )}
              </td>
              <td>
                <div className="flex space-x-4">
                  {!user.isAdmin && (
                    <button
                      onClick={() => deleteHandler(user._id)}
                      className="bg-red-500 hover:bg-red-700 text-white rounded-md px-4 py-2"
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
  );
};

export default UserList;

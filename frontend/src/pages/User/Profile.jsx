import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useProfileMutation,
  useGetProfileUserQuery,
} from "../../redux/api/userApiSlice";
import { setUserInfo } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { data: profileUser } = useGetProfileUserQuery();
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    console.log("profileUser in useEffect:", profileUser);
    if (profileUser) {
      setUsername(profileUser.username || "");
      setLastName(profileUser.lastName || "");
      setEmail(profileUser.email || "");
    }
  }, [profileUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      console.log("Data sent to updateProfile:", {
        username,
        lastName,
        email,
        password,
      });
      const res = await updateProfile({
        username,
        lastName,
        email,
        password,
      });
      console.log("update profile res:", res);
      if (res?.error) {
        return toast.error(res?.error?.data?.message);
      }

      if (res?.data?.message) {
        toast.info(res?.data?.message);
      } else {
        dispatch(setUserInfo({ ...res.data }));
        //Update local storage
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        toast.success(`${res?.data?.username} updated successfully`);
        //Update local state
        setUsername(res.data.username);
        setLastName(res.data.lastName);
        setEmail(res.data.email);
      }

      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  if (loadingUpdateProfile) return <div>Loading...</div>;

  return (
    <section className="flex flex-col h-screen items-center justify-center bg-slate-500 p-4">
      <h1 className="text-2xl mb-4 text-white bg-blue-600 px-8 py-2 sm:px-16 sm:py-4 rounded-lg">
        Update Your Credentials
      </h1>
      <div className="w-full max-w-md sm:max-w-lg">
        <form
          onSubmit={handleUpdate}
          className="flex flex-col items-center justify-center w-full bg-slate-800 rounded-lg p-4"
        >
          <input
            autoComplete="true"
            id="username"
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 p-2 w-full bg-transparent border border-white text-white rounded-xl"
          />
          <input
            autoComplete="true"
            id="lastName"
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            className="mb-4 p-2 w-full bg-transparent border border-white text-white rounded-xl"
          />
          <input
            autoComplete="true"
            id="email"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-2 w-full bg-transparent border border-white text-white rounded-xl"
          />
          <input
            autoComplete="true"
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 w-full bg-transparent border border-white text-white rounded-xl"
          />
          <button
            type="submit"
            className="text-xl text-white bg-blue-700 w-full sm:w-[300px] mt-4 mb-4 rounded-md py-2"
          >
            {loadingUpdateProfile ? "Loading..." : "Update"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Profile;

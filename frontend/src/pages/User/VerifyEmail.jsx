import { useParams, useNavigate } from "react-router-dom";
import { useVerifyEmailQuery } from "../../redux/api/userApiSlice"; // Import the hook from your userApiSlice
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useVerifyEmailQuery({ id, token });
  console.log(data);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <p className="text-center text-lg font-medium">Verifying email...</p>
        </div>
      </div>
    );
  }

  if (error) {
    toast.error(
      error?.data?.message || "An error occurred during email verification."
    );
  }

  const handleRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {data?.success ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600">
              Email Verified!
            </h2>
            <p className="mt-2">{data.message}</p>
            <button
              onClick={handleRedirect}
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">
              Verification Failed
            </h2>
            <p className="mt-2">The verification link is invalid or expired.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;

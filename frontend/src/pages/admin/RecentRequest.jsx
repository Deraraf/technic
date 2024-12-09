import { useGetRecentRequestsQuery } from "../../redux/api/requestApiSlice";
import { useMarkRequestsSeenMutation } from "../../redux/api/requestApiSlice";
const RecentRequests = () => {
  const { data: requests } = useGetRecentRequestsQuery();
  const [markRequestsSeen] = useMarkRequestsSeenMutation();

  const handleRequestSeen = async (id) => {
    try {
      await markRequestsSeen(id).unwrap();
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-500 p-4">
      <h1 className="text-xl font-bold mb-4">Recent Requests</h1>
      {requests?.length === 0 ? (
        <p>No recent requests.</p>
      ) : (
        <ul className="space-y-4 flex flex-wrap items-center justify-center">
          {requests?.map((request, index) => (
            <div
              key={index}
              className="p-4 border rounded shadow relative w-96 mr-8 "
            >
              <button
                onClick={() => handleRequestSeen(request._id)}
                className={`absolute top-2 right-2 text-sm rounded px-2 py-1 ${
                  request.seenByAdmins
                    ? "bg-blue-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {request.seenByAdmins ? "Seen" : "Unseen"}
              </button>

              <li className="space-y-2">
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
                  <strong>Type of Request:</strong> {request.typeOfRequest}
                </p>
                <p>
                  <strong>Description:</strong> {request.description}
                </p>
                <p>
                  <strong className="ml-16">Status:</strong>{" "}
                  <strong
                    className={
                      "absolute  right-[50%] text-sm rounded px-2 py-1 " +
                      `${request.seenByAdmins ? "bg-teal-600" : "bg-rose-500"}`
                    }
                  >
                    {request.seenByAdmins ? "Completed" : "pending"}
                  </strong>
                </p>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentRequests;

import { useSelector } from "react-redux";

const RecentRequests = () => {
  const { requests } = useSelector((state) => state.recentRequests);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-500">
      <h1 className="text-xl font-bold mb-4">Recent Requests</h1>
      {requests.length === 0 ? (
        <p>No recent requests.</p>
      ) : (
        <ul className="space-y-2">
          {requests.map((request, index) => (
            <li key={index} className="p-4 border rounded shadow">
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentRequests;

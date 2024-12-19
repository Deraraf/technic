import { useCountTotalRequestsQuery } from "../redux/api/requestApiSlice";
import { useCountPendingRequestsQuery } from "../redux/api/requestApiSlice";
import { useCountCompletedRequestsQuery } from "../redux/api/requestApiSlice";
import { useCountEquipmentQuery } from "../redux/api/requestApiSlice";
import { useGetLimitOfRequestsQuery } from "../redux/api/requestApiSlice";
import { Link } from "react-router-dom";
const Homepage = () => {
  const { data: totalRequests } = useCountTotalRequestsQuery();
  const { data: pendingRequests } = useCountPendingRequestsQuery();
  const { data: completedRequests } = useCountCompletedRequestsQuery();
  const { data: equipment } = useCountEquipmentQuery();
  const { data: limitOfRequests } = useGetLimitOfRequestsQuery();

  const totalEquipmentQuantity = [];
  equipment?.forEach((equipment) => {
    totalEquipmentQuantity.push(equipment.totalQuantity);
  });

  const lastEquipmentQuantity = totalEquipmentQuantity.reduce(
    (acc, curr) => acc + curr,
    0
  );

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="text-center py-12 bg-blue-100">
        <h1 className="text-4xl font-bold text-blue-600 mb-4 mt-3">
          Streamline Maintenance Requests with Ease
        </h1>
        <p className="text-lg mb-6">
          Submit and manage all your maintenance requests in one place.
        </p>
        <div className="space-x-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded">
            <Link to="/request">Submit a Request</Link>
          </button>
          <button className="bg-gray-700 text-white px-6 py-3 rounded">
            <Link to={"/worker-page"}> View Workers Page</Link>
          </button>
        </div>
      </section>

      {/* Dashboard Cards */}
      <section className="py-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Requests", count: totalRequests },
          {
            title: "Pending Requests",
            count: pendingRequests ? pendingRequests : 0,
          },
          {
            title: "Completed Requests",
            count: completedRequests ? completedRequests : 0,
          },
          {
            title: "Total Equipment Used",
            count: lastEquipmentQuantity ? lastEquipmentQuantity : 0,
          },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-lg p-4 text-center"
          >
            <h3 className="text-lg font-semibold text-gray-700">
              {card.title}
            </h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              {card.count}
            </p>
          </div>
        ))}
      </section>

      {/* Recent Requests */}
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Recent Requests
        </h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="table-auto w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Type of Request</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {limitOfRequests?.map(
                ({ _id, username, status, typeOfRequest, createdAt }) => (
                  <tr key={_id}>
                    <td className="border px-4 py-2">{username}</td>
                    <td className="border px-4 py-2">{typeOfRequest}</td>
                    <td className="border px-4 py-2">{status}</td>
                    <td className="border px-4 py-2">
                      {createdAt.split("T")[0]}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="text-right mt-4">
          <button className="text-blue-600 hover:underline">
            View All Requests
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 Technic Department. All rights reserved.</p>
        <p>Contact: +123-456-7890 | technic@department.com</p>
      </footer>
    </div>
  );
};

export default Homepage;

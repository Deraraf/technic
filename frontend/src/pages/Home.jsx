import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="text-center py-12 bg-blue-100">
        <h1 className="text-4xl font-bold text-blue-600 mb-4 mt-8">
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
            <Link to="/requests">View Requests</Link>
          </button>
        </div>
      </section>

      {/* Dashboard Cards */}
      <section className="py-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Requests", count: 120 },
          { title: "Pending Requests", count: 50 },
          { title: "Completed Requests", count: 70 },
          { title: "Total Equipment Used", count: 300 },
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
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="border px-4 py-2">User {i + 1}</td>
                  <td className="border px-4 py-2">Electric</td>
                  <td className="border px-4 py-2">Pending</td>
                  <td className="border px-4 py-2">2024-12-11</td>
                </tr>
              ))}
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

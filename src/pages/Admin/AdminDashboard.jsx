export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
         Dashboard
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Promotion Status */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">
            Promotion Status
          </h3>
          <p className="text-gray-600">
            Current Semester: 5th
          </p>
          <p className="text-green-600 font-medium mt-2">
            Eligible for Promotion
          </p>
        </div>

        {/* Tuition Fees */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">
            Tuition Fees
          </h3>
          <p className="text-gray-600">
            Status: Unpaid
          </p>
          <button className="mt-3 text-blue-600 font-medium">
            Pay Now →
          </button>
        </div>

        {/* Club Membership */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">
            Club Membership
          </h3>
          <p className="text-gray-600">
            Joined Clubs: 2
          </p>
          <button className="mt-3 text-blue-600 font-medium">
            View Clubs →
          </button>
        </div>

        {/* Certificates */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">
            Certificates
          </h3>
          <p className="text-gray-600">
            Available: 3
          </p>
          <button className="mt-3 text-blue-600 font-medium">
            Download →
          </button>
        </div>

      </div>
    </div>
  );
}

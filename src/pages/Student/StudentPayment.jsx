export default function Payments() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold">Payments</h1>

      {/* Current Semester Fee */}
      <div className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Semester Fee</h2>
          <p className="text-gray-600">Spring 2025</p>
        </div>

        <div className="text-right">
          <p className="text-xl font-bold text-red-600">৳ 12,000</p>
          <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full">
            Pending
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500 text-sm">Total Paid</p>
          <p className="text-xl font-bold">৳ 48,000</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500 text-sm">Due Amount</p>
          <p className="text-xl font-bold text-red-600">৳ 12,000</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500 text-sm">Last Payment</p>
          <p className="text-xl font-bold">৳ 6,000</p>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Payment History</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Date</th>
              <th>Semester</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-2">12 Jan 2025</td>
              <td>Fall 2024</td>
              <td>৳ 12,000</td>
              <td className="text-green-600 font-medium">Paid</td>
            </tr>

            <tr className="border-b">
              <td className="py-2">15 Aug 2024</td>
              <td>Summer 2024</td>
              <td>৳ 12,000</td>
              <td className="text-green-600 font-medium">Paid</td>
            </tr>

            <tr>
              <td className="py-2">10 Jan 2024</td>
              <td>Spring 2024</td>
              <td>৳ 12,000</td>
              <td className="text-green-600 font-medium">Paid</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

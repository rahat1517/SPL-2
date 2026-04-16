const paymentBatches = [
  { id: "PB-201", semester: "BSSE 1st Year", paid: 54, unpaid: 6, status: "Open" },
  { id: "PB-202", semester: "BSSE 2nd Year", paid: 49, unpaid: 11, status: "Review" },
  { id: "PB-203", semester: "BSSE 3rd Year", paid: 41, unpaid: 9, status: "Open" },
];

const scheduleTasks = [
  { id: 1, title: "Publish Summer payment schedule", due: "20 Apr 2026" },
  { id: 2, title: "Finalize late fee policy", due: "23 Apr 2026" },
  { id: 3, title: "Audit staff payment verification", due: "27 Apr 2026" },
];

export default function AdminFinancials() {
  return (
    <div className="space-y-6 max-w-6xl">
      <h1 className="text-2xl font-semibold">Financial Oversight</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="p-3">Batch ID</th>
              <th className="p-3">Semester</th>
              <th className="p-3">Paid</th>
              <th className="p-3">Unpaid</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentBatches.map((batch) => (
              <tr key={batch.id} className="border-t text-sm">
                <td className="p-3">{batch.id}</td>
                <td className="p-3">{batch.semester}</td>
                <td className="p-3">{batch.paid}</td>
                <td className="p-3">{batch.unpaid}</td>
                <td className="p-3">{batch.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-lg shadow p-5 space-y-3">
        <h2 className="text-lg font-semibold">Payment Schedule Tasks</h2>
        {scheduleTasks.map((task) => (
          <div key={task.id} className="border rounded px-4 py-3 flex justify-between items-center text-sm">
            <span>{task.title}</span>
            <span className="text-gray-500">Due: {task.due}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
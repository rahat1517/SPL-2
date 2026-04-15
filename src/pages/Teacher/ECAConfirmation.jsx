import { useMemo, useState } from "react";

const initialECARequests = [
  {
    id: "ECA-301",
    student: "Nafisa Rahman",
    roll: "BSSE-1705",
    purpose: "Research project materials",
    status: "pending",
  },
  {
    id: "ECA-302",
    student: "Rafiul Karim",
    roll: "BSSE-1802",
    purpose: "Programming contest travel",
    status: "pending",
  },
  {
    id: "ECA-303",
    student: "Tahmid Islam",
    roll: "BSSE-1709",
    purpose: "Department club workshop",
    status: "approved",
  },
];

export default function TeacherBudgetConfirmation() {
  const [requests, setRequests] = useState(initialECARequests);

  const handleStatus = (id, nextStatus) => {
    setRequests((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: nextStatus } : item
      )
    );
  };

  const summary = useMemo(() => {
    const pending = requests.filter((item) => item.status === "pending").length;
    const approved = requests.filter((item) => item.status === "approved").length;
    const rejected = requests.filter((item) => item.status === "rejected").length;

    return { pending, approved, rejected };
  }, [requests]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Extra Curricular Activity Certificate Confirmation</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500 text-sm">Pending Requests</p>
          <p className="text-2xl font-bold">{summary.pending}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500 text-sm">Approved</p>
          <p className="text-2xl font-bold text-green-600">{summary.approved}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500 text-sm">Rejected</p>
          <p className="text-2xl font-bold text-red-600">{summary.rejected}</p>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-sm font-semibold">Request ID</th>
              <th className="p-3 text-sm font-semibold">Student</th>
              <th className="p-3 text-sm font-semibold">Purpose</th>
              <th className="p-3 text-sm font-semibold">Status</th>
              <th className="p-3 text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((item) => (
              <tr key={item.id} className="border-b last:border-b-0">
                <td className="p-3 text-sm">{item.id}</td>
                <td className="p-3 text-sm">
                  <p className="font-medium">{item.student}</p>
                  <p className="text-gray-500">{item.roll}</p>
                </td>
                <td className="p-3 text-sm">{item.purpose}</td>
                <td className="p-3 text-sm capitalize">{item.status}</td>
                <td className="p-3 text-sm space-x-2">
                  <button
                    type="button"
                    onClick={() => handleStatus(item.id, "approved")}
                    className="px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatus(item.id, "rejected")}
                    className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
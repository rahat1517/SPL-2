import { useState } from "react";

const initialRequests = [
  {
    id: "TST-2026-01",
    student: "Nadia Islam",
    roll: "BSSE-1703",
    reason: "Higher studies application",
    status: "pending",
  },
  {
    id: "TST-2026-02",
    student: "Sabbir Hossain",
    roll: "BSSE-1808",
    reason: "Internship verification",
    status: "pending",
  },
  {
    id: "TST-2026-03",
    student: "Ayesha Sultana",
    roll: "BSSE-1609",
    reason: "Scholarship requirement",
    status: "issued",
  },
];

export default function StaffTestimonial() {
  const [requests, setRequests] = useState(initialRequests);

  const handleIssue = (id) => {
    setRequests((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "issued" } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Testimonial Processing</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-sm font-semibold">Request ID</th>
              <th className="p-3 text-sm font-semibold">Student</th>
              <th className="p-3 text-sm font-semibold">Reason</th>
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
                <td className="p-3 text-sm">{item.reason}</td>
                <td className="p-3 text-sm capitalize">{item.status}</td>
                <td className="p-3 text-sm">
                  <button
                    type="button"
                    onClick={() => handleIssue(item.id)}
                    className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                    disabled={item.status === "issued"}
                  >
                    {item.status === "issued" ? "Issued" : "Issue Testimonial"}
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
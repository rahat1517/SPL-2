const documentQueue = [
  {
    id: 1,
    student: "Ayan Rahman",
    request: "Testimonial",
    submitted: "11 Apr 2026",
    status: "Pending Staff Verification",
  },
  {
    id: 2,
    student: "Tasfia Jahan",
    request: "ECA Certificate",
    submitted: "10 Apr 2026",
    status: "Pending Teacher Confirmation",
  },
  {
    id: 3,
    student: "Mahdi Hasan",
    request: "Testimonial",
    submitted: "09 Apr 2026",
    status: "Ready for Issue",
  },
];

export default function AdminDocuments() {
  return (
    <div className="space-y-6 max-w-5xl">
      <h1 className="text-2xl font-semibold">Document Verification & Issue Monitoring</h1>

      <div className="space-y-3">
        {documentQueue.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-5">
            <h2 className="text-lg font-semibold">{item.request}</h2>
            <p className="text-sm text-gray-600 mt-1">Student: {item.student}</p>
            <p className="text-sm text-gray-500">Submitted: {item.submitted}</p>
            <p className="text-sm mt-2">Status: {item.status}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button className="px-3 py-2 border rounded hover:bg-gray-100">Verify</button>
              <button className="px-3 py-2 border rounded hover:bg-gray-100">Request Recheck</button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Issue Document</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
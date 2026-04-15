const stats = [
  { label: "Pending Payment Verifications", value: 18 },
  { label: "Pending Testimonials", value: 7 },
  { label: "Uploaded Notices", value: 5 },
  { label: "Upcoming Payment Schedules", value: 9 },
];

const recentTasks = [
  {
    id: 1,
    task: "Verify tuition payment batch for BSSE 2nd Year",
    deadline: "12 Apr 2026",
    priority: "High",
  },
  {
    id: 2,
    task: "Generate testimonial for Mahin Islam (BSSE-1904)",
    deadline: "13 Apr 2026",
    priority: "Medium",
  },
  {
    id: 3,
    task: "Issue ECA certificate for Debate Club event",
    deadline: "15 Apr 2026",
    priority: "Low",
  },
];

export default function StaffDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Staff Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item) => (
          <div key={item.label} className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-2xl font-bold mt-1">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

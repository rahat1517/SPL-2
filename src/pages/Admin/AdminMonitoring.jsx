const activityLog = [
  { id: 1, actor: "Super Admin", action: "Approved teacher account: nusrat@iit.du.ac.bd", time: "15 Apr 2026, 09:18" },
  { id: 2, actor: "Staff", action: "Verified payment batch PB-202", time: "15 Apr 2026, 08:42" },
  { id: 3, actor: "Teacher", action: "Published notice for BSSE 2nd Year", time: "14 Apr 2026, 16:22" },
  { id: 4, actor: "Student", action: "Submitted testimonial request", time: "14 Apr 2026, 14:03" },
];

const alerts = [
  "6 users are waiting for account approval.",
  "2 payment batches require manual verification.",
  "1 testimonial request exceeded standard processing time.",
];

export default function AdminMonitoring() {
  return (
    <div className="space-y-6 max-w-6xl">
      <h1 className="text-2xl font-semibold">Full-featured System Monitoring</h1>

      <div className="bg-white rounded-lg shadow p-5 space-y-3">
        <h2 className="text-lg font-semibold">Active Alerts</h2>
        {alerts.map((alert) => (
          <p key={alert} className="text-sm border rounded px-3 py-2 bg-yellow-50 border-yellow-200">
            {alert}
          </p>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
        <div className="space-y-2">
          {activityLog.map((entry) => (
            <div key={entry.id} className="border rounded px-4 py-3 text-sm">
              <p className="font-medium">{entry.actor}</p>
              <p className="text-gray-700">{entry.action}</p>
              <p className="text-gray-500 mt-1">{entry.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";

const initialPermissions = {
  student: ["Profile", "Payments", "Testimonial", "ECA Request", "Notices"],
  teacher: ["Student Fees View", "Budget Confirmation", "Notices", "ECA Confirmation"],
  staff: ["Payment Verification", "Testimonial Issue", "ECA Certificate", "Payment Schedule"],
  superadmin: ["All Student/Teacher/Staff Permissions", "User Approval", "Role Assignment", "System Monitoring"],
};

export default function AdminRoleAccess() {
  const [permissions, setPermissions] = useState(initialPermissions);
  const [newPermission, setNewPermission] = useState({
    student: "",
    teacher: "",
    staff: "",
    superadmin: "",
  });

  const addPermission = (role) => {
    const value = newPermission[role].trim();
    if (!value) return;

    setPermissions((prev) => ({
      ...prev,
      [role]: [...prev[role], value],
    }));

    setNewPermission((prev) => ({
      ...prev,
      [role]: "",
    }));
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <h1 className="text-2xl font-semibold">Role-Based Access Control</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(permissions).map(([role, items]) => (
          <div key={role} className="bg-white rounded-lg shadow p-5 space-y-3">
            <h2 className="text-lg font-semibold capitalize">{role} Permissions</h2>

            <ul className="space-y-2 text-sm text-gray-700">
              {items.map((item) => (
                <li key={item} className="border rounded px-3 py-2">{item}</li>
              ))}
            </ul>

            <div className="flex gap-2">
              <input
                value={newPermission[role]}
                onChange={(event) =>
                  setNewPermission((prev) => ({
                    ...prev,
                    [role]: event.target.value,
                  }))
                }
                className="border rounded px-3 py-2 flex-1"
                placeholder="Add permission"
              />
              <button
                onClick={() => addPermission(role)}
                className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
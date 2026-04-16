import { useEffect, useMemo, useState } from "react";
import { getAllUsers, updateUserById } from "../../utils/mockAuthService";

const statusOptions = ["pending", "approved", "rejected"];
const roleOptions = ["student", "teacher", "staff", "superadmin"];

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    setUsers(getAllUsers());
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const summary = useMemo(() => {
    const pending = users.filter((user) => user.status === "pending").length;
    const approved = users.filter((user) => user.status === "approved").length;
    const rejected = users.filter((user) => user.status === "rejected").length;
    return { pending, approved, rejected };
  }, [users]);

  const updateUser = (userId, updates) => {
    const response = updateUserById(userId, updates);
    if (response.ok) {
      loadUsers();
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <h1 className="text-2xl font-semibold">User & Role Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Pending Accounts</p>
          <p className="text-2xl font-bold">{summary.pending}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Approved Accounts</p>
          <p className="text-2xl font-bold">{summary.approved}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Rejected Accounts</p>
          <p className="text-2xl font-bold">{summary.rejected}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t text-sm">
                <td className="p-3">{user.firstName} {user.lastName}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <select
                    value={user.role}
                    onChange={(event) => updateUser(user.id, { role: event.target.value })}
                    className="border rounded px-2 py-1"
                  >
                    {roleOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3 capitalize">{user.status}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => updateUser(user.id, { status: option })}
                        className="px-3 py-1 border rounded hover:bg-gray-100 capitalize"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import { Link } from "react-router-dom";

/*export default function Sidebar({ role }) {
  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">AcademiX</h2>

      <nav className="space-y-2">
        <Link to={`/${role}/dashboard`} className="block hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>

        {role === "student" && (
          <>
            <Link to="/student/payments" className="block hover:bg-gray-700 p-2 rounded">
              Payments
            </Link>
            <Link to="/student/notices" className="block hover:bg-gray-700 p-2 rounded">
              Notices
            </Link>
          </>
        )}

        {role === "admin" && (
          <Link to="/admin/users" className="block hover:bg-gray-700 p-2 rounded">
            User Management
          </Link>
        )}
      </nav>
    </div>
  );
}*/

export default function Sidebar({ isOpen, closeSidebar }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 z-50
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <h2 className="text-xl font-bold mb-6">AcademiX</h2>

      <nav className="space-y-3">
        <Link
          to="/student/dashboard"
          className="block hover:bg-gray-700 p-2 rounded"
          onClick={closeSidebar}
        >
          Dashboard
        </Link>

        <Link
          to="/student/profile"
          className="block hover:bg-gray-700 p-2 rounded"
          onClick={closeSidebar}
        >
          Profile
        </Link>

        <Link
          to="/student/notices"
          className="block hover:bg-gray-700 p-2 rounded"
          onClick={closeSidebar}
        >
          Notices
        </Link>

        <Link
          to="/student/payments"
          className="block hover:bg-gray-700 p-2 rounded"
          onClick={closeSidebar}
        >
          Payments
        </Link>

        <Link
          to="/student/testimonial"
          className="block hover:bg-gray-700 p-2 rounded"
          onClick={closeSidebar}
        >
          Apply for Testimonial
        </Link>
        
      </nav>
    </div>
  );
}

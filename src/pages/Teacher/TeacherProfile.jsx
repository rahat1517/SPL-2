export default function Profile() {
  const teacherInfo = {
    name: "Nafiz Mahmud Fardin",
    designation: "Professor",
    email: "fardin@du.ac.bd",
    phone: "01751374937",
  };

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-semibold">Teacher Profile</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow p-6 flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
          NF
        </div>

        <div>
          <h2 className="text-xl font-semibold">{teacherInfo.name}</h2>
          <p className="text-gray-600">{teacherInfo.designation}</p>
          <p className="text-sm text-gray-500">
            Institute of Information Technology,
            <br /> University of Dhaka
          </p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input
              type="email"
              disabled
              value={teacherInfo.email}
              className="w-full mt-1 p-2 border rounded bg-gray-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-500">Phone</label>
            <input
              type="text"
              disabled
              value={teacherInfo.phone}
              className="w-full mt-1 p-2 border rounded bg-gray-100"
            />
          </div>

          {/* Department */}
          <div>
            <label className="text-sm text-gray-500">Department</label>
            <input
              type="text"
              disabled
              value="Software Engineering"
              className="w-full mt-1 p-2 border rounded bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


export default function Profile() {
  const studentInfo = {
    name : "Nafiz Mahmud Fardin",
    email : "bsse1528@iit.du.ac.bd",
    phone : "01954340973",
    roll : "1528",
    reg : "2022716325",
    Year : "BSSE-2nd Year"
  }
  
  return (
    <div className="max-w-4xl space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold">Student Profile</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow p-6 flex items-center gap-6">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
          NF
        </div>

        {/* Basic Info */}
        <div>
          <h2 className="text-xl font-semibold">{studentInfo.name}</h2>
          <p className="text-gray-600">BSc in Software Engineering</p>
          <p className="text-sm text-gray-500">
            Institute of Information Technology,
            <br /> University of Dhaka
          </p>
        </div>

      </div>

      {/* Profile Details */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Student Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input
              type="email"
              disabled
              value={studentInfo.email}
              className="w-full mt-1 p-2 border rounded bg-gray-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-500">Phone</label>
            <input
              type="text"
              disabled
              value={studentInfo.phone}
              
              className="w-full mt-1 p-2 border rounded bg-gray-100"
            />
          </div>

          {/* Roll */}
          <div>
            <label className="text-sm text-gray-500">Roll Number</label>
            <input
              type="text"
              disabled
              value={studentInfo.roll}
              className="w-full mt-1 p-2 border rounded bg-gray-100"
            />
          </div>

          {/* Registration */}
          <div>
            <label className="text-sm text-gray-500">
              DU Registration Number
            </label>
            <input
              type="text"
              disabled
              value={studentInfo.reg}
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

          {/* Batch */}
          <div>
            <label className="text-sm text-gray-500">Year</label>
            <input
              type="text"
              disabled
              value={studentInfo.Year}
              className="w-full mt-1 p-2 border rounded bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

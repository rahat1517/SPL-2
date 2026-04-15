

export default function StaffProfile() {
  
  const staffInfo = {
    name: "Rahim Ahmed",
    email: "staff@iit.du.ac.bd",
    phone : "01638856904",
    designation: "Administrative Officer",
    officeRoom: "IIT Building, Room 304",
    joiningDate: "01 Jan 2022",
  };

  return (
    <>
      <div className="max-w-4xl space-y-6">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold">Staff Profile</h1>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
            RA
          </div>

          {/* Basic Info */}
          <div>
            <h2 className="text-xl font-semibold">{staffInfo.name}</h2>
            <p className="text-gray-600">{staffInfo.designation}</p>
            <p className="text-sm text-gray-500">
              Institute of Information Technology,
              <br /> University of Dhaka
            </p>
          </div>

        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            Staff Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <input
                type="email"
                disabled
                value={staffInfo.email}
                className="w-full mt-1 p-2 border rounded bg-gray-100"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-gray-500">Phone</label>
              <input
                type="text"
                disabled
                value={staffInfo.phone}
                
                className= "w-full mt-1 p-2 border rounded bg-gray-100"
                
              />
            </div>

            {/* Designation */}
            <div>
              <label className="text-sm text-gray-500">
                Designation
              </label>
              <input
                type="text"
                disabled
                value={staffInfo.designation}
                className="w-full mt-1 p-2 border rounded bg-gray-100"
              />
            </div>

            {/* Office Room */}
            <div>
              <label className="text-sm text-gray-500">
                Office Room
              </label>
              <input
                type="text"
                disabled
                value={staffInfo.officeRoom}
                className="w-full mt-1 p-2 border rounded bg-gray-100"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
import { useState } from "react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showMessage,setShowMessage] = useState(false);
  const [phone,setPhone] = useState("01954-340973");
  const handleChanges = () => {
    setIsEditing(false);
    setShowMessage(false);
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
          <h2 className="text-xl font-semibold">Nafiz Mahmud Fardin</h2>
          <p className="text-gray-600">BSc in Software Engineering</p>
          <p className="text-sm text-gray-500">Institute of Information Technology,<br /> University of Dhaka</p>
        </div>

        {/* Edit Button */}
        <div className="ml-auto">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isEditing ? "Cancel" : "Change Contact Number"}
          </button>
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
              value="bsse1528@iit.du.ac.bd"
              className={`w-full mt-1 p-2 border rounded ${
                !isEditing && "bg-gray-100"
              }`}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-500">Phone</label>
            <input
              type="text"
              disabled={!isEditing}
              value={phone}
              onChange={(e)=> setPhone(e.target.value)}
              className={`w-full mt-1 p-2 border rounded ${
                !isEditing && "bg-gray-100"
              }`}
            />
          </div>

          {/* Roll */}
          <div>
            <label className="text-sm text-gray-500">Roll Number</label>
            <input
              type="text"
              disabled
              value="BSSE 1528"
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
              value="2022716325"
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
            <label className="text-sm text-gray-500">Batch</label>
            <input
              type="text"
              disabled
              value="15th"
              className="w-full mt-1 p-2 border rounded bg-gray-100"
            />
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="mt-6 text-right">
            <button onClick={() => setShowMessage(true)} className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Save Changes
            </button>
          </div>
        )}
        {showMessage && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Changes</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to save the changes?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowMessage(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                No
              </button>
              <button
                onClick={handleChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

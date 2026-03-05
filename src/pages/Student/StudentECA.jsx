import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentActivityCertificate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentId: "BSSE1528",
    fullName: "Nafiz Mahmud Fardin",
    registrationNo: "2021-1528",
    activityName: "",
    organizer: "",
    activityDate: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newApplication = {
      id: "ECA-" + Date.now(),
      type: "ECA Certificate",
      ...formData,
      status: "Pending Approval"
    };

    const existingApps =
      JSON.parse(localStorage.getItem("ecaApplications")) || [];

    existingApps.push(newApplication);

    localStorage.setItem(
      "ecaApplications",
      JSON.stringify(existingApps)
    );

    navigate("/student/confirmation");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-6">
          Apply for Extra Curricular Activity Certificate
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold">
              Student Information
            </h2>
          </div>

          <div>
            <label className="block text-sm mb-0.5">Student ID</label>
            <input
              value={formData.studentId}
              disabled
              className="border rounded p-2.5 w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm mb-0.5">Full Name</label>
            <input
              value={formData.fullName}
              disabled
              className="border rounded p-2.5 w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm mb-0.5">
              Registration Number
            </label>
            <input
              value={formData.registrationNo}
              disabled
              className="border rounded p-2.5 w-full bg-gray-100"
            />
          </div>

          <div className="md:col-span-2 mt-2">
            <h2 className="text-lg font-semibold">
              Activity Information
            </h2>
          </div>

          <div>
            <label className="block text-sm mb-1">
              Activity Name
            </label>
            <input
              name="activityName"
              onChange={handleChange}
              required
              className="border rounded p-2.5 w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Organizer
            </label>
            <input
              name="organizer"
              onChange={handleChange}
              required
              className="border rounded p-2.5 w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Activity Date
            </label>
            <input
              type="date"
              name="activityDate"
              onChange={handleChange}
              required
              className="border rounded p-2.5 w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              onChange={handleChange}
              className="border rounded p-3 w-full"
            />
          </div>

          <div className="md:col-span-2">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
              Submit Application
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default StudentActivityCertificate;
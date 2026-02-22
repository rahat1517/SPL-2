import React, { useState } from "react";

const ApplyTestimonial = () => {
  const [formData, setFormData] = useState({
    rollNo: "BSSE1528",
    fullName: "Nafiz Mahmud Fardin",
    registrationNo: "2022716325",
    batch: "15",
    purpose: "",
    deliveryType: "",
    notes: ""
  });

  const [applications, setApplications] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newApplication = {
      id: "TST-" + (applications.length + 1),
      date: new Date().toLocaleDateString(),
      status: "Pending",
      paymentStatus: "Unpaid",
      ...formData
    };

    setApplications([...applications, newApplication]);

    setFormData({
      ...formData,
      purpose: "",
      deliveryType: "",
      notes: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Apply for Testimonial
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ================= STUDENT INFO SECTION ================= */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-gray-700">
              Student Information
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              These details are automatically fetched from your profile.
            </p>
          </div>

          {/* Student ID */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              ROLL NUMBER
            </label>
            <input
              type="text"
              value={formData.rollNo}
              disabled
              className="input-style px-1 bg-gray-100"
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              disabled
              className="input-style px-1 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Registration No
            </label>
            <input
              type="text"
              value={formData.registrationNo}
              disabled
              className="input-style px-1 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Batch
            </label>
            <input
              type="text"
              value={formData.batch}
              disabled
              className="input-style px-1 bg-gray-100"
            />
          </div>

          <div className="md:col-span-2 mt-6">
            <h3 className="text-xl font-semibold text-gray-700">
              Application Details
            </h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Purpose
            </label>
            <select
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
              className="input-style"
            >
              <option value="">Select Purpose</option>
              <option value="Higher Study">Higher Study</option>
              <option value="Job">Job</option>
              <option value="Scholarship">Scholarship</option>
              <option value="Other">Other</option>
            </select>
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Delivery Type
            </label>
            <select
              name="deliveryType"
              value={formData.deliveryType}
              onChange={handleChange}
              required
              className="input-style"
            >
              <option value="">Select Delivery Type</option>
              <option value="Soft Copy">Soft Copy</option>
              <option value="Hard Copy">Hard Copy</option>
            </select>
          </div>

          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Additional Notes
            </label>
            <textarea
              name="notes"
              rows="4"
              placeholder="Write any additional information here..."
              value={formData.notes}
              onChange={handleChange}
              className="input-style"
            />
          </div>

        
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Submit Application
            </button>
          </div>

        </form>


        {applications.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">My Applications</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 text-left">
                    <th className="p-3">ID</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-t hover:bg-gray-50">
                      <td className="p-3">{app.id}</td>
                      <td className="p-3">{app.date}</td>
                      <td className="p-3 text-yellow-600 font-medium">
                        {app.status}
                      </td>
                      <td className="p-3 text-red-500 font-medium">
                        {app.paymentStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ApplyTestimonial;

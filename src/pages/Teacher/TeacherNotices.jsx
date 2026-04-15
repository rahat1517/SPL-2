import { useEffect, useState } from "react";
import { addTeacherNotice, readTeacherNotices } from "../../utils/noticeService";

const audienceOptions = [
  "All Students",
  "BSSE 1st Year",
  "BSSE 2nd Year",
  "BSSE 3rd Year",
  "BSSE 4th Year",
];

export default function TeacherNotices() {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [selectedAudiences, setSelectedAudiences] = useState([]);
  const [body, setBody] = useState("");

  const toggleAudience = (option) => {
    setSelectedAudiences((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handlePublish = (event) => {
    event.preventDefault();

    if (!title.trim() || selectedAudiences.length === 0 || !body.trim()) {
      return;
    }

    const nextNotice = {
      id: Date.now(),
      title: title.trim(),
      audiences: selectedAudiences,
      body: body.trim(),
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      source: "Teacher",
    };

    const updatedNotices = addTeacherNotice(nextNotice);
    setNotices(updatedNotices);
    setTitle("");
    setSelectedAudiences([]);
    setBody("");
  };

  useEffect(() => {
    setNotices(readTeacherNotices());
  }, []);

  return (
    <div className="space-y-6 max-w-5xl">
      <h1 className="text-2xl font-semibold">Teacher Notices</h1>

      <form onSubmit={handlePublish} className="bg-white rounded-lg shadow p-5 space-y-4">
        <h2 className="text-lg font-medium">Create Notice</h2>

        <div className="grid grid-cols-1 gap-4">
          <label className="flex flex-col text-sm gap-1">
            Title
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="border rounded px-3 py-2"
              placeholder="Enter notice title"
            />
          </label>
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">Audience</legend>
        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {audienceOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 border rounded px-3 py-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedAudiences.includes(option)}
                  onChange={() => toggleAudience(option)}
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
          
        </fieldset>

        <label className="flex flex-col text-sm gap-1">
          Details
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            className="border rounded px-3 py-2 min-h-28"
            placeholder="Write the full notice"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Publish Notice
        </button>
      </form>

      <div className="space-y-3">
        <h2 className="text-lg font-medium">Published Notices</h2>
        {notices.map((notice) => (
          <div key={notice.id} className="bg-white rounded-lg shadow p-5">
            <h3 className="text-base font-semibold">{notice.title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {(notice.audiences || []).join(", ")} • {notice.date}
            </p>
            <p className="text-sm text-gray-700 mt-3">{notice.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
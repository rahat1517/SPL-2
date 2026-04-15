const TEACHER_NOTICES_KEY = "academix-teacher-notices";

const seedTeacherNotices = [
  {
    id: 1,
    title: "Budget submission deadline for final-year projects",
    audiences: ["All Students"],
    date: "15 Mar 2026",
    body:
      "All final-year students must submit project-related budget requests through AcademiX by 22 March 2026.",
    source: "Teacher",
  },
  {
    id: 2,
    title: "Class makeup schedule update",
    audiences: ["BSSE 2nd Year"],
    date: "10 Mar 2026",
    body:
      "Due to a public holiday, two makeup classes will be held next week. Please check your class routine.",
    source: "Teacher",
  },
];

const notifyNoticesChanged = () =>
  window.dispatchEvent(new Event("academix-teacher-notices-changed"));

export const readTeacherNotices = () => {
  const parsed = JSON.parse(localStorage.getItem(TEACHER_NOTICES_KEY) || "null");

  if (!parsed || !Array.isArray(parsed)) {
    localStorage.setItem(TEACHER_NOTICES_KEY, JSON.stringify(seedTeacherNotices));
    return seedTeacherNotices;
  }

  return parsed;
};

export const addTeacherNotice = (notice) => {
  const previous = readTeacherNotices();
  const next = [notice, ...previous];
  localStorage.setItem(TEACHER_NOTICES_KEY, JSON.stringify(next));
  notifyNoticesChanged();
  return next;
};
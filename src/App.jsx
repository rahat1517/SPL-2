//import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import OtpVerification from "./pages/Auth/OtpVerification";
import Register from "./pages/Auth/Register";
import Submission from "./pages/Auth/Submission";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import StaffDashboard from "./pages/Staff/StaffDashboard";
import StudentConfirmation from "./pages/Student/StudentConfirmation";
import StudentDashboard from "./pages/Student/StudentDashboard";
import StudentActivityCertificate from "./pages/Student/StudentECA";
import StudentNotices from "./pages/Student/StudentNotices";
import StudentPayment from "./pages/Student/StudentPayment";
import StudentProfile from "./pages/Student/StudentProfile";
import StudentTestimonial from "./pages/Student/StudentTestimonial";

import TeacherProfile from "./pages/Teacher/TeacherProfile";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import MainLayout from "./layouts/MainLayout";
import BudgetConfirmation from "./pages/Teacher/BudgetConfirmation";
import ECAConfirmation from "./pages/Teacher/ECAConfirmation";
import TeacherNotices from "./pages/Teacher/TeacherNotices";
import StaffProfile from "./pages/Staff/StaffProfile";
import StaffNotices from "./pages/Staff/StaffNotices";
import StaffTestimonial from "./pages/Staff/StaffTestimonial";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submission" element={<Submission />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<StudentProfile />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="payments" element={<StudentPayment />} />
          <Route path="notices" element={<StudentNotices />} />
          <Route path="testimonial" element={<StudentTestimonial />} />
          <Route path="confirmation" element={<StudentConfirmation />} />
          <Route path="certificate" element={<StudentActivityCertificate />} />
        </Route>

        <Route path="/teacher" element={<MainLayout />}>
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="profile" element={<TeacherProfile />} />
          <Route path="budgetconfirmation" element={<BudgetConfirmation />} />
          <Route path="ecaconfirmation" element={<ECAConfirmation />} />
          <Route path="notices" element={<TeacherNotices />} />
        </Route>

        <Route path="/staff" element={<MainLayout />}>
          <Route path="dashboard" element={<StaffDashboard />} />
          <Route path="profile" element={<StaffProfile />} />
          <Route path="staffnotices" element={<StaffNotices />} />
          <Route path="testimonial" element={<StaffTestimonial />} />
        </Route>

        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/dashboard"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import ProtectedRoute from "./components/dashboard/ProtectedRoute";
import Resumes from "./pages/Resumes";
import DSASheet from "./pages/DSASheet";
import MockInterview from "./pages/MockInterview";
import DailyTasks from "./pages/DailyTasks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resumes"
        element={
          <ProtectedRoute>
            <Resumes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dsa-sheet"
        element={
          <ProtectedRoute>
            <DSASheet />
          </ProtectedRoute>
        }
      />

      <Route
        path="/daily-tasks"
        element={
          <ProtectedRoute>
            <DailyTasks />
          </ProtectedRoute>
        }
      />

      <Route path="/analytics" element={<Navigate to="/daily-tasks" replace />} />

      <Route
        path="/mock-interviews"
        element={
          <ProtectedRoute>
            <MockInterview />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

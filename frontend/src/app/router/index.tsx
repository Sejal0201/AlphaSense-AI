import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "@/app/layouts/DashboardLayout";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";

function LoginPage() {
  return (
    <h1 className="text-4xl font-bold">
      Login
    </h1>
  );
}

export function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        }
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />
    </Routes>
  );
}
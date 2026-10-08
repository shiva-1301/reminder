import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AppLayout from "./components/layout/AppLayout";
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const PrescriptionsPage = lazy(() => import("./pages/PrescriptionsPage"));
const RemindersPage = lazy(() => import("./pages/RemindersPage"));
const DrugDetailsPage = lazy(() => import("./pages/DrugDetailsPage"));
const DrugScanner = lazy(() => import("./pages/DrugScanner"));
const PharmaciesPage = lazy(() => import("./pages/PharmaciesPage"));
const SafetyAlertsPage = lazy(() => import("./pages/SafetyAlertsPage"));
import { getUser } from "./lib/auth";

function HomeRedirect() {
  return <Navigate to={getUser() ? "/dashboard" : "/login"} replace />;
}

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-live="polite">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-200 border-t-sky-500" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/prescriptions" element={<PrescriptionsPage />} />
          <Route path="/reminders" element={<RemindersPage />} />
          <Route path="/drugs" element={<DrugDetailsPage />} />
          <Route path="/scanner" element={<DrugScanner />} />
          <Route path="/pharmacies" element={<PharmaciesPage />} />
          <Route path="/alerts" element={<SafetyAlertsPage />} />
        </Route>
        <Route path="*" element={<HomeRedirect />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

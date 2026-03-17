import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthFormSplitScreenDemo from "./components/ui/demo";
import { SignupPage } from "./components/ui/sign-up-page";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import PrescriptionsPage from "./pages/PrescriptionsPage";
import RemindersPage from "./pages/RemindersPage";
import DrugDetailsPage from "./pages/DrugDetailsPage";
import DrugScanner from "./pages/DrugScanner";
import PharmaciesPage from "./pages/PharmaciesPage";
import SafetyAlertsPage from "./pages/SafetyAlertsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<AuthFormSplitScreenDemo />} />
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
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


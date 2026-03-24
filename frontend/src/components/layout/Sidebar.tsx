import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FileText,
  Bell,
  Pill,
  MapPin,
  ShieldAlert,
  ScanLine,
  LogOut,
  HeartPulse,
  X,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/profile", icon: User, label: "Profile" },
  { to: "/prescriptions", icon: FileText, label: "Prescriptions" },
  { to: "/reminders", icon: Bell, label: "Reminders" },
  { to: "/drugs", icon: Pill, label: "Drug Details" },
  { to: "/scanner", icon: ScanLine, label: "Drug Scanner" },
  { to: "/pharmacies", icon: MapPin, label: "Pharmacies" },
  { to: "/alerts", icon: ShieldAlert, label: "Safety Alerts" },
];

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ collapsed, mobileOpen, onMobileClose }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Overlay (mobile) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-60 flex-col bg-white shadow-xl transition-all duration-300 dark:bg-slate-950 md:relative md:translate-x-0 md:border-r md:border-sky-100 md:shadow-none dark:md:border-slate-800 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          collapsed ? "md:w-[72px]" : "md:w-[240px]"
        }`}
      >
        {/* Logo */}
        <div className={`flex items-center justify-between border-b border-sky-100 py-5 dark:border-slate-800 ${collapsed ? "px-3 md:px-4" : "px-6"}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 shadow-md shadow-sky-200">
              <HeartPulse className="h-5 w-5 text-white" />
            </div>
            <span
              className={`text-lg font-extrabold tracking-tight text-slate-800 transition-all duration-300 dark:text-slate-100 ${
                collapsed ? "md:w-0 md:opacity-0" : "md:w-auto md:opacity-100"
              }`}
            >
              Med<span className="text-sky-500">Rem</span>
            </span>
          </div>
          <button onClick={onMobileClose} className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden">
            <X className="h-5 w-5 text-slate-500 dark:text-slate-300" />
          </button>
        </div>

        {/* Nav */}
        <nav className={`flex-1 overflow-y-auto py-6 ${collapsed ? "px-2" : "px-4"}`}>
          <ul className="space-y-1">
            {navItems.map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onMobileClose}
                  className={({ isActive }) =>
                    `flex items-center rounded-xl py-2.5 text-sm font-medium transition-all duration-300 ${
                      collapsed ? "justify-center px-2" : "gap-3 px-4"
                    } ${
                      isActive
                        ? "bg-gradient-to-r from-sky-50 to-teal-50 text-sky-700 shadow-sm dark:from-slate-800 dark:to-slate-800 dark:text-sky-300"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    }`
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span
                    className={`whitespace-nowrap transition-all duration-300 ${
                      collapsed ? "md:w-0 md:opacity-0" : "md:w-auto md:opacity-100"
                    }`}
                  >
                    {label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className={`border-t border-sky-100 py-4 dark:border-slate-800 ${collapsed ? "px-2" : "px-4"}`}>
          <button
            onClick={handleLogout}
            className={`flex w-full items-center rounded-xl py-2.5 text-sm font-medium text-red-500 transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-950/40 ${
              collapsed ? "justify-center px-2" : "gap-3 px-4"
            }`}
          >
            <LogOut className="h-4 w-4" />
            <span
              className={`transition-all duration-300 ${
                collapsed ? "md:w-0 md:opacity-0" : "md:w-auto md:opacity-100"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

import { useState } from "react";
import { Menu, Bell, ChevronDown, HeartPulse, LogOut, User, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  sidebarCollapsed: boolean;
  onMobileMenuClick: () => void;
  onDesktopToggle: () => void;
}

export function Navbar({ sidebarCollapsed, onMobileMenuClick, onDesktopToggle }: NavbarProps) {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("user") ?? "User";
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-sky-100 bg-white/90 px-4 backdrop-blur-md transition-all duration-300 md:px-6 xl:px-8">
      {/* Left: hamburger + brand */}
      <div className="flex items-center gap-4">
        <button
          onClick={onDesktopToggle}
          className="hidden rounded-xl p-2 text-slate-500 transition-colors hover:bg-sky-50 md:inline-flex"
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
        </button>
        <button
          onClick={onMobileMenuClick}
          className="rounded-xl p-2 text-slate-500 hover:bg-sky-50 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 md:hidden">
          <HeartPulse className="h-5 w-5 text-sky-500" />
          <span className="font-extrabold text-slate-800">
            Med<span className="text-sky-500">Rem</span>
          </span>
        </div>
      </div>

      {/* Right: status chip + notification + profile */}
      <div className="ml-auto flex items-center gap-3">
        {/* Live chip */}
        <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 sm:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Live Monitoring
        </div>

        {/* Notification bell */}
        <button className="relative rounded-xl p-2 text-slate-500 hover:bg-sky-50">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-sky-50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-teal-400 text-xs font-bold text-white shadow-md">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <span className="hidden max-w-[120px] truncate text-sm font-medium text-slate-700 md:block">
              {userEmail}
            </span>
            <ChevronDown className="hidden h-4 w-4 text-slate-400 md:block" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-48 rounded-2xl border border-sky-100 bg-white py-2 shadow-xl">
              <button
                onClick={() => { navigate("/profile"); setDropdownOpen(false); }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-sky-50"
              >
                <User className="h-4 w-4 text-sky-500" />
                My Profile
              </button>
              <hr className="my-1 border-sky-50" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

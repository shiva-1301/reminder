import { Suspense, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { getUser } from "@/lib/auth";

export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const user = getUser();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50/30 to-teal-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Navbar
          sidebarCollapsed={sidebarCollapsed}
          onDesktopToggle={() => setSidebarCollapsed((v) => !v)}
          onMobileMenuClick={() => setMobileSidebarOpen(true)}
        />
        <main id="main-content" className="flex flex-1 flex-col overflow-y-auto px-4 py-4 md:px-6 md:py-6 xl:px-8">
          <div className="mx-auto w-full max-w-7xl flex-1">
            <Suspense
              fallback={
                <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-live="polite">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-200 border-t-sky-500" />
                  <span className="sr-only">Loading page…</span>
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
          <footer className="mx-auto mt-10 flex w-full max-w-7xl flex-col items-center justify-between gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row">
            <p>&copy; {new Date().getFullYear()} MedRem. Built to help you stay on track.</p>
            <p>Not a substitute for professional medical advice.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

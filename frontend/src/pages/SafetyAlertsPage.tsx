import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, ShieldCheck, AlertTriangle, Bell, X, Filter } from "lucide-react";

type Severity = "high" | "medium" | "low";

interface Alert {
  id: number;
  title: string;
  description: string;
  severity: Severity;
  date: string;
  read: boolean;
}

const initialAlerts: Alert[] = [
  {
    id: 1,
    title: "Critical Drug Interaction Detected",
    description: "Metformin + Alcohol combination detected in your prescription list. This can cause severe lactic acidosis. Consult your doctor immediately.",
    severity: "high",
    date: "Today, 9:15 AM",
    read: false,
  },
  {
    id: 2,
    title: "Missed Dosage Alert",
    description: "You missed your Atorvastatin 20mg evening dose yesterday. Consistent dosing is important for cholesterol management.",
    severity: "medium",
    date: "Yesterday, 8:00 PM",
    read: false,
  },
  {
    id: 3,
    title: "Prescription Expiring Soon",
    description: "Your prescription for Lisinopril 10mg is due for renewal in 5 days. Schedule a doctor's appointment.",
    severity: "medium",
    date: "Jun 10, 2025",
    read: true,
  },
  {
    id: 4,
    title: "Medication Reminder Set Successfully",
    description: "Your reminder for Amoxicillin 500mg (3x daily) has been activated. You'll receive notifications at 8 AM, 2 PM, and 8 PM.",
    severity: "low",
    date: "Jun 9, 2025",
    read: true,
  },
  {
    id: 5,
    title: "New Drug Recall Notice",
    description: "Batch #XR-2045 of Metformin 500mg (Sun Pharma) has been recalled due to contamination. Check your medicine cabinet immediately.",
    severity: "high",
    date: "Jun 8, 2025",
    read: false,
  },
];

const severityConfig: Record<Severity, { label: string; bg: string; border: string; badge: string; badgeText: string; icon: typeof ShieldAlert }> = {
  high: {
    label: "High Risk",
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100",
    badgeText: "text-red-700",
    icon: ShieldAlert,
  },
  medium: {
    label: "Moderate",
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100",
    badgeText: "text-amber-700",
    icon: AlertTriangle,
  },
  low: {
    label: "Informational",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    badge: "bg-emerald-100",
    badgeText: "text-emerald-700",
    icon: ShieldCheck,
  },
};

const item = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };

export default function SafetyAlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [filter, setFilter] = useState<Severity | "all">("all");

  const markRead = (id: number) =>
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));

  const dismiss = (id: number) =>
    setAlerts((prev) => prev.filter((a) => a.id !== id));

  const markAllRead = () =>
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));

  const filtered = filter === "all" ? alerts : alerts.filter((a) => a.severity === filter);
  const unreadCount = alerts.filter((a) => !a.read).length;

  const counts: Record<string, number> = {
    all: alerts.length,
    high: alerts.filter((a) => a.severity === "high").length,
    medium: alerts.filter((a) => a.severity === "medium").length,
    low: alerts.filter((a) => a.severity === "low").length,
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
      className="w-full space-y-6"
    >
      <motion.div variants={item} className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Safety Alerts</h1>
          <p className="text-sm text-slate-500">Monitor drug interactions, recalls, and health warnings.</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 rounded-xl bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-600 hover:bg-sky-100 transition-colors"
          >
            <Bell className="h-3.5 w-3.5" />
            Mark all read ({unreadCount})
          </button>
        )}
      </motion.div>

      {/* Summary chips */}
      <motion.div variants={item} className="grid grid-cols-4 gap-3">
        {(["all", "high", "medium", "low"] as const).map((f) => {
          const colors: Record<string, string> = {
            all: "border-sky-200 bg-sky-50 text-sky-700",
            high: "border-red-200 bg-red-50 text-red-700",
            medium: "border-amber-200 bg-amber-50 text-amber-700",
            low: "border-emerald-200 bg-emerald-50 text-emerald-700",
          };
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex flex-col items-center rounded-2xl border py-3 text-xs font-bold transition-all ${colors[f]} ${
                filter === f ? "ring-2 ring-offset-1 ring-sky-400" : "opacity-70 hover:opacity-100"
              }`}
            >
              <Filter className="mb-1 h-4 w-4" />
              <span className="capitalize">{f === "all" ? "All" : severityConfig[f].label}</span>
              <span className="text-lg font-extrabold leading-tight">{counts[f]}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Alert list */}
      <motion.div variants={item} className="space-y-3">
        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-dashed border-sky-200 bg-white py-12 text-center text-sm text-slate-400"
            >
              <ShieldCheck className="mx-auto mb-3 h-8 w-8 opacity-30" />
              No alerts in this category.
            </motion.div>
          ) : (
            filtered.map((alert) => {
              const cfg = severityConfig[alert.severity];
              const Icon = cfg.icon;
              return (
                <motion.div
                  key={alert.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className={`relative rounded-2xl border p-4 shadow-sm transition-shadow hover:shadow-md ${cfg.bg} ${cfg.border} ${
                    alert.read ? "opacity-70" : ""
                  }`}
                >
                  {!alert.read && (
                    <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-sky-500 ring-2 ring-white" />
                  )}
                  <div className="flex items-start gap-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${cfg.badge}`}>
                      <Icon className={`h-5 w-5 ${cfg.badgeText}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex flex-wrap items-center gap-2">
                        <p className="font-bold text-slate-900">{alert.title}</p>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${cfg.badge} ${cfg.badgeText}`}>
                          {cfg.label}
                        </span>
                      </div>
                      <p className="mb-2 text-sm text-slate-600 leading-relaxed">{alert.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">{alert.date}</span>
                        <div className="flex gap-2">
                          {!alert.read && (
                            <button
                              onClick={() => markRead(alert.id)}
                              className="text-xs font-semibold text-sky-600 hover:underline"
                            >
                              Mark read
                            </button>
                          )}
                          <button
                            onClick={() => dismiss(alert.id)}
                            className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-slate-500 hover:bg-black/5 transition-colors"
                          >
                            <X className="h-3 w-3" /> Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

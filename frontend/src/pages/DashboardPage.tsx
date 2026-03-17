import { motion } from "framer-motion";
import {
  FileText,
  Bell,
  Pill,
  Activity,
  HeartPulse,
  Clock,
  ChevronRight,
} from "lucide-react";

const summaryCards = [
  {
    title: "Total Prescriptions",
    value: "12",
    icon: FileText,
    color: "from-sky-400 to-sky-600",
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-100",
  },
  {
    title: "Active Reminders",
    value: "5",
    icon: Bell,
    color: "from-teal-400 to-teal-600",
    bg: "bg-teal-50",
    text: "text-teal-700",
    border: "border-teal-100",
  },
  {
    title: "Saved Drugs",
    value: "28",
    icon: Pill,
    color: "from-violet-400 to-violet-600",
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-100",
  },
];

const recentActivity = [
  { id: 1, type: "Prescription", name: "Amoxicillin 500mg", date: "Mar 15, 2026", status: "Active" },
  { id: 2, type: "Reminder", name: "Metformin – 8:00 AM", date: "Mar 14, 2026", status: "Upcoming" },
  { id: 3, type: "Prescription", name: "Atorvastatin 20mg", date: "Mar 12, 2026", status: "Completed" },
  { id: 4, type: "Reminder", name: "Lisinopril – 9:00 PM", date: "Mar 11, 2026", status: "Active" },
];

const statusColor: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Upcoming: "bg-sky-50 text-sky-700 border-sky-200",
  Completed: "bg-slate-100 text-slate-500 border-slate-200",
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const userEmail = localStorage.getItem("user") ?? "User";
  const userName = userEmail.split("@")[0];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className="space-y-6"
    >
      {/* Welcome header */}
      <motion.div variants={item} className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
            Good morning, <span className="text-sky-600 capitalize">{userName}</span> 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">Here's your health activity overview.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700 shadow-sm">
          <Activity className="h-4 w-4" />
          Heart Rate: 78 BPM
        </div>
      </motion.div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {summaryCards.map((card) => (
          <motion.div
            key={card.title}
            variants={item}
            className={`rounded-2xl border ${card.border} ${card.bg} p-5 shadow-sm`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-sm font-medium ${card.text}`}>{card.title}</p>
                <p className="mt-2 text-4xl font-extrabold text-slate-800">{card.value}</p>
              </div>
              <div className={`rounded-xl bg-gradient-to-br ${card.color} p-3 shadow-md`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Status indicators */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Live Monitoring", value: "Active", icon: HeartPulse, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
          { label: "Next Reminder", value: "8:00 AM", icon: Clock, color: "text-sky-600 bg-sky-50 border-sky-200" },
          { label: "Emergency Status", value: "Ready", icon: Activity, color: "text-teal-600 bg-teal-50 border-teal-200" },
        ].map((s) => (
          <motion.div key={s.label} variants={item} className={`flex items-center gap-4 rounded-2xl border p-4 ${s.color.split(" ").slice(1).join(" ")}`}>
            <div className={`rounded-xl p-2 ${s.color.split(" ")[0]} ${s.color.split(" ")[1]}`}>
              <s.icon className={`h-5 w-5 ${s.color.split(" ")[0]}`} />
            </div>
            <div>
              <p className="text-xs text-slate-500">{s.label}</p>
              <p className={`font-bold ${s.color.split(" ")[0]}`}>{s.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent activity */}
      <motion.div variants={item} className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800">Recent Activity</h2>
          <button className="flex items-center gap-1 text-xs font-medium text-sky-600 hover:underline">
            View all <ChevronRight className="h-3 w-3" />
          </button>
        </div>
        <div className="space-y-3">
          {recentActivity.map((act) => (
            <div key={act.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-teal-400">
                  {act.type === "Prescription" ? (
                    <FileText className="h-4 w-4 text-white" />
                  ) : (
                    <Bell className="h-4 w-4 text-white" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{act.name}</p>
                  <p className="text-xs text-slate-400">{act.type} · {act.date}</p>
                </div>
              </div>
              <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColor[act.status]}`}>
                {act.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

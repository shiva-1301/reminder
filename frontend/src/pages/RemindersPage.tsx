import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Plus, Trash2, Clock, Pill, ToggleLeft, ToggleRight } from "lucide-react";

interface Reminder {
  id: number;
  medicine: string;
  dosage: string;
  time: string;
  active: boolean;
}

const initialReminders: Reminder[] = [
  { id: 1, medicine: "Metformin", dosage: "500mg", time: "08:00", active: true },
  { id: 2, medicine: "Lisinopril", dosage: "10mg", time: "21:00", active: true },
  { id: 3, medicine: "Atorvastatin", dosage: "20mg", time: "22:00", active: false },
];

const item = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [form, setForm] = useState({ medicine: "", dosage: "", time: "" });
  const [error, setError] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.medicine.trim() || !form.dosage.trim() || !form.time) {
      setError("All fields are required.");
      return;
    }
    setError("");
    setReminders((r) => [
      { ...form, id: Date.now(), active: true },
      ...r,
    ]);
    setForm({ medicine: "", dosage: "", time: "" });
  };

  const handleDelete = (id: number) =>
    setReminders((r) => r.filter((x) => x.id !== id));

  const toggleActive = (id: number) =>
    setReminders((r) =>
      r.map((x) => (x.id === id ? { ...x, active: !x.active } : x))
    );

  const fmt12 = (t: string) => {
    if (!t) return "";
    const [h, m] = t.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  const inputBase =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition-all focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className="w-full space-y-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-extrabold text-slate-900">Reminders</h1>
        <p className="text-sm text-slate-500">Set and manage your medicine reminders.</p>
      </motion.div>

      {/* Add form */}
      <motion.div variants={item} className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-bold text-slate-800 flex items-center gap-2">
          <Plus className="h-4 w-4 text-sky-500" /> New Reminder
        </h2>
        {error && (
          <p className="mb-3 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
        )}
        <form onSubmit={handleAdd} className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">Medicine Name</label>
            <input
              className={inputBase}
              placeholder="e.g. Metformin"
              value={form.medicine}
              onChange={(e) => setForm((f) => ({ ...f, medicine: e.target.value }))}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">Dosage</label>
            <input
              className={inputBase}
              placeholder="e.g. 500mg"
              value={form.dosage}
              onChange={(e) => setForm((f) => ({ ...f, dosage: e.target.value }))}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">Time</label>
            <input
              type="time"
              className={inputBase}
              value={form.time}
              onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
            />
          </div>
          <div className="sm:col-span-3">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-200 hover:bg-sky-700"
            >
              <Bell className="h-4 w-4" /> Add Reminder
            </button>
          </div>
        </form>
      </motion.div>

      {/* Reminder list */}
      <motion.div variants={item} className="space-y-3">
        <AnimatePresence>
          {reminders.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-sky-200 bg-white py-10 text-center text-sm text-slate-400">
              No reminders yet. Add one above!
            </p>
          ) : (
            reminders.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className={`flex items-center gap-4 rounded-2xl border p-4 shadow-sm transition-all ${
                  r.active
                    ? "border-sky-100 bg-white"
                    : "border-slate-100 bg-slate-50 opacity-60"
                }`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    r.active
                      ? "bg-gradient-to-br from-sky-400 to-teal-500 shadow-md shadow-sky-200"
                      : "bg-slate-200"
                  }`}
                >
                  <Pill className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 truncate">{r.medicine}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{r.dosage}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {fmt12(r.time)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleActive(r.id)}
                    title={r.active ? "Deactivate" : "Activate"}
                    className="text-slate-400 hover:text-sky-600"
                  >
                    {r.active ? (
                      <ToggleRight className="h-6 w-6 text-sky-500" />
                    ) : (
                      <ToggleLeft className="h-6 w-6" />
                    )}
                  </button>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      r.active
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {r.active ? "Active" : "Inactive"}
                  </span>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="rounded-lg border border-red-100 bg-white p-1.5 text-red-400 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

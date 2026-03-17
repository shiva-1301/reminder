import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Droplets, CalendarDays, Stethoscope, Phone, BookOpen, Save, Pencil } from "lucide-react";

const defaultProfile = {
  name: "Alex Johnson",
  email: localStorage.getItem("user") ?? "alex@example.com",
  age: "32",
  bloodGroup: "O+",
  medicalHistory: "Hypertension, Type-2 Diabetes",
  doctorName: "Dr. Sarah Patel",
  doctorContact: "+1 800-555-0199",
};

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(defaultProfile);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputBase =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition-all focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100 disabled:opacity-60";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6"
    >
      {/* Header card */}
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50 to-teal-50 p-6 shadow-sm sm:flex-row">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-teal-500 text-3xl font-extrabold text-white shadow-lg">
          {form.name.charAt(0).toUpperCase()}
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-xl font-extrabold text-slate-900">{form.name}</h1>
          <p className="text-sm text-slate-500">{form.email}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
            <span className="rounded-full border border-sky-200 bg-white px-3 py-0.5 text-xs font-semibold text-sky-700">
              {form.bloodGroup}
            </span>
            <span className="rounded-full border border-teal-200 bg-white px-3 py-0.5 text-xs font-semibold text-teal-700">
              Age {form.age}
            </span>
          </div>
        </div>
        <div className="ml-auto flex gap-2">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-sky-200 hover:bg-sky-700"
            >
              <Pencil className="h-4 w-4" /> Edit
            </button>
          ) : (
            <>
              <button
                onClick={() => setEditing(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-teal-200 hover:bg-teal-700"
              >
                <Save className="h-4 w-4" /> Save
              </button>
            </>
          )}
        </div>
      </div>

      {saved && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          ✓ Profile updated successfully.
        </div>
      )}

      {/* Form grid */}
      <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-slate-400">Personal Details</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            { name: "name", label: "Full Name", icon: User },
            { name: "email", label: "Email Address", icon: Mail },
            { name: "age", label: "Age", icon: CalendarDays },
          ].map(({ name, label, icon: Icon }) => (
            <div key={name}>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <Icon className="h-3.5 w-3.5" /> {label}
              </label>
              <input
                name={name}
                value={(form as any)[name]}
                onChange={handleChange}
                disabled={!editing}
                className={inputBase}
              />
            </div>
          ))}

          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <Droplets className="h-3.5 w-3.5" /> Blood Group
            </label>
            <select
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              disabled={!editing}
              className={inputBase}
            >
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5">
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <BookOpen className="h-3.5 w-3.5" /> Medical History
          </label>
          <textarea
            name="medicalHistory"
            value={form.medicalHistory}
            onChange={handleChange}
            disabled={!editing}
            rows={3}
            className={inputBase + " resize-none"}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-slate-400">Doctor Information</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            { name: "doctorName", label: "Doctor Name", icon: Stethoscope },
            { name: "doctorContact", label: "Contact Number", icon: Phone },
          ].map(({ name, label, icon: Icon }) => (
            <div key={name}>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <Icon className="h-3.5 w-3.5" /> {label}
              </label>
              <input
                name={name}
                value={(form as any)[name]}
                onChange={handleChange}
                disabled={!editing}
                className={inputBase}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

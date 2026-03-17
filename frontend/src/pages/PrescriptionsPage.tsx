import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Upload, Eye, Trash2, CalendarDays, CloudUpload } from "lucide-react";

interface Prescription {
  id: number;
  name: string;
  date: string;
  size: string;
}

const initial: Prescription[] = [
  { id: 1, name: "Prescription_Mar2026.pdf", date: "Mar 15, 2026", size: "245 KB" },
  { id: 2, name: "LabReport_Diabetes.pdf", date: "Mar 10, 2026", size: "1.2 MB" },
  { id: 3, name: "Cardiology_Followup.pdf", date: "Feb 28, 2026", size: "512 KB" },
];

const item = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(initial);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFile = (file: File) => {
    const kb = Math.round(file.size / 1024);
    const size = kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
    setPrescriptions((p) => [
      { id: Date.now(), name: file.name, date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), size },
      ...p,
    ]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    Array.from(e.dataTransfer.files).forEach(addFile);
  };

  const handleDelete = (id: number) =>
    setPrescriptions((p) => p.filter((x) => x.id !== id));

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
      className="w-full space-y-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-extrabold text-slate-900">Prescriptions</h1>
        <p className="text-sm text-slate-500">Manage and view your uploaded prescriptions.</p>
      </motion.div>

      {/* Upload zone */}
      <motion.div
        variants={item}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
          dragging
            ? "border-sky-400 bg-sky-50"
            : "border-sky-200 bg-white hover:border-sky-400 hover:bg-sky-50/50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => {
            Array.from(e.target.files ?? []).forEach(addFile);
            e.target.value = "";
          }}
          multiple
        />
        <CloudUpload className="mx-auto mb-3 h-10 w-10 text-sky-400" />
        <p className="font-semibold text-slate-700">Drag & drop files here, or click to upload</p>
        <p className="mt-1 text-xs text-slate-400">PDF, JPG, PNG · Max 10 MB per file</p>
      </motion.div>

      {/* List */}
      <motion.div variants={item} className="rounded-2xl border border-sky-100 bg-white shadow-sm">
        <div className="border-b border-sky-50 px-5 py-4">
          <h2 className="font-bold text-slate-800">
            Uploaded Prescriptions
            <span className="ml-2 rounded-full bg-sky-100 px-2.5 py-0.5 text-xs text-sky-700">
              {prescriptions.length}
            </span>
          </h2>
        </div>
        <AnimatePresence>
          {prescriptions.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-slate-400">No prescriptions uploaded yet.</p>
          ) : (
            prescriptions.map((rx) => (
              <motion.div
                key={rx.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-4 border-b border-slate-50 px-5 py-4 last:border-b-0 hover:bg-sky-50/30"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100">
                  <FileText className="h-5 w-5 text-sky-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{rx.name}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" /> {rx.date}
                    </span>
                    <span>{rx.size}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 rounded-lg border border-sky-200 bg-white px-3 py-1.5 text-xs font-medium text-sky-600 shadow-sm hover:bg-sky-50">
                    <Eye className="h-3.5 w-3.5" /> View
                  </button>
                  <button
                    onClick={() => handleDelete(rx.id)}
                    className="rounded-lg border border-red-100 bg-white p-1.5 text-red-400 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
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

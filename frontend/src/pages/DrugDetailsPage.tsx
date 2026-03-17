import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Pill, X, ChevronRight, AlertTriangle, Info, FlaskConical, Zap } from "lucide-react";

interface Drug {
  id: number;
  name: string;
  generic: string;
  manufacturer: string;
  composition: string;
  sideEffects: string[];
  interactions: string[];
  warnings: string[];
}

const drugs: Drug[] = [
  {
    id: 1,
    name: "Metformin 500mg",
    generic: "Metformin Hydrochloride",
    manufacturer: "Sun Pharma",
    composition: "Metformin HCl 500mg",
    sideEffects: ["Nausea", "Diarrhea", "Stomach upset", "Metallic taste"],
    interactions: ["Alcohol", "Iodinated contrast agents", "Rifampin"],
    warnings: ["Monitor kidney function periodically", "Discontinue before surgery"],
  },
  {
    id: 2,
    name: "Atorvastatin 20mg",
    generic: "Atorvastatin Calcium",
    manufacturer: "Pfizer",
    composition: "Atorvastatin Calcium 20mg",
    sideEffects: ["Muscle pain", "Headache", "Digestive issues", "Liver enzyme changes"],
    interactions: ["Cyclosporine", "Clarithromycin", "Grapefruit juice"],
    warnings: ["Monitor liver enzymes", "Report unexplained muscle pain immediately"],
  },
  {
    id: 3,
    name: "Lisinopril 10mg",
    generic: "Lisinopril",
    manufacturer: "Lupin",
    composition: "Lisinopril 10mg",
    sideEffects: ["Dry cough", "Dizziness", "Headache", "Hyperkalemia"],
    interactions: ["NSAIDs", "Potassium supplements", "Spironolactone"],
    warnings: ["Avoid in pregnancy", "Monitor blood pressure and kidney function"],
  },
  {
    id: 4,
    name: "Amoxicillin 500mg",
    generic: "Amoxicillin Trihydrate",
    manufacturer: "Cipla",
    composition: "Amoxicillin Trihydrate 500mg",
    sideEffects: ["Rash", "Diarrhea", "Nausea", "Vomiting"],
    interactions: ["Warfarin", "Methotrexate", "Probenecid"],
    warnings: ["Check penicillin allergy before use", "Complete the full course"],
  },
];

const item = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };

export default function DrugDetailsPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Drug | null>(null);

  const filtered = drugs.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.generic.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
      className="w-full space-y-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-extrabold text-slate-900">Drug Details</h1>
        <p className="text-sm text-slate-500">Search and explore drug information.</p>
      </motion.div>

      {/* Search */}
      <motion.div variants={item} className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          className="w-full rounded-2xl border border-sky-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 shadow-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          placeholder="Search by drug name or generic name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Drug cards */}
        <motion.div variants={item} className="space-y-3">
          {filtered.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-sky-200 bg-white py-10 text-center text-sm text-slate-400">
              No drugs found.
            </p>
          ) : (
            filtered.map((drug) => (
              <motion.button
                key={drug.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setSelected(drug)}
                className={`w-full rounded-2xl border p-4 text-left shadow-sm transition-all hover:shadow-md ${
                  selected?.id === drug.id
                    ? "border-sky-400 bg-sky-50"
                    : "border-sky-100 bg-white hover:border-sky-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-sky-500 shadow-md">
                    <Pill className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-slate-800">{drug.name}</p>
                    <p className="truncate text-xs text-slate-500">{drug.generic}</p>
                    <p className="text-xs text-slate-400">{drug.manufacturer}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
                </div>
              </motion.button>
            ))
          )}
        </motion.div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">{selected.name}</h2>
                  <p className="text-sm text-slate-500">{selected.generic}</p>
                  <p className="text-xs text-slate-400">{selected.manufacturer}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-xl p-1.5 hover:bg-slate-100"
                >
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: FlaskConical,
                    label: "Composition",
                    color: "text-violet-600",
                    bg: "bg-violet-50 border-violet-100",
                    content: <p className="text-sm text-slate-700">{selected.composition}</p>,
                  },
                  {
                    icon: Info,
                    label: "Side Effects",
                    color: "text-sky-600",
                    bg: "bg-sky-50 border-sky-100",
                    content: (
                      <div className="flex flex-wrap gap-1.5">
                        {selected.sideEffects.map((s) => (
                          <span key={s} className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs text-sky-700">
                            {s}
                          </span>
                        ))}
                      </div>
                    ),
                  },
                  {
                    icon: Zap,
                    label: "Interactions",
                    color: "text-amber-600",
                    bg: "bg-amber-50 border-amber-100",
                    content: (
                      <div className="flex flex-wrap gap-1.5">
                        {selected.interactions.map((i) => (
                          <span key={i} className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs text-amber-700">
                            {i}
                          </span>
                        ))}
                      </div>
                    ),
                  },
                  {
                    icon: AlertTriangle,
                    label: "Warnings",
                    color: "text-red-600",
                    bg: "bg-red-50 border-red-100",
                    content: (
                      <ul className="space-y-1">
                        {selected.warnings.map((w) => (
                          <li key={w} className="flex items-start gap-2 text-sm text-red-700">
                            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                            {w}
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                ].map(({ icon: Icon, label, color, bg, content }) => (
                  <div key={label} className={`rounded-xl border p-3.5 ${bg}`}>
                    <p className={`mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${color}`}>
                      <Icon className="h-3.5 w-3.5" /> {label}
                    </p>
                    {content}
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center rounded-2xl border border-dashed border-sky-200 bg-white py-16 text-slate-400"
            >
              <div className="text-center">
                <Pill className="mx-auto mb-3 h-8 w-8 opacity-30" />
                <p className="text-sm">Select a drug to view details</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

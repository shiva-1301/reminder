import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Play, Upload, ScanLine, BadgeCheck, Building2, Sparkles } from "lucide-react";

export default function DrugScanner() {
  const [scanning, setScanning] = useState(false);
  const [captured, setCaptured] = useState(false);

  const handleStart = () => {
    setScanning(true);
    setCaptured(false);
  };

  const handleCapture = () => {
    setScanning(false);
    setCaptured(true);
  };

  return (
    <div className="w-full">
      <div className="grid min-h-[calc(100vh-9rem)] place-items-center rounded-3xl border border-cyan-400/20 bg-slate-950/90 p-4 shadow-[0_20px_80px_rgba(6,182,212,0.15)] md:p-6">
        <div className="w-full max-w-5xl space-y-5 rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-4 shadow-2xl shadow-cyan-500/10 backdrop-blur-md md:p-6">
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-100 md:text-3xl">
              Drug Scanner
            </h1>
            <p className="text-sm text-cyan-100/70">
              Align the medicine strip inside the frame and click scan
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-slate-900 via-slate-800 to-black p-3 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.15)]">
            <div className="relative h-[320px] w-full rounded-xl bg-slate-900/80 md:h-[430px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_80%_75%,rgba(16,185,129,0.12),transparent_35%)]" />

              <motion.div
                animate={{ y: [20, 320, 20] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_16px_rgba(34,211,238,0.9)] ${
                  scanning ? "opacity-100" : "opacity-35"
                }`}
              />

              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-cyan-300/40 md:h-72 md:w-72"
              >
                <span className="absolute -left-0.5 -top-0.5 h-8 w-8 border-l-4 border-t-4 border-emerald-400" />
                <span className="absolute -right-0.5 -top-0.5 h-8 w-8 border-r-4 border-t-4 border-emerald-400" />
                <span className="absolute -bottom-0.5 -left-0.5 h-8 w-8 border-b-4 border-l-4 border-emerald-400" />
                <span className="absolute -bottom-0.5 -right-0.5 h-8 w-8 border-b-4 border-r-4 border-emerald-400" />
              </motion.div>

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-cyan-300/30 bg-slate-900/70 px-3 py-1 text-xs text-cyan-100/80">
                <ScanLine className="h-3.5 w-3.5" />
                {scanning ? "Scanning in progress..." : "Camera preview placeholder"}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              onClick={handleStart}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-300/40 bg-cyan-500/15 px-4 py-2.5 text-sm font-semibold text-cyan-100 transition-all duration-300 hover:bg-cyan-500/25"
            >
              <Play className="h-4 w-4" />
              Start Scan
            </button>
            <button
              onClick={handleCapture}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:brightness-110"
            >
              <Camera className="h-4 w-4" />
              Capture
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300/40 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-100 transition-all duration-300 hover:bg-emerald-500/20"
            >
              <Upload className="h-4 w-4" />
              Upload Image
            </button>
          </div>

          {captured && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-cyan-300/30 bg-slate-900/80 p-4 shadow-lg shadow-cyan-500/10"
            >
              <div className="mb-3 flex items-center gap-2 text-cyan-200">
                <Sparkles className="h-4 w-4" />
                <p className="text-sm font-semibold">Dummy Scan Result</p>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-3">
                  <p className="text-xs text-slate-400">Drug Name</p>
                  <p className="mt-1 text-sm font-bold text-slate-100">Paracetamol 500mg</p>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-3">
                  <p className="text-xs text-slate-400">Confidence</p>
                  <p className="mt-1 flex items-center gap-1 text-sm font-bold text-emerald-300">
                    <BadgeCheck className="h-4 w-4" /> 92%
                  </p>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-3">
                  <p className="text-xs text-slate-400">Manufacturer</p>
                  <p className="mt-1 flex items-center gap-1 text-sm font-bold text-slate-100">
                    <Building2 className="h-4 w-4 text-cyan-300" /> Cipla
                  </p>
                </div>
              </div>

              <button className="mt-4 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-cyan-400">
                View Details
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

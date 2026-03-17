import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Activity,
  HeartPulse,
  LayoutDashboard,
  Linkedin,
  LogOut,
  Mail,
  Phone,
  Siren,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HeroBlock() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("user") ?? "User";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-white via-sky-50 to-teal-50 px-6 py-12">
      {/* Subtle medical grid and waveform background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#60a5fa14_1px,transparent_1px),linear-gradient(to_bottom,#60a5fa14_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2">
        <svg
          viewBox="0 0 1200 160"
          className="h-24 w-full text-teal-300/40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 80H120L160 80L190 40L235 120L275 60L320 80H1200"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Logout button */}
      <div className="absolute top-6 right-6 z-20">
        <Button variant="outline" size="sm" className="gap-2" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="mx-auto mb-4 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold tracking-wide text-emerald-700 shadow-sm">
          {"Live Monitoring Active"}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 220 }}
            className="relative mb-8 inline-flex"
          >
            <motion.span
              className="absolute inset-0 rounded-full bg-teal-400/30"
              animate={{ scale: [1, 1.6, 1], opacity: [0.45, 0, 0.45] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-sky-100 to-teal-100 shadow-xl">
              <HeartPulse className="h-11 w-11 text-teal-600" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mb-3 text-sm font-medium text-slate-600"
          >
            Signed in as {userEmail}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl"
          >
            MedRem - Smart Emergency Response System
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mx-auto mb-5 max-w-4xl text-lg font-medium text-sky-700 md:text-2xl"
          >
            AI-powered platform for real-time emergency alerts, health
            monitoring, and rapid response coordination.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mx-auto mb-9 max-w-3xl text-base text-slate-600 md:text-xl"
          >
            Monitor critical health signals, trigger instant SOS alerts, and
            ensure faster medical assistance using intelligent analytics and
            live tracking.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-8 flex flex-wrap justify-center gap-4"
          >
            <Button
              size="lg"
              className="rounded-full bg-red-600 px-7 text-white shadow-lg shadow-red-200 transition-all hover:bg-red-700"
            >
              {"🚨 Trigger SOS"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 rounded-full border-sky-300 bg-white/80 px-7 text-sky-700 shadow-sm transition-all hover:bg-sky-50"
            >
              <LayoutDashboard className="h-4 w-4" />
              {"📊 View Dashboard"}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mb-10 flex flex-wrap items-center justify-center gap-3 text-sm"
          >
            <div className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-emerald-700 shadow-sm">
              <span className="inline-flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Heart Rate: 78 BPM
              </span>
            </div>
            <div className="rounded-full border border-sky-200 bg-white px-4 py-2 text-sky-700 shadow-sm">
              <span className="inline-flex items-center gap-2">
                <Siren className="h-4 w-4" />
                Emergency Response: Ready
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center gap-4"
          >
            {[
              { icon: Mail, href: "mailto:care@medrem.ai" },
              { icon: Linkedin, href: "#" },
              { icon: Phone, href: "tel:+18001234567" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-sky-200 bg-white text-sky-700 shadow-sm transition-colors hover:bg-sky-600 hover:text-white"
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

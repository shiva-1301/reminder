import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { BellRing, HeartPulse, ShieldCheck, Pill } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const highlights = [
  { icon: BellRing, text: "Never miss a dose with smart reminders" },
  { icon: Pill, text: "Look up dosage, side effects and interactions" },
  { icon: ShieldCheck, text: "Get safety alerts for risky combinations" },
];

/** Split-screen layout shared by the login and sign-up pages. */
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background lg:flex-row">
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4 sm:p-6">
        <Link to="/login" className="flex items-center gap-2 rounded-xl lg:invisible" aria-label="MedRem home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 shadow-md">
            <HeartPulse className="h-5 w-5 text-white" aria-hidden="true" />
          </span>
          <span className="text-lg font-extrabold text-foreground">
            Med<span className="text-sky-500">Rem</span>
          </span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex w-full flex-1 items-center justify-center px-4 pb-10 pt-24 sm:px-8 lg:w-1/2 lg:py-12">
        <div className="w-full max-w-md">{children}</div>
      </main>

      <aside className="relative hidden w-1/2 overflow-hidden lg:block" aria-label="About MedRem">
        <img
          src="/login.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/90 via-sky-800/75 to-teal-700/70" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <HeartPulse className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="text-2xl font-extrabold">MedRem</span>
          </div>
          <div className="max-w-md">
            <h2 className="text-4xl font-bold leading-tight">Your medications, organised and on time.</h2>
            <ul className="mt-8 space-y-4">
              {highlights.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sky-50">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-sky-100/80">
            MedRem is a personal organiser, not medical advice. Always follow your doctor's guidance.
          </p>
        </div>
      </aside>
    </div>
  );
}

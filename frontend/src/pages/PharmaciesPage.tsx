import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Phone, Clock, Star, Navigation } from "lucide-react";

interface Pharmacy {
  id: number;
  name: string;
  address: string;
  distance: string;
  phone: string;
  hours: string;
  rating: number;
  open: boolean;
}

const pharmacies: Pharmacy[] = [
  {
    id: 1,
    name: "MedPlus Pharmacy",
    address: "12, Koramangala 5th Block, Bengaluru",
    distance: "0.4 km",
    phone: "+91 98765 43210",
    hours: "8:00 AM – 10:00 PM",
    rating: 4.5,
    open: true,
  },
  {
    id: 2,
    name: "Apollo Pharmacy",
    address: "27, Indiranagar 100 Ft Road, Bengaluru",
    distance: "1.2 km",
    phone: "+91 80001 12345",
    hours: "24 Hours",
    rating: 4.8,
    open: true,
  },
  {
    id: 3,
    name: "Netmeds Store",
    address: "4, HSR Layout Sector 4, Bengaluru",
    distance: "2.7 km",
    phone: "+91 99887 76655",
    hours: "9:00 AM – 9:00 PM",
    rating: 4.2,
    open: false,
  },
  {
    id: 4,
    name: "1mg Health Store",
    address: "88, Whitefield Main Road, Bengaluru",
    distance: "4.1 km",
    phone: "+91 91234 56789",
    hours: "9:00 AM – 11:00 PM",
    rating: 4.6,
    open: true,
  },
];

const item = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3 w-3 ${n <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
        />
      ))}
      <span className="ml-1 text-xs text-slate-500">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function PharmaciesPage() {
  const [query, setQuery] = useState("");

  const filtered = pharmacies.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.address.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
      className="w-full space-y-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-extrabold text-slate-900">Nearby Pharmacies</h1>
        <p className="text-sm text-slate-500">Find pharmacies near your location.</p>
      </motion.div>

      {/* Map placeholder */}
      <motion.div
        variants={item}
        className="relative flex h-52 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-sky-100 via-teal-50 to-sky-100 border border-sky-200 shadow-sm"
      >
        <div className="absolute inset-0 opacity-20">
          {/* grid lines for map feel */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`h${i}`}
              className="absolute left-0 right-0 border-t border-sky-300"
              style={{ top: `${(i + 1) * 12.5}%` }}
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={`v${i}`}
              className="absolute top-0 bottom-0 border-l border-sky-300"
              style={{ left: `${(i + 1) * 10}%` }}
            />
          ))}
        </div>
        <div className="relative text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg">
            <MapPin className="h-7 w-7 text-sky-500" />
          </div>
          <p className="font-bold text-slate-700">Map View</p>
          <p className="text-xs text-slate-400">Connect Google Maps API to enable live map</p>
        </div>
        {/* fake pharmacy pins */}
        {[
          { top: "25%", left: "35%" },
          { top: "55%", left: "60%" },
          { top: "40%", left: "75%" },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-sky-500 shadow-md ring-2 ring-white"
            style={{ top: pos.top, left: pos.left }}
          >
            <MapPin className="h-3 w-3 text-white" />
          </div>
        ))}
      </motion.div>

      {/* Search */}
      <motion.div variants={item} className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          className="w-full rounded-2xl border border-sky-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 shadow-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          placeholder="Search pharmacies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </motion.div>

      {/* Pharmacy list */}
      <motion.div variants={item} className="grid gap-4 sm:grid-cols-2">
        {filtered.map((pharmacy) => (
          <motion.div
            key={pharmacy.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-teal-500 shadow-md">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">{pharmacy.name}</p>
                  <Stars rating={pharmacy.rating} />
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  pharmacy.open
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {pharmacy.open ? "Open" : "Closed"}
              </span>
            </div>

            <div className="space-y-1.5 text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                <span>{pharmacy.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Navigation className="h-3.5 w-3.5 text-sky-400" />
                <span className="font-medium text-sky-600">{pharmacy.distance} away</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                <span>{pharmacy.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>{pharmacy.hours}</span>
              </div>
            </div>

            <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 py-2 text-xs font-bold text-white shadow hover:opacity-90 transition-opacity">
              Get Directions
            </button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

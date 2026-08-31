import { motion } from "framer-motion";
import { Vote, Hourglass } from "lucide-react";

const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export default function PlayScreen({ names, starterName, timeLeft, onVote }) {
  const danger = timeLeft <= 10;
  return <main className="flex min-h-screen items-center justify-center px-5 py-10"><motion.div initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-lg rounded-[2.5rem] border border-white/70 bg-white/60 p-7 text-center shadow-2xl backdrop-blur-xl sm:p-9">
    <p className="text-sm font-black uppercase tracking-[.2em] text-rose-500">¡Ronda en curso!</p>
    <p className="mt-3 text-slate-500">Empieza dando una pista</p>
    <h2 className="mt-1 text-3xl font-black text-slate-900">{starterName}</h2>
    <div className={`my-7 rounded-3xl border-4 p-6 ${danger ? "border-rose-300 bg-rose-50" : "border-violet-200 bg-violet-50"}`}>
      <div className="flex items-center justify-center gap-2 text-slate-500"><Hourglass size={18}/><span className="text-sm font-bold uppercase tracking-widest">Tiempo</span></div>
      <p className={`mt-1 text-6xl font-black tabular-nums ${danger ? "text-rose-500" : "text-violet-700"}`}>{fmt(timeLeft)}</p>
    </div>
    <p className="mb-4 text-sm text-slate-500">Cada jugador da una pista por turno. Cuando quieras, vota.</p>
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{names.map((n, i) => <div key={i} className="rounded-xl bg-white/80 px-2 py-2.5 text-sm font-bold text-slate-600">{n}</div>)}</div>
    <button onClick={onVote} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-4 text-lg font-black text-white shadow-lg shadow-fuchsia-300/40 transition hover:-translate-y-0.5"><Vote size={20}/>Votar ahora</button>
  </motion.div></main>;
}

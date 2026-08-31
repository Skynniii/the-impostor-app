import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, UserCheck } from "lucide-react";

export default function VotingScreen({ names, impostors, forced, onConfirm }) {
  const [selected, setSelected] = useState([]);
  const toggle = i => setSelected(prev => prev.includes(i) ? prev.filter(x => x !== i) : prev.length < impostors ? [...prev, i] : prev);
  const ready = selected.length === impostors;
  return <main className="flex min-h-screen items-center justify-center px-5 py-10"><motion.div initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-lg rounded-[2.5rem] border border-white/70 bg-white/60 p-7 text-center shadow-2xl backdrop-blur-xl sm:p-9">
    <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg"><UserCheck size={30}/></div>
    <p className="mt-5 text-sm font-black uppercase tracking-[.2em] text-violet-600">{forced ? "¡Tiempo agotado!" : "Votación"}</p>
    <h1 className="mt-1 text-3xl font-black text-slate-900">¿Quién es el impostor?</h1>
    <p className="mt-2 text-slate-500">Elige a {impostors} {impostors === 1 ? "jugador" : "jugadores"} ({selected.length}/{impostors})</p>
    {forced && <p className="mt-2 text-sm font-bold text-rose-500">Solo tienes una oportunidad</p>}
    <div className="my-6 grid grid-cols-2 gap-2 sm:grid-cols-3">{names.map((n, i) => <button key={i} onClick={() => toggle(i)} className={`rounded-2xl border-2 px-2 py-3 text-sm font-bold transition ${selected.includes(i) ? "border-violet-600 bg-violet-600 text-white shadow-lg" : "border-white bg-white/80 text-slate-600 active:scale-95"}`}>{n}</button>)}</div>
    <button disabled={!ready} onClick={() => onConfirm(selected)} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 text-lg font-black text-white shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"><CheckCircle2 size={20}/>Confirmar voto</button>
  </motion.div></main>;
}
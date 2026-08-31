import { motion } from "framer-motion";
import { Play } from "lucide-react";
import sounds from "@/lib/sounds";

export default function ReadyScreen({ name, onBegin }) {
  return <main className="flex min-h-screen items-center justify-center px-5 py-10"><motion.div initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md rounded-[2.5rem] border border-white/70 bg-white/60 p-8 text-center shadow-2xl backdrop-blur-xl">
    <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-amber-400 to-rose-500 text-white shadow-lg shadow-orange-200"><Play size={30}/></div>
    <p className="mt-6 text-sm font-black uppercase tracking-[.2em] text-rose-500">Empieza dando una pista</p>
    <h1 className="mt-2 text-4xl font-black text-slate-900">{name}</h1>
    <p className="mt-3 text-slate-500">Da la primera pista para arrancar la partida</p>
    <button onClick={() => { sounds.start(); onBegin(); }} className="mt-7 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-4 text-lg font-black text-white shadow-lg shadow-fuchsia-300/40 transition hover:-translate-y-0.5">¡Comenzar partida!</button>
  </motion.div></main>;
}
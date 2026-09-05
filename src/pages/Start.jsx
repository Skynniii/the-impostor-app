import { motion } from "framer-motion";
import { VenetianMask, Play, Tags, History, Settings as SettingsIcon, Code } from "lucide-react";
import { useNavigate } from "react-router-dom";
import sounds from "@/lib/sounds";

export default function Start() {
  const navigate = useNavigate();

  const go = (path) => { sounds.click(); navigate(path); };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-10">
      <div className="pointer-events-none fixed -left-24 top-10 h-72 w-72 rounded-full bg-fuchsia-300/40 blur-3xl" />
      <div className="pointer-events-none fixed -right-20 bottom-10 h-80 w-80 rounded-full bg-cyan-300/40 blur-3xl" />

      <motion.header initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative mb-12 text-center">
        <span className="mx-auto mb-5 grid h-20 w-20 rotate-3 place-items-center rounded-[1.6rem] bg-slate-900 text-white shadow-xl">
          <VenetianMask size={40} />
        </span>
        <p className="text-sm font-black uppercase tracking-[.28em] text-violet-600">Juego de palabras</p>
        <h1 className="mt-1 text-5xl font-black tracking-tight text-slate-900">El Impostor</h1>
        <p className="mx-auto mt-3 max-w-xs text-slate-600">Todos conocen la palabra… excepto quien tendrá que improvisar.</p>
      </motion.header>

      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }} className="relative w-full max-w-sm space-y-3">
        <button
          onClick={() => go("/jugar")}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-5 text-xl font-black text-white shadow-lg shadow-fuchsia-300/40 transition hover:-translate-y-0.5 active:scale-95"
        >
          <Play size={24} /> Jugar
        </button>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => go("/categorias")}
            className="flex flex-col items-center gap-2 rounded-2xl border border-white/60 bg-white/50 p-4 shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 active:scale-95"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-100 text-cyan-700"><Tags size={22} /></span>
            <span className="text-sm font-bold text-slate-700">Categorías</span>
          </button>
          <button
            onClick={() => go("/historial")}
            className="flex flex-col items-center gap-2 rounded-2xl border border-white/60 bg-white/50 p-4 shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 active:scale-95"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-100 text-amber-700"><History size={22} /></span>
            <span className="text-sm font-bold text-slate-700">Historial</span>
          </button>
          <button
            onClick={() => go("/configuracion")}
            className="flex flex-col items-center gap-2 rounded-2xl border border-white/60 bg-white/50 p-4 shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 active:scale-95"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-200 text-slate-700"><SettingsIcon size={22} /></span>
            <span className="text-sm font-bold text-slate-700">Configuración</span>
          </button>
        </div>
      </motion.div>

      <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="relative mt-10 text-center">
        <div className="flex items-center justify-center gap-1.5">
          <Code size={16} className="text-violet-500" />
          <span className="text-sm font-black text-slate-700">DevSky</span>
        </div>
        <p className="text-xs text-slate-400">By Jesús Villadiego</p>
      </motion.footer>
    </main>
  );
}

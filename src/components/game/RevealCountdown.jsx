import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Skull, RefreshCw, EyeOff } from "lucide-react";
import sounds from "@/lib/sounds";

export default function RevealCountdown({ result, roles, names, onRestart }) {
  const { outcome } = result;
  const [count, setCount] = useState(3);
  const [show, setShow] = useState(false);
  const allImpostors = roles.map((r, i) => r.impostor ? i : -1).filter(i => i >= 0);
  const win = outcome === "normals";

  useEffect(() => {
    sounds.countdown();
    const id = setInterval(() => {
      setCount(c => {
        if (c <= 1) { clearInterval(id); setShow(true); win ? sounds.win() : sounds.lose(); return 0; }
        sounds.countdown();
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <main className="flex min-h-screen items-center justify-center px-5 py-10">
    <AnimatePresence mode="wait">
      {!show ? <motion.div key={count} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.6, opacity: 0 }} className="text-center">
        <p className="text-sm font-black uppercase tracking-[.3em] text-violet-600">Revelando resultado...</p>
        <p className="mt-4 text-8xl font-black text-slate-900">{count}</p>
      </motion.div> : <motion.div key="result" initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-lg rounded-[2.5rem] border border-white/70 bg-white/60 p-7 text-center shadow-2xl backdrop-blur-xl sm:p-9">
        {outcome === "allImpostors" ? <>
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-200"><EyeOff size={40}/></div>
          <h1 className="mt-5 text-4xl font-black text-amber-500">¡Todos eran impostores!</h1>
          <p className="mt-2 text-slate-500">Nadie conocía la palabra. Todos estaban improvisando.</p>
          <p className="mt-2 text-sm font-bold text-slate-400">La palabra era: <span className="text-slate-700">{roles[0]?.word}</span></p>
        </> : win ? <>
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-white shadow-lg shadow-emerald-200"><Trophy size={40}/></div>
          <h1 className="mt-5 text-4xl font-black text-emerald-600">¡Ganaron los normales!</h1>
          <p className="mt-2 text-slate-500">Descubrieron a todos los impostores</p>
        </> : <>
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-200"><Skull size={40}/></div>
          <h1 className="mt-5 text-4xl font-black text-rose-500">¡Ganaron los impostores!</h1>
          <p className="mt-2 text-slate-500">Los impostores eran</p>
        </>}
        {outcome !== "allImpostors" && <div className="my-6 space-y-2">{allImpostors.map(i => <div key={i} className="flex items-center justify-center gap-2 rounded-xl bg-white/80 px-4 py-2.5 font-bold text-slate-700"><Skull size={16} className="text-rose-500"/>{names[i]}</div>)}</div>}
        <button onClick={() => { sounds.click(); onRestart(); }} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 font-black text-white transition hover:-translate-y-0.5"><RefreshCw size={19}/>Nueva partida</button>
      </motion.div>}
    </AnimatePresence>
  </main>;
}
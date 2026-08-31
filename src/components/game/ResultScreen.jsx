import { motion } from "framer-motion";
import { Trophy, Skull, RefreshCw, ArrowRight, Check, X } from "lucide-react";

export default function ResultScreen({ result, roles, names, onContinue, onRestart }) {
  const { eliminated, outcome } = result;
  const allImpostors = roles.map((r, i) => r.impostor ? i : -1).filter(i => i >= 0);
  const win = outcome === "normals";
  const lose = outcome === "impostors";
  const cont = outcome === "continue";
  return <main className="flex min-h-screen items-center justify-center px-5 py-10"><motion.div initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-lg rounded-[2.5rem] border border-white/70 bg-white/60 p-7 text-center shadow-2xl backdrop-blur-xl sm:p-9">
    {win ? <>
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-white shadow-lg shadow-emerald-200"><Trophy size={40}/></div>
      <h1 className="mt-5 text-4xl font-black text-emerald-600">¡Ganaron los normales!</h1>
      <p className="mt-2 text-slate-500">Eliminaron a todos los impostores</p>
    </> : lose ? <>
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-200"><Skull size={40}/></div>
      <h1 className="mt-5 text-4xl font-black text-rose-500">¡Ganaron los impostores!</h1>
      <p className="mt-2 text-slate-500">Los impostores eran</p>
    </> : <>
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-amber-400 to-rose-500 text-white shadow-lg shadow-orange-200"><ArrowRight size={40}/></div>
      <h1 className="mt-5 text-4xl font-black text-amber-500">Ronda terminada</h1>
      <p className="mt-2 text-slate-500">Estos jugadores quedan eliminados</p>
    </>}
    <div className="my-6 space-y-2">
      {eliminated.map(i => <div key={i} className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-bold ${roles[i].impostor ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"}`}>{names[i]} {roles[i].impostor ? <><Check size={16}/> era impostor</> : <><X size={16}/> no era impostor</>}</div>)}
    </div>
    {lose && <div className="mb-5 space-y-2">{allImpostors.map(i => <div key={i} className="flex items-center justify-center gap-2 rounded-xl bg-white/80 px-4 py-2.5 font-bold text-slate-700"><Skull size={16} className="text-rose-500"/>{names[i]}</div>)}</div>}
    {cont ? <button onClick={onContinue} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-4 font-black text-white transition hover:bg-violet-700"><ArrowRight size={19}/>Siguiente ronda</button> : <button onClick={onRestart} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 font-black text-white transition hover:-translate-y-0.5"><RefreshCw size={19}/>Nueva partida</button>}
  </motion.div></main>;
}
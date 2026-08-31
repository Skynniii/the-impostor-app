import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";

export default function ResultScreen({ result, roles, names, onContinue }) {
  const { eliminated } = result;
  return <main className="flex min-h-screen items-center justify-center px-5 py-10"><motion.div initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-lg rounded-[2.5rem] border border-white/70 bg-white/60 p-7 text-center shadow-2xl backdrop-blur-xl sm:p-9">
    <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-amber-400 to-rose-500 text-white shadow-lg shadow-orange-200"><ArrowRight size={40}/></div>
    <h1 className="mt-5 text-3xl font-black text-amber-500">Aún no has descubierto a todos los impostores</h1>
    <p className="mt-2 text-slate-500">Estos jugadores quedan eliminados</p>
    <div className="my-6 space-y-2">
      {eliminated.map(i => <div key={i} className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-bold ${roles[i].impostor ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"}`}>{names[i]} {roles[i].impostor ? <><Check size={16}/> era impostor</> : <><X size={16}/> no era impostor</>}</div>)}
    </div>
    <button onClick={onContinue} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-4 font-black text-white transition hover:bg-violet-700"><ArrowRight size={19}/>Continuar</button>
  </motion.div></main>;
}
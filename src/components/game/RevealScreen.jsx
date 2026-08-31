import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ShieldQuestion, Lightbulb } from "lucide-react";

export default function RevealScreen({ player, total, name, role, revealed, showHints, isLast, onReveal, onNext, onStartGame }) {
  const hint = showHints && role.hint;
  return <main className="flex min-h-screen items-center justify-center px-5 py-10">
    <div className="w-full max-w-md text-center"><p className="mb-3 text-sm font-black uppercase tracking-[.2em] text-violet-600">Jugador {player} de {total}</p><h1 className="text-3xl font-black text-slate-900">{name}</h1><p className="mt-2 text-slate-500">Pasa el teléfono · que nadie más mire</p>
      <AnimatePresence mode="wait"><motion.div key={revealed ? "role" : "hidden"} initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }} transition={{ duration: .35 }} className={`my-8 flex min-h-80 flex-col items-center justify-center rounded-[2.5rem] border-4 p-8 shadow-2xl ${revealed ? role.impostor ? "border-rose-300 bg-gradient-to-br from-rose-500 to-orange-400 text-white" : "border-cyan-200 bg-gradient-to-br from-cyan-400 to-violet-500 text-white" : "border-white bg-white/65 text-violet-600 backdrop-blur-xl"}`}>
        {!revealed ? <><ShieldQuestion size={72}/><p className="mt-5 text-xl font-black">Tu identidad es secreta</p></> : role.impostor ? <><EyeOff size={66}/><p className="mt-5 text-sm font-bold uppercase tracking-widest">Eres</p><p className="text-4xl font-black">IMPOSTOR</p>{hint && <p className="mt-3 flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold"><Lightbulb size={15}/>{hint}</p>}<p className="mt-4 text-white/80">Disimula y descubre la palabra</p></> : <><Eye size={66}/><p className="mt-5 text-sm font-bold uppercase tracking-widest">La palabra es</p><p className="mt-1 break-words text-4xl font-black">{role.word}</p><p className="mt-4 text-white/80">Da pistas sin ser demasiado obvio</p></>}
      </motion.div></AnimatePresence>
      <button onClick={revealed ? (isLast ? onStartGame : onNext) : onReveal} className="w-full rounded-2xl bg-slate-900 px-5 py-4 text-lg font-black text-white shadow-lg transition hover:-translate-y-0.5">{revealed ? (isLast ? "Iniciar juego" : "Ocultar y pasar") : "Ver mi identidad"}</button>
    </div>
  </main>;
}
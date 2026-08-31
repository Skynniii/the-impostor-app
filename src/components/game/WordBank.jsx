import { useState } from "react";
import { Plus, Trash2, Tags, Eye, EyeOff } from "lucide-react";
import sounds from "@/lib/sounds";

export default function WordBank({ words, onChange }) {
  const [word, setWord] = useState("");
  const [hint, setHint] = useState("");
  const [hidden, setHidden] = useState(true);
  const add = e => { e.preventDefault(); const w = word.trim(); if (w && !words.some(x => x.word.toLowerCase() === w.toLowerCase())) { onChange([...words, { word: w, hint: hint.trim() }]); setWord(""); setHint(""); sounds.select(); } };
  return <section className="rounded-[2rem] border border-white/60 bg-white/45 p-5 shadow-xl shadow-cyan-200/40 backdrop-blur-xl sm:p-7">
    <div className="mb-5 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-500 text-white"><Tags size={22}/></span><div className="flex-1"><h2 className="text-xl font-black">Tus palabras</h2><p className="text-sm text-slate-500">{words.length} disponibles · {hidden ? "ocultas" : "visibles"}</p></div><button onClick={() => { sounds.toggle(); setHidden(h => !h); }} className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-100 text-cyan-700 transition active:scale-90" aria-label={hidden ? "Mostrar palabras" : "Ocultar palabras"}>{hidden ? <Eye size={18}/> : <EyeOff size={18}/>}</button></div>
    {hidden ? <div className="rounded-2xl border-2 border-dashed border-cyan-200 bg-cyan-50/60 p-6 text-center"><p className="text-sm font-semibold text-cyan-700">Las palabras están ocultas</p><p className="mt-1 text-xs text-cyan-600/80">Toca el ojo para verlas y editarlas</p></div> : <>
      <form onSubmit={add} className="space-y-2">
        <input value={word} onChange={e => setWord(e.target.value)} maxLength={40} placeholder="Palabra (Ej. Volcán)" className="w-full rounded-2xl border-2 border-white bg-white/80 px-4 py-3 font-semibold outline-none transition focus:border-cyan-400"/>
        <input value={hint} onChange={e => setHint(e.target.value)} maxLength={60} placeholder="Pista (opcional)" className="w-full rounded-2xl border-2 border-white bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-cyan-400"/>
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-4 py-3 font-bold text-white transition hover:bg-cyan-600 active:scale-95"><Plus size={18}/>Añadir palabra</button>
      </form>
      <div className="mt-4 max-h-72 space-y-2 overflow-y-auto pr-1">{words.map((item, i) => <div key={i} className="rounded-xl bg-white/70 px-4 py-2.5">
        <div className="flex items-center justify-between"><span className="font-semibold text-slate-700">{item.word}</span><button onClick={() => { sounds.click(); onChange(words.filter((_, idx) => idx !== i)); }} className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-100 hover:text-rose-500" aria-label={`Eliminar ${item.word}`}><Trash2 size={17}/></button></div>
        <input value={item.hint} onChange={e => onChange(words.map((x, idx) => idx === i ? { ...x, hint: e.target.value.slice(0, 60) } : x))} maxLength={60} placeholder="Añadir pista..." className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white/60 px-3 py-1.5 text-sm outline-none transition focus:border-cyan-400"/>
      </div>)}</div>
    </>}
  </section>;
}
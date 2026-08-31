import { Minus, Plus, Sparkles } from "lucide-react";

function Stepper({ label, value, min, max, step = 1, onChange }) {
  return <div className="flex items-center justify-between rounded-2xl bg-white/70 p-4">
    <span className="font-bold text-slate-700">{label}</span>
    <div className="flex items-center gap-4">
      <button onClick={() => onChange(Math.max(min, value - step))} className="grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-violet-700 transition active:scale-90" aria-label={`Reducir ${label}`}><Minus size={18}/></button>
      <span className="w-10 text-center text-xl font-black text-slate-900">{value}</span>
      <button onClick={() => onChange(Math.min(max, value + step))} className="grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-violet-700 transition active:scale-90" aria-label={`Aumentar ${label}`}><Plus size={18}/></button>
    </div>
  </div>;
}

export default function GameSetup({ players, setPlayers, impostors, setImpostors, names, setNames, showHints, setShowHints, roundMinutes, setRoundMinutes, wordCount, onStart }) {
  return <section className="rounded-[2rem] border border-white/60 bg-white/45 p-5 shadow-xl shadow-violet-200/40 backdrop-blur-xl sm:p-7">
    <div className="mb-5 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-600 text-white"><Sparkles size={21}/></span><div><h2 className="text-xl font-black">Preparar partida</h2><p className="text-sm text-slate-500">Configura el grupo y empieza</p></div></div>
    <div className="space-y-3">
      <Stepper label="Jugadores" value={players} min={3} max={20} onChange={setPlayers}/>
      <Stepper label="Impostores" value={impostors} min={1} max={Math.max(1, players - 1)} onChange={setImpostors}/>
      <Stepper label="Minutos por ronda" value={roundMinutes} min={1} max={10} step={1} onChange={setRoundMinutes}/>
    </div>
    <button onClick={() => setShowHints(v => !v)} className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white/70 p-4">
      <span className="font-bold text-slate-700">Mostrar pistas</span>
      <span className={`relative h-7 w-12 rounded-full transition ${showHints ? "bg-violet-600" : "bg-slate-300"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${showHints ? "left-6" : "left-1"}`}/></span>
    </button>
    <div className="mt-4 space-y-2"><p className="text-sm font-bold text-slate-500">Nombres de los jugadores</p>{names.map((name, i) => <input key={i} value={name} onChange={e => setNames(prev => prev.map((n, idx) => idx === i ? e.target.value.slice(0, 18) : n))} placeholder={`Jugador ${i + 1}`} className="w-full rounded-xl border-2 border-white bg-white/80 px-4 py-2.5 font-semibold outline-none transition focus:border-violet-400"/>)}</div>
    <button disabled={!wordCount} onClick={onStart} className="mt-5 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-4 text-lg font-black text-white shadow-lg shadow-fuchsia-300/40 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40">{wordCount ? "¡Empezar partida!" : "Añade una palabra"}</button>
  </section>;
}
import { Minus, Plus, Sparkles, Volume2, VolumeX } from "lucide-react";
import sounds, { isSoundEnabled, setSoundEnabled } from "@/lib/sounds";

function Stepper({ label, value, min, max, step = 1, onChange, disabled }) {
  return <div className={`flex items-center justify-between rounded-2xl bg-white/70 p-4 ${disabled ? "opacity-40" : ""}`}>
    <span className="font-bold text-slate-700">{label}</span>
    <div className="flex items-center gap-4">
      <button onClick={() => { sounds.click(); onChange(Math.max(min, value - step)); }} disabled={disabled} className="grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-violet-700 transition active:scale-90 disabled:cursor-not-allowed" aria-label={`Reducir ${label}`}><Minus size={18}/></button>
      <span className="w-10 text-center text-xl font-black text-slate-900">{value}</span>
      <button onClick={() => { sounds.click(); onChange(Math.min(max, value + step)); }} disabled={disabled} className="grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-violet-700 transition active:scale-90 disabled:cursor-not-allowed" aria-label={`Aumentar ${label}`}><Plus size={18}/></button>
    </div>
  </div>;
}

function Toggle({ label, active, onClick, hint }) {
  return <>
    <button onClick={onClick} className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white/70 p-4">
      <span className="font-bold text-slate-700">{label}</span>
      <span className={`relative h-7 w-12 rounded-full transition ${active ? "bg-violet-600" : "bg-slate-300"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${active ? "left-6" : "left-1"}`}/></span>
    </button>
    {hint && active && <p className="mt-1 px-1 text-xs text-slate-400">{hint}</p>}
  </>;
}

export default function GameSetup({ players, setPlayers, impostors, setImpostors, names, setNames, showHints, setShowHints, matchMinutes, setMatchMinutes, randomImpostors, setRandomImpostors, allImpostors, setAllImpostors, onStart, buttonText = "¡Empezar partida!" }) {
  const soundOn = isSoundEnabled();
  return <section className="rounded-[2rem] border border-white/60 bg-white/45 p-5 shadow-xl shadow-violet-200/40 backdrop-blur-xl sm:p-7">
    <div className="mb-5 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-600 text-white"><Sparkles size={21}/></span><div><h2 className="text-xl font-black">Preparar partida</h2><p className="text-sm text-slate-500">Configura el grupo y empieza</p></div></div>
    <div className="space-y-3">
      <Stepper label="Jugadores" value={players} min={3} max={20} onChange={setPlayers}/>
      <Stepper label="Impostores" value={impostors} min={1} max={Math.max(1, players - 1)} onChange={setImpostors} disabled={randomImpostors}/>
      <Stepper label="Minutos de partida" value={matchMinutes} min={1} max={15} step={1} onChange={setMatchMinutes}/>
    </div>
    <Toggle label="Mostrar pistas" active={showHints} onClick={() => { sounds.toggle(); setShowHints(v => !v); }}/>
    <Toggle label="Impostores aleatorios" active={randomImpostors} onClick={() => { sounds.toggle(); setRandomImpostors(v => !v); }} hint="El número de impostores será sorpresa (máx. la mitad del grupo)"/>
    <Toggle label="Todos impostores" active={allImpostors} onClick={() => { sounds.toggle(); setAllImpostors(v => !v); }} hint="10% de probabilidad de que nadie conozca la palabra"/>
    <button onClick={() => { const on = !soundOn; setSoundEnabled(on); if (on) sounds.click(); }} className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white/70 p-4">
      <span className="font-bold text-slate-700">Sonidos</span>
      <span className="grid h-7 w-7 place-items-center text-slate-600">{soundOn ? <Volume2 size={20}/> : <VolumeX size={20}/>}</span>
    </button>
    <div className="mt-4 space-y-2"><p className="text-sm font-bold text-slate-500">Nombres de los jugadores</p>{names.map((name, i) => <input key={i} value={name} onChange={e => setNames(prev => prev.map((n, idx) => idx === i ? e.target.value.slice(0, 18) : n))} placeholder={`Jugador ${i + 1}`} className="w-full rounded-xl border-2 border-white bg-white/80 px-4 py-2.5 font-semibold outline-none transition focus:border-violet-400"/>)}</div>
    <button onClick={() => { sounds.start(); onStart(); }} className="mt-5 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-4 text-lg font-black text-white shadow-lg shadow-fuchsia-300/40 transition hover:-translate-y-0.5 active:scale-95">{buttonText}</button>
  </section>;
}
import { motion } from "framer-motion";
import { ArrowLeft, Volume2, VolumeX, Lightbulb, Smartphone, RefreshCw, Trash2, Vibrate } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGame } from "@/lib/GameContext";
import sounds, { setSoundEnabled, setVibrationEnabled } from "@/lib/sounds";

function ToggleRow({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className="flex w-full items-center justify-between rounded-2xl bg-white/70 p-4">
      <span className="flex items-center gap-3 font-bold text-slate-700">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-600">{icon}</span>
        {label}
      </span>
      <span className={`relative h-7 w-12 rounded-full transition ${active ? "bg-violet-600" : "bg-slate-300"}`}>
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${active ? "left-6" : "left-1"}`} />
      </span>
    </button>
  );
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const { settings, updateSettings, resetCategories, clearHistory } = useGame();

  const toggleSound = () => {
    const v = !settings.sound;
    updateSettings({ sound: v });
    setSoundEnabled(v);
    if (v) sounds.click();
  };

  const toggleVibration = () => {
    const v = !settings.vibration;
    updateSettings({ vibration: v });
    setVibrationEnabled(v);
    sounds.toggle();
  };

  const toggleHints = () => { sounds.toggle(); updateSettings({ defaultShowHints: !settings.defaultShowHints }); };
  const toggleRecent = () => { sounds.toggle(); updateSettings({ avoidRecentWords: !settings.avoidRecentWords }); };

  const doReset = () => {
    if (confirm("¿Restablecer categorías a las originales? Se perderán las categorías personalizadas.")) {
      resetCategories();
      sounds.select();
    }
  };

  const doClear = () => {
    if (confirm("¿Borrar todo el historial de partidas?")) {
      clearHistory();
      sounds.select();
    }
  };

  return (
    <main className="min-h-screen overflow-hidden px-5 py-8">
      <div className="pointer-events-none fixed -left-24 top-10 h-72 w-72 rounded-full bg-fuchsia-300/40 blur-3xl" />
      <div className="pointer-events-none fixed -right-20 bottom-10 h-80 w-80 rounded-full bg-cyan-300/40 blur-3xl" />

      <div className="relative mx-auto max-w-md">
        <div className="mb-6 flex items-center gap-3">
          <button onClick={() => { sounds.click(); navigate("/"); }} className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 shadow-lg backdrop-blur-xl transition active:scale-90">
            <ArrowLeft size={20} className="text-slate-700" />
          </button>
          <h1 className="text-2xl font-black text-slate-900">Configuración</h1>
        </div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-3">
          <ToggleRow icon={settings.sound ? <Volume2 size={20} /> : <VolumeX size={20} />} label="Sonidos" active={settings.sound} onClick={toggleSound} />
          <ToggleRow icon={<Vibrate size={20} />} label="Vibración" active={settings.vibration} onClick={toggleVibration} />
          <ToggleRow icon={<Lightbulb size={20} />} label="Mostrar pistas por defecto" active={settings.defaultShowHints} onClick={toggleHints} />
          <ToggleRow icon={<RefreshCw size={20} />} label="Evitar repetir palabras" active={settings.avoidRecentWords} onClick={toggleRecent} />

          <div className="pt-2 space-y-3">
            <button onClick={doReset} className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-amber-200 bg-amber-50 px-4 py-3.5 font-bold text-amber-700 transition hover:bg-amber-100 active:scale-95">
              <RefreshCw size={18} /> Restablecer categorías
            </button>
            <button onClick={doClear} className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-rose-200 bg-rose-50 px-4 py-3.5 font-bold text-rose-700 transition hover:bg-rose-100 active:scale-95">
              <Trash2 size={18} /> Borrar historial
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

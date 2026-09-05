import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGame } from "@/lib/GameContext";
import sounds from "@/lib/sounds";

export default function CategorySelectPage() {
  const navigate = useNavigate();
  const { categories, selectedCategoryId, setSelectedCategoryId, gameConfig } = useGame();
  const [selected, setSelected] = useState(selectedCategoryId);

  if (!gameConfig) {
    navigate("/jugar");
    return null;
  }

  const handleStart = () => {
    const cat = categories.find(c => c.id === selected);
    if (!cat || cat.words.length === 0) return;
    setSelectedCategoryId(selected);
    sounds.start();
    navigate("/jugar/partida");
  };

  return (
    <main className="min-h-screen overflow-hidden px-5 py-8">
      <div className="pointer-events-none fixed -left-24 top-10 h-72 w-72 rounded-full bg-fuchsia-300/40 blur-3xl" />
      <div className="pointer-events-none fixed -right-20 bottom-10 h-80 w-80 rounded-full bg-cyan-300/40 blur-3xl" />

      <div className="relative mx-auto max-w-md">
        <div className="mb-6 flex items-center gap-3">
          <button onClick={() => { sounds.click(); navigate("/jugar"); }} className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 shadow-lg backdrop-blur-xl transition active:scale-90">
            <ArrowLeft size={20} className="text-slate-700" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Seleccionar categoría</h1>
            <p className="text-sm text-slate-500">Elige el tema de las palabras</p>
          </div>
        </div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-6 grid grid-cols-2 gap-3">
          {categories.map(cat => {
            const isSelected = selected === cat.id;
            const isEmpty = cat.words.length === 0;
            return (
              <button
                key={cat.id}
                onClick={() => { if (!isEmpty) { sounds.select(); setSelected(cat.id); } }}
                disabled={isEmpty}
                className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition ${
                  isSelected ? "border-violet-600 bg-violet-50 shadow-lg" : isEmpty ? "border-white/40 bg-white/30 opacity-50" : "border-white/60 bg-white/50 shadow-lg backdrop-blur-xl active:scale-95"
                }`}
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="text-sm font-bold text-slate-700">{cat.name}</span>
                <span className="text-xs text-slate-400">{cat.words.length} palabras</span>
                {isSelected && <span className="grid h-6 w-6 place-items-center rounded-full bg-violet-600 text-white"><Check size={14} /></span>}
              </button>
            );
          })}
        </motion.div>

        <button
          onClick={handleStart}
          disabled={!selected}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-4 text-lg font-black text-white shadow-lg shadow-fuchsia-300/40 transition hover:-translate-y-0.5 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Play size={20} /> Iniciar partida
        </button>
      </div>
    </main>
  );
}

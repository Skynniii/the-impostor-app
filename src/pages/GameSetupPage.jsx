import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { VenetianMask, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GameSetup from "@/components/game/GameSetup";
import { useGame } from "@/lib/GameContext";
import sounds from "@/lib/sounds";

export default function GameSetupPage() {
  const navigate = useNavigate();
  const { settings, setGameConfig } = useGame();

  const [players, setPlayers] = useState(5);
  const [impostors, setImpostors] = useState(1);
  const [names, setNames] = useState(() => {
    try { return JSON.parse(localStorage.getItem("impostor-names") || "null") || Array.from({ length: 5 }, (_, i) => `Jugador ${i + 1}`); } catch { return Array.from({ length: 5 }, (_, i) => `Jugador ${i + 1}`); }
  });
  const [showHints, setShowHints] = useState(settings.defaultShowHints);
  const [matchMinutes, setMatchMinutes] = useState(10);
  const [randomImpostors, setRandomImpostors] = useState(false);
  const [allImpostors, setAllImpostors] = useState(false);

  useEffect(() => { try { localStorage.setItem("impostor-names", JSON.stringify(names)); } catch {} }, [names]);

  const changePlayers = v => {
    setPlayers(v);
    setImpostors(i => Math.min(i, v - 1));
    setNames(prev => Array.from({ length: v }, (_, i) => prev[i] || `Jugador ${i + 1}`));
  };

  const handleNext = () => {
    setGameConfig({ players, impostors, matchMinutes, names, showHints, randomImpostors, allImpostors });
    sounds.start();
    navigate("/jugar/categoria");
  };

  return (
    <main className="min-h-screen overflow-hidden px-5 py-10 sm:py-16">
      <div className="pointer-events-none fixed -left-24 top-10 h-72 w-72 rounded-full bg-fuchsia-300/40 blur-3xl" />
      <div className="pointer-events-none fixed -right-20 bottom-10 h-80 w-80 rounded-full bg-cyan-300/40 blur-3xl" />

      <div className="relative mx-auto max-w-lg">
        <button onClick={() => { sounds.click(); navigate("/"); }} className="mb-4 flex items-center gap-2 rounded-xl bg-white/70 px-4 py-2.5 font-bold text-slate-700 shadow-lg backdrop-blur-xl transition active:scale-95">
          <ArrowLeft size={18} /> Volver al Menú
        </button>
        <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-7 text-center">
          <span className="mx-auto mb-4 grid h-16 w-16 rotate-3 place-items-center rounded-[1.4rem] bg-slate-900 text-white shadow-xl"><VenetianMask size={33} /></span>
          <p className="text-sm font-black uppercase tracking-[.28em] text-violet-600">Preparar partida</p>
          <h1 className="mt-1 text-4xl font-black tracking-tight text-slate-900">El Impostor</h1>
        </motion.header>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <GameSetup
            players={players} setPlayers={changePlayers}
            impostors={impostors} setImpostors={setImpostors}
            names={names} setNames={setNames}
            showHints={showHints} setShowHints={setShowHints}
            matchMinutes={matchMinutes} setMatchMinutes={setMatchMinutes}
            randomImpostors={randomImpostors} setRandomImpostors={setRandomImpostors}
            allImpostors={allImpostors} setAllImpostors={setAllImpostors}
            onStart={handleNext}
            buttonText="Siguiente"
          />
        </motion.div>
      </div>
    </main>
  );
}

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { VenetianMask } from "lucide-react";
import GameSetup from "@/components/game/GameSetup";
import WordBank from "@/components/game/WordBank";
import RevealScreen from "@/components/game/RevealScreen";
import ReadyScreen from "@/components/game/ReadyScreen";
import PlayScreen from "@/components/game/PlayScreen";
import VotingScreen from "@/components/game/VotingScreen";
import ResultScreen from "@/components/game/ResultScreen";

const starterWords = [
  { word: "Pizza", hint: "Comida italiana con queso" },
  { word: "Playa", hint: "Arena y mar" },
  { word: "Astronauta", hint: "Viaja al espacio" },
  { word: "Dragón", hint: "Criatura que escupe fuego" },
  { word: "Biblioteca", hint: "Lugar lleno de libros" },
  { word: "Helado", hint: "Postre frío" },
  { word: "Volcán", hint: "Expulsa lava" },
  { word: "Pingüino", hint: "Ave del frío que no vuela" },
  { word: "Castillo", hint: "Hogar de reyes" },
  { word: "Guitarra", hint: "Instrumento de cuerdas" },
];
const shuffle = list => [...list].sort(() => Math.random() - .5);
const migrate = w => w.map(x => typeof x === "string" ? { word: x, hint: "" } : x);
const rand = arr => arr[Math.floor(Math.random() * arr.length)];

export default function Home() {
  const [words, setWords] = useState(() => migrate(JSON.parse(localStorage.getItem("impostor-words") || "null") || starterWords));
  const [players, setPlayers] = useState(5), [impostors, setImpostors] = useState(1);
  const [names, setNames] = useState(() => JSON.parse(localStorage.getItem("impostor-names") || "null") || Array.from({length: 5}, (_, i) => `Jugador ${i + 1}`));
  const [showHints, setShowHints] = useState(true);
  const [roundMinutes, setRoundMinutes] = useState(2);
  const [stage, setStage] = useState("setup");
  const [roles, setRoles] = useState([]);
  const [alive, setAlive] = useState([]);
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [starter, setStarter] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [forcedVote, setForcedVote] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => localStorage.setItem("impostor-words", JSON.stringify(words)), [words]);
  useEffect(() => localStorage.setItem("impostor-names", JSON.stringify(names)), [names]);

  // Cuenta atrás de la ronda
  useEffect(() => {
    if (stage !== "play") return;
    const id = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, [stage]);
  // Tiempo agotado → votación forzada
  useEffect(() => {
    if (stage === "play" && timeLeft === 0) { setForcedVote(true); setStage("voting"); }
  }, [stage, timeLeft]);

  const changePlayers = v => { setPlayers(v); setImpostors(i => Math.min(i, v - 1)); setNames(prev => Array.from({length: v}, (_, i) => prev[i] || `Jugador ${i + 1}`)); };

  const start = () => {
    const picked = words[Math.floor(Math.random() * words.length)];
    const deck = shuffle(Array.from({length: players}, (_, i) => ({ impostor: i < impostors, word: picked.word, hint: picked.hint })));
    setRoles(deck);
    setAlive(Array.from({length: players}, (_, i) => i));
    setCurrent(0); setRevealed(false); setStage("reveal");
  };
  const next = () => { setRevealed(false); if (current === players - 1) return; setCurrent(v => v + 1); };
  const startGame = () => { setStarter(rand(alive)); setStage("ready"); };
  const beginRound = () => { setTimeLeft(roundMinutes * 60); setForcedVote(false); setStage("play"); };

  const aliveImpostors = alive.filter(i => roles[i]?.impostor).length;
  const aliveNames = alive.map(i => names[i]);

  const confirmVote = selected => {
    const orig = selected.map(i => alive[i]);
    const newAlive = alive.filter(i => !orig.includes(i));
    const remImpostors = newAlive.filter(i => roles[i].impostor).length;
    const remNormals = newAlive.length - remImpostors;
    const outcome = remImpostors === 0 ? "normals" : remNormals <= 1 ? "impostors" : "continue";
    setAlive(newAlive);
    setResult({ eliminated: orig, outcome });
    setStage("result");
  };
  const continueRound = () => { setStarter(rand(alive)); setStage("ready"); };

  if (stage === "reveal") return <RevealScreen player={current + 1} total={players} name={names[current] || `Jugador ${current + 1}`} role={roles[current]} revealed={revealed} showHints={showHints} isLast={current === players - 1} onReveal={() => setRevealed(true)} onNext={next} onStartGame={startGame}/>;
  if (stage === "ready") return <ReadyScreen name={names[starter]} onBegin={beginRound}/>;
  if (stage === "play") return <PlayScreen names={aliveNames} starterName={names[starter]} timeLeft={timeLeft} onVote={() => { setForcedVote(false); setStage("voting"); }}/>;
  if (stage === "voting") return <VotingScreen names={aliveNames} impostors={aliveImpostors} forced={forcedVote} onConfirm={confirmVote}/>;
  if (stage === "result") return <ResultScreen result={result} roles={roles} names={names} onContinue={continueRound} onRestart={() => setStage("setup")}/>;

  return <main className="min-h-screen overflow-hidden px-5 py-10 sm:py-16"><div className="pointer-events-none fixed -left-24 top-10 h-72 w-72 rounded-full bg-fuchsia-300/40 blur-3xl"/><div className="pointer-events-none fixed -right-20 bottom-10 h-80 w-80 rounded-full bg-cyan-300/40 blur-3xl"/>
    <div className="relative mx-auto max-w-5xl"><motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-9 text-center"><span className="mx-auto mb-4 grid h-16 w-16 rotate-3 place-items-center rounded-[1.4rem] bg-slate-900 text-white shadow-xl"><VenetianMask size={33}/></span><p className="text-sm font-black uppercase tracking-[.28em] text-violet-600">Juego de palabras</p><h1 className="mt-1 text-5xl font-black tracking-tight text-slate-900 sm:text-6xl">El Impostor</h1><p className="mx-auto mt-3 max-w-md text-slate-600">Todos conocen la palabra… excepto quien tendrá que improvisar.</p></motion.header>
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="grid gap-5 md:grid-cols-2"><GameSetup players={players} setPlayers={changePlayers} impostors={impostors} setImpostors={setImpostors} names={names} setNames={setNames} showHints={showHints} setShowHints={setShowHints} roundMinutes={roundMinutes} setRoundMinutes={setRoundMinutes} wordCount={words.length} onStart={start}/><WordBank words={words} onChange={setWords}/></motion.div></div>
  </main>;
}
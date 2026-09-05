import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useGame } from "@/lib/GameContext";
import RevealScreen from "@/components/game/RevealScreen";
import ReadyScreen from "@/components/game/ReadyScreen";
import PlayScreen from "@/components/game/PlayScreen";
import VotingScreen from "@/components/game/VotingScreen";
import ResultScreen from "@/components/game/ResultScreen";
import RevealCountdown from "@/components/game/RevealCountdown";

const shuffle = list => [...list].sort(() => Math.random() - .5);
const rand = arr => arr[Math.floor(Math.random() * arr.length)];

export default function GamePlayPage() {
  const navigate = useNavigate();
  const { gameConfig, selectedCategoryId, categories, addHistoryEntry, settings } = useGame();

  if (!gameConfig || !selectedCategoryId) return <Navigate to="/jugar" replace />;

  const category = categories.find(c => c.id === selectedCategoryId);
  const words = category?.words || [];
  const { players, impostors, matchMinutes, names, showHints, randomImpostors, allImpostors } = gameConfig;

  const [stage, setStage] = useState("init");
  const [roles, setRoles] = useState([]);
  const [alive, setAlive] = useState([]);
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [starter, setStarter] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [forcedVote, setForcedVote] = useState(false);
  const [result, setResult] = useState(null);
  const [allImpostorsTriggered, setAllImpostorsTriggered] = useState(false);
  const [recentWords, setRecentWords] = useState(() => {
    try { return JSON.parse(localStorage.getItem("impostor-recent-words") || "[]"); } catch { return []; }
  });

  const pickWord = () => {
    if (words.length <= 1) return words[0];
    if (!settings.avoidRecentWords) return words[Math.floor(Math.random() * words.length)];
    const maxRecent = Math.max(1, Math.floor(words.length / 2));
    const available = words.map((_, i) => i).filter(i => !recentWords.includes(i));
    const pool = available.length ? available : words.map((_, i) => i);
    const idx = pool[Math.floor(Math.random() * pool.length)];
    const newRecent = [...recentWords, idx].slice(-maxRecent);
    setRecentWords(newRecent);
    try { localStorage.setItem("impostor-recent-words", JSON.stringify(newRecent)); } catch {}
    return words[idx];
  };

  const start = () => {
    if (!words.length) return;
    const picked = pickWord();
    const maxImp = Math.max(1, Math.floor(players / 2));
    let finalCount;
    let triggered = false;

    if (allImpostors && Math.random() < 0.1) {
      finalCount = players;
      triggered = true;
    } else if (randomImpostors) {
      finalCount = Math.min(maxImp, Math.max(1, Math.floor(Math.random() * maxImp) + 1));
    } else {
      finalCount = Math.min(impostors, maxImp);
    }

    const deck = shuffle(Array.from({ length: players }, (_, i) => ({
      impostor: i < finalCount, word: picked.word, hint: picked.hint,
    })));
    setRoles(deck);
    setAlive(Array.from({ length: players }, (_, i) => i));
    setCurrent(0);
    setRevealed(false);
    setForcedVote(false);
    setAllImpostorsTriggered(triggered);
    setStage("reveal");
  };

  useEffect(() => { if (stage === "init") start(); }, [stage]);

  useEffect(() => {
    if (stage !== "play") return;
    const id = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, [stage]);

  useEffect(() => {
    if (stage === "play" && timeLeft === 0) { setForcedVote(true); setStage("voting"); }
  }, [stage, timeLeft]);

  const next = () => { setRevealed(false); if (current === players - 1) return; setCurrent(v => v + 1); };
  const startGame = () => { setStarter(rand(alive)); setTimeLeft(matchMinutes * 60); setForcedVote(false); setStage("ready"); };
  const beginRound = () => { setForcedVote(false); setStage("play"); };

  const aliveImpostors = alive.filter(i => roles[i]?.impostor).length;
  const aliveNames = alive.map(i => names[i]);

  const confirmVote = selected => {
    const orig = selected.map(i => alive[i]);
    const newAlive = alive.filter(i => !orig.includes(i));
    const remImpostors = newAlive.filter(i => roles[i]?.impostor).length;
    const remNormals = newAlive.length - remImpostors;
    let outcome;

    if (allImpostorsTriggered) {
      outcome = (forcedVote || newAlive.length <= 1) ? "allImpostors" : "continue";
    } else if (remImpostors === 0) {
      outcome = "normals";
    } else if (forcedVote) {
      outcome = "impostors";
    } else if (remNormals <= 1) {
      outcome = "impostors";
    } else {
      outcome = "continue";
    }

    setAlive(newAlive);
    setResult({ eliminated: orig, outcome });

    if (outcome !== "continue") {
      addHistoryEntry({
        category: category?.name || "Sin categoría",
        players,
        impostors: roles.filter(r => r.impostor).length,
        outcome,
        word: roles[0]?.word || "",
        allImpostors: allImpostorsTriggered,
        duration: matchMinutes,
      });
    }

    if (outcome === "continue") setStage("result");
    else setStage("finalReveal");
  };

  const continueRound = () => { setStarter(rand(alive)); setStage("ready"); };
  const restart = () => navigate("/");

  if (stage === "reveal") return <RevealScreen player={current + 1} total={players} name={names[current] || `Jugador ${current + 1}`} role={roles[current]} revealed={revealed} showHints={showHints} isLast={current === players - 1} onReveal={() => setRevealed(true)} onNext={next} onStartGame={startGame} />;
  if (stage === "ready") return <ReadyScreen name={names[starter]} onBegin={beginRound} />;
  if (stage === "play") return <PlayScreen names={aliveNames} timeLeft={timeLeft} onVote={() => { setForcedVote(false); setStage("voting"); }} />;
  if (stage === "voting") return <VotingScreen names={aliveNames} impostors={aliveImpostors} forced={forcedVote} randomImpostors={randomImpostors} onConfirm={confirmVote} />;
  if (stage === "result") return <ResultScreen result={result} roles={roles} names={names} onContinue={continueRound} />;
  if (stage === "finalReveal") return <RevealCountdown result={result} roles={roles} names={names} onRestart={restart} />;

  return null;
}

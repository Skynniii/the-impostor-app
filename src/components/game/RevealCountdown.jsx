import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Trophy, Skull, Home, EyeOff } from "lucide-react";
import sounds from "@/lib/sounds";

export default function RevealCountdown({ result, roles, names, onDone, onRestart, seconds = 3 }) {
  const outcome = result?.outcome;
  const isFinalScreen = outcome === "normals" || outcome === "impostors" || outcome === "allImpostors";
  const [count, setCount] = useState(seconds);
  const [showResult, setShowResult] = useState(false);

  const eliminatedIndexes = result?.eliminated || [];
  const selectedNames = eliminatedIndexes.map(i => names[i]).filter(Boolean);

  const win = outcome === "normals";
  const allImpostorsList = roles ? roles.map((r, i) => (r.impostor ? i : -1)).filter(i => i >= 0) : [];

  useEffect(() => {
    sounds?.countdown?.();

    if (count <= 0) {
      if (isFinalScreen) {
        setShowResult(true);
        win ? sounds?.win?.() : sounds?.lose?.();
      } else if (onDone) {
        const t = setTimeout(onDone, 400);
        return () => clearTimeout(t);
      }
      return;
    }

    const id = setTimeout(() => {
      setCount(c => c - 1);
      sounds?.countdown?.();
    }, 1000);

    return () => clearTimeout(id);
  }, [count, isFinalScreen, win, onDone]);

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-10">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="countdown-card"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-lg rounded-[2.5rem] border border-white/70 bg-white/60 p-7 text-center shadow-2xl backdrop-blur-xl sm:p-9"
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg">
              <Eye size={30} />
            </div>
            <p className="mt-5 text-sm font-black uppercase tracking-[.2em] text-violet-600">Revelando…</p>
            <h1 className="mt-1 text-3xl font-black text-slate-900">¿Acertaron?</h1>

            {selectedNames.length > 0 && (
              <p className="mt-2 text-slate-500">
                Votaron a {selectedNames.join(", ")}
              </p>
            )}

            <div className="my-8 grid h-40 place-items-center">
              <AnimatePresence mode="wait">
                {count > 0 ? (
                  <motion.div
                    key={count}
                    initial={{ scale: 0.4, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 1.6, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-8xl font-black text-slate-900"
                  >
                    {count}
                  </motion.div>
                ) : (
                  <motion.div
                    key="go"
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl font-black text-violet-600"
                  >
                    ¡Ahora!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="text-sm font-bold text-slate-400">Preparando el resultado…</p>
          </motion.div>
        ) : (
          <motion.div
            key="final-result"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg rounded-[2.5rem] border border-white/70 bg-white/60 p-7 text-center shadow-2xl backdrop-blur-xl sm:p-9"
          >
            {outcome === "allImpostors" ? (
              <>
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-200">
                  <EyeOff size={40} />
                </div>
                <h1 className="mt-5 text-4xl font-black text-amber-500">¡Todos eran impostores!</h1>
                <p className="mt-2 text-slate-500">Nadie conocía la palabra. Todos estaban improvisando.</p>
                <p className="mt-2 text-sm font-bold text-slate-400">La palabra era: <span className="text-slate-700">{roles[0]?.word}</span></p>
              </>
            ) : win ? (
              <>
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-white shadow-lg shadow-emerald-200">
                  <Trophy size={40} />
                </div>
                <h1 className="mt-5 text-4xl font-black text-emerald-600">¡Ganaron los normales!</h1>
                <p className="mt-2 text-slate-500">Descubrieron a todos los impostores</p>
              </>
            ) : (
              <>
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-200">
                  <Skull size={40} />
                </div>
                <h1 className="mt-5 text-4xl font-black text-rose-500">¡Ganaron los impostores!</h1>
                <p className="mt-2 text-slate-500">Los impostores eran</p>
              </>
            )}

            {outcome !== "allImpostors" && (
              <div className="my-6 space-y-2">
                {allImpostorsList.map(i => (
                  <div key={i} className="flex items-center justify-center gap-2 rounded-xl bg-white/80 px-4 py-2.5 font-bold text-slate-700">
                    <Skull size={16} className="text-rose-500" />
                    {names[i]}
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => { sounds?.click?.(); onRestart?.(); }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 font-black text-white transition hover:-translate-y-0.5"
            >
              <Home size={19} />
              Volver al Menú
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

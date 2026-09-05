import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Skull, EyeOff, Calendar, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGame } from "@/lib/GameContext";

const outcomeInfo = {
  normals: { icon: Trophy, label: "Ganaron los normales", color: "text-emerald-600", bg: "bg-emerald-50" },
  impostors: { icon: Skull, label: "Ganaron los impostores", color: "text-rose-500", bg: "bg-rose-50" },
  allImpostors: { icon: EyeOff, label: "¡Todos eran impostores!", color: "text-amber-500", bg: "bg-amber-50" },
};

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("es-ES", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  } catch { return iso; }
}

export default function HistoryPage() {
  const navigate = useNavigate();
  const { history } = useGame();

  return (
    <main className="min-h-screen overflow-hidden px-5 py-8">
      <div className="pointer-events-none fixed -left-24 top-10 h-72 w-72 rounded-full bg-fuchsia-300/40 blur-3xl" />
      <div className="pointer-events-none fixed -right-20 bottom-10 h-80 w-80 rounded-full bg-cyan-300/40 blur-3xl" />

      <div className="relative mx-auto max-w-md">
        <div className="mb-6 flex items-center gap-3">
          <button onClick={() => navigate("/")} className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 shadow-lg backdrop-blur-xl transition active:scale-90">
            <ArrowLeft size={20} className="text-slate-700" />
          </button>
          <h1 className="text-2xl font-black text-slate-900">Historial</h1>
        </div>

        {history.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-[2rem] border-2 border-dashed border-slate-200 bg-white/50 p-10 text-center">
            <Trophy size={48} className="mx-auto text-slate-300" />
            <p className="mt-4 font-bold text-slate-500">No hay partidas jugadas</p>
            <p className="mt-1 text-sm text-slate-400">Juega una partida para verla aquí</p>
          </motion.div>
        ) : (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-3">
            {history.map((entry, i) => {
              const info = outcomeInfo[entry.outcome] || outcomeInfo.impostors;
              const Icon = info.icon;
              return (
                <div key={i} className="rounded-2xl border border-white/60 bg-white/60 p-4 shadow-lg backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${info.bg} ${info.color}`}>
                      <Icon size={22} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-black ${info.color}`}>{info.label}</p>
                      <p className="truncate text-sm text-slate-500">Palabra: {entry.word}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Calendar size={13} /> {formatDate(entry.date)}</span>
                    <span className="flex items-center gap-1"><Users size={13} /> {entry.players} jugadores</span>
                    <span className="flex items-center gap-1"><Skull size={13} /> {entry.impostors} impostores</span>
                    <span className="flex items-center gap-1"><Clock size={13} /> {entry.duration} min</span>
                    <span className="font-semibold text-violet-500">{entry.category}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </main>
  );
}

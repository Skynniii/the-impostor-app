import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Trash2, ChevronDown, Tags, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGame } from "@/lib/GameContext";
import sounds from "@/lib/sounds";

export default function CategoriesPage() {
  const navigate = useNavigate();
  const {
    categories, addCategory, deleteCategory,
    addWordToCategory, updateWordInCategory, deleteWordFromCategory,
  } = useGame();

  const [expanded, setExpanded] = useState(null);
  const [showWords, setShowWords] = useState(true);
  const [newCatName, setNewCatName] = useState("");
  const [showNewCat, setShowNewCat] = useState(false);
  const [wordInputs, setWordInputs] = useState({});

  const toggleExpand = (id) => {
    sounds.click();
    setExpanded(expanded === id ? null : id);
    setShowWords(true);
  };

  const handleAddCat = (e) => {
    e.preventDefault();
    const name = newCatName.trim();
    if (!name) return;
    const cat = addCategory(name);
    setNewCatName("");
    setShowNewCat(false);
    setExpanded(cat.id);
    sounds.select();
  };

  const handleAddWord = (catId) => {
    const input = wordInputs[catId] || { word: "", hint: "" };
    const w = input.word.trim();
    if (!w) return;
    addWordToCategory(catId, w, input.hint.trim());
    setWordInputs(prev => ({ ...prev, [catId]: { word: "", hint: "" } }));
    sounds.select();
  };

  return (
    <main className="min-h-screen overflow-hidden px-5 py-8">
      <div className="pointer-events-none fixed -left-24 top-10 h-72 w-72 rounded-full bg-fuchsia-300/40 blur-3xl" />
      <div className="pointer-events-none fixed -right-20 bottom-10 h-80 w-80 rounded-full bg-cyan-300/40 blur-3xl" />

      <div className="relative mx-auto max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => { sounds.click(); navigate("/"); }} className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 shadow-lg backdrop-blur-xl transition active:scale-90">
              <ArrowLeft size={20} className="text-slate-700" />
            </button>
            <h1 className="text-2xl font-black text-slate-900">Categorías</h1>
          </div>
          <button onClick={() => { sounds.click(); setShowNewCat(s => !s); }} className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-600 text-white shadow-lg transition active:scale-90">
            <Plus size={22} />
          </button>
        </div>

        <AnimatePresence>
          {showNewCat && (
            <motion.form
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              onSubmit={handleAddCat} className="mb-3 overflow-hidden"
            >
              <div className="flex gap-2 rounded-2xl border border-white/60 bg-white/70 p-3 shadow-lg backdrop-blur-xl">
                <input
                  value={newCatName} onChange={e => setNewCatName(e.target.value)} maxLength={30}
                  placeholder="Nombre de la categoría" autoFocus
                  className="flex-1 rounded-xl border-2 border-white bg-white/80 px-4 py-2.5 font-semibold outline-none focus:border-violet-400"
                />
                <button type="submit" className="rounded-xl bg-violet-600 px-4 py-2.5 font-bold text-white transition active:scale-95">Crear</button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-3">
          {categories.map(cat => (
            <div key={cat.id} className="overflow-hidden rounded-2xl border border-white/60 bg-white/50 shadow-lg backdrop-blur-xl">
              <div className="flex items-center gap-3 p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-100 text-2xl">{cat.emoji}</span>
                <button onClick={() => toggleExpand(cat.id)} className="flex flex-1 items-center justify-between text-left">
                  <div>
                    <p className="font-black text-slate-800">{cat.name}</p>
                    <p className="text-xs text-slate-400">{cat.words.length} palabras {cat.isDefault ? "· por defecto" : "· personalizada"}</p>
                  </div>
                  <ChevronDown size={20} className={`text-slate-400 transition ${expanded === cat.id ? "rotate-180" : ""}`} />
                </button>
                {!cat.isDefault && (
                  <button onClick={() => { if (confirm(`¿Eliminar la categoría "${cat.name}"?`)) { sounds.click(); deleteCategory(cat.id); } }} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition hover:bg-rose-100 hover:text-rose-500">
                    <Trash2 size={17} />
                  </button>
                )}
              </div>

              <AnimatePresence>
                {expanded === cat.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-white/40"
                  >
                    <div className="p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-500">Palabras y pistas</p>
                        <button onClick={() => { sounds.toggle(); setShowWords(s => !s); }} className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-500">
                          {showWords ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                      </div>

                      {showWords && (
                        <div className="mb-3 max-h-64 space-y-2 overflow-y-auto pr-1">
                          {cat.words.length === 0 && <p className="py-4 text-center text-sm text-slate-400">Sin palabras. Añade la primera abajo.</p>}
                          {cat.words.map((item, wi) => (
                            <div key={wi} className="rounded-xl bg-white/70 px-3 py-2.5">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-slate-700">{item.word}</span>
                                <button onClick={() => { sounds.click(); deleteWordFromCategory(cat.id, wi); }} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-100 hover:text-rose-500">
                                  <Trash2 size={15} />
                                </button>
                              </div>
                              <input
                                value={item.hint} onChange={e => updateWordInCategory(cat.id, wi, { hint: e.target.value.slice(0, 60) })}
                                maxLength={60} placeholder="Pista..."
                                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white/60 px-3 py-1.5 text-sm outline-none focus:border-violet-400"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <input
                          value={(wordInputs[cat.id] || {}).word || ""} onChange={e => setWordInputs(prev => ({ ...prev, [cat.id]: { ...(prev[cat.id] || { word: "", hint: "" }), word: e.target.value } }))}
                          maxLength={40} placeholder="Palabra"
                          className="flex-1 rounded-xl border-2 border-white bg-white/80 px-3 py-2.5 font-semibold outline-none focus:border-violet-400"
                        />
                        <input
                          value={(wordInputs[cat.id] || {}).hint || ""} onChange={e => setWordInputs(prev => ({ ...prev, [cat.id]: { ...(prev[cat.id] || { word: "", hint: "" }), hint: e.target.value } }))}
                          maxLength={60} placeholder="Pista" onKeyDown={e => { if (e.key === "Enter") handleAddWord(cat.id); }}
                          className="flex-1 rounded-xl border-2 border-white bg-white/80 px-3 py-2.5 text-sm outline-none focus:border-violet-400"
                        />
                        <button onClick={() => handleAddWord(cat.id)} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-500 text-white transition active:scale-90">
                          <Plus size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}

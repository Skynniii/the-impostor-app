import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { defaultCategories } from "./defaultCategories";

const GameContext = createContext(null);

const KEYS = {
  categories: "impostor-categories",
  history: "impostor-history",
  settings: "impostor-settings",
};

const defaultSettings = {
  sound: true,
  defaultShowHints: true,
  vibration: true,
  avoidRecentWords: true,
};

export function GameProvider({ children }) {
  const [categories, setCategories] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEYS.categories));
      if (saved && saved.length) return saved;
    } catch (e) {}
    return defaultCategories;
  });

  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEYS.history) || "[]"); } catch (e) { return []; }
  });

  const [settings, setSettings] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEYS.settings));
      if (saved) return { ...defaultSettings, ...saved };
    } catch (e) {}
    return defaultSettings;
  });

  const [gameConfig, setGameConfig] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => { try { localStorage.setItem(KEYS.categories, JSON.stringify(categories)); } catch (e) {} }, [categories]);
  useEffect(() => { try { localStorage.setItem(KEYS.history, JSON.stringify(history)); } catch (e) {} }, [history]);
  useEffect(() => { try { localStorage.setItem(KEYS.settings, JSON.stringify(settings)); } catch (e) {} }, [settings]);

  const addCategory = useCallback((name) => {
    const cat = { id: `custom-${Date.now()}`, name, emoji: "📝", isDefault: false, words: [] };
    setCategories(prev => [...prev, cat]);
    return cat;
  }, []);

  const updateCategory = useCallback((id, updates) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const deleteCategory = useCallback((id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  }, []);

  const addWordToCategory = useCallback((catId, word, hint) => {
    setCategories(prev => prev.map(c =>
      c.id === catId ? { ...c, words: [...c.words, { word, hint }] } : c
    ));
  }, []);

  const updateWordInCategory = useCallback((catId, wordIndex, updates) => {
    setCategories(prev => prev.map(c =>
      c.id === catId ? { ...c, words: c.words.map((w, i) => i === wordIndex ? { ...w, ...updates } : w) } : c
    ));
  }, []);

  const deleteWordFromCategory = useCallback((catId, wordIndex) => {
    setCategories(prev => prev.map(c =>
      c.id === catId ? { ...c, words: c.words.filter((_, i) => i !== wordIndex) } : c
    ));
  }, []);

  const resetCategories = useCallback(() => {
    setCategories(defaultCategories);
  }, []);

  const addHistoryEntry = useCallback((entry) => {
    setHistory(prev => [{ ...entry, date: new Date().toISOString() }, ...prev].slice(0, 50));
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);

  const updateSettings = useCallback((updates) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  return (
    <GameContext.Provider value={{
      categories, addCategory, updateCategory, deleteCategory,
      addWordToCategory, updateWordInCategory, deleteWordFromCategory,
      resetCategories,
      history, addHistoryEntry, clearHistory,
      settings, updateSettings,
      gameConfig, setGameConfig,
      selectedCategoryId, setSelectedCategoryId,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within a GameProvider");
  return ctx;
}

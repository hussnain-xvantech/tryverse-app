// Tiny client-side store for the AI Photoshoot demo workflow.
// Persists across the wizard → results transition via sessionStorage.

export type PhotoshootSelection = {
  productType: "single" | "multiple";
  product: { id: string; name: string; category: string; image: string } | null;
  productSecondary?: { id: string; name: string; category: string; image: string } | null;
  uploadedName?: string | null;
  uploadedSecondaryName?: string | null;
  model: { id: string; name: string; region: string; body: string; age: string; image: string } | null;
  styleCategory: string;
  style: { id: string; name: string; image: string } | null;
  background: string;
  angles: string[];
  instructions: string;
  generatedAt?: string;
};

const KEY = "tv_photoshoot_selection";
const HISTORY_KEY = "tv_photoshoot_history";

export function loadSelection(): PhotoshootSelection | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSelection(sel: PhotoshootSelection) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, JSON.stringify(sel));
}

export function clearSelection() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY);
}

export type HistoryItem = {
  id: string;
  product: string;
  productImage: string;
  model: string;
  style: string;
  angles: number;
  date: string;
};

export function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function pushHistory(item: HistoryItem) {
  if (typeof window === "undefined") return;
  const list = loadHistory();
  list.unshift(item);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, 30)));
}

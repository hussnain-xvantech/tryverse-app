// Lightweight client-side store for the shopper demo flow.
// Persists selected product + uploaded photo across the AI Fashion Store flow.

export type Product = {
  id: string;
  name: string;
  store: string;
  price: number;
  category: string;
  gradient: string; // CSS gradient string for placeholder
  accent: string; // accent color for icon tint
};

export const PRODUCTS: Product[] = [
  { id: "lavender-blazer", name: "Lavender Blazer", store: "Macy's", price: 89, category: "Jacket",
    gradient: "linear-gradient(160deg,#E9D5FF 0%,#C4B5FD 60%,#A78BFA 100%)", accent: "#7C3AED" },
  { id: "green-cardigan", name: "Green Knit Cardigan", store: "Nordstrom", price: 72, category: "Cardigan",
    gradient: "linear-gradient(160deg,#D1FAE5 0%,#A7F3D0 60%,#6EE7B7 100%)", accent: "#059669" },
  { id: "white-summer-dress", name: "White Summer Dress", store: "Zara", price: 59, category: "Dress",
    gradient: "linear-gradient(160deg,#FFFFFF 0%,#F8FAFC 60%,#E2E8F0 100%)", accent: "#64748B" },
  { id: "denim-jacket", name: "Denim Jacket", store: "H&M", price: 45, category: "Jacket",
    gradient: "linear-gradient(160deg,#DBEAFE 0%,#93C5FD 60%,#3B82F6 100%)", accent: "#1D4ED8" },
  { id: "black-evening-dress", name: "Black Evening Dress", store: "Revolve", price: 120, category: "Dress",
    gradient: "linear-gradient(160deg,#3F3F46 0%,#27272A 60%,#09090B 100%)", accent: "#A855F7" },
  { id: "cream-linen-shirt", name: "Cream Linen Shirt", store: "Free People", price: 68, category: "Shirt",
    gradient: "linear-gradient(160deg,#FEF3C7 0%,#FDE68A 60%,#FCD34D 100%)", accent: "#D97706" },
  { id: "floral-midi-dress", name: "Floral Midi Dress", store: "Anthropologie", price: 98, category: "Dress",
    gradient: "linear-gradient(160deg,#FCE7F3 0%,#FBCFE8 50%,#F9A8D4 100%)", accent: "#DB2777" },
  { id: "casual-hoodie", name: "Casual Hoodie", store: "Urban Outfitters", price: 55, category: "Hoodie",
    gradient: "linear-gradient(160deg,#E0E7FF 0%,#C7D2FE 60%,#A5B4FC 100%)", accent: "#4F46E5" },
];

const PRODUCT_KEY = "tryverse:selectedProduct";
const PHOTO_KEY = "tryverse:userPhoto";

export function selectProduct(id: string) {
  if (typeof window === "undefined") return;
  try { sessionStorage.setItem(PRODUCT_KEY, id); } catch { /* ignore */ }
}

export function getSelectedProduct(): Product | null {
  if (typeof window === "undefined") return null;
  try {
    const id = sessionStorage.getItem(PRODUCT_KEY);
    return PRODUCTS.find((p) => p.id === id) ?? null;
  } catch { return null; }
}

export function setUserPhoto(dataUrl: string) {
  if (typeof window === "undefined") return;
  try { sessionStorage.setItem(PHOTO_KEY, dataUrl); } catch { /* ignore */ }
}

export function getUserPhoto(): string | null {
  if (typeof window === "undefined") return null;
  try { return sessionStorage.getItem(PHOTO_KEY); } catch { return null; }
}

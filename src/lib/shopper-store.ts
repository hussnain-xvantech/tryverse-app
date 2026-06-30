// Lightweight client-side store for the shopper demo flow.
// Persists selected product + selected store across the AI Fashion Store flow.

export type Product = {
  id: string;
  name: string;
  store: string;
  price: number;
  category: string;
  gender: "Women" | "Men" | "Unisex";
  gradient: string; // CSS gradient — premium garment look
  accent: string;
};

export type Store = {
  id: string;
  name: string;
  domain: string;
  products: number;
  initial: string;
  gradient: string;
  swatches: string[]; // preview garment swatches
};

export const STORES: Store[] = [
  { id: "12th-tribe", name: "12th Tribe", domain: "12thtribe.com", products: 19, initial: "12",
    gradient: "linear-gradient(135deg,#7c3aed 0%,#c026d3 50%,#ec4899 100%)",
    swatches: ["#a16207", "#7f1d1d", "#fafaf9", "#3f3f46"] },
  { id: "macys", name: "Macy's", domain: "macys.com", products: 124, initial: "M",
    gradient: "linear-gradient(135deg,#dc2626 0%,#991b1b 100%)",
    swatches: ["#1e293b", "#fef3c7", "#7c2d12", "#0c4a6e"] },
  { id: "nordstrom", name: "Nordstrom", domain: "nordstrom.com", products: 98, initial: "N",
    gradient: "linear-gradient(135deg,#0c4a6e 0%,#0369a1 100%)",
    swatches: ["#fafaf9", "#1c1917", "#9ca3af", "#7c2d12"] },
  { id: "zara", name: "Zara", domain: "zara.com", products: 86, initial: "Z",
    gradient: "linear-gradient(135deg,#171717 0%,#404040 100%)",
    swatches: ["#fafaf9", "#171717", "#a8a29e", "#78716c"] },
  { id: "hm", name: "H&M", domain: "hm.com", products: 72, initial: "H",
    gradient: "linear-gradient(135deg,#dc2626 0%,#7f1d1d 100%)",
    swatches: ["#fef3c7", "#1c1917", "#7c2d12", "#fafaf9"] },
  { id: "revolve", name: "Revolve", domain: "revolve.com", products: 64, initial: "R",
    gradient: "linear-gradient(135deg,#be185d 0%,#9d174d 100%)",
    swatches: ["#a16207", "#1c1917", "#fce7f3", "#7c2d12"] },
  { id: "free-people", name: "Free People", domain: "freepeople.com", products: 58, initial: "FP",
    gradient: "linear-gradient(135deg,#a16207 0%,#854d0e 100%)",
    swatches: ["#fef3c7", "#7c2d12", "#a16207", "#fde68a"] },
  { id: "anthropologie", name: "Anthropologie", domain: "anthropologie.com", products: 52, initial: "A",
    gradient: "linear-gradient(135deg,#9d174d 0%,#831843 100%)",
    swatches: ["#fce7f3", "#7c2d12", "#a16207", "#9d174d"] },
  { id: "urban-outfitters", name: "Urban Outfitters", domain: "urbanoutfitters.com", products: 47, initial: "UO",
    gradient: "linear-gradient(135deg,#4338ca 0%,#3730a3 100%)",
    swatches: ["#1c1917", "#fafaf9", "#374151", "#7c2d12"] },
  { id: "princess-polly", name: "Princess Polly", domain: "princesspolly.com", products: 45, initial: "PP",
    gradient: "linear-gradient(135deg,#ec4899 0%,#be185d 100%)",
    swatches: ["#fce7f3", "#1c1917", "#a16207", "#fafaf9"] },
  { id: "aritzia", name: "Aritzia", domain: "aritzia.com", products: 39, initial: "A",
    gradient: "linear-gradient(135deg,#1c1917 0%,#44403c 100%)",
    swatches: ["#fafaf9", "#1c1917", "#78716c", "#a16207"] },
  { id: "meshki", name: "Meshki", domain: "meshki.com", products: 34, initial: "MK",
    gradient: "linear-gradient(135deg,#7e22ce 0%,#581c87 100%)",
    swatches: ["#1c1917", "#a16207", "#fafaf9", "#7c2d12"] },
];

// 12th Tribe demo catalog — modest, professional palette per product
function tribeGrad(a: string, b: string, c: string) {
  return `linear-gradient(160deg,${a} 0%,${b} 55%,${c} 100%)`;
}

export const PRODUCTS: Product[] = [
  { id: "zela-olive", name: "Zela Olive Cowl Maxi Dress", store: "12th Tribe", price: 98, category: "Dress", gender: "Women",
    gradient: tribeGrad("#6b8e4e", "#4d6b35", "#2f3e1d"), accent: "#a3e635" },
  { id: "madonna-rust", name: "Madonna Rust Maxi Dress", store: "12th Tribe", price: 94, category: "Dress", gender: "Women",
    gradient: tribeGrad("#c2410c", "#9a3412", "#5c1a09"), accent: "#fb923c" },
  { id: "santorini-white", name: "Santorini White Chiffon Mini Dress", store: "12th Tribe", price: 84, category: "Dress", gender: "Women",
    gradient: tribeGrad("#fafaf9", "#e7e5e4", "#a8a29e"), accent: "#fafaf9" },
  { id: "hada-sage", name: "Hada Sage Cutout Mini Dress", store: "12th Tribe", price: 78, category: "Dress", gender: "Women",
    gradient: tribeGrad("#84a17a", "#5f7d59", "#3b5238"), accent: "#bef264" },
  { id: "final-mocha", name: "Final Mocha Satin Maxi Dress", store: "12th Tribe", price: 88, category: "Dress", gender: "Women",
    gradient: tribeGrad("#78584a", "#553f33", "#2e211b"), accent: "#d6a48c" },
  { id: "cordon-bronze", name: "Cordon Bronze Satin Maxi Dress", store: "12th Tribe", price: 88, category: "Dress", gender: "Women",
    gradient: tribeGrad("#a07640", "#7a5630", "#4a341c"), accent: "#fbbf24" },
  { id: "clear-breeze", name: "Clear Breeze Natural Linen Pants", store: "12th Tribe", price: 74, category: "Pants", gender: "Women",
    gradient: tribeGrad("#e7d9c4", "#c9b896", "#8a7758"), accent: "#fde68a" },
  { id: "happy-hour", name: "Happy Hour Cream Fringe Pants", store: "12th Tribe", price: 84, category: "Pants", gender: "Women",
    gradient: tribeGrad("#f5ecd9", "#d9c8a5", "#a08862"), accent: "#fef3c7" },
  { id: "dolce-champagne", name: "Dolce Champagne Satin Maxi Dress", store: "12th Tribe", price: 98, category: "Dress", gender: "Women",
    gradient: tribeGrad("#e0c98d", "#b89a5d", "#75603a"), accent: "#fde68a" },
  { id: "mirabella-bronze", name: "Mirabella Bronze Satin Maxi Dress", store: "12th Tribe", price: 98, category: "Dress", gender: "Women",
    gradient: tribeGrad("#a37545", "#7a5530", "#48311c"), accent: "#fbbf24" },
  { id: "natalia-bronze", name: "Natalia Bronze Satin Maxi Dress", store: "12th Tribe", price: 88, category: "Dress", gender: "Women",
    gradient: tribeGrad("#a07840", "#7a5b30", "#48341c"), accent: "#fbbf24" },
  { id: "natalia-bronze-strap", name: "Natalia Bronze Strapless Maxi Dress", store: "12th Tribe", price: 88, category: "Dress", gender: "Women",
    gradient: tribeGrad("#b08550", "#8a653a", "#503a20"), accent: "#fcd34d" },
  { id: "mirabella-chartreuse", name: "Mirabella Chartreuse Satin Maxi Dress", store: "12th Tribe", price: 98, category: "Dress", gender: "Women",
    gradient: tribeGrad("#a3a635", "#7e8128", "#4a4d18"), accent: "#d9f99d" },
  { id: "natalia-chartreuse", name: "Natalia Chartreuse Satin Maxi Dress", store: "12th Tribe", price: 88, category: "Dress", gender: "Women",
    gradient: tribeGrad("#9aa53a", "#75802a", "#454d18"), accent: "#d9f99d" },
  { id: "natalia-fuchsia", name: "Natalia Fuchsia Strapless Maxi Dress", store: "12th Tribe", price: 88, category: "Dress", gender: "Women",
    gradient: tribeGrad("#c026d3", "#86198f", "#4a0a52"), accent: "#f0abfc" },
  { id: "dolce-bronze", name: "Dolce Bronze Satin Maxi Dress", store: "12th Tribe", price: 98, category: "Dress", gender: "Women",
    gradient: tribeGrad("#a87a45", "#805a30", "#4d361c"), accent: "#fbbf24" },
  { id: "natalia-champagne", name: "Natalia Champagne Satin Maxi Dress", store: "12th Tribe", price: 88, category: "Dress", gender: "Women",
    gradient: tribeGrad("#e0c990", "#b89a5d", "#75603a"), accent: "#fef08a" },
  { id: "mirabella-fuchsia", name: "Mirabella Fuchsia Satin Maxi Dress", store: "12th Tribe", price: 98, category: "Dress", gender: "Women",
    gradient: tribeGrad("#d946ef", "#a21caf", "#581c64"), accent: "#f0abfc" },
  { id: "karmen-leopard", name: "Karmen Leopard Long Sleeve Maxi Dress", store: "12th Tribe", price: 94, category: "Dress", gender: "Women",
    gradient: tribeGrad("#a16207", "#78350f", "#3b2106"), accent: "#fbbf24" },
];

const PRODUCT_KEY = "tryverse:selectedProduct";
const STORE_KEY = "tryverse:selectedStore";
const PHOTO_KEY = "tryverse:userPhoto";

export function selectProduct(id: string) {
  if (typeof window === "undefined") return;
  try { sessionStorage.setItem(PRODUCT_KEY, id); } catch { /* ignore */ }
}

export function getSelectedProduct(): Product | null {
  if (typeof window === "undefined") return null;
  try {
    const id = sessionStorage.getItem(PRODUCT_KEY);
    return PRODUCTS.find((p) => p.id === id) ?? PRODUCTS.find((p) => p.id === "madonna-rust") ?? null;
  } catch { return null; }
}

export function selectStore(id: string) {
  if (typeof window === "undefined") return;
  try { sessionStorage.setItem(STORE_KEY, id); } catch { /* ignore */ }
}

export function getSelectedStore(): Store {
  if (typeof window === "undefined") return STORES[0];
  try {
    const id = sessionStorage.getItem(STORE_KEY);
    return STORES.find((s) => s.id === id) ?? STORES[0];
  } catch { return STORES[0]; }
}

export function setUserPhoto(dataUrl: string) {
  if (typeof window === "undefined") return;
  try { sessionStorage.setItem(PHOTO_KEY, dataUrl); } catch { /* ignore */ }
}

export function getUserPhoto(): string | null {
  if (typeof window === "undefined") return null;
  try { return sessionStorage.getItem(PHOTO_KEY); } catch { return null; }
}

// Reusable demo photo (silhouette gradient) for prototype upload simulation
export const DEMO_USER_PHOTO =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'>
      <defs>
        <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stop-color='#1e1b4b'/>
          <stop offset='1' stop-color='#0f0a24'/>
        </linearGradient>
        <radialGradient id='glow' cx='0.5' cy='0.35' r='0.5'>
          <stop offset='0' stop-color='#a78bfa' stop-opacity='0.45'/>
          <stop offset='1' stop-color='#a78bfa' stop-opacity='0'/>
        </radialGradient>
      </defs>
      <rect width='400' height='500' fill='url(#bg)'/>
      <rect width='400' height='500' fill='url(#glow)'/>
      <g fill='#cbd5e1' opacity='0.85'>
        <circle cx='200' cy='160' r='52'/>
        <path d='M110 500 C110 360 150 300 200 300 C250 300 290 360 290 500 Z'/>
      </g>
    </svg>`
  );

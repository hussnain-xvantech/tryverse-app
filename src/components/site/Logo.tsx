import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/tryverse-logo.png.asset.json";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center ${className}`} aria-label="TryVerse home">
      <img
        src={logoAsset.url}
        alt="TryVerse"
        className="h-8 sm:h-9 w-auto select-none"
        draggable={false}
      />
    </Link>
  );
}

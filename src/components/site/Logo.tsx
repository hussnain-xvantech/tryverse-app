import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${className}`} aria-label="TryVerse home">
      <span className="relative grid h-8 w-8 place-items-center rounded-xl shrink-0"
        style={{
          background: "linear-gradient(135deg, #6D28FF, #D946EF)",
          boxShadow: "0 6px 20px -6px rgba(168,85,247,0.6), inset 0 1px 0 rgba(255,255,255,0.25)",
        }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 6.5C4 5.67157 4.67157 5 5.5 5H18.5C19.3284 5 20 5.67157 20 6.5V8.5C20 9.32843 19.3284 10 18.5 10H15V18.5C15 19.3284 14.3284 20 13.5 20H10.5C9.67157 20 9 19.3284 9 18.5V10H5.5C4.67157 10 4 9.32843 4 8.5V6.5Z"
            fill="white"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[17px] font-bold tracking-tight text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Try<span className="text-gradient">Verse</span>
        </span>
      </span>
    </Link>
  );
}

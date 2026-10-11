export const LogoIcon = ({ className = "size-9" }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    <defs>
      {/* Midnight Navy Depth Gradient */}
      <linearGradient id="logoWorkforceBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#030812" />
        <stop offset="50%" stopColor="#0e1726" />
        <stop offset="100%" stopColor="#18263e" />
      </linearGradient>

      {/* Luxury Champagne Gold Gradient */}
      <linearGradient id="logoWorkforceGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fdfbf7" />
        <stop offset="25%" stopColor="#e8dcbe" />
        <stop offset="65%" stopColor="#c5a76a" />
        <stop offset="100%" stopColor="#9a7b39" />
      </linearGradient>

      {/* Secondary Champagne Gold Gradient */}
      <linearGradient id="logoWorkforceAccent" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#efe9dc" />
        <stop offset="100%" stopColor="#c5a76a" />
      </linearGradient>

      {/* Metallic Border Gradient */}
      <linearGradient id="logoWorkforceBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e8dcbe" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#c5a76a" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#8c6d2d" stopOpacity="0.7" />
      </linearGradient>

      {/* Ambient Core Glow */}
      <radialGradient id="logoWorkforceGlow" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#c5a76a" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#c5a76a" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Squircle Base with Metallic Edge */}
    <rect
      x="2"
      y="2"
      width="60"
      height="60"
      rx="16"
      fill="url(#logoWorkforceBg)"
      stroke="url(#logoWorkforceBorder)"
      strokeWidth="1.5"
    />
    <circle cx="32" cy="28" r="22" fill="url(#logoWorkforceGlow)" />

    {/* LEFT TEAM MEMBER (Workforce Colleague) */}
    <circle cx="20" cy="22" r="3.4" fill="url(#logoWorkforceAccent)" opacity="0.9" />
    <path
      d="M12 36.5 C12 31 15 28 20 28 C21.8 28 23.3 28.7 24.5 29.8 C22.8 31.8 22 34 22 36.5 C18.5 37 15 37.2 12 36.5 Z"
      fill="url(#logoWorkforceGold)"
      opacity="0.8"
    />

    {/* RIGHT TEAM MEMBER (Workforce Colleague) */}
    <circle cx="44" cy="22" r="3.4" fill="url(#logoWorkforceAccent)" opacity="0.9" />
    <path
      d="M52 36.5 C52 31 49 28 44 28 C42.2 28 40.7 28.7 39.5 29.8 C41.2 31.8 42 34 42 36.5 C45.5 37 49 37.2 52 36.5 Z"
      fill="url(#logoWorkforceGold)"
      opacity="0.8"
    />

    {/* CENTER LEADER / EXECUTIVE (Primary Employee Figure) */}
    <circle cx="32" cy="16" r="4.6" fill="url(#logoWorkforceGold)" />
    {/* Executive Torso & Shoulders */}
    <path
      d="M23 34 C23 26.5 26.8 23.5 32 23.5 C37.2 23.5 41 26.5 41 34 C38.5 35.8 35.5 36.5 32 36.5 C28.5 36.5 25.5 35.8 23 34 Z"
      fill="url(#logoWorkforceGold)"
    />
    {/* Crisp Executive Tie Cutout in Negative Space */}
    <path d="M32 24.5 L33.3 28.5 L32 34 L30.7 28.5 Z" fill="#0e1726" />

    {/* DYNAMIC "QUICK" CHECKMARK & MANAGEMENT SHIELD FOUNDATION */}
    <path
      d="M15 41.5 C19.5 43.8 24.5 46.8 28 49.2 C28.8 49.8 29.8 49.6 30.4 48.9 C35.5 42.8 42 37.2 49 33.5 C49.8 33 48.8 31.8 47.8 32.4 C41.5 36 35.2 41.5 30 46.5 C26.5 44 21.8 41 16.5 38.5 C15.2 37.8 14 39.8 15 41.5 Z"
      fill="url(#logoWorkforceGold)"
    />

    {/* Apex Shield Anchor Diamond */}
    <path
      d="M30 52 L32 49.5 L34 52 L32 54 Z"
      fill="url(#logoWorkforceAccent)"
      opacity="0.85"
    />
  </svg>
);

const Logo = ({
  showText = true,
  iconSize = "size-9",
  title = "QuickEMS",
  subtitle = "Management System",
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIcon className={iconSize} />
      {showText && (
        <div className="min-w-0">
          <p className="font-semibold text-[14px] text-indigo-50 tracking-wide font-sans leading-tight">
            {title}
          </p>
          <p className="text-[11px] text-indigo-200/65 font-medium tracking-wider uppercase font-sans">
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;

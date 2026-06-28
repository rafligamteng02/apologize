const pink = "#ff6b9d"
const white = "#fff"
const s = { display: "inline-block", verticalAlign: "middle" }

export function HeartIcon({ size = 24, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill={color} fillOpacity="0.15" />
    </svg>
  )
}

export function HeartSparkleIcon({ size = 40, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" fill={color} fillOpacity="0.15" />
      <path d="M12 5l3 4-3 4M9 9l3 4" stroke={color} strokeWidth="1.2" />
    </svg>
  )
}

export function MailHeartIcon({ size = 24, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <rect x="2" y="4" width="20" height="16" rx="2" fill={color} fillOpacity="0.1" />
      <path d="M22 7l-10 6L2 7" />
      <path d="M16 14l-4 3-4-3" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

export function CameraIcon({ size = 24, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" fill={color} fillOpacity="0.1" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

export function ClockIcon({ size = 24, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.1" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

export function BouquetIcon({ size = 24, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <path d="M12 22c-1.5 0-3-1-3-3 0-1.5 1-2.5 3-3 2 .5 3 1.5 3 3 0 2-1.5 3-3 3z" fill={color} fillOpacity="0.15" />
      <path d="M10 16c-.5-2-2.5-3-4-2-1.5 1-1 3 0 4" stroke={color} strokeWidth="1.2" />
      <path d="M14 16c.5-2 2.5-3 4-2 1.5 1 1 3 0 4" stroke={color} strokeWidth="1.2" />
      <path d="M12 13V8" />
      <path d="M9 6c0-1.5 1-2.5 3-2.5S15 4.5 15 6" stroke={color} strokeWidth="1.2" />
      <path d="M12 5.5V3" stroke={color} strokeWidth="1.2" />
    </svg>
  )
}

export function EnvelopeIcon({ size = 24, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <rect x="2" y="4" width="20" height="16" rx="2" fill={color} fillOpacity="0.1" />
      <path d="M22 7l-10 6L2 7" />
    </svg>
  )
}

export function MusicIcon({ size = 24, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" fill={color} fillOpacity="0.15" />
      <circle cx="18" cy="16" r="3" fill={color} fillOpacity="0.15" />
    </svg>
  )
}

export function HugIcon({ size = 60, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <circle cx="9" cy="8" r="3.5" fill={color} fillOpacity="0.1" />
      <circle cx="15" cy="8" r="3.5" fill={color} fillOpacity="0.1" />
      <path d="M4 18c0-3 2-5 5-5h6c3 0 5 2 5 5" stroke={color} strokeWidth="1.5" />
      <path d="M8 18c0-2 1-3 2-4" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M16 18c0-2-1-3-2-4" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M12 13v3" stroke={color} strokeWidth="1.5" />
      <path d="M10 16l2-1 2 1" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.15" />
    </svg>
  )
}

export function HomeIcon({ size = 20, color = white }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill={color} fillOpacity="0.1" />
      <path d="M9 22V12h6v10" />
    </svg>
  )
}

export function RefreshIcon({ size = 20, color = white }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  )
}

export function ArrowUpIcon({ size = 20, color = white }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <line x1="12" y1="19" x2="12" y2="5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  )
}

export function HeadphonesIcon({ size = 20, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" fill={color} fillOpacity="0.1" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  )
}

export function BookIcon({ size = 20, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill={color} fillOpacity="0.1" />
    </svg>
  )
}

export function SparkleIcon({ size = 18, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <path d="M12 3l1.5 6 6 1.5-6 1.5L12 18l-1.5-6-6-1.5 6-1.5z" fill={color} fillOpacity="0.15" />
    </svg>
  )
}

export function FlowerIcon({ size = 40, color = pink }) {
  const d = 5.5
  const petals = [
    [12, 12 - d],
    [12 + d * 0.866, 12 - d * 0.5],
    [12 + d * 0.866, 12 + d * 0.5],
    [12, 12 + d],
    [12 - d * 0.866, 12 + d * 0.5],
    [12 - d * 0.866, 12 - d * 0.5],
  ]
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}>
      {petals.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill={color} fillOpacity="0.12" />
      ))}
      <circle cx="12" cy="12" r="3" fill={color} fillOpacity="0.3" />
    </svg>
  )
}

export function FlowerIcon2({ size = 40, color = pink }) {
  const d = 5.5
  const petals = [
    [12, 12 - d],
    [12 + d, 12],
    [12, 12 + d],
    [12 - d, 12],
  ]
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}>
      {petals.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="5.5" fill={color} fillOpacity="0.12" />
      ))}
      <circle cx="12" cy="12" r="3.5" fill={color} fillOpacity="0.3" />
    </svg>
  )
}

export function FlowerIcon3({ size = 40, color = pink }) {
  const d = 5
  const petals = Array.from({ length: 8 }, (_, i) => {
    const angle = i * Math.PI / 4
    return [12 + d * Math.cos(angle), 12 + d * Math.sin(angle)]
  })
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}>
      {petals.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4.5" fill={color} fillOpacity="0.12" />
      ))}
      <circle cx="12" cy="12" r="3" fill={color} fillOpacity="0.3" />
    </svg>
  )
}

export function CoupleIcon({ size = 32, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <circle cx="9" cy="7" r="3" fill={color} fillOpacity="0.1" />
      <circle cx="15" cy="7" r="3" fill={color} fillOpacity="0.1" />
      <path d="M4 18c0-3 2-5 5-5h6c3 0 5 2 5 5" />
      <path d="M9 13v4" stroke={color} strokeWidth="1" />
      <path d="M15 13v4" stroke={color} strokeWidth="1" />
      <path d="M11 15l1-1 1 1" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.1" />
    </svg>
  )
}

export function GalleryIcon({ label, size = 40, color = pink }) {
  const iconMap = {
    "Pertama Ketemu": <HeartFillIcon size={size} color={color} />,
    "Sunset Bareng": <SunsetIcon size={size} color={color} />,
    "Ultah Kamu": <CakeIcon size={size} color={color} />,
    "Movie Date": <FilmIcon size={size} color={color} />,
    "Makan Bersama": <FoodIcon size={size} color={color} />,
    "Natal": <TreeIcon size={size} color={color} />,
    "Liburan": <BeachIcon size={size} color={color} />,
    "Anniversary": <ChampagneIcon size={size} color={color} />,
    "Quality Time": <CoupleIcon size={size} color={color} />,
  }
  return iconMap[label] || <HeartFillIcon size={size} color={color} />
}

export function HeartFillIcon({ size = 24, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill={color} fillOpacity="0.3" />
    </svg>
  )
}

function SunsetIcon({ size = 40, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <path d="M17 18a5 5 0 0 0-10 0" />
      <line x1="12" y1="9" x2="12" y2="3" />
      <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
      <line x1="1" y1="18" x2="3" y2="18" />
      <line x1="21" y1="18" x2="23" y2="18" />
      <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
      <line x1="23" y1="22" x2="1" y2="22" />
    </svg>
  )
}

function CakeIcon({ size = 40, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" fill={color} fillOpacity="0.1" />
      <path d="M4 16c2 .5 4 .5 6 0s4-.5 6 0s4 .5 6 0" />
      <path d="M12 11V7" />
      <path d="M9 7c0-1.5 1-2.5 3-3 2 .5 3 1.5 3 3" />
      <circle cx="12" cy="5" r="1" fill={color} />
    </svg>
  )
}

function FilmIcon({ size = 40, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <rect x="2" y="2" width="20" height="20" rx="2" fill={color} fillOpacity="0.1" />
      <line x1="8" y1="2" x2="8" y2="22" />
      <line x1="16" y1="2" x2="16" y2="22" />
      <line x1="2" y1="8" x2="8" y2="8" />
      <line x1="2" y1="16" x2="8" y2="16" />
      <line x1="16" y1="8" x2="22" y2="8" />
      <line x1="16" y1="16" x2="22" y2="16" />
    </svg>
  )
}

function FoodIcon({ size = 40, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" fill={color} fillOpacity="0.1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  )
}

function TreeIcon({ size = 40, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <path d="M12 2l-3 5h2l-3 5h2l-4 6h12l-4-6h2l-3-5h2z" fill={color} fillOpacity="0.1" />
    </svg>
  )
}

function BeachIcon({ size = 40, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.05" />
      <path d="M12 2c-3 0-6 4-6 10s3 10 6 10" />
      <path d="M12 2c3 0 6 4 6 10s-3 10-6 10" />
      <path d="M2 12h20" />
      <path d="M12 2v20" />
    </svg>
  )
}

function ChampagneIcon({ size = 40, color = pink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <path d="M8 21h8" />
      <path d="M12 21v-6" />
      <path d="M12 7c-3 0-6 2-6 6h12c0-4-3-6-6-6z" fill={color} fillOpacity="0.1" />
      <path d="M12 7V3" />
      <path d="M9 3h6" />
    </svg>
  )
}

export function DownloadIcon({ size = 20, color = white }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  )
}

export function CopyIcon({ size = 20, color = white }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" fill={color} fillOpacity="0.1" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS  (copy these into your :root or a tokens.js file)
// ─────────────────────────────────────────────────────────────────────────────
const TOKENS = `
:root {
  /* Breakpoints (reference only – use in JS via useBreakpoint) */
  --bp-sm:  480px;
  --bp-md:  768px;
  --bp-lg:  1024px;
  --bp-xl:  1280px;
  --bp-2xl: 1536px;

  /* Fluid spacing scale (clamp: min → max) */
  --space-1:  clamp(0.25rem, 0.5vw,  0.5rem);
  --space-2:  clamp(0.5rem,  1vw,    1rem);
  --space-3:  clamp(0.75rem, 1.5vw,  1.5rem);
  --space-4:  clamp(1rem,    2vw,    2rem);
  --space-6:  clamp(1.5rem,  3vw,    3rem);
  --space-8:  clamp(2rem,    4vw,    4rem);
  --space-12: clamp(3rem,    6vw,    6rem);
  --space-16: clamp(4rem,    8vw,    8rem);

  /* Fluid type scale */
  --text-xs:   clamp(0.694rem, 1.4vw,  0.75rem);
  --text-sm:   clamp(0.833rem, 1.6vw,  0.875rem);
  --text-base: clamp(1rem,     1.8vw,  1rem);
  --text-lg:   clamp(1.2rem,   2.2vw,  1.25rem);
  --text-xl:   clamp(1.44rem,  2.6vw,  1.5rem);
  --text-2xl:  clamp(1.728rem, 3vw,    2rem);
  --text-3xl:  clamp(2.074rem, 4vw,    2.5rem);
  --text-4xl:  clamp(2.488rem, 5vw,    3.5rem);
  --text-5xl:  clamp(2.986rem, 6vw,    5rem);

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm:  0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.05);
  --shadow-md:  0 4px 12px rgba(0,0,0,.1),  0 2px 4px  rgba(0,0,0,.06);
  --shadow-lg:  0 10px 30px rgba(0,0,0,.12), 0 4px 8px  rgba(0,0,0,.08);
  --shadow-xl:  0 20px 60px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.08);

  /* Z-index scale */
  --z-base:    0;
  --z-raised:  10;
  --z-overlay: 100;
  --z-modal:   200;
  --z-toast:   300;
  --z-top:     400;

  /* Duration / easing */
  --dur-fast:   150ms;
  --dur-base:   250ms;
  --dur-slow:   400ms;
  --ease-out:   cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in:    cubic-bezier(0.7, 0, 0.84, 0);
  --ease-inout: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring:cubic-bezier(0.34, 1.56, 0.64, 1);

  /* E-commerce specific colors */
  --color-primary: #059669;
  --color-primary-dark: #047857;
  --color-secondary: #6b7280;
  --color-accent: #f59e0b;
  --color-danger: #dc2626;
  --color-success: #16a34a;
  --color-warning: #d97706;
  --color-info: #3b82f6;
  
  /* Neutral colors */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────────────────

// useBreakpoint – returns current named breakpoint
export function useBreakpoint() {
  const [bp, setBp] = useState(() => getBreakpoint());

  function getBreakpoint() {
    if (typeof window === "undefined") return "base";
    const w = window.innerWidth;
    if (w >= 1536) return "2xl";
    if (w >= 1280) return "xl";
    if (w >= 1024) return "lg";
    if (w >= 768)  return "md";
    if (w >= 480)  return "sm";
    return "base";
  }

  useState(() => {
    const handler = () => setBp(getBreakpoint());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  });

  const ORDER = ["base","sm","md","lg","xl","2xl"];
  return {
    bp,
    /** true if current bp >= given bp */
    gte: (target) => ORDER.indexOf(bp) >= ORDER.indexOf(target),
    /** true if current bp < given bp */
    lt:  (target) => ORDER.indexOf(bp) <  ORDER.indexOf(target),
    isMobile: ORDER.indexOf(bp) < ORDER.indexOf("md"),
    isTablet: bp === "md" || bp === "lg",
    isDesktop: ORDER.indexOf(bp) >= ORDER.indexOf("lg"),
  };
}

// useContainerQuery – ResizeObserver-based container query
export function useContainerQuery(ref) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useState(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) =>
      setSize({ w: e.contentRect.width, h: e.contentRect.height })
    );
    ro.observe(ref.current);
    return () => ro.disconnect();
  });
  return size;
}

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT PRESETS
// ─────────────────────────────────────────────────────────────────────────────

/** Stack – vertical flex with gap */
export function Stack({ gap = "var(--space-4)", align = "stretch", children, style, ...p }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap, alignItems:align, ...style }} {...p}>
      {children}
    </div>
  );
}

/** Cluster – wrapping horizontal flex */
export function Cluster({ gap = "var(--space-3)", align = "center", justify = "flex-start", children, style, ...p }) {
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap, alignItems:align, justifyContent:justify, ...style }} {...p}>
      {children}
    </div>
  );
}

/** Container – max-width centred wrapper */
export function Container({ size = "lg", children, style, ...p }) {
  const maxWidths = { sm:"480px", md:"768px", lg:"1024px", xl:"1280px", "2xl":"1536px", full:"100%" };
  return (
    <div style={{
      maxWidth: maxWidths[size] ?? size,
      marginInline: "auto",
      paddingInline: "clamp(1rem, 5vw, 2.5rem)",
      width: "100%",
      ...style
    }} {...p}>
      {children}
    </div>
  );
}

/** Responsive Grid */
export function Grid({ cols = { base:1, sm:2, lg:3 }, gap = "var(--space-4)", children, style, ...p }) {
  const { bp } = useBreakpoint();
  const ORDER = ["base","sm","md","lg","xl","2xl"];
  function resolve(map) {
    const keys = Object.keys(map).sort((a,b)=>ORDER.indexOf(a)-ORDER.indexOf(b));
    let val = map.base ?? 1;
    for (const k of keys) if (ORDER.indexOf(bp) >= ORDER.indexOf(k)) val = map[k];
    return val;
  }
  const numCols = typeof cols === "number" ? cols : resolve(cols);
  return (
    <div style={{
      display:"grid",
      gridTemplateColumns: `repeat(${numCols}, 1fr)`,
      gap,
      ...style
    }} {...p}>
      {children}
    </div>
  );
}

/** Sidebar – sidebar + main, collapses on mobile */
export function Sidebar({ sideWidth = "280px", gap = "var(--space-6)", side = "left", children, style }) {
  const { isMobile } = useBreakpoint();
  const [a, b] = Array.isArray(children) ? children : [null, children];
  return (
    <div style={{
      display:"flex",
      flexDirection: isMobile ? "column" : "row",
      gap,
      ...style
    }}>
      {side === "left" && <div style={{ flexShrink:0, width: isMobile?"100%":sideWidth }}>{a}</div>}
      <div style={{ flex:1, minWidth:0 }}>{side === "left" ? b : a}</div>
      {side === "right" && <div style={{ flexShrink:0, width: isMobile?"100%":sideWidth }}>{b}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TYPOGRAPHY PRESETS
// ─────────────────────────────────────────────────────────────────────────────

const typeStyles = {
  display: { fontSize:"var(--text-5xl)", fontWeight:800, lineHeight:1.05, letterSpacing:"-0.04em" },
  h1:      { fontSize:"var(--text-4xl)", fontWeight:700, lineHeight:1.1,  letterSpacing:"-0.03em" },
  h2:      { fontSize:"var(--text-3xl)", fontWeight:700, lineHeight:1.15, letterSpacing:"-0.02em" },
  h3:      { fontSize:"var(--text-2xl)", fontWeight:600, lineHeight:1.25, letterSpacing:"-0.01em" },
  h4:      { fontSize:"var(--text-xl)",  fontWeight:600, lineHeight:1.3 },
  h5:      { fontSize:"var(--text-lg)",  fontWeight:600, lineHeight:1.4 },
  lead:    { fontSize:"var(--text-xl)",  fontWeight:400, lineHeight:1.6 },
  body:    { fontSize:"var(--text-base)",fontWeight:400, lineHeight:1.65 },
  small:   { fontSize:"var(--text-sm)",  fontWeight:400, lineHeight:1.5 },
  caption: { fontSize:"var(--text-xs)",  fontWeight:500, lineHeight:1.4, letterSpacing:"0.04em", textTransform:"uppercase" },
  mono:    { fontSize:"var(--text-sm)",  fontFamily:"'JetBrains Mono', 'Fira Code', monospace", lineHeight:1.7 },
  label:   { fontSize:"var(--text-sm)",  fontWeight:500, lineHeight:1.4 },
};

export function Text({ as: Tag = "p", variant = "body", children, style, ...p }) {
  return <Tag style={{ ...typeStyles[variant], margin:0, ...style }} {...p}>{children}</Tag>;
}

// ─────────────────────────────────────────────────────────────────────────────
// BUTTON PRESET
// ─────────────────────────────────────────────────────────────────────────────

const BTN_SIZES = {
  xs: { padding:"0.25rem 0.625rem", fontSize:"var(--text-xs)" },
  sm: { padding:"0.375rem 0.875rem", fontSize:"var(--text-sm)" },
  md: { padding:"0.5rem 1.25rem",   fontSize:"var(--text-base)" },
  lg: { padding:"0.75rem 1.75rem",  fontSize:"var(--text-lg)" },
  xl: { padding:"1rem 2.25rem",     fontSize:"var(--text-xl)" },
};

const BTN_VARIANTS = {
  solid:   { background:"var(--color-primary)", color:"#fff", border:"2px solid var(--color-primary)" },
  outline: { background:"transparent", color:"var(--color-primary)", border:"2px solid var(--color-primary)" },
  ghost:   { background:"transparent", color:"var(--color-gray-600)", border:"2px solid transparent" },
  danger:  { background:"var(--color-danger)", color:"#fff", border:"2px solid var(--color-danger)" },
  success: { background:"var(--color-success)", color:"#fff", border:"2px solid var(--color-success)" },
  muted:   { background:"var(--color-gray-100)", color:"var(--color-gray-600)", border:"2px solid var(--color-gray-100)" },
};

export function Button({ size="md", variant="solid", children, style, disabled, ...p }) {
  return (
    <button disabled={disabled} style={{
      ...BTN_SIZES[size],
      ...BTN_VARIANTS[variant],
      borderRadius:"var(--radius-md)",
      fontWeight:600,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition:"all var(--dur-fast) var(--ease-out)",
      lineHeight:1.4,
      display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"0.5rem",
      whiteSpace:"nowrap",
      ...style,
    }} {...p}>{children}</button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CARD PRESET
// ─────────────────────────────────────────────────────────────────────────────

export function Card({ children, padding = "var(--space-6)", style, hoverable, ...p }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={hoverable ? ()=>setHovered(true)  : undefined}
      onMouseLeave={hoverable ? ()=>setHovered(false) : undefined}
      style={{
        background:"#fff",
        borderRadius:"var(--radius-lg)",
        border:"1px solid var(--color-gray-200)",
        padding,
        boxShadow: hovered ? "var(--shadow-lg)" : "var(--shadow-sm)",
        transform: hovered ? "translateY(-2px)" : "none",
        transition:"box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
        ...style,
      }} {...p}
    >{children}</div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FORM PRESETS
// ─────────────────────────────────────────────────────────────────────────────

export function Input({ label, hint, error, id, style, ...p }) {
  return (
    <Stack gap="0.375rem">
      {label && <Text variant="label" as="label" htmlFor={id}>{label}</Text>}
      <input id={id} style={{
        width:"100%", boxSizing:"border-box",
        padding:"0.5rem 0.875rem",
        border: `1.5px solid ${error ? "var(--color-danger)" : "var(--color-gray-300)"}`,
        borderRadius:"var(--radius-md)",
        fontSize:"var(--text-base)",
        outline:"none",
        transition:"border-color var(--dur-fast)",
        background:"#fff",
        ...style,
      }} {...p}/>
      {(hint || error) && (
        <Text variant="small" style={{ color: error ? "var(--color-danger)" : "var(--color-gray-500)" }}>
          {error ?? hint}
        </Text>
      )}
    </Stack>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BADGE PRESET
// ─────────────────────────────────────────────────────────────────────────────

const BADGE_COLORS = {
  default: { bg:"var(--color-gray-100)", color:"var(--color-gray-700)" },
  primary: { bg:"#dcfce7", color:"var(--color-primary)" },
  success: { bg:"#dcfce7", color:"var(--color-success)" },
  warning: { bg:"#fef9c3", color:"var(--color-warning)" },
  danger:  { bg:"#fee2e2", color:"var(--color-danger)" },
  info:    { bg:"#dbeafe", color:"var(--color-info)" },
};

export function Badge({ children, color = "default", style }) {
  const c = BADGE_COLORS[color];
  return (
    <span style={{
      display:"inline-flex", alignItems:"center",
      padding:"0.2rem 0.6rem",
      borderRadius:"var(--radius-full)",
      fontSize:"var(--text-xs)", fontWeight:600,
      background:c.bg, color:c.color,
      letterSpacing:"0.02em",
      ...style,
    }}>{children}</span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON PRESET
// ─────────────────────────────────────────────────────────────────────────────

export function Skeleton({ w = "100%", h = "1rem", rounded = "var(--radius-md)", style }) {
  return (
    <div style={{
      width:w, height:h,
      borderRadius:rounded,
      background:"linear-gradient(90deg, var(--color-gray-100) 25%, var(--color-gray-200) 50%, var(--color-gray-100) 75%)",
      backgroundSize:"200% 100%",
      animation:"shimmer 1.4s infinite",
      ...style,
    }}>
      <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN SYSTEM PROVIDER
// ─────────────────────────────────────────────────────────────────────────────

export function DesignSystemProvider({ children }) {
  return (
    <>
      <style>{`
        * { box-sizing: border-box }
        ${TOKENS}
        body { margin:0; font-family: 'Bai Jamjuree', 'Inter', system-ui, sans-serif }
        a { color: inherit }
        button { font-family: inherit }
        input { font-family: inherit }
      `}</style>
      {children}
    </>
  );
}

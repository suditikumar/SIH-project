import React, { useState, useRef, useEffect, useCallback } from "react";

/* ---------------------------------------------------------
   MindScribe — a warm, social memory-sketch mini-game
   Interactive prototype (single-device demo with AI companions
   standing in for other players, since this environment can't
   host a real multiplayer server).
--------------------------------------------------------- */

const COLORS = {
  skyTop: "#7fc3ea",
  skyMid: "#a9d9ee",
  skyBottom: "#cdeaf2",
  cream: "#fdf5e6",
  creamBorder: "#c9955f",
  brown: "#4a3527",
  brownSoft: "#7a6250",
  green: "#4f8a5b",
  greenDark: "#3c6b46",
  greenSoft: "#dcecd9",
  orange: "#e0913f",
  hillFar: "#9fcf8a",
  hillNear: "#6fae6a",
  river: "#8fd0e6",
  riverDeep: "#6db8d6",
};

const WORDS = [
  // everyday & familiar
  { word: "cat", emoji: "🐱", regional: false },
  { word: "dog", emoji: "🐶", regional: false },
  { word: "house", emoji: "🏠", regional: false },
  { word: "tree", emoji: "🌳", regional: false },
  { word: "flower", emoji: "🌸", regional: false },
  { word: "car", emoji: "🚗", regional: false },
  { word: "bus", emoji: "🚌", regional: false },
  { word: "bicycle", emoji: "🚲", regional: false },
  { word: "cup", emoji: "☕", regional: false },
  { word: "chair", emoji: "🪑", regional: false },
  { word: "clock", emoji: "🕐", regional: false },
  { word: "sun", emoji: "☀️", regional: false },
  { word: "moon", emoji: "🌙", regional: false },
  { word: "fish", emoji: "🐟", regional: false },
  { word: "bird", emoji: "🐦", regional: false },
  { word: "mango", emoji: "🥭", regional: false },
  { word: "apple", emoji: "🍎", regional: false },
  { word: "book", emoji: "📖", regional: false },
  { word: "shoe", emoji: "👞", regional: false },
  { word: "hat", emoji: "🎩", regional: false },
  { word: "garden", emoji: "🌷", regional: false },
  { word: "umbrella", emoji: "☂️", regional: false },
  // Northeastern India personalization
  { word: "tea", emoji: "🍵", regional: true },
  { word: "boat", emoji: "🛶", regional: true },
  { word: "river", emoji: "🏞️", regional: true },
  { word: "mountain", emoji: "⛰️", regional: true },
  { word: "bamboo", emoji: "🎍", regional: true },
  { word: "basket", emoji: "🧺", regional: true },
  { word: "rice", emoji: "🍚", regional: true },
  { word: "orchid", emoji: "🌺", regional: true },
  { word: "rain", emoji: "🌧️", regional: true },
  { word: "shawl", emoji: "🧣", regional: true },
  { word: "market", emoji: "🛒", regional: true },
  { word: "drum", emoji: "🥁", regional: true },
  { word: "lamp", emoji: "🪔", regional: true },
  { word: "fishing net", emoji: "🎣", regional: true },
];

const LANGS = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "as", label: "অসমীয়া", flag: "🇮🇳" },
  { code: "bn", label: "বাংলা", flag: "🇮🇳" },
];

const STRINGS = {
  en: {
    title: "MindScribe",
    tagline: "A little journey through memories.",
    welcomeBack: (n) => `Welcome back, ${n}!`,
    namePrompt: "What should we call you?",
    namePlaceholder: "Type your name…",
    readyPrompt: "Ready for today's memory journey?",
    continue: "Continue",
    disclaimer:
      "MindScribe is a recreational memory-engagement activity. It is not intended to diagnose, treat, prevent, monitor, or cure any medical condition.",
    lobby: "The Room",
    yourName: "Your name",
    startGame: "I'm ready",
    matching: "Finding a comfortable group for you…",
    chooseWord: "Pick something to draw",
    yourTurn: "Your turn to draw!",
    waitingFor: (n) => `${n} is drawing…`,
    takeYourTime: "Take your time",
    someoneGuessed: "Someone guessed it!",
    niceTry: "Nice try!",
    guessPlaceholder: "Type your guess…",
    send: "Send",
    hint: "Hint",
    turnComplete: "Turn complete!",
    nextPlayer: "Next player",
    leaderboard: "Today's Memory Journey",
    playAgain: "Play again",
    settings: "Caregiver settings",
  },
  hi: {
    title: "माइंडस्क्राइब",
    tagline: "यादों की एक छोटी यात्रा।",
    welcomeBack: (n) => `वापसी पर स्वागत है, ${n}!`,
    namePrompt: "हम आपको क्या कहें?",
    namePlaceholder: "अपना नाम लिखें…",
    readyPrompt: "आज की याद यात्रा के लिए तैयार हैं?",
    continue: "आगे बढ़ें",
    disclaimer:
      "माइंडस्क्राइब एक मनोरंजक स्मृति-जुड़ाव गतिविधि है। यह किसी चिकित्सीय स्थिति के निदान, उपचार या निगरानी के लिए नहीं है।",
    lobby: "कमरा",
    yourName: "आपका नाम",
    startGame: "मैं तैयार हूँ",
    matching: "आपके लिए एक अच्छा समूह ढूंढ रहे हैं…",
    chooseWord: "बनाने के लिए कुछ चुनें",
    yourTurn: "आपकी बनाने की बारी!",
    waitingFor: (n) => `${n} बना रहे हैं…`,
    takeYourTime: "अपना समय लें",
    someoneGuessed: "किसी ने सही अनुमान लगाया!",
    niceTry: "अच्छी कोशिश!",
    guessPlaceholder: "अपना अनुमान लिखें…",
    send: "भेजें",
    hint: "संकेत",
    turnComplete: "बारी पूरी हुई!",
    nextPlayer: "अगला खिलाड़ी",
    leaderboard: "आज की याद यात्रा",
    playAgain: "फिर से खेलें",
    settings: "देखभालकर्ता सेटिंग्स",
  },
};
const t = (lang, key, ...args) => {
  const dict = STRINGS[lang] || STRINGS.en;
  const val = dict[key] ?? STRINGS.en[key];
  return typeof val === "function" ? val(...args) : val;
};

const BOTS = [
  { id: "bot1", name: "Deuta", avatar: "👴", color: "#e0913f" },
  { id: "bot2", name: "Aita", avatar: "👵", color: "#8a5fb0" },
  { id: "bot3", name: "Ronju", avatar: "🧑", color: "#4f8a5b" },
];

const ENCOURAGEMENTS = ["Take your time", "Nice try!", "You remembered!", "Lovely drawing!"];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ---------------- Background scenery (matches reference art) ---------------- */
function Scenery() {
  return (
    <div style={styles.scenery} aria-hidden="true">
      <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.skyTop} />
            <stop offset="55%" stopColor={COLORS.skyMid} />
            <stop offset="100%" stopColor={COLORS.skyBottom} />
          </linearGradient>
          <radialGradient id="sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe9a8" />
            <stop offset="100%" stopColor="#ffd873" />
          </radialGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#sky)" />
        <circle cx="1050" cy="120" r="70" fill="url(#sun)" opacity="0.9" />
        <g fill="#ffffff" opacity="0.85">
          <ellipse cx="150" cy="110" rx="70" ry="26" />
          <ellipse cx="210" cy="95" rx="50" ry="22" />
          <ellipse cx="560" cy="70" rx="55" ry="20" />
          <ellipse cx="930" cy="230" rx="60" ry="22" />
        </g>
        {/* mountains */}
        <polygon points="0,520 120,340 260,520" fill="#8a97a3" opacity="0.55" />
        <polygon points="140,520 260,300 420,520" fill="#7c8a97" opacity="0.55" />
        <polygon points="1200,520 1080,340 940,520" fill="#8a97a3" opacity="0.55" />
        <polygon points="1060,520 940,300 780,520" fill="#7c8a97" opacity="0.55" />
        <polygon points="240,470 260,430 280,470" fill="#fff" opacity="0.9" />
        <polygon points="1000,460 1020,420 1040,460" fill="#fff" opacity="0.9" />
        {/* hills */}
        <ellipse cx="150" cy="760" rx="300" ry="130" fill={COLORS.hillFar} />
        <ellipse cx="1080" cy="770" rx="320" ry="140" fill={COLORS.hillFar} />
        <rect x="0" y="560" width="1200" height="240" fill={COLORS.hillNear} />
        {/* river */}
        <rect x="0" y="660" width="1200" height="90" fill={COLORS.river} />
        <rect x="0" y="660" width="1200" height="90" fill={COLORS.riverDeep} opacity="0.25" />
        {/* houses */}
        <g>
          <rect x="330" y="590" width="80" height="60" rx="4" fill="#e0b98a" />
          <polygon points="320,590 370,555 420,590" fill="#7a4a3a" />
          <rect x="355" y="615" width="20" height="35" fill="#5a3a2a" />
          <rect x="340" y="600" width="14" height="14" fill="#bfe3f0" />
          <rect x="386" y="600" width="14" height="14" fill="#bfe3f0" />
        </g>
        <g>
          <rect x="960" y="600" width="70" height="55" rx="4" fill="#e0b98a" />
          <polygon points="950,600 995,568 1040,600" fill="#5a4a8a" />
          <rect x="985" y="622" width="18" height="33" fill="#5a3a2a" />
        </g>
        {/* trees */}
        {[[60, 660], [110, 690], [1130, 670], [1160, 700]].map(([x, y], i) => (
          <g key={i}>
            <rect x={x - 4} y={y + 20} width="8" height="30" fill="#6b4a34" />
            <circle cx={x} cy={y} r="26" fill="#4f8a5b" />
            <circle cx={x - 16} cy={y + 10} r="18" fill="#4f8a5b" />
          </g>
        ))}
        {/* subtle bamboo easter egg, bottom-left */}
        <g opacity="0.5">
          {[0, 1, 2].map((i) => (
            <rect key={i} x={200 + i * 14} y="700" width="6" height="60" fill="#7a9a4a" rx="3" />
          ))}
        </g>
      </svg>
    </div>
  );
}

/* ---------------- Small shared UI pieces ---------------- */
function CreamCard({ children, style }) {
  return <div style={{ ...styles.card, ...style }}>{children}</div>;
}
function PrimaryButton({ children, onClick, disabled, style }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...styles.primaryBtn, ...(disabled ? styles.btnDisabled : {}), ...style }}
    >
      {children}
    </button>
  );
}
function PillButton({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{ ...styles.pill, ...(active ? styles.pillActive : {}) }}>
      {children}
    </button>
  );
}
function ProgressBar({ pct, color = COLORS.green }) {
  return (
    <div style={styles.progressTrack}>
      <div style={{ ...styles.progressFill, width: `${pct}%`, background: color }} />
    </div>
  );
}

/* ---------------- Drawing canvas ---------------- */
function DrawingCanvas({ enabled, onStroke }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const history = useRef([]);
  const [color, setColor] = useState("#4a3527");
  const palette = ["#4a3527", "#e0913f", "#4f8a5b", "#3b7bb0", "#c0507a", "#000000"];

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, c.width, c.height);
  }, []);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: ((clientX - rect.left) / rect.width) * canvasRef.current.width,
      y: ((clientY - rect.top) / rect.height) * canvasRef.current.height,
    };
  };

  const saveSnapshot = () => {
    const c = canvasRef.current;
    history.current.push(c.toDataURL());
    if (history.current.length > 20) history.current.shift();
  };

  const start = (e) => {
    if (!enabled) return;
    e.preventDefault();
    saveSnapshot();
    drawing.current = true;
    const { x, y } = getPos(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
    onStroke && onStroke();
  };
  const move = (e) => {
    if (!drawing.current || !enabled) return;
    e.preventDefault();
    const { x, y } = getPos(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  const end = () => {
    drawing.current = false;
  };
  const undo = () => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    const last = history.current.pop();
    if (last) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = last;
    } else {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, c.width, c.height);
    }
  };
  const clear = () => {
    saveSnapshot();
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={560}
        height={340}
        style={{
          ...styles.canvas,
          cursor: enabled ? "crosshair" : "not-allowed",
          opacity: enabled ? 1 : 0.85,
        }}
        onMouseDown={start}
        onMouseMove={move}
        onMouseUp={end}
        onMouseLeave={end}
        onTouchStart={start}
        onTouchMove={move}
        onTouchEnd={end}
      />
      {enabled && (
        <div style={styles.toolRow}>
          {palette.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              style={{
                ...styles.swatch,
                background: c,
                outline: color === c ? `3px solid ${COLORS.orange}` : "2px solid #fff",
              }}
              aria-label={`color ${c}`}
            />
          ))}
          <button style={styles.toolBtn} onClick={undo}>↺ Undo</button>
          <button style={styles.toolBtn} onClick={clear}>🗑 Clear</button>
        </div>
      )}
    </div>
  );
}

/* ---------------- Live doodle (what you see while someone else draws) ---------------- */
// Simple, hand-drawn-feel line art per word, revealed stroke by stroke so a
// turn in progress always shows something on the canvas — never a blank page.
const WORD_DOODLES = {
  cat: ["M60,110 Q60,70 100,70 Q140,70 140,110 Z", "M70,72 L60,52 L80,66", "M130,66 L140,52 L150,72", "M85,95 Q100,105 115,95", "M100,90 L100,95", "M60,102 L30,98", "M60,110 L28,112", "M140,102 L172,98"],
  house: ["M40,120 L40,75 L100,40 L160,75 L160,120 Z", "M85,120 L85,90 L115,90 L115,120", "M60,95 L75,95 L75,110 L60,110 Z"],
  tree: ["M97,140 L103,140 L102,95 L98,95 Z", "M100,45 C60,45 55,90 100,90 C145,90 140,45 100,45 Z"],
  flower: ["M100,80 m-14,0 a14,14 0 1,0 28,0 a14,14 0 1,0 -28,0", "M100,50 a15,20 0 1,1 0,1", "M130,80 a20,15 0 1,1 -1,0", "M100,110 a15,20 0 1,1 0,-1", "M70,80 a20,15 0 1,1 1,0", "M100,120 L100,145"],
  car: ["M35,105 L45,80 L135,80 L150,105 Z", "M35,105 L150,105 L150,115 L35,115 Z", "M58,115 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0", "M128,115 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0"],
  tea: ["M55,75 L145,75 L138,120 L62,120 Z", "M145,80 Q170,80 170,98 Q170,116 145,112", "M75,60 Q80,50 75,42", "M100,60 Q105,50 100,42"],
  boat: ["M35,110 Q100,140 165,110 L150,95 L50,95 Z", "M100,95 L100,45", "M100,50 L135,68 L100,72 Z"],
  river: ["M20,80 Q60,60 100,80 T180,80", "M20,105 Q60,85 100,105 T180,105", "M20,130 Q60,110 100,130 T180,130"],
  mountain: ["M20,130 L70,55 L110,95 L140,60 L180,130 Z", "M60,75 L70,55 L80,75"],
  bamboo: ["M75,140 L75,40", "M105,140 L105,40", "M135,140 L135,40", "M68,110 L82,110", "M68,80 L82,80", "M98,110 L112,110", "M98,80 L112,80", "M128,110 L142,110", "M128,80 L142,80"],
  basket: ["M45,80 L155,80 L140,135 L60,135 Z", "M45,80 L60,60 L140,60 L155,80", "M45,95 L155,95", "M52,110 L148,110", "M60,60 L60,135", "M100,60 L100,135", "M140,60 L140,135"],
  rice: ["M50,90 Q100,70 150,90 L140,120 Q100,135 60,120 Z", "M80,80 L75,60", "M100,78 L100,55", "M120,80 L125,60"],
  garden: ["M60,140 L60,90", "M140,140 L140,90", "M100,140 L100,90", "M60,90 m-12,0 a12,12 0 1,0 24,0 a12,12 0 1,0 -24,0", "M100,90 m-12,0 a12,12 0 1,0 24,0 a12,12 0 1,0 -24,0", "M140,90 m-12,0 a12,12 0 1,0 24,0 a12,12 0 1,0 -24,0"],
  umbrella: ["M30,85 Q100,25 170,85 Z", "M100,85 L100,135 Q100,148 88,145", "M45,85 L45,90", "M100,85 L100,90", "M155,85 L155,90"],
  orchid: ["M100,90 m-12,-18 a12,18 0 1,1 0.1,0", "M100,90 m12,-18 a12,18 0 1,1 -0.1,0", "M100,90 m-16,10 a14,10 0 1,1 0.1,0", "M100,90 m16,10 a14,10 0 1,1 -0.1,0", "M100,90 m0,20 a10,14 0 1,1 0.1,0", "M100,140 L100,90"],
  dog: ["M60,115 Q60,72 100,72 Q140,72 140,115 Z", "M62,78 Q45,90 55,110", "M138,78 Q155,90 145,110", "M85,95 L82,102", "M115,95 L118,102", "M100,105 L100,110", "M100,110 L60,120"],
  bus: ["M30,60 L170,60 L170,115 L30,115 Z", "M30,115 L170,115 L170,122 L30,122 Z", "M45,60 L45,90 L75,90 L75,60", "M85,60 L85,90 L115,90 L115,60", "M125,60 L125,90 L155,90 L155,60", "M55,122 m-9,0 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0", "M145,122 m-9,0 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0"],
  bicycle: ["M55,120 m-25,0 a25,25 0 1,0 50,0 a25,25 0 1,0 -50,0", "M145,120 m-25,0 a25,25 0 1,0 50,0 a25,25 0 1,0 -50,0", "M55,120 L95,70 L120,120", "M95,70 L80,50 L100,50", "M95,70 L145,120", "M75,50 L110,50"],
  cup: ["M60,70 L140,70 L133,120 L67,120 Z", "M140,75 Q162,75 162,92 Q162,108 140,105"],
  chair: ["M55,50 L55,90 L135,90 L135,50", "M55,90 L55,135", "M135,90 L135,135", "M60,135 L60,145", "M130,135 L130,145"],
  clock: ["M100,90 m-45,0 a45,45 0 1,0 90,0 a45,45 0 1,0 -90,0", "M100,90 L100,58", "M100,90 L124,102"],
  sun: ["M100,90 m-25,0 a25,25 0 1,0 50,0 a25,25 0 1,0 -50,0", "M100,40 L100,25", "M100,155 L100,140", "M50,90 L35,90", "M165,90 L150,90", "M64,54 L53,43", "M147,127 L136,116", "M136,54 L147,43", "M53,127 L64,116"],
  moon: ["M120,45 A45,45 0 1,0 120,135 A35,35 0 1,1 120,45 Z"],
  fish: ["M40,90 Q90,55 150,90 Q90,125 40,90 Z", "M150,90 L172,75 L172,105 Z", "M65,90 L60,85", "M110,80 Q120,90 110,100"],
  bird: ["M50,95 Q60,65 100,72 Q140,60 155,80 Q130,80 120,92 Q125,110 100,112 Q75,120 55,105 Z", "M40,88 L50,95 L45,102", "M100,72 L110,60"],
  mango: ["M100,60 C60,60 55,110 95,130 C120,142 145,120 140,90 C135,65 120,55 100,60 Z", "M100,60 L92,45", "M92,45 L108,42"],
  apple: ["M100,65 C70,55 55,90 65,115 C73,132 90,138 100,130 C110,138 127,132 135,115 C145,90 130,55 100,65 Z", "M100,65 L100,45", "M100,48 Q112,42 118,50"],
  book: ["M100,55 Q65,45 40,55 L40,120 Q65,110 100,120 Z", "M100,55 Q135,45 160,55 L160,120 Q135,110 100,120 Z", "M100,55 L100,120"],
  shoe: ["M40,110 L40,90 Q40,80 55,80 L85,80 L120,60 Q135,53 148,62 L160,72 Q168,78 168,90 L168,110 Z", "M40,110 L168,110 L168,120 L40,120 Z", "M85,80 L85,95"],
  hat: ["M60,95 L140,95", "M75,95 Q75,55 100,55 Q125,55 125,95", "M45,100 Q100,88 155,100 Q100,112 45,100 Z"],
  rain: ["M45,80 Q45,55 70,55 Q78,35 105,40 Q130,35 135,58 Q160,58 160,80 Q160,95 140,95 L60,95 Q45,95 45,80 Z", "M65,105 L58,120", "M95,105 L88,120", "M125,105 L118,120", "M78,115 L71,130", "M108,115 L101,130"],
  shawl: ["M40,55 L160,55 L160,115 L40,115 Z", "M40,70 L160,70", "M40,90 L160,90", "M45,115 L40,130", "M65,115 L60,130", "M85,115 L80,130", "M105,115 L100,130", "M125,115 L120,130", "M145,115 L140,130"],
  market: ["M35,80 L100,45 L165,80 Z", "M45,80 L45,125 L155,125 L155,80", "M65,95 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0", "M125,95 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0"],
  drum: ["M55,55 L145,55 L135,125 L65,125 Z", "M55,55 Q100,68 145,55", "M65,125 Q100,138 135,125", "M60,60 L60,120", "M140,60 L140,120"],
  lamp: ["M50,100 Q50,120 100,120 Q150,120 150,100 Q150,85 100,85 Q50,85 50,100 Z", "M100,85 Q95,65 100,55 Q108,68 103,85", "M65,100 L60,110", "M135,100 L140,110"],
  "fishing net": ["M40,50 L160,140", "M60,50 L140,150", "M85,45 L120,150", "M110,45 L145,140", "M40,90 L170,60", "M35,115 L165,85", "M40,140 L160,110"],
};

function LiveDoodle({ word, elapsedFrac }) {
  const paths = WORD_DOODLES[word] || WORD_DOODLES.flower;
  const revealFrac = Math.min(1, elapsedFrac / 0.75); // fully drawn ~3/4 through the turn
  return (
    <div style={styles.doodleBox}>
      <svg viewBox="0 0 200 150" style={{ width: "100%", height: "100%" }}>
        {paths.map((d, i) => {
          const start = i / paths.length;
          const end = (i + 1) / paths.length;
          const local = Math.max(0, Math.min(1, (revealFrac - start) / (end - start)));
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={COLORS.brown}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - local}
              style={{ transition: "stroke-dashoffset 0.4s linear" }}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ---------------- Main app ---------------- */
export default function MindScribe() {
  const [lang, setLang] = useState("en");
  const [screen, setScreen] = useState("welcome");
  const [name, setName] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    difficulty: "Gentle",
    drawTime: 90,
    hints: true,
    voice: "Minimal",
    gameMode: "Gentle Memory",
  });

  const players = [{ id: "you", name, avatar: "🧑‍🦳", color: COLORS.green, isYou: true }, ...BOTS];
  const [scores, setScores] = useState(() =>
    Object.fromEntries(players.map((p) => [p.id, 0]))
  );
  const [turnOrder] = useState(() => players.map((p) => p.id));
  const [turnIndex, setTurnIndex] = useState(0);
  const drawerId = turnOrder[turnIndex % turnOrder.length];
  const drawer = players.find((p) => p.id === drawerId);
  const isYourTurn = drawerId === "you";

  const [wordChoices, setWordChoices] = useState([]);
  const [usedWords, setUsedWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [timeLeft, setTimeLeft] = useState(settings.drawTime);
  const [hintShown, setHintShown] = useState(false);
  const [guessers, setGuessers] = useState([]); // who still needs to guess
  const [chat, setChat] = useState([]);
  const [guessInput, setGuessInput] = useState("");
  const [lastTurnResult, setLastTurnResult] = useState(null);
  const [sessionLog, setSessionLog] = useState([]); // one entry per completed turn, feeds the caregiver report
  const [youGuessInfo, setYouGuessInfo] = useState(null); // {timeLeft, usedHint} captured the moment "you" guess correctly
  const [toast, setToast] = useState(null);
  const chatEndRef = useRef(null);

  const speak = useCallback(
    (text) => {
      if (settings.voice === "Off") return;
      try {
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 0.95;
        window.speechSynthesis && window.speechSynthesis.speak(u);
      } catch (e) { }
    },
    [settings.voice]
  );

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  /* ---- matching ---- */
  useEffect(() => {
    if (screen === "matching") {
      const timeout = setTimeout(() => setScreen("chooseWord"), 2200);
      return () => clearTimeout(timeout);
    }
  }, [screen]);

  /* ---- choose word ---- */
  useEffect(() => {
    if (screen === "chooseWord") {
      let fresh = WORDS.filter((w) => !usedWords.includes(w.word));
      if (fresh.length < 4) fresh = WORDS; // everyone's had a turn with these — refill the pool
      const pool = [...fresh].sort(() => Math.random() - 0.5).slice(0, 4);
      setWordChoices(pool);
      if (!isYourTurn) {
        const timeout = setTimeout(() => {
          selectWord(pick(pool));
        }, 1400);
        return () => clearTimeout(timeout);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  function selectWord(choice) {
    setUsedWords((u) => (u.includes(choice.word) ? u : [...u, choice.word]));
    setCurrentWord(choice);
    setTimeLeft(settings.drawTime);
    setHintShown(false);
    setYouGuessInfo(null);
    setChat([]);
    setGuessers(players.filter((p) => p.id !== drawerId).map((p) => p.id));
    setScreen("drawing");
    speak(isYourTurn ? "It's your turn to draw." : `${drawer.name} is drawing.`);
  }

  /* ---- drawing timer ---- */
  useEffect(() => {
    if (screen !== "drawing" || !currentWord) return;
    if (timeLeft <= 0) {
      finishTurn();
      return;
    }
    const id = setTimeout(() => setTimeLeft((tl) => tl - 1), 1000);
    if (settings.hints && timeLeft === Math.floor(settings.drawTime / 2) && !hintShown) {
      setHintShown(true);
    }
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, timeLeft, currentWord]);

  /* ---- guesses finish early ---- */
  useEffect(() => {
    if (screen === "drawing" && currentWord && guessers.length === 0) {
      const id = setTimeout(finishTurn, 900);
      return () => clearTimeout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guessers, screen]);

  /* ---- bots guess when you're the drawer ---- */
  useEffect(() => {
    if (screen !== "drawing" || !currentWord || !isYourTurn) return;
    const timers = BOTS.map((b) =>
      setTimeout(() => {
        registerGuess(b.id, true);
      }, 2500 + Math.random() * (settings.drawTime * 700))
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWord]);

  /* ---- when a bot draws, simulate "you" guessing correctly at a random point ---- */
  useEffect(() => {
    if (screen !== "drawing" || !currentWord || isYourTurn) return;
    const id = setTimeout(() => {
      // you can also type manually; this is a gentle nudge if not yet guessed
    }, 0);
    return () => clearTimeout(id);
  }, [currentWord]);

  function registerGuess(playerId, correct) {
    setGuessers((prev) => {
      if (!prev.includes(playerId)) return prev;
      if (correct) {
        const speedBonus = Math.max(5, Math.floor((timeLeft / settings.drawTime) * 15) + 5);
        setScores((s) => ({
          ...s,
          [playerId]: (s[playerId] || 0) + speedBonus,
          [drawerId]: (s[drawerId] || 0) + 3,
        }));
        if (playerId === "you") {
          setYouGuessInfo({ timeLeft, usedHint: hintShown });
        }
        const p = players.find((pl) => pl.id === playerId);
        setChat((c) => [
          ...c,
          { id: Math.random(), system: true, text: `🎉 ${p.isYou ? "You" : p.name} guessed it!` },
        ]);
      }
      return prev.filter((id) => id !== playerId);
    });
  }

  function sendGuess() {
    if (!guessInput.trim() || !currentWord) return;
    const text = guessInput.trim();
    setChat((c) => [...c, { id: Math.random(), sender: "You", text }]);
    setGuessInput("");
    if (text.toLowerCase() === currentWord.word.toLowerCase() && guessers.includes("you")) {
      registerGuess("you", true);
    } else {
      setTimeout(() => {
        setChat((c) => [...c, { id: Math.random(), system: true, text: `😊 ${pick(ENCOURAGEMENTS)}` }]);
      }, 300);
    }
  }

  function finishTurn() {
    const guessedCount = players.length - 1 - guessers.length;
    setLastTurnResult({
      word: currentWord,
      drawer,
      guessedCount,
      total: players.length - 1,
    });
    setSessionLog((log) => [
      ...log,
      isYourTurn
        ? {
          role: "drawer",
          word: currentWord.word,
          regional: currentWord.regional,
          guessedCount,
          total: players.length - 1,
        }
        : {
          role: "guesser",
          word: currentWord.word,
          regional: currentWord.regional,
          guessedIt: !guessers.includes("you"),
          usedHint: youGuessInfo ? youGuessInfo.usedHint : hintShown,
          secondsTaken: youGuessInfo ? settings.drawTime - youGuessInfo.timeLeft : null,
        },
    ]);
    setCurrentWord(null);
    setScreen("turnResult");
  }

  function nextPlayer() {
    const nextIndex = turnIndex + 1;
    if (nextIndex >= turnOrder.length) {
      setScreen("leaderboard");
    } else {
      setTurnIndex(nextIndex);
      setScreen("matching");
    }
  }

  function restart() {
    setScores(Object.fromEntries(players.map((p) => [p.id, 0])));
    setTurnIndex(0);
    setUsedWords([]);
    setSessionLog([]);
    setLastTurnResult(null);
    setScreen("lobby");
  }

  const blanks = currentWord
    ? currentWord.word
      .split("")
      .map((ch, i) => (hintShown && i === 0 ? ch.toUpperCase() : "_"))
      .join(" ")
    : "";

  /* ================= RENDER ================= */
  return (
    <div style={styles.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700&family=Quicksand:wght@500;600;700&display=swap');
        * { box-sizing: border-box; font-family: 'Quicksand', sans-serif; }
        h1, h2, .display { font-family: 'Baloo 2', cursive; }
        button { font-family: 'Quicksand', sans-serif; cursor: pointer; }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes popIn { from{opacity:0; transform:scale(.9)} to{opacity:1; transform:scale(1)} }
      `}</style>
      <Scenery />

      <button
        style={styles.settingsGear}
        onClick={() => setShowSettings(true)}
        aria-label={t(lang, "settings")}
      >
        ⚙️
      </button>

      <div style={styles.stage}>
        {screen === "welcome" && (
          <WelcomeScreen
            lang={lang}
            setLang={setLang}
            name={name}
            setName={setName}
            onContinue={() => setScreen("lobby")}
          />
        )}

        {screen === "lobby" && (
          <LobbyScreen
            lang={lang}
            players={players}
            settings={settings}
            onStart={() => setScreen("matching")}
          />
        )}

        {screen === "matching" && <MatchingScreen lang={lang} />}

        {screen === "chooseWord" && (
          <ChooseWordScreen
            lang={lang}
            isYourTurn={isYourTurn}
            drawer={drawer}
            choices={wordChoices}
            onPick={selectWord}
          />
        )}

        {screen === "drawing" && currentWord && (
          <DrawingScreen
            lang={lang}
            isYourTurn={isYourTurn}
            drawer={drawer}
            players={players}
            scores={scores}
            currentWord={currentWord}
            blanks={blanks}
            timeLeft={timeLeft}
            totalTime={settings.drawTime}
            elapsedFrac={(settings.drawTime - timeLeft) / settings.drawTime}
            hintShown={hintShown}
            guessers={guessers}
            chat={chat}
            chatEndRef={chatEndRef}
            guessInput={guessInput}
            setGuessInput={setGuessInput}
            sendGuess={sendGuess}
          />
        )}

        {screen === "turnResult" && lastTurnResult && (
          <TurnResultScreen lang={lang} result={lastTurnResult} onNext={nextPlayer} />
        )}

        {screen === "leaderboard" && (
          <LeaderboardScreen lang={lang} players={players} scores={scores} onNext={() => setScreen("celebration")} />
        )}

        {screen === "celebration" && (
          <CelebrationScreen
            lang={lang}
            players={players}
            scores={scores}
            onRestart={restart}
            onViewReport={() => setScreen("caregiverReport")}
          />
        )}

        {screen === "caregiverReport" && (
          <CaregiverReportScreen
            lang={lang}
            name={name}
            sessionLog={sessionLog}
            settings={settings}
            onBack={() => setScreen("celebration")}
          />
        )}
      </div>

      {showSettings && (
        <SettingsModal
          lang={lang}
          settings={settings}
          setSettings={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

/* ---------------- Screens ---------------- */

function WelcomeScreen({ lang, setLang, name, setName, onContinue }) {
  return (
    <div style={styles.centerCol}>
      <div style={{ position: "relative" }}>
        <div style={styles.logoBadge}>✨</div>
        <span style={styles.orchidCorner} title="Northeastern India">🌺</span>
      </div>
      <h1 style={styles.title}>{t(lang, "title")}</h1>
      <p style={styles.tagline}>{t(lang, "tagline")}</p>

      <div style={styles.langRow}>
        {LANGS.map((l) => (
          <PillButton key={l.code} active={lang === l.code} onClick={() => setLang(l.code)}>
            {l.flag} {l.label}
          </PillButton>
        ))}
      </div>

      <CreamCard style={{ marginTop: 22, textAlign: "center", maxWidth: 440 }}>
        <h2 style={styles.cardHeading}>
          {name.trim() ? t(lang, "welcomeBack", name.trim()) : t(lang, "namePrompt")}
        </h2>
        <p style={styles.cardSub}>{t(lang, "readyPrompt")}</p>
        <label style={styles.label}>{t(lang, "yourName")}</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && name.trim() && onContinue()}
          placeholder={t(lang, "namePlaceholder")}
          style={styles.input}
          maxLength={16}
          autoFocus
        />
        <PrimaryButton onClick={onContinue} disabled={!name.trim()} style={{ marginTop: 16, width: "100%" }}>
          🤍 {t(lang, "continue")}
        </PrimaryButton>
      </CreamCard>

      <p style={styles.disclaimer}>{t(lang, "disclaimer")}</p>
    </div>
  );
}

function LobbyScreen({ lang, players, settings, onStart }) {
  return (
    <div style={styles.centerCol}>
      <h2 style={styles.title}>{t(lang, "lobby")}</h2>
      <CreamCard style={{ maxWidth: 480 }}>
        <div style={styles.playerGrid}>
          {players.map((p) => (
            <div key={p.id} style={styles.playerChip}>
              <div style={{ ...styles.avatarCircle, background: p.color }}>{p.avatar}</div>
              <span>{p.isYou ? `${p.name} (you)` : p.name}</span>
              <span style={styles.readyDot}>●</span>
            </div>
          ))}
        </div>
        <div style={styles.metaRow}>
          <span style={styles.metaTag}>🎯 {settings.gameMode}</span>
          <span style={styles.metaTag}>⏱ {settings.drawTime}s per turn</span>
          <span style={styles.metaTag}>💡 Hints {settings.hints ? "on" : "off"}</span>
        </div>
        <PrimaryButton onClick={onStart} style={{ marginTop: 18, width: "100%" }}>
          {t(lang, "startGame")}
        </PrimaryButton>
      </CreamCard>
    </div>
  );
}

const NE_LOADING = [
  { icon: "🎍", text: "Getting the memory garden ready…" },
  { icon: "🌺", text: "Picking orchids for the room…" },
  { icon: "🍵", text: "Warming up the tea garden…" },
  { icon: "⛰️", text: "Gathering everyone from the hills…" },
  { icon: "🛶", text: "Rowing your friends across the river…" },
];
function MatchingScreen({ lang }) {
  const [egg] = useState(() => pick(NE_LOADING));
  return (
    <div style={styles.centerCol}>
      <div style={{ ...styles.logoBadge, animation: "spin 3s linear infinite" }}>🧭</div>
      <CreamCard style={{ textAlign: "center", maxWidth: 380 }}>
        <div style={{ fontSize: 26, marginBottom: 4 }}>{egg.icon}</div>
        <p style={{ ...styles.cardSub, marginBottom: 4 }}>{t(lang, "matching")}</p>
        <p style={{ ...styles.cardSub, marginTop: 0, fontSize: 12, opacity: 0.7 }}>{egg.text}</p>
      </CreamCard>
    </div>
  );
}

function ChooseWordScreen({ lang, isYourTurn, drawer, choices, onPick }) {
  return (
    <div style={styles.centerCol}>
      <h2 style={styles.title}>
        {isYourTurn ? t(lang, "chooseWord") : t(lang, "waitingFor", drawer.name)}
      </h2>
      {isYourTurn ? (
        <div style={styles.wordRow}>
          {choices.map((c) => (
            <button key={c.word} style={styles.wordCard} onClick={() => onPick(c)}>
              <span style={{ fontSize: 40 }}>{c.emoji}</span>
              <span style={styles.wordLabel}>{c.word}</span>
              {c.regional && <span style={styles.leafBadge}>🌿</span>}
            </button>
          ))}
        </div>
      ) : (
        <CreamCard style={{ textAlign: "center" }}>
          <div style={{ fontSize: 40, animation: "floatY 1.5s ease-in-out infinite" }}>✏️</div>
          <p style={styles.cardSub}>{t(lang, "takeYourTime")}</p>
        </CreamCard>
      )}
    </div>
  );
}

function DrawingScreen({
  lang,
  isYourTurn,
  drawer,
  players,
  scores,
  currentWord,
  blanks,
  timeLeft,
  totalTime,
  elapsedFrac,
  hintShown,
  guessers,
  chat,
  chatEndRef,
  guessInput,
  setGuessInput,
  sendGuess,
}) {
  return (
    <div style={styles.gameWrap}>
      <div style={styles.gameHeader}>
        <div style={styles.playersStrip}>
          {players.map((p) => (
            <div key={p.id} style={styles.miniPlayer} title={p.name}>
              <div style={{ ...styles.avatarCircleSm, background: p.color, opacity: p.id === drawer.id ? 1 : 0.55 }}>
                {p.avatar}
              </div>
              {p.id === drawer.id && <span style={{ fontSize: 10 }}>✏️</span>}
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <span style={styles.blanksText}>{isYourTurn ? currentWord.word.toUpperCase() : blanks}</span>
        </div>
      </div>

      <ProgressBar pct={(timeLeft / totalTime) * 100} />

      <div style={styles.gameBody}>
        <div style={{ flex: 1.3 }}>
          {isYourTurn ? (
            <DrawingCanvas enabled={true} />
          ) : (
            <>
              <LiveDoodle word={currentWord.word} elapsedFrac={elapsedFrac} />
              <div style={styles.botDrawNote}>
                <span style={{ animation: "floatY 1.5s ease-in-out infinite", display: "inline-block" }}>✏️</span>{" "}
                {drawer.name} is sketching{currentWord.regional && " "}
                {currentWord.regional && <span title="Northeastern India">🌿</span>}
              </div>
            </>
          )}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          <CreamCard style={{ padding: "10px 14px" }}>
            <div style={styles.scoreTitle}>🏞️ Scorecard</div>
            {[...players]
              .sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0))
              .map((p) => (
                <div key={p.id} style={styles.scoreRow}>
                  <div style={{ ...styles.avatarCircleSm, background: p.color, opacity: p.id === drawer.id ? 1 : 0.7 }}>
                    {p.avatar}
                  </div>
                  <span style={{ flex: 1, marginLeft: 8, fontWeight: p.id === drawer.id ? 700 : 500 }}>
                    {p.isYou ? `${p.name} (you)` : p.name}
                  </span>
                  <b>{scores[p.id] || 0}</b>
                </div>
              ))}
          </CreamCard>
          <CreamCard style={{ padding: 14, height: 220, display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1, overflowY: "auto", paddingRight: 4 }}>
              {chat.map((m) => (
                <div key={m.id} style={m.system ? styles.chatSystem : styles.chatMsg}>
                  {!m.system && <b>{m.sender}: </b>}
                  {m.text}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            {isYourTurn ? (
              <p style={styles.cardSub}>Waiting for your friends to guess…</p>
            ) : (
              <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                <input
                  value={guessInput}
                  onChange={(e) => setGuessInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendGuess()}
                  placeholder={t(lang, "guessPlaceholder")}
                  style={{ ...styles.input, marginTop: 0, flex: 1 }}
                  disabled={!guessers.includes("you")}
                />
                <PrimaryButton onClick={sendGuess} disabled={!guessers.includes("you")} style={{ padding: "0 16px" }}>
                  {t(lang, "send")}
                </PrimaryButton>
              </div>
            )}
          </CreamCard>
        </div>
      </div>
    </div>
  );
}

function TurnResultScreen({ lang, result, onNext }) {
  return (
    <div style={styles.centerCol}>
      <div style={{ ...styles.logoBadge, animation: "popIn .4s ease" }}>{result.word.emoji}</div>
      <CreamCard style={{ textAlign: "center", maxWidth: 420 }}>
        <h2 style={styles.cardHeading}>{t(lang, "turnComplete")}</h2>
        <p style={styles.cardSub}>
          The word was <b>{result.word.word}</b>. {result.guessedCount} of {result.total} friends guessed it. 👏
        </p>
        <PrimaryButton onClick={onNext} style={{ width: "100%", marginTop: 8 }}>
          {t(lang, "nextPlayer")} →
        </PrimaryButton>
      </CreamCard>
    </div>
  );
}

function LeaderboardScreen({ lang, players, scores, onNext }) {
  const ranked = [...players].sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0));
  return (
    <div style={styles.centerCol}>
      <h2 style={styles.title}>🌿 {t(lang, "leaderboard")}</h2>
      <CreamCard style={{ maxWidth: 420 }}>
        {ranked.map((p, i) => (
          <div key={p.id} style={styles.leaderRow}>
            <span style={{ width: 24 }}>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "🌸"}</span>
            <div style={{ ...styles.avatarCircleSm, background: p.color }}>{p.avatar}</div>
            <span style={{ flex: 1, marginLeft: 8 }}>{p.isYou ? `${p.name} (you)` : p.name}</span>
            <b>{scores[p.id] || 0}</b>
          </div>
        ))}
        <PrimaryButton onClick={onNext} style={{ width: "100%", marginTop: 14 }}>
          Continue →
        </PrimaryButton>
      </CreamCard>
    </div>
  );
}

function CelebrationScreen({ lang, players, scores, onRestart, onViewReport }) {
  const badges = [
    { icon: "🌸", label: "Most Creative Drawing", who: pick(players).name },
    { icon: "⭐", label: "Quickest Guess", who: pick(players).name },
    { icon: "💚", label: "Best Team Player", who: pick(players).name },
    { icon: "👏", label: "Everyone Played!", who: "All of you" },
  ];
  return (
    <div style={styles.centerCol}>
      <h2 style={styles.title}>🌿 {t(lang, "leaderboard")}</h2>
      <CreamCard style={{ maxWidth: 480, textAlign: "center" }}>
        <p style={styles.cardSub}>Thank you for playing together today.</p>
        <div style={{ fontSize: 20, opacity: 0.8, marginBottom: 8 }}>🎍 🌺 ⛰️ 🍵 🛶</div>
        <div style={styles.badgeGrid}>
          {badges.map((b, i) => (
            <div key={i} style={styles.badgeCard}>
              <div style={{ fontSize: 28 }}>{b.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{b.label}</div>
              <div style={{ fontSize: 12, color: COLORS.brownSoft }}>{b.who}</div>
            </div>
          ))}
        </div>
        <PrimaryButton onClick={onRestart} style={{ width: "100%", marginTop: 18 }}>
          {t(lang, "playAgain")}
        </PrimaryButton>
        <button style={styles.caregiverLink} onClick={onViewReport}>
          📋 For caregivers — view today's summary
        </button>
      </CreamCard>
    </div>
  );
}

/* ---------------- Caregiver report ----------------
   Turns today's play log into a warm, plain-language summary for the
   caregiver: how understandable the person's drawings were, how they did
   recognizing others', and a couple of gentle, descriptive patterns —
   never a score, grade, or diagnosis. */
function buildCaregiverInsights(log, playerName) {
  const drawTurns = log.filter((l) => l.role === "drawer");
  const guessTurns = log.filter((l) => l.role === "guesser");

  const recognitionPct =
    drawTurns.length > 0
      ? Math.round(
        (drawTurns.reduce((sum, t) => sum + t.guessedCount / t.total, 0) / drawTurns.length) * 100
      )
      : null;

  const guessAccuracyPct =
    guessTurns.length > 0
      ? Math.round((guessTurns.filter((t) => t.guessedIt).length / guessTurns.length) * 100)
      : null;

  const hintReliancePct =
    guessTurns.filter((t) => t.guessedIt).length > 0
      ? Math.round(
        (guessTurns.filter((t) => t.guessedIt && t.usedHint).length /
          guessTurns.filter((t) => t.guessedIt).length) *
        100
      )
      : null;

  const avgSeconds =
    guessTurns.filter((t) => t.guessedIt && t.secondsTaken != null).length > 0
      ? Math.round(
        guessTurns.filter((t) => t.guessedIt && t.secondsTaken != null).reduce((s, t) => s + t.secondsTaken, 0) /
        guessTurns.filter((t) => t.guessedIt && t.secondsTaken != null).length
      )
      : null;

  const regionalGuess = guessTurns.filter((t) => t.regional);
  const generalGuess = guessTurns.filter((t) => !t.regional);
  const regionalAcc = regionalGuess.length ? regionalGuess.filter((t) => t.guessedIt).length / regionalGuess.length : null;
  const generalAcc = generalGuess.length ? generalGuess.filter((t) => t.guessedIt).length / generalGuess.length : null;

  const strugglingWords = [
    ...drawTurns.filter((t) => t.guessedCount / t.total < 0.4).map((t) => t.word),
    ...guessTurns.filter((t) => !t.guessedIt).map((t) => t.word),
  ];
  const strongWords = [
    ...drawTurns.filter((t) => t.guessedCount / t.total >= 0.75).map((t) => t.word),
    ...guessTurns.filter((t) => t.guessedIt && !t.usedHint).map((t) => t.word),
  ];

  const insights = [];

  if (recognitionPct != null) {
    if (recognitionPct >= 70) {
      insights.push(`${playerName}'s drawings were easy for friends to recognize today (${recognitionPct}% guessed on average) — a nice sign of clear, confident recall.`);
    } else if (recognitionPct >= 40) {
      insights.push(`Friends recognized about ${recognitionPct}% of ${playerName}'s drawings — a mixed session, which is completely normal from day to day.`);
    } else {
      insights.push(`Drawings were harder for friends to recognize today (${recognitionPct}%). This can simply reflect an off day, an unfamiliar word, or reduced drawing confidence — not necessarily memory.`);
    }
  }

  if (guessAccuracyPct != null) {
    if (guessAccuracyPct >= 70) {
      insights.push(`${playerName} recognized other players' drawings well (${guessAccuracyPct}% correct), often ${avgSeconds ? `within about ${avgSeconds}s` : "quickly"}.`);
    } else if (guessAccuracyPct >= 40) {
      insights.push(`${playerName} guessed roughly ${guessAccuracyPct}% of other drawings correctly — a gentle prompt or two seemed to help along the way.`);
    } else {
      insights.push(`${playerName} found it harder to recognize others' drawings today (${guessAccuracyPct}%). Slower rounds or more familiar words next time may help.`);
    }
  }

  if (hintReliancePct != null && guessAccuracyPct != null) {
    if (hintReliancePct >= 60) {
      insights.push(`Most correct guesses came after a hint appeared — hints are doing their job, gently supporting recall rather than replacing it.`);
    } else if (hintReliancePct <= 20) {
      insights.push(`${playerName} guessed most words correctly before any hint was even shown — a good sign of quick, independent recall today.`);
    }
  }

  if (regionalAcc != null && generalAcc != null && regionalGuess.length >= 2 && generalGuess.length >= 2) {
    if (regionalAcc - generalAcc >= 0.25) {
      insights.push(`Familiar Northeastern items (like tea, bamboo, or river) were recognized more easily than general items — worth leaning into more regional words next time.`);
    } else if (generalAcc - regionalAcc >= 0.25) {
      insights.push(`General everyday items were recognized a bit more easily than regional ones today — regional words may need to be introduced more gradually.`);
    }
  }

  if (strugglingWords.length) {
    insights.push(`Words that took more time today: ${[...new Set(strugglingWords)].slice(0, 4).join(", ")}. Revisiting these gently in a future session (without pressure) may help build familiarity.`);
  }
  if (strongWords.length) {
    insights.push(`Words that came easily: ${[...new Set(strongWords)].slice(0, 4).join(", ")}. These could be a nice, confidence-building starting point next time.`);
  }

  if (!insights.length) {
    insights.push("Not quite enough turns yet for a pattern — a few more rounds will give a fuller picture.");
  }

  return { recognitionPct, guessAccuracyPct, hintReliancePct, avgSeconds, insights };
}

function CaregiverReportScreen({ lang, name, sessionLog, settings, onBack }) {
  const report = buildCaregiverInsights(sessionLog, name || "This player");
  const drawTurns = sessionLog.filter((l) => l.role === "drawer");
  const guessTurns = sessionLog.filter((l) => l.role === "guesser");

  return (
    <div style={styles.centerCol}>
      <h2 style={styles.title}>📋 Caregiver Summary</h2>
      <CreamCard style={{ maxWidth: 520, width: "100%" }}>
        <p style={styles.reportDisclaimer}>
          This reflects today's play patterns only — it is not a memory test, cognitive score, or medical
          assessment. For any health concerns, please speak with a healthcare professional.
        </p>

        <div style={styles.reportStatsRow}>
          <div style={styles.reportStat}>
            <div style={styles.reportStatNum}>{drawTurns.length + guessTurns.length}</div>
            <div style={styles.reportStatLabel}>turns played</div>
          </div>
          <div style={styles.reportStat}>
            <div style={styles.reportStatNum}>{report.recognitionPct != null ? `${report.recognitionPct}%` : "—"}</div>
            <div style={styles.reportStatLabel}>drawings recognized</div>
          </div>
          <div style={styles.reportStat}>
            <div style={styles.reportStatNum}>{report.guessAccuracyPct != null ? `${report.guessAccuracyPct}%` : "—"}</div>
            <div style={styles.reportStatLabel}>correct guesses</div>
          </div>
        </div>

        <h3 style={styles.reportSubhead}>🌿 Today's patterns</h3>
        <ul style={styles.reportList}>
          {report.insights.map((line, i) => (
            <li key={i} style={styles.reportListItem}>
              {line}
            </li>
          ))}
        </ul>

        {(drawTurns.length > 0 || guessTurns.length > 0) && (
          <>
            <h3 style={styles.reportSubhead}>Turn by turn</h3>
            <div style={{ maxHeight: 160, overflowY: "auto" }}>
              {sessionLog.map((t, i) => (
                <div key={i} style={styles.reportRow}>
                  <span style={{ textTransform: "capitalize" }}>
                    {t.regional && "🌿 "}
                    {t.word}
                  </span>
                  <span style={{ color: COLORS.brownSoft, fontSize: 12 }}>
                    {t.role === "drawer"
                      ? `drew · ${t.guessedCount}/${t.total} guessed`
                      : t.guessedIt
                        ? `guessed it${t.usedHint ? " (with a hint)" : ""}`
                        : "didn't guess this one"}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        <p style={{ ...styles.reportDisclaimer, marginTop: 14 }}>
          Suggestion: try {settings.gameMode === "Gentle Memory" ? "a slightly longer drawing time" : "Gentle Memory mode"} next
          session if today felt rushed, or lean on the words above that came easily to build confidence.
        </p>

        <PrimaryButton onClick={onBack} style={{ width: "100%", marginTop: 16 }}>
          Back
        </PrimaryButton>
      </CreamCard>
    </div>
  );
}


function SettingsModal({ lang, settings, setSettings, onClose }) {
  const update = (k, v) => setSettings((s) => ({ ...s, [k]: v }));
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.cardHeading}>{t(lang, "settings")}</h2>

        <label style={styles.label}>Game mode</label>
        <div style={styles.pillRowWrap}>
          {["Social Memory", "Gentle Memory"].map((m) => (
            <PillButton key={m} active={settings.gameMode === m} onClick={() => update("gameMode", m)}>
              {m}
            </PillButton>
          ))}
        </div>

        <label style={styles.label}>Drawing time</label>
        <div style={styles.pillRowWrap}>
          {[60, 90, 120].map((s) => (
            <PillButton key={s} active={settings.drawTime === s} onClick={() => update("drawTime", s)}>
              {s}s
            </PillButton>
          ))}
        </div>

        <label style={styles.label}>Difficulty</label>
        <div style={styles.pillRowWrap}>
          {["Gentle", "Standard"].map((d) => (
            <PillButton key={d} active={settings.difficulty === d} onClick={() => update("difficulty", d)}>
              {d}
            </PillButton>
          ))}
        </div>

        <label style={styles.label}>Voice guidance</label>
        <div style={styles.pillRowWrap}>
          {["Off", "Minimal", "Normal", "Frequent"].map((v) => (
            <PillButton key={v} active={settings.voice === v} onClick={() => update("voice", v)}>
              {v}
            </PillButton>
          ))}
        </div>

        <label style={styles.label}>Hints</label>
        <div style={styles.pillRowWrap}>
          <PillButton active={settings.hints} onClick={() => update("hints", true)}>On</PillButton>
          <PillButton active={!settings.hints} onClick={() => update("hints", false)}>Off</PillButton>
        </div>

        <PrimaryButton onClick={onClose} style={{ width: "100%", marginTop: 18 }}>
          Save & close
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ---------------- Styles ---------------- */
const styles = {
  app: {
    position: "relative",
    minHeight: 640,
    width: "100%",
    overflow: "hidden",
    borderRadius: 18,
    background: COLORS.skyBottom,
  },
  scenery: { position: "absolute", inset: 0, zIndex: 0 },
  stage: {
    position: "relative",
    zIndex: 1,
    minHeight: 640,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "48px 20px 40px",
  },
  centerCol: { display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 560 },
  orchidCorner: { position: "absolute", top: -6, right: -10, fontSize: 18 },
  logoBadge: {
    width: 66,
    height: 66,
    borderRadius: 18,
    background: COLORS.greenDark,
    color: "#fff",
    fontSize: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 0 rgba(0,0,0,0.15)",
    marginBottom: 10,
  },
  title: { color: COLORS.brown, fontSize: 34, margin: "4px 0", textAlign: "center" },
  tagline: { color: COLORS.brownSoft, fontSize: 16, marginTop: 0, marginBottom: 18, textAlign: "center" },
  langRow: { display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" },
  pill: {
    border: `2px solid ${COLORS.creamBorder}`,
    background: "#fffefa",
    color: COLORS.brown,
    borderRadius: 999,
    padding: "8px 16px",
    fontWeight: 600,
    fontSize: 14,
  },
  pillActive: { background: COLORS.orange, color: "#fff", borderColor: COLORS.orange },
  pillRowWrap: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 6 },
  card: {
    background: COLORS.cream,
    border: `2px solid ${COLORS.creamBorder}`,
    borderRadius: 26,
    padding: "26px 28px",
    boxShadow: "0 6px 0 rgba(0,0,0,0.08)",
  },
  cardHeading: { color: COLORS.brown, margin: "0 0 6px", fontSize: 24, textAlign: "center" },
  cardSub: { color: COLORS.brownSoft, textAlign: "center", marginTop: 0, fontSize: 15 },
  label: { display: "block", color: COLORS.brownSoft, fontSize: 13, fontWeight: 600, marginTop: 10, marginBottom: 6 },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 14,
    border: `2px solid ${COLORS.creamBorder}`,
    fontSize: 15,
    marginTop: 4,
    outline: "none",
    background: "#fffefa",
    color: COLORS.brown,
  },
  primaryBtn: {
    background: COLORS.green,
    color: "#fff",
    border: "none",
    borderRadius: 16,
    padding: "13px 20px",
    fontSize: 16,
    fontWeight: 700,
    boxShadow: "0 4px 0 " + COLORS.greenDark,
  },
  btnDisabled: { opacity: 0.5, cursor: "not-allowed", boxShadow: "none" },
  disclaimer: { color: COLORS.brownSoft, fontSize: 12, textAlign: "center", marginTop: 18, maxWidth: 420, opacity: 0.85 },
  playerGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 8 },
  playerChip: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#fffefa",
    border: `1px solid ${COLORS.creamBorder}`,
    borderRadius: 14,
    padding: "8px 10px",
    fontSize: 14,
    color: COLORS.brown,
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  },
  avatarCircleSm: {
    width: 26,
    height: 26,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
  },
  readyDot: { color: COLORS.green, marginLeft: "auto" },
  metaRow: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 },
  metaTag: { background: COLORS.greenSoft, color: COLORS.greenDark, fontSize: 12, borderRadius: 10, padding: "4px 8px" },
  wordRow: { display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" },
  wordCard: {
    position: "relative",
    background: COLORS.cream,
    border: `2px solid ${COLORS.creamBorder}`,
    borderRadius: 20,
    padding: "22px 26px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    minWidth: 110,
    boxShadow: "0 4px 0 rgba(0,0,0,0.08)",
  },
  wordLabel: { textTransform: "capitalize", fontWeight: 700, color: COLORS.brown },
  leafBadge: { position: "absolute", top: 6, right: 8, fontSize: 14 },
  gameWrap: { width: "100%", maxWidth: 780 },
  gameHeader: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 10 },
  playersStrip: { display: "flex", gap: 14, justifyContent: "center" },
  miniPlayer: { display: "flex", flexDirection: "column", alignItems: "center", gap: 2 },
  miniScore: { fontSize: 11, color: COLORS.brownSoft, fontWeight: 700 },
  blanksText: { fontSize: 26, letterSpacing: 4, fontWeight: 700, color: COLORS.brown, background: "#fffefacc", padding: "4px 14px", borderRadius: 12 },
  progressTrack: { width: "100%", height: 10, background: "#ffffff88", borderRadius: 8, overflow: "hidden", marginBottom: 14 },
  progressFill: { height: "100%", borderRadius: 8, transition: "width 1s linear" },
  gameBody: { display: "flex", gap: 16, flexWrap: "wrap" },
  canvas: { width: "100%", maxWidth: 560, borderRadius: 18, border: `3px solid ${COLORS.creamBorder}`, background: "#fff" },
  toolRow: { display: "flex", gap: 8, alignItems: "center", marginTop: 8, flexWrap: "wrap" },
  swatch: { width: 26, height: 26, borderRadius: "50%", border: "none" },
  toolBtn: {
    background: "#fffefa",
    border: `1.5px solid ${COLORS.creamBorder}`,
    borderRadius: 10,
    padding: "5px 10px",
    fontSize: 13,
    color: COLORS.brown,
  },
  botDrawNote: { textAlign: "center", marginTop: 10, color: COLORS.brownSoft, fontSize: 14 },
  doodleBox: {
    width: "100%",
    maxWidth: 560,
    aspectRatio: "560 / 340",
    borderRadius: 18,
    border: `3px solid ${COLORS.creamBorder}`,
    background: "#fff",
  },
  scoreTitle: { fontWeight: 700, color: COLORS.brown, fontSize: 14, marginBottom: 6 },
  scoreRow: { display: "flex", alignItems: "center", padding: "4px 0", fontSize: 13, color: COLORS.brown },
  chatMsg: { fontSize: 13, color: COLORS.brown, marginBottom: 4 },
  chatSystem: { fontSize: 13, color: COLORS.greenDark, fontWeight: 600, marginBottom: 4, textAlign: "center" },
  leaderRow: { display: "flex", alignItems: "center", padding: "8px 4px", borderBottom: "1px solid #e9dcc0", fontSize: 15, color: COLORS.brown },
  badgeGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 },
  badgeCard: { background: "#fffefa", border: `1.5px solid ${COLORS.creamBorder}`, borderRadius: 14, padding: "12px 8px" },
  caregiverLink: {
    display: "block",
    margin: "14px auto 0",
    background: "transparent",
    border: "none",
    color: COLORS.brownSoft,
    fontSize: 13,
    textDecoration: "underline",
  },
  reportDisclaimer: { fontSize: 12, color: COLORS.brownSoft, textAlign: "center", background: "#fffefacc", borderRadius: 10, padding: "8px 10px", margin: "0 0 14px" },
  reportStatsRow: { display: "flex", justifyContent: "space-around", marginBottom: 14 },
  reportStat: { textAlign: "center" },
  reportStatNum: { fontSize: 22, fontWeight: 700, color: COLORS.greenDark },
  reportStatLabel: { fontSize: 11, color: COLORS.brownSoft },
  reportSubhead: { color: COLORS.brown, fontSize: 15, margin: "10px 0 6px" },
  reportList: { margin: 0, paddingLeft: 18 },
  reportListItem: { fontSize: 13, color: COLORS.brown, marginBottom: 8, lineHeight: 1.4 },
  reportRow: { display: "flex", justifyContent: "space-between", fontSize: 13, color: COLORS.brown, padding: "5px 2px", borderBottom: "1px solid #e9dcc0" },
  settingsGear: {
    position: "absolute",
    top: 14,
    right: 14,
    zIndex: 5,
    background: "#fffefacc",
    border: `1.5px solid ${COLORS.creamBorder}`,
    borderRadius: 12,
    padding: "6px 9px",
    fontSize: 18,
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(30,20,10,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
    padding: 16,
  },
  modalCard: {
    background: COLORS.cream,
    border: `2px solid ${COLORS.creamBorder}`,
    borderRadius: 22,
    padding: 24,
    width: "100%",
    maxWidth: 420,
    maxHeight: "85vh",
    overflowY: "auto",
  },
};

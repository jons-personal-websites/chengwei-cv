tailwind.config = {
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#FAF8F4",
          surface: "#F2F0EC",
          elevated: "#FFFFFF",
          hover: "#EEEDEA",
        },
        text: {
          DEFAULT: "#1A1A1A",
          dim: "#5A5A5A",
          faint: "#999999",
        },
        accent: {
          DEFAULT: "#1B4F8A",
          muted: "#154074",
          pale: "rgba(27,79,138,0.06)",
        },
        cyan: {
          DEFAULT: "#00D4FF",
          pale: "rgba(0,212,255,0.06)",
        },
        stroke: {
          DEFAULT: "#E5E3DF",
          light: "#ECECEC",
        },
        kone:      { DEFAULT: "#005BAC", bg: "#EFF6FF" },
        ite:       { DEFAULT: "#E84B37", bg: "#FFF5F3" },
        chevalier: { DEFAULT: "#2D6A4F", bg: "#F0FAF4" },
        aceplan:   { DEFAULT: "#7C3AED", bg: "#F5F3FF" },
        ntu:       { DEFAULT: "#D97706", bg: "#FFFBEB" },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body:    ['"DM Sans"', "sans-serif"],
        mono:    ['"JetBrains Mono"', "monospace"],
      },
      animation: {
        "spin-slow":  "spin 30s linear infinite",
        "pulse-line": "pulseLine 2s ease-in-out infinite",
        "dot-bounce": "dotBounce 1.4s infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "scan-line":  "scanLine 3s linear infinite",
      },
      keyframes: {
        pulseLine: {
          "0%, 100%": { opacity: "1", transform: "scaleY(1)" },
          "50%":       { opacity: "0.3", transform: "scaleY(0.6)" },
        },
        dotBounce: {
          "0%, 80%, 100%": { transform: "scale(0.6)", opacity: "0.4" },
          "40%":           { transform: "scale(1)", opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.3" },
          "50%":      { opacity: "0.7" },
        },
        scanLine: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(200%)" },
        },
      },
    },
  },
};

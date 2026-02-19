# Goh Cheng Wei — Personal CV Site Design

**Date:** 2026-02-19
**Goal:** Job-search-oriented personal site targeting Senior Engineer, Engineering Manager, Regional Technical Lead, or Head of Technical Training roles in Singapore / SEA.

---

## 1. Subject

Goh Cheng Wei — Senior Customer Solution Engineer at KONE Elevator Singapore. Early 40s. ~16 years across embedded systems research, elevator engineering, IoT, education, and technical solutions. Rare polymath profile: hands-on hardware/firmware depth + pedagogy credentials + regional client-facing experience.

**Contact:** gohc0047@gmail.com · (+65) 96813552 · Singaporean

---

## 2. Visual Identity

### Color Palette
| Token | Value | Usage |
|---|---|---|
| Base | `#FAF8F4` | Page background |
| Surface | `#F2F0EC` | Cards, elevated surfaces |
| Primary accent | `#1B4F8A` | Buttons, highlights, headings |
| Nerd accent | `#00D4FF` | Circuit nodes, glows, easter eggs |
| Text | `#1A1A1A` | Body text |
| Text dim | `#5A5A5A` | Secondary text |
| Stroke | `#E5E3DF` | Borders, dividers |

### Per-Company Flavor Colors
| Company | Color | Background |
|---|---|---|
| KONE Elevator | `#005BAC` | `#EFF6FF` |
| ITE | `#E84B37` | `#FFF5F3` |
| Chevalier | `#2D6A4F` | `#F0FAF4` |
| Aceplan | `#7C3AED` | `#F5F3FF` |
| NTU Research | `#D97706` | `#FFFBEB` |

### Typography
| Role | Family | Usage |
|---|---|---|
| Display | Space Grotesk | Hero name, section headings |
| Body | DM Sans | Paragraphs, nav, cards |
| Mono | JetBrains Mono | Section labels, dates, skill badges, stats |

---

## 3. Nerd Callouts (Approach A influence)

Technical easter eggs woven throughout — present but never overwhelming:

- **Section labels** in monospace: `// 01 EXPERIENCE`, `$ ls -l /skills`
- **Hero background**: Canvas with circuit-node particles — nodes connected by angular PCB-trace paths (not soft curves), electric cyan `#00D4FF` at low opacity
- **Stats styled as terminal output** with monospace font
- **Skill tags** styled as code badges: `<Arduino/>`, `[C-firmware]`, `{MODBUS}`
- **Experience cards**: faint green scan-line CSS overlay on hover (CRT easter egg)
- **Background texture**: subtle engineering dot-grid on hero section

---

## 4. Page Sections (in order)

### Navigation
Fixed, backdrop-blur, monospace brand mark `CW.` on left. Links: About · Experience · Skills · Contact. Hamburger on mobile.

### Hero
- Display: `GOH CHENG WEI` large in Space Grotesk
- Terminal subtitle animates in: `> Senior Engineer · Educator · Systems Thinker`
- Circuit-node canvas background
- CTAs: `Download CV` (links to PDF) + `Get in Touch`
- No profile photo (to be added if Chengwei provides a standalone image)

### Stats Bar
Animated counters in monospace, overlaps hero with negative margin:
- `16+` Years Experience
- `5` Companies
- `160+` Lifts (statutory board project)
- `2` Postgrad Degrees

### About
Bio paragraph + 4 capability cards:
- `[Hardware]` — Circuit design, ESD, PCB-level debugging
- `[Firmware]` — C, PIC, UART, embedded automation
- `[Solutions]` — KONE DCS, BMS/IoT integration, SEA regional scope
- `[Training]` — ITE lecturer, pedagogy certified, curriculum design

### Experience
5 blocks with left flavor-color accent bar, per-company glow on hover:

1. **KONE Elevator Singapore** (Oct 2023 – Present) — Senior Customer Solution Engineer
2. **Institute of Technical Education** (Nov 2020 – Aug 2023) — Lecturer/Engineer
3. **Chevalier Singapore Holdings** (Aug 2015 – Oct 2020) — Assistant Manager
4. **Aceplan Engineering** (Dec 2014 – Jun 2015) — Design Engineer
5. **Energetics Research Institute @ NTU** (Aug 2010 – Dec 2014) — Research Associate

### Education
2 cards:
- MSc Embedded Systems — NTU
- BEng (Hons) Electrical & Electronics Engineering — NTU

### Certifications
Badge pills:
- Advanced Certificate in Technical Education Pedagogy
- Advanced Certificate in Learning & Performance (IAL)
- Machine Learning — Coursera / Stanford University

### Skills
Grouped tag badges styled as code tokens:
- **Hardware:** Circuit Design, AutoCAD, ESD Testing, Oscilloscope, PLC, ATEX sensors
- **Firmware:** C Language, PIC Microcontroller, UART, MPLABX IDE, Arduino, Bluetooth
- **Protocols:** RS485 MODBUS, Ethernet, VDSL, LAN, IoT, BMS Integration
- **Software:** Machine Learning, Neural Networks, Octave, Infor LN ERP, MS Clipchamp
- **Soft Skills:** Technical Writing, Training & Pedagogy, Project Management, Chinese/English

### Fit Assessment
Textarea for job description paste → AI analysis via Gemini proxy.

### Footer
Name · tagline · copyright

### Chat Widget
FAB bottom-right → slide-up panel → Gemini-powered Q&A about Chengwei.

---

## 5. Tech Stack

| Layer | Choice |
|---|---|
| HTML | Single `index.html`, zero build |
| CSS | Tailwind CSS 3 (CDN) + `css/main.css` |
| Animation | GSAP 3.12 + ScrollTrigger (CDN) |
| Icons | Lucide Icons (CDN UMD) |
| Fonts | Google Fonts (Space Grotesk, DM Sans, JetBrains Mono) |
| AI | Google Gemini Flash Lite via `api/generate.js` proxy |
| Deploy | Vercel |

---

## 6. File Structure

```
chengwei-cv/
├── index.html
├── favicon.svg
├── Goh_Cheng_Wei_Resume_2026.pdf
├── css/
│   └── main.css
├── js/
│   ├── main.js
│   ├── tailwind-config.js
│   └── projects-data.js
├── api/
│   └── generate.js
├── .env
├── .gitignore
└── docs/plans/
    └── 2026-02-19-chengwei-cv-design.md
```

---

## 7. AI Context String (PERSON_CONTEXT)

Defined in `main.js`. Chengwei responds in first person, warm and technically literate. Covers all experience, education, certifications, and skills from the resume.

---

## 8. Open Items

- [ ] Profile photo — request standalone JPG from Chengwei for hero section
- [ ] LinkedIn URL — add to nav/footer social links if available
- [ ] GitHub URL — add if available (relevant given firmware/coding background)
- [ ] Vercel deployment + GEMINI_API_KEY env var needed before going live

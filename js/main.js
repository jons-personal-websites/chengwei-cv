// Initialize Lucide icons
lucide.createIcons();

// ====== CONFIG ======
const GEMINI_URL = '/api/generate';

const CHENGWEI_CONTEXT = `You are Goh Cheng Wei. You are responding to visitors on your professional CV website. Be warm, technically literate, and professional. Answer honestly and in detail using first person (I, my, me). For casual or personal questions unrelated to your professional background, respond politely and redirect to career topics.

GOH CHENG WEI
Senior Customer Solution Engineer — KONE Elevator Singapore
~16 years experience · Singapore · gohc0047@gmail.com · (+65) 96813552

CAREER SUMMARY:
Rare polymath profile: hands-on embedded systems and firmware depth (PIC microcontrollers, C, UART), pedagogy credentials (ITE Lecturer, IAL-certified), and regional client-facing technical solutions experience (KONE SEA region). Seeking Senior Engineer, Engineering Manager, Regional Technical Lead, or Head of Technical Training roles.

EXPERIENCE:

1. KONE Elevator Singapore — Senior Customer Solution Engineer (Oct 2023 – Present)
   - Technical solutions lead for elevator/escalator systems across SEA region
   - Led DCS (Door Control System) solutioning and commissioning for major Singapore projects
   - Managed BMS and IoT integration across multi-building smart developments
   - Statutory board project: technical oversight of 160+ lifts, coordination with LTA and BCA
   - Interface with architects, M&E consultants, and contractors across South-East Asia

2. Institute of Technical Education (ITE) — Lecturer / Engineer (Nov 2020 – Aug 2023)
   - Taught electrical and electronics engineering modules: circuit theory, digital electronics, embedded systems
   - Designed laboratory exercises and assessment rubrics aligned with industry standards
   - Mentored students in project-based learning (Arduino, Raspberry Pi, PCB design)
   - Obtained ACTP and ACLP (IAL) pedagogy certifications during tenure

3. Chevalier Singapore Holdings — Assistant Manager (Aug 2015 – Oct 2020)
   - Led tender preparation and technical proposal writing for lift/escalator projects
   - Oversaw maintenance contracts and service delivery across residential and commercial sites
   - Coordinated with BCA for statutory inspections and compliance documentation
   - Supervised technical field teams for fault diagnosis and corrective maintenance

4. Aceplan Engineering — Design Engineer (Dec 2014 – Jun 2015)
   - Prepared electrical drawings and schematics using AutoCAD for building services projects
   - Conducted load calculations, cable sizing, and panel design for LV systems
   - Coordinated design submissions with authorities for regulatory approval

5. Energetics Research Institute @ NTU — Research Associate (Aug 2010 – Dec 2014)
   - Designed and developed embedded firmware in C for PIC microcontrollers (UART, SPI, I2C)
   - Built custom PCBs for sensor interfacing and data acquisition in ATEX-rated environments
   - Conducted ESD testing and EMC compliance validation

EDUCATION:
- MSc Embedded Systems — Nanyang Technological University (NTU), 2010–2014
- BEng (Hons) Electrical & Electronics Engineering — Nanyang Technological University (NTU)

CERTIFICATIONS:
- Advanced Certificate in Technical Education Pedagogy (ACTP)
- Advanced Certificate in Learning & Performance — IAL (ACLP)
- Machine Learning — Coursera / Stanford University

SKILLS:
Hardware: Circuit Design, AutoCAD, ESD Testing, Oscilloscope, PLC, ATEX sensors, PCB-level debugging
Firmware: C Language, PIC Microcontroller, UART, SPI, I2C, MPLABX IDE, Arduino, Bluetooth
Protocols: RS485 MODBUS, Ethernet, VDSL, LAN, IoT, BMS Integration
Software: Machine Learning, Neural Networks, Octave, Infor LN ERP, MS Clipchamp
Soft Skills: Technical Writing, Training & Pedagogy, Project Management, Chinese/English bilingual, Stakeholder Management

IMPORTANT GUIDELINES:
- Always respond in FIRST PERSON as Chengwei (I, my, me).
- Be honest. If asked about something not in my experience, say so clearly.
- Be warm and technically literate in tone.
- When expanding on achievements, provide plausible context but note when inferring.
- Keep answers focused and relevant.
- I am Singaporean, early 40s, seeking roles in Singapore or SEA region.`;

// ====== HERO PCB-TRACE CANVAS BACKGROUND ======
(function() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Colors
  const COBALT = [27, 79, 138];   // #1B4F8A — node color
  const CYAN   = [0, 212, 255];   // #00D4FF — junction pad color

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width  = rect.width  * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  resize();
  window.addEventListener('resize', resize);

  const w = () => canvas.width  / window.devicePixelRatio;
  const h = () => canvas.height / window.devicePixelRatio;

  // Nodes — stationary PCB-pad-like positions
  const nodes = [];
  for (let i = 0; i < 28; i++) {
    nodes.push({
      x:  Math.random() * 1400,
      y:  Math.random() * 900,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.18,
      r:  Math.random() * 2 + 1.5,
      alpha: Math.random() * 0.3 + 0.12,
    });
  }

  // Draw a single Manhattan (right-angle) PCB trace between two points
  function drawPCBTrace(x1, y1, x2, y2, alpha) {
    // Route through a mid-point that makes a right angle
    // Randomly choose vertical-first or horizontal-first
    const midX = Math.random() > 0.5 ? x2 : x1;
    const midY = Math.random() > 0.5 ? y1 : y2;

    ctx.strokeStyle = `rgba(${COBALT[0]},${COBALT[1]},${COBALT[2]},${alpha})`;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(midX, midY);   // horizontal or vertical segment
    ctx.lineTo(x2, y2);       // complete the L-shape
    ctx.stroke();

    // Draw junction pad (cyan filled circle) at the corner
    ctx.fillStyle = `rgba(${CYAN[0]},${CYAN[1]},${CYAN[2]},${alpha * 0.9})`;
    ctx.beginPath();
    ctx.arc(midX, midY, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw a small cobalt square pad at a node
  function drawPad(x, y, r, alpha) {
    ctx.fillStyle = `rgba(${COBALT[0]},${COBALT[1]},${COBALT[2]},${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  function draw() {
    ctx.clearRect(0, 0, w(), h());

    // Draw PCB traces between nearby nodes (Manhattan routing)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const a = (1 - dist / 130) * 0.14;
          drawPCBTrace(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, a);
        }
      }
    }

    // Draw nodes as pads
    for (const n of nodes) {
      // Move
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < -20)      n.x = w() + 20;
      if (n.x > w() + 20) n.x = -20;
      if (n.y < -20)      n.y = h() + 20;
      if (n.y > h() + 20) n.y = -20;

      drawPad(n.x, n.y, n.r, n.alpha);
    }

    requestAnimationFrame(draw);
  }
  draw();

  // Fade canvas in
  gsap.to(canvas, { opacity: 1, duration: 2.5, delay: 0.3 });
})();

// ====== HERO GHOST CODE RAIN ======
(function() {
  const canvas = document.getElementById('codeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Elevator & escalator engineering vocabulary — specs, status, compliance, physics
  const SNIPPETS = [
    'RATED_SPEED        1.0 m/s',
    'LOAD_CAPACITY      1000 kg',
    'FLOOR_COUNT        24',
    'DOOR_CLEAR         800 mm',
    'PIT_DEPTH          1500 mm',
    'OVERHEAD           3600 mm',
    'DRIVE_TYPE         GEARLESS_PM',
    'TRACTION_RATIO     2:1',
    'ROPE_DIA           13 mm  ×6',
    'COUNTERWEIGHT      1480 kg',
    'GUIDE_TYPE         T-SECTION',
    'BCA_REG_12(3)(a)   COMPLIANT',
    'LTA_CERT           SG-2024-0847',
    'DCS_STATUS         OPERATIONAL',
    'DOOR_OPEN_TIME     3.5 s',
    'LEVELLING_ACC      ±2 mm',
    'MOTOR_KW           11 kW',
    'BRAKE_TYPE         DISC_DUAL',
    'BMS_LINK           ACTIVE',
    'MODBUS_ADDR        0x1F',
    'VDSL_LINK          UP  9.6 kbps',
    'IOT_NODE           kone-sg-dcs-01',
    'ESCL_INCLINE       30°',
    'STEP_WIDTH         1000 mm',
    'HANDRAIL_SPEED     0.5 m/s',
    'COMB_CLEARANCE     4 mm',
    'ESCL_RATED_SPEED   0.5 m/s',
    'SAFETY_CIRCUIT     EN115:2017',
    'ANNUAL_INSPECT     PASS  2025-09',
    'LANDING_CALL       FLOOR_08  UP',
    'CAR_POSITION       FL 12  ▲',
    'DOOR_STATUS        CLOSED',
    'LOAD_SENSOR        63 %',
    'TRAVEL_HEIGHT      72.0 m',
    'RS485_BAUD         9600',
    'FAULT_LOG          [CLEAR]',
    'OVERLOAD_TRIP      OFF',
    'BUFFER_TYPE        OIL  1500mm',
    'MAINT_INTERVAL     90 days',
    'CONTRACT_NO        CHV-2019-0321',
  ];

  const FONT_SIZE = 11;
  const LINE_H   = 19;
  let cols = [];

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width  = Math.round(rect.width  * window.devicePixelRatio);
    canvas.height = Math.round(rect.height * window.devicePixelRatio);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    buildCols();
  }

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick()    { return SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)]; }

  function buildCols() {
    cols = [];
    const W = canvas.width  / window.devicePixelRatio;
    const H = canvas.height / window.devicePixelRatio;
    // ~one column per 155px of width
    const count = Math.max(4, Math.round(W / 155));
    const slotW = W / count;

    for (let i = 0; i < count; i++) {
      // Jitter x within each slot so columns aren't perfectly evenly spaced
      const x     = slotW * i + rnd(12, slotW - 12);
      const speed = rnd(0.22, 0.52);          // different speeds = parallax depth
      const colAlpha = rnd(0.55, 1.0);        // vary per-column intensity slightly
      const lineCount = Math.ceil(H / LINE_H) + 4;
      const lines = [];

      for (let j = 0; j < lineCount; j++) {
        lines.push({
          text:   pick(),
          y:      j * LINE_H - rnd(0, H),     // stagger starting positions
          isCyan: Math.random() < 0.12,        // 12% cyan, rest cobalt
        });
      }
      cols.push({ x, speed, colAlpha, lines });
    }
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  const W = () => canvas.width  / window.devicePixelRatio;
  const H = () => canvas.height / window.devicePixelRatio;

  const COBALT_BASE = 0.044;
  const CYAN_BASE   = 0.036;
  const FADE_ZONE   = 90;     // px over which lines fade in/out at top & bottom

  function draw() {
    ctx.clearRect(0, 0, W(), H());
    ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
    ctx.textBaseline = 'top';

    for (const col of cols) {
      for (const line of col.lines) {
        // Fade in near bottom edge, fade out near top edge
        let edgeFade = 1;
        if (line.y < FADE_ZONE)         edgeFade = Math.max(0, line.y / FADE_ZONE);
        if (line.y > H() - FADE_ZONE)   edgeFade = Math.max(0, (H() - line.y) / FADE_ZONE);

        const base  = line.isCyan ? CYAN_BASE : COBALT_BASE;
        const alpha = base * edgeFade * col.colAlpha;

        if (alpha > 0.002) {
          ctx.fillStyle = line.isCyan
            ? `rgba(0,212,255,${alpha})`
            : `rgba(27,79,138,${alpha})`;
          ctx.fillText(line.text, col.x, line.y);
        }

        // Drift upward
        line.y -= col.speed;

        // Recycle off the top: new snippet, new position at bottom
        if (line.y < -LINE_H * 2) {
          line.y    = H() + LINE_H;
          line.text = pick();
          line.isCyan = Math.random() < 0.12;
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();

  // Fade in slightly slower than the PCB canvas so it layers in gracefully
  gsap.to(canvas, { opacity: 1, duration: 4, delay: 1.2 });
})();

// ====== GSAP SETUP ======
gsap.registerPlugin(ScrollTrigger);

// ====== HERO ENTRANCE ANIMATION ======
gsap.set('.hero-line .hero-line-inner', { y: '110%' });
gsap.set('.hero-cta', { y: 30, opacity: 0 });

const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
heroTl
  // Headline slides up from clip
  .to('.hero-line .hero-line-inner', {
    y: '0%',
    duration: 0.9,
    ease: 'power4.out',
  }, 0.4)
  // CTAs rise up
  .to('.hero-cta', {
    y: 0,
    opacity: 1,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out',
  }, 0.9);

// ====== TERMINAL TYPEWRITER EFFECT ======
(function() {
  const el = document.getElementById('typewriterText');
  const cursor = document.getElementById('typeCursor');
  if (!el) return;

  const phrases = [
    'Senior Engineer · Elevator Systems',
    'Educator · Pedagogy Certified',
    'Systems Thinker · 16+ Years',
    'Hardware · Firmware · Solutions',
  ];

  let phraseIdx  = 0;
  let charIdx    = 0;
  let deleting   = false;
  let pauseTimer = null;

  function type() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        // Pause at end before deleting
        pauseTimer = setTimeout(() => { deleting = true; type(); }, 2200);
        return;
      }
    } else {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }

    const speed = deleting ? 40 : 65;
    setTimeout(type, speed);
  }

  // Start typewriter after hero entrance
  setTimeout(type, 1800);
})();

// ====== SCROLL-TRIGGERED REVEALS ======
gsap.utils.toArray('.gsap-reveal').forEach((el) => {
  gsap.fromTo(el,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.75,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
});

// ====== STAT COUNTERS ======
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;
  countersAnimated = true;

  document.querySelectorAll('.stat-counter').forEach(counter => {
    const target = parseInt(counter.dataset.target, 10);
    gsap.to(counter, {
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: function() {
        counter.textContent = Math.round(this.progress() * target);
      },
    });
  });
}

ScrollTrigger.create({
  trigger: '#stats',
  start: 'top 80%',
  onEnter: animateCounters,
  once: true,
});

// ====== NAVIGATION ======
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('nav-border');
  } else {
    nav.classList.remove('nav-border');
  }
}, { passive: true });

function toggleMobileNav() {
  const menu = document.getElementById('mobileMenu');
  const btn  = document.getElementById('hamburger');
  const isOpen = !menu.classList.contains('hidden');

  if (isOpen) {
    menu.classList.add('hidden');
    btn.children[0].style.transform = '';
    btn.children[1].style.opacity   = '';
    btn.children[2].style.transform = '';
  } else {
    menu.classList.remove('hidden');
    btn.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    btn.children[1].style.opacity   = '0';
    btn.children[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  }
}

function closeMobileNav() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.add('hidden');
  const btn = document.getElementById('hamburger');
  if (btn) {
    btn.children[0].style.transform = '';
    btn.children[1].style.opacity   = '';
    btn.children[2].style.transform = '';
  }
}

// ====== CURSOR GLOW ON EXPERIENCE BLOCKS ======
const companyGlowColors = {
  'exp-kone':      'rgba(0,91,172,0.1)',
  'exp-ite':       'rgba(232,75,55,0.1)',
  'exp-chevalier': 'rgba(45,106,79,0.1)',
  'exp-aceplan':   'rgba(124,58,237,0.1)',
  'exp-ntu':       'rgba(217,119,6,0.1)',
};

document.querySelectorAll('.exp-block').forEach(block => {
  const glow = block.querySelector('.exp-glow');
  if (!glow) return;

  // Find the company class
  for (const [cls, color] of Object.entries(companyGlowColors)) {
    if (block.classList.contains(cls)) {
      glow.style.background = `radial-gradient(circle, ${color}, transparent 70%)`;
      break;
    }
  }

  block.addEventListener('mousemove', (e) => {
    const rect = block.getBoundingClientRect();
    glow.style.left    = (e.clientX - rect.left - 150) + 'px';
    glow.style.top     = (e.clientY - rect.top  - 150) + 'px';
    glow.style.opacity = '1';
  });

  block.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
});

// ====== GEMINI API ======
const chatHistory = [];

async function callGemini(prompt, isChat = true) {
  const contents = [];

  if (isChat) {
    if (chatHistory.length === 0) {
      contents.push({ role: 'user', parts: [{ text: CHENGWEI_CONTEXT + '\n\nUser question: ' + prompt }] });
    } else {
      contents.push({ role: 'user',  parts: [{ text: CHENGWEI_CONTEXT }] });
      contents.push({ role: 'model', parts: [{ text: 'Understood. I will answer questions as Goh Cheng Wei in first person, based on my professional profile.' }] });
      chatHistory.forEach(msg => {
        contents.push({ role: msg.role, parts: [{ text: msg.text }] });
      });
      contents.push({ role: 'user', parts: [{ text: prompt }] });
    }
  } else {
    contents.push({ role: 'user', parts: [{ text: CHENGWEI_CONTEXT + '\n\n' + prompt }] });
  }

  try {
    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
      }),
    });

    if (!res.ok) throw new Error('API error ' + res.status);
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
  } catch (err) {
    throw new Error('Gemini call failed: ' + (err.message || 'unknown error'));
  }
}

// ====== MARKDOWN RENDERER ======
function renderMarkdown(text) {
  const lines = text.split('\n');
  let html   = '';
  let inList = false;

  for (const line of lines) {
    if (line.match(/^##\s+(.+)/)) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<h3 class="text-base font-semibold mt-5 mb-2">${inlineMd(line.replace(/^##\s+/, ''))}</h3>`;
      continue;
    }
    if (line.match(/^[-\u2022*]\s+(.+)/)) {
      if (!inList) { html += '<ul class="list-disc pl-5 mt-1 space-y-1.5">'; inList = true; }
      html += `<li class="text-sm leading-relaxed">${inlineMd(line.replace(/^[-\u2022*]\s+/, ''))}</li>`;
      continue;
    }
    if (line.trim() === '') {
      if (inList) { html += '</ul>'; inList = false; }
      continue;
    }
    if (inList) { html += '</ul>'; inList = false; }
    html += `<p class="mt-2 text-sm leading-relaxed">${inlineMd(line)}</p>`;
  }

  if (inList) html += '</ul>';
  return html;
}

function inlineMd(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// ====== AI CONTEXT EXPANSION ======
// Each expand-btn has a data-context attribute with the achievement text.
// Clicking shows an expanded AI narrative below the button.
async function expandContext(btn) {
  const context = btn.dataset.context;
  if (!context) return;

  // Find or create the context div (immediately after the button)
  let contextDiv = btn.nextElementSibling;
  if (!contextDiv || !contextDiv.classList.contains('expand-content')) {
    contextDiv = document.createElement('div');
    contextDiv.className = 'expand-content mt-4 p-4 rounded-lg text-sm text-text-dim leading-relaxed';
    contextDiv.style.cssText = 'background:rgba(27,79,138,0.04);border:1px solid rgba(27,79,138,0.12)';
    btn.after(contextDiv);
  }

  // Toggle if already open
  if (contextDiv.dataset.loaded === 'true') {
    const isHidden = contextDiv.style.display === 'none';
    contextDiv.style.display = isHidden ? '' : 'none';
    btn.innerHTML = isHidden
      ? '<i data-lucide="terminal" style="width:12px;height:12px;display:inline-block;vertical-align:-2px;margin-right:4px"></i>collapse()'
      : '<i data-lucide="terminal" style="width:12px;height:12px;display:inline-block;vertical-align:-2px;margin-right:4px"></i>learn_more()';
    lucide.createIcons({ nodes: [btn] });
    return;
  }

  // Loading state
  contextDiv.innerHTML = '<div class="flex gap-1.5 items-center py-1"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
  btn.innerHTML = '<i data-lucide="terminal" style="width:12px;height:12px;display:inline-block;vertical-align:-2px;margin-right:4px"></i>loading...';
  lucide.createIcons({ nodes: [btn] });
  btn.disabled = true;

  try {
    const response = await callGemini(
      `Write a concise 2-3 sentence narrative expanding on this experience achievement. Write in FIRST PERSON as Chengwei (use "I", "my"). Output ONLY the narrative — no preamble, no headers, no "here is" intro, no conversational filler. Just the expanded context directly.\n\nAchievement: ${context}`,
      false
    );
    contextDiv.innerHTML   = renderMarkdown(response);
    contextDiv.dataset.loaded = 'true';
    gsap.fromTo(contextDiv, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.35 });
  } catch (err) {
    contextDiv.innerHTML = '<span style="color:#E84B37">Unable to load — please try again.</span>';
    contextDiv.dataset.loaded = 'false';
  }

  btn.disabled = false;
  btn.innerHTML = '<i data-lucide="terminal" style="width:12px;height:12px;display:inline-block;vertical-align:-2px;margin-right:4px"></i>collapse()';
  lucide.createIcons({ nodes: [btn] });
}

// ====== CHAT WIDGET ======
let chatOpen = false;

function toggleChat() {
  chatOpen = !chatOpen;
  const panel = document.getElementById('chatPanel');

  if (chatOpen) {
    panel.classList.add('open');
    setTimeout(() => {
      const input = document.getElementById('chatInput');
      if (input) input.focus();
    }, 300);
  } else {
    panel.classList.remove('open');
  }
}

async function sendChat() {
  const input = document.getElementById('chatInput');
  const msg   = input ? input.value.trim() : '';
  if (!msg) return;

  input.value = '';
  autoResizeTextarea(input);

  addChatMessage(msg, 'user');
  chatHistory.push({ role: 'user', text: msg });

  const typingId = addChatMessage(
    '<div class="flex gap-1.5 items-center py-1"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>',
    'bot',
    true
  );

  if (input) input.disabled = true;

  try {
    const response = await callGemini(msg, true);
    chatHistory.push({ role: 'model', text: response });
    removeChatMessage(typingId);
    addChatMessage(response, 'bot');
  } catch (err) {
    removeChatMessage(typingId);
    addChatMessage('Sorry, I encountered an error. Please try again.', 'bot');
  }

  if (input) {
    input.disabled = false;
    input.focus();
  }
}

function addChatMessage(text, type, isHtml = false) {
  const messages = document.getElementById('chatMessages');
  const div = document.createElement('div');
  const id  = 'msg-' + Date.now();
  div.id    = id;

  if (type === 'bot') {
    div.className = 'chat-bot-msg';
    if (isHtml) {
      div.innerHTML = text;
    } else {
      div.innerHTML = renderMarkdown(text);
    }
  } else {
    div.className = 'chat-user-msg';
    div.textContent = text;
  }

  messages.appendChild(div);
  gsap.from(div, { y: 10, opacity: 0, duration: 0.3, ease: 'power2.out' });
  messages.scrollTop = messages.scrollHeight;
  return id;
}

function removeChatMessage(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// Auto-resize chat textarea
function autoResizeTextarea(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 100) + 'px';
}

const chatInput = document.getElementById('chatInput');
if (chatInput) {
  chatInput.addEventListener('input', () => autoResizeTextarea(chatInput));
}

// ====== FIT ASSESSMENT ======
async function assessFit() {
  const fitTextarea = document.getElementById('fitTextarea');
  const jd = fitTextarea ? fitTextarea.value.trim() : '';
  if (!jd) return;

  const btn     = document.getElementById('fitBtn');
  const result  = document.getElementById('fitResult');
  const content = document.getElementById('fitContent');

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4"></i> analysing...';
    lucide.createIcons({ nodes: [btn] });
  }
  if (result) result.classList.remove('hidden');
  if (content) {
    content.innerHTML = '<div class="flex gap-1.5 items-center"><span class="typing-dot" style="background:#00D4FF"></span><span class="typing-dot" style="background:#00D4FF"></span><span class="typing-dot" style="background:#00D4FF"></span></div>';
    gsap.from(result, { y: 10, opacity: 0, duration: 0.4 });
  }

  try {
    const response = await callGemini(
      `You are Goh Cheng Wei writing in FIRST PERSON. A hiring manager has pasted the following job description. Provide an honest fit assessment written as Chengwei himself (use "I", "my", "me").

Use this EXACT structure with bullet points for readability:

## Where I'm a Strong Fit
- (bullet point for each strength, referencing my specific technical experience)

## Where I'd Need to Grow
- (bullet point for each gap — be honest, this builds trust)

## My Overall Take
(a candid 1-2 sentence first-person summary)

Use markdown bullet points (- ) and bold (**text**) for key terms. Be specific and technical. Reference actual experience from my profile. Be honest — if I'm not a great fit, say so respectfully.

Job Description:
${jd}`,
      false
    );
    if (content) {
      content.innerHTML = renderMarkdown(response);
      gsap.from(content, { opacity: 0, duration: 0.4 });
    }
  } catch (err) {
    if (content) content.innerHTML = '<span style="color:#00D4FF">Unable to assess fit. Please try again.</span>';
  }

  if (btn) {
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="terminal" class="w-4 h-4"></i> run_fit_analysis()';
    lucide.createIcons({ nodes: [btn] });
  }
}

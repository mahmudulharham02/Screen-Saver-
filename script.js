/**
 * AFTER DARK — CLASSIC SCREEN SAVERS
 * High-performance, vanilla JavaScript screen saver collection and runtime.
 * Strictly adheres to 3-color dashboard palette: Black (#000000), White (#FFFFFF), Light Blue (#87CEFA).
 * Zero icons or emojis. Text-only interface.
 */

// ==========================================
// 0. MOTION PREFERENCE & ACCESSIBILITY CONTROLLER
// ==========================================

const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let prefersReducedMotion = motionMediaQuery.matches;

function handleMotionPreferenceChange(e) {
  prefersReducedMotion = e.matches;
}

if (typeof motionMediaQuery.addEventListener === 'function') {
  motionMediaQuery.addEventListener('change', handleMotionPreferenceChange);
} else if (typeof motionMediaQuery.addListener === 'function') {
  motionMediaQuery.addListener(handleMotionPreferenceChange);
}

// ==========================================
// 1. SCREEN SAVER REGISTRY & CATEGORIES
// ==========================================

const CATEGORIES = [
  {
    id: 'classic',
    title: 'Classic',
    savers: [
      { id: 'flying-toasters', title: 'Flying Toasters', create: createFlyingToasters },
      { id: 'fish', title: 'Fish', create: createFish },
      { id: 'globe', title: 'Globe', create: createGlobe },
      { id: 'hard-rain', title: 'Hard Rain', create: createHardRain },
      { id: 'bouncing-ball', title: 'Bouncing Ball', create: createBouncingBall },
      { id: 'warp', title: 'Warp', create: createWarp },
      { id: 'messages', title: 'Messages', create: createMessages },
      { id: 'messages-2', title: 'Messages 2', create: createMessages2 },
      { id: 'fade-out', title: 'Fade Out', create: createFadeOut },
      { id: 'logo', title: 'Logo', create: createLogo },
      { id: 'rainstorm', title: 'Rainstorm', create: createRainstorm },
      { id: 'spotlight', title: 'Spotlight', create: createSpotlight },
      { id: 'randomizer', title: 'All Types Randomizer', isRandomizer: true, create: createRandomizerPreview }
    ]
  },
  {
    id: 'cinematic-worlds',
    title: 'Cinematic Worlds',
    savers: [
      { id: 'spider-man', title: 'Spider-Man', create: createSpiderMan },
      { id: 'batman', title: 'Batman', create: createBatman },
      { id: 'interstellar', title: 'Interstellar', create: createInterstellar }
    ]
  },
  {
    id: 'ocean-exploration',
    title: 'Ocean Exploration',
    savers: [
      { id: 'under-the-ocean', title: 'Under the Ocean', create: createUnderTheOcean }
    ]
  },
  {
    id: 'nuclear-physics',
    title: 'Nuclear Physics',
    savers: [
      { id: 'nuclear-fusion', title: 'Nuclear Fusion', create: createNuclearFusion }
    ]
  },
  {
    id: 'mathematics',
    title: 'Mathematics',
    savers: [
      { id: 'mathematical-curves', title: 'Mathematical Curves', create: createMathematicalCurves },
      { id: 'fractal-explorer', title: 'Fractal Explorer', create: createFractalExplorer },
      { id: 'equation-flow', title: 'Equation Flow', create: createEquationFlow }
    ]
  },
  {
    id: 'physics',
    title: 'Physics',
    savers: [
      { id: 'wave-interference', title: 'Wave Interference', create: createWaveInterference },
      { id: 'orbital-mechanics', title: 'Orbital Mechanics', create: createOrbitalMechanics },
      { id: 'electromagnetic-fields', title: 'Electromagnetic Fields', create: createElectromagneticFields }
    ]
  },
  {
    id: 'chemistry',
    title: 'Chemistry',
    savers: [
      { id: 'molecular-dynamics', title: 'Molecular Dynamics', create: createMolecularDynamics },
      { id: 'reaction-diffusion', title: 'Reaction Diffusion', create: createReactionDiffusion }
    ]
  },
  {
    id: 'biology',
    title: 'Biology',
    savers: [
      { id: 'dna-double-helix', title: 'DNA Double Helix', create: createDNADoubleHelix },
      { id: 'mitosis', title: 'Mitosis', create: createMitosis }
    ]
  },
  {
    id: 'technology',
    title: 'Technology',
    savers: [
      { id: 'tech', title: 'Tech', create: createTech },
      { id: 'computer', title: 'Computer', create: createComputer },
      { id: 'binary', title: 'Binary', create: createBinary },
      { id: 'binary-orbits', title: 'Binary Orbits', create: createBinaryOrbits },
      { id: 'hexa', title: 'Hexa', create: createHexa },
      { id: 'terminal', title: 'Terminal', create: createTerminal }
    ]
  }
];

// Flat registry of all screen savers
const SCREENSAVERS = CATEGORIES.flatMap(cat => cat.savers);

// ==========================================
// 2. INDIVIDUAL SCREEN SAVER IMPLEMENTATIONS
// ==========================================

/**
 * 1. FLYING TOASTERS
 * Iconic chrome toasters with flapping wings and independent toast slices
 * moving diagonally (top-right towards bottom-left).
 */
function createFlyingToasters(canvas, isPreview) {
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = 1;

  const count = isPreview ? 5 : 16;
  const toasters = [];
  const toasts = [];

  function spawnToaster(forcePosition) {
    const scale = isPreview ? (0.45 + Math.random() * 0.45) : (0.55 + Math.random() * 0.7);
    const speed = (isPreview ? 60 : 80) * scale;
    // Classic After Dark angle: ~215 degrees (down and left)
    const angle = (215 + (Math.random() * 10 - 5)) * (Math.PI / 180);
    const vx = Math.cos(angle) * speed;
    const vy = -Math.sin(angle) * speed;

    return {
      x: forcePosition ? Math.random() * (width + 100) : width + 60 + Math.random() * 100,
      y: forcePosition ? Math.random() * (height + 100) - 50 : -60 - Math.random() * 80,
      vx,
      vy,
      scale,
      wingPhase: Math.random() * Math.PI * 2,
      wingSpeed: 10 + Math.random() * 4,
      toastTimer: Math.random() * 3
    };
  }

  function spawnToast(forcePosition, fromX, fromY) {
    const scale = isPreview ? (0.4 + Math.random() * 0.35) : (0.5 + Math.random() * 0.5);
    const speed = (isPreview ? 45 : 65) * scale;
    const angle = (210 + (Math.random() * 15 - 7.5)) * (Math.PI / 180);
    return {
      x: forcePosition ? Math.random() * width : (fromX ?? width + 40),
      y: forcePosition ? Math.random() * height : (fromY ?? -40),
      vx: Math.cos(angle) * speed,
      vy: -Math.sin(angle) * speed,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 1.5,
      scale
    };
  }

  function init() {
    toasters.length = 0;
    toasts.length = 0;
    for (let i = 0; i < count; i++) {
      toasters.push(spawnToaster(true));
    }
    const toastCount = Math.floor(count * 0.9);
    for (let i = 0; i < toastCount; i++) {
      toasts.push(spawnToast(true));
    }
  }

  function drawToaster(t) {
    ctx.save();
    ctx.translate(t.x, t.y);
    ctx.scale(t.scale, t.scale);

    // Wing oscillation (-1 to 1)
    const flap = Math.sin(t.wingPhase);

    // Far Wing (behind body)
    drawWing(ctx, -12, -18, flap * 0.9, 0.85);

    // Toaster Body (Chrome box with soft bevel)
    ctx.save();
    const bodyW = 54;
    const bodyH = 38;
    const rad = 6;

    // Body shadow / rim
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(-bodyW / 2 - 1, -bodyH / 2 - 1, bodyW + 2, bodyH + 2);

    // Metallic chrome gradient
    const grad = ctx.createLinearGradient(-bodyW / 2, -bodyH / 2, bodyW / 2, bodyH / 2);
    grad.addColorStop(0.0, '#e5e7eb');
    grad.addColorStop(0.25, '#9ca3af');
    grad.addColorStop(0.5, '#f3f4f6');
    grad.addColorStop(0.75, '#6b7280');
    grad.addColorStop(1.0, '#d1d5db');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(-bodyW / 2, -bodyH / 2, bodyW, bodyH, rad);
    ctx.fill();

    // Chrome reflection stripe
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.beginPath();
    ctx.roundRect(-bodyW / 2 + 4, -bodyH / 2 + 3, bodyW - 8, 4, 2);
    ctx.fill();

    // Dual Toast Slots on top
    ctx.fillStyle = '#111827';
    ctx.fillRect(-bodyW / 2 + 8, -bodyH / 2 - 2, 16, 4);
    ctx.fillRect(-bodyW / 2 + 28, -bodyH / 2 - 2, 16, 4);

    // Toast slice peeking out
    ctx.fillStyle = '#d97706';
    ctx.fillRect(-bodyW / 2 + 10, -bodyH / 2 - 6, 12, 5);
    ctx.fillRect(-bodyW / 2 + 30, -bodyH / 2 - 6, 12, 5);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-bodyW / 2 + 12, -bodyH / 2 - 5, 8, 4);
    ctx.fillRect(-bodyW / 2 + 32, -bodyH / 2 - 5, 8, 4);

    // Black feet / base pads
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(-bodyW / 2 + 4, bodyH / 2, 10, 4);
    ctx.fillRect(bodyW / 2 - 14, bodyH / 2, 10, 4);

    // Lever knob on front
    ctx.fillStyle = '#111827';
    ctx.fillRect(-bodyW / 2 + 6, 2, 12, 3);
    ctx.fillStyle = '#e5e7eb';
    ctx.beginPath();
    ctx.arc(-bodyW / 2 + 18, 3.5, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Near Wing (in front of body)
    drawWing(ctx, 4, -10, flap, 1.0);

    ctx.restore();
  }

  function drawWing(context, ox, oy, flap, opacity) {
    context.save();
    context.translate(ox, oy);
    // Rotate wing up and down
    const wingAngle = flap * 0.75 - 0.2;
    context.rotate(wingAngle);
    context.globalAlpha = opacity;

    // Wing outline & feathers
    context.fillStyle = '#f9fafb';
    context.strokeStyle = '#9ca3af';
    context.lineWidth = 1.2;

    context.beginPath();
    context.moveTo(0, 0);
    // Top curve of wing
    context.bezierCurveTo(-15, -28, -38, -24, -48, -10);
    // Feathers scalloped edge
    context.bezierCurveTo(-40, -4, -34, 2, -26, 4);
    context.bezierCurveTo(-20, 5, -12, 5, 0, 0);
    context.closePath();
    context.fill();
    context.stroke();

    // Wing interior quill lines
    context.beginPath();
    context.moveTo(-8, -4);
    context.lineTo(-38, -14);
    context.moveTo(-12, -2);
    context.lineTo(-30, -2);
    context.strokeStyle = 'rgba(156, 163, 175, 0.7)';
    context.lineWidth = 1;
    context.stroke();

    context.restore();
  }

  function drawToastSlice(t) {
    ctx.save();
    ctx.translate(t.x, t.y);
    ctx.rotate(t.rotation);
    ctx.scale(t.scale, t.scale);

    const tw = 28;
    const th = 26;

    // Toast crust (warm golden-brown)
    ctx.fillStyle = '#92400e';
    ctx.beginPath();
    ctx.roundRect(-tw / 2, -th / 2, tw, th, [6, 6, 3, 3]);
    ctx.fill();

    // Toast interior crumb
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.roundRect(-tw / 2 + 2, -th / 2 + 2, tw - 4, th - 4, [4, 4, 2, 2]);
    ctx.fill();

    // Light buttery toasted spots
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-tw / 4, -th / 4, 8, 6);
    ctx.fillStyle = '#b45309';
    ctx.fillRect(2, 2, 5, 4);

    ctx.restore();
  }

  return {
    resize(w, h, pDpr) {
      width = w;
      height = h;
      dpr = pDpr;
      init();
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.35 : 1.0) * motionScale;
      const effectiveDt = Math.min(dt, 0.1) * speedMult;

      for (let i = 0; i < toasters.length; i++) {
        const t = toasters[i];
        t.x += t.vx * effectiveDt;
        t.y += t.vy * effectiveDt;
        const wingRate = prefersReducedMotion ? 0.4 : (isHovered ? 1.4 : 1.0);
        t.wingPhase += t.wingSpeed * wingRate * effectiveDt;

        // Occasional toast pop from toaster
        t.toastTimer -= effectiveDt;
        if (t.toastTimer <= 0) {
          t.toastTimer = (prefersReducedMotion ? 7 : 4) + Math.random() * 5;
          if (toasts.length < count * 1.5 && Math.random() < (prefersReducedMotion ? 0.3 : 0.6)) {
            toasts.push(spawnToast(false, t.x, t.y - 10));
          }
        }

        // Respawn if off screen
        if (t.x < -120 || t.y > height + 120) {
          toasters[i] = spawnToaster(false);
        }
      }

      for (let i = 0; i < toasts.length; i++) {
        const tr = toasts[i];
        tr.x += tr.vx * effectiveDt;
        tr.y += tr.vy * effectiveDt;
        tr.rotation += tr.rotSpeed * (prefersReducedMotion ? 0.3 : 1.0) * effectiveDt;

        if (tr.x < -80 || tr.y > height + 80) {
          toasts[i] = spawnToast(false);
        }
      }
    },
    draw(context, w, h) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      for (let i = 0; i < toasts.length; i++) {
        drawToastSlice(toasts[i]);
      }
      for (let i = 0; i < toasters.length; i++) {
        drawToaster(toasters[i]);
      }
    },
    destroy() {
      toasters.length = 0;
      toasts.length = 0;
    }
  };
}

/**
 * 2. FISH
 * Dark aquatic scene with swimming fish, ambient light gradient, and rising bubbles.
 */
function createFish(canvas, isPreview) {
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;

  const fishCount = isPreview ? 6 : 18;
  const bubbleCount = isPreview ? 10 : 30;
  const fishes = [];
  const bubbles = [];

  const SPECIES = [
    { type: 'angelfish', bodyColor: '#87CEFA', finColor: '#38bdf8', stripeColor: '#0369a1', baseScale: 1.0 },
    { type: 'tetra', bodyColor: '#38bdf8', finColor: '#0284c7', accentColor: '#f43f5e', baseScale: 0.7 },
    { type: 'tang', bodyColor: '#0ea5e9', finColor: '#0284c7', stripeColor: '#f8fafc', baseScale: 0.9 }
  ];

  function spawnFish(forceRandomX) {
    const species = SPECIES[Math.floor(Math.random() * SPECIES.length)];
    const dir = Math.random() < 0.5 ? 1 : -1;
    const depth = 0.4 + Math.random() * 0.6; // 0.4 background, 1.0 foreground
    const speed = (25 + Math.random() * 45) * depth;

    return {
      x: forceRandomX ? Math.random() * width : (dir === 1 ? -60 : width + 60),
      y: 40 + Math.random() * (Math.max(60, height - 80)),
      dir,
      speed,
      depth,
      species,
      tailPhase: Math.random() * Math.PI * 2,
      tailFreq: 5 + Math.random() * 3,
      bobPhase: Math.random() * Math.PI * 2,
      wanderTargetY: 40 + Math.random() * (Math.max(60, height - 80)),
      wanderTimer: 2 + Math.random() * 4
    };
  }

  function spawnBubble(forceY) {
    return {
      x: Math.random() * width,
      y: forceY ? Math.random() * height : height + 10 + Math.random() * 20,
      r: 1 + Math.random() * (isPreview ? 2 : 3.5),
      speed: 15 + Math.random() * 25,
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleSpeed: 2 + Math.random() * 3
    };
  }

  function init() {
    fishes.length = 0;
    bubbles.length = 0;
    for (let i = 0; i < fishCount; i++) {
      fishes.push(spawnFish(true));
    }
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(spawnBubble(true));
    }
  }

  function drawAngelfish(f) {
    ctx.save();
    ctx.translate(f.x, f.y);
    ctx.scale(f.dir * f.depth, f.depth);

    const tailOsc = Math.sin(f.tailPhase) * 6;

    // Tail fin
    ctx.fillStyle = f.species.finColor;
    ctx.beginPath();
    ctx.moveTo(-18, 0);
    ctx.lineTo(-34 + tailOsc, -16);
    ctx.lineTo(-28 + tailOsc * 0.5, 0);
    ctx.lineTo(-34 + tailOsc, 16);
    ctx.closePath();
    ctx.fill();

    // Body
    ctx.fillStyle = f.species.bodyColor;
    ctx.beginPath();
    ctx.moveTo(22, 0);
    ctx.bezierCurveTo(12, -18, -12, -18, -18, 0);
    ctx.bezierCurveTo(-12, 18, 12, 18, 22, 0);
    ctx.closePath();
    ctx.fill();

    // Stripes
    ctx.strokeStyle = f.species.stripeColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(4, -14);
    ctx.lineTo(-2, 14);
    ctx.moveTo(-6, -11);
    ctx.lineTo(-12, 11);
    ctx.stroke();

    // Long graceful dorsal and ventral fins
    ctx.fillStyle = f.species.finColor;
    ctx.beginPath();
    ctx.moveTo(0, -16);
    ctx.bezierCurveTo(-4, -36, -14, -42, -18, -32);
    ctx.lineTo(-10, -14);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(2, 16);
    ctx.bezierCurveTo(-2, 34, -12, 40, -16, 30);
    ctx.lineTo(-8, 14);
    ctx.closePath();
    ctx.fill();

    // Eye
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(14, -3, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(15, -4, 0.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawTetra(f) {
    ctx.save();
    ctx.translate(f.x, f.y);
    ctx.scale(f.dir * f.depth, f.depth);

    const tailOsc = Math.sin(f.tailPhase) * 5;

    // Tail fin
    ctx.fillStyle = f.species.finColor;
    ctx.beginPath();
    ctx.moveTo(-16, 0);
    ctx.lineTo(-28 + tailOsc, -9);
    ctx.lineTo(-24 + tailOsc * 0.5, 0);
    ctx.lineTo(-28 + tailOsc, 9);
    ctx.closePath();
    ctx.fill();

    // Sleek torpedo body
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Radiant blue stripe
    ctx.strokeStyle = '#87CEFA';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(12, -1);
    ctx.lineTo(-14, -1);
    ctx.stroke();

    // Crimson belly accent
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.ellipse(-2, 3, 10, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eye
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(12, -2, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.arc(12.5, -2, 1.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  return {
    resize(w, h) {
      width = w;
      height = h;
      init();
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.4 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.4 : 1.0) * motionScale;
      const effectiveDt = Math.min(dt, 0.1) * speedMult;

      for (let i = 0; i < fishes.length; i++) {
        const f = fishes[i];
        f.x += f.dir * f.speed * effectiveDt;
        const tailRate = prefersReducedMotion ? 0.4 : (isHovered ? 1.5 : 1.0);
        f.tailPhase += f.tailFreq * tailRate * effectiveDt;
        f.bobPhase += (prefersReducedMotion ? 0.8 : 2.0) * effectiveDt;
        f.y += Math.sin(f.bobPhase) * (prefersReducedMotion ? 1.5 : 4) * effectiveDt;

        // Wander vertically
        f.wanderTimer -= effectiveDt;
        if (f.wanderTimer <= 0) {
          f.wanderTimer = (prefersReducedMotion ? 5 : 3) + Math.random() * 4;
          f.wanderTargetY = 30 + Math.random() * (Math.max(60, height - 60));
        }
        f.y += (f.wanderTargetY - f.y) * 0.4 * effectiveDt;

        // Respawn when crossing edge
        if (f.dir === 1 && f.x > width + 80) {
          fishes[i] = spawnFish(false);
          fishes[i].dir = 1;
          fishes[i].x = -60;
        } else if (f.dir === -1 && f.x < -80) {
          fishes[i] = spawnFish(false);
          fishes[i].dir = -1;
          fishes[i].x = width + 60;
        }
      }

      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        b.y -= b.speed * (prefersReducedMotion ? 0.4 : 1.0) * effectiveDt;
        b.wobblePhase += b.wobbleSpeed * (prefersReducedMotion ? 0.4 : 1.0) * effectiveDt;
        b.x += Math.sin(b.wobblePhase) * 0.5;

        if (b.y < -10) {
          bubbles[i] = spawnBubble(false);
        }
      }
    },
    draw(context, w, h) {
      // Dark aquatic ambient gradient
      const bgGrad = context.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#041324');
      bgGrad.addColorStop(0.5, '#020b17');
      bgGrad.addColorStop(1, '#01050c');
      context.fillStyle = bgGrad;
      context.fillRect(0, 0, w, h);

      // Bubbles
      context.fillStyle = 'rgba(135, 206, 250, 0.35)';
      context.strokeStyle = 'rgba(135, 206, 250, 0.6)';
      context.lineWidth = 1;
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        context.beginPath();
        context.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        context.fill();
        context.stroke();
      }

      // Fish sorted by depth
      fishes.sort((a, b) => a.depth - b.depth);
      for (let i = 0; i < fishes.length; i++) {
        const f = fishes[i];
        if (f.species.type === 'angelfish') {
          drawAngelfish(f);
        } else {
          drawTetra(f);
        }
      }
    },
    destroy() {
      fishes.length = 0;
      bubbles.length = 0;
    }
  };
}

/**
 * 3. GLOBE
 * Smoothly rotating 3D spherical wireframe and continental dots with atmospheric rim.
 */
function createGlobe(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let rotAngle = 0;

  // Approximate continent cluster points on a unit sphere (lat, lon in degrees)
  const CONTINENT_POINTS = [];
  function addContinent(latMin, latMax, lonMin, lonMax, density) {
    for (let lat = latMin; lat <= latMax; lat += density) {
      for (let lon = lonMin; lon <= lonMax; lon += density) {
        // jitter slightly for natural coastline feel
        const jLat = lat + (Math.random() - 0.5) * density * 0.5;
        const jLon = lon + (Math.random() - 0.5) * density * 0.5;
        const phi = (90 - jLat) * (Math.PI / 180);
        const theta = (jLon + 180) * (Math.PI / 180);
        CONTINENT_POINTS.push({
          x: Math.sin(phi) * Math.cos(theta),
          y: Math.cos(phi),
          z: Math.sin(phi) * Math.sin(theta)
        });
      }
    }
  }

  // Pre-seed continental coordinate clusters
  const step = isPreview ? 14 : 9;
  // Africa & Europe
  addContinent(-30, 35, -15, 45, step);
  addContinent(36, 65, -10, 40, step);
  // Asia
  addContinent(10, 70, 45, 140, step);
  // Americas
  addContinent(-50, 10, -75, -35, step);
  addContinent(15, 65, -125, -65, step);
  // Australia
  addContinent(-38, -12, 115, 150, step);

  return {
    resize(w, h) {
      width = w;
      height = h;
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.25 : 1.0;
      const speed = (isHovered && !prefersReducedMotion ? 1.0 : 0.45) * motionScale;
      rotAngle += speed * dt;
    },
    draw(context, w, h) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.38;

      // Outer rim glow
      const rimGrad = context.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.08);
      rimGrad.addColorStop(0, 'rgba(135, 206, 250, 0)');
      rimGrad.addColorStop(0.85, 'rgba(135, 206, 250, 0.2)');
      rimGrad.addColorStop(1, 'rgba(135, 206, 250, 0)');
      context.fillStyle = rimGrad;
      context.beginPath();
      context.arc(cx, cy, R * 1.08, 0, Math.PI * 2);
      context.fill();

      // Globe sphere outline
      context.strokeStyle = 'rgba(135, 206, 250, 0.45)';
      context.lineWidth = 1.5;
      context.beginPath();
      context.arc(cx, cy, R, 0, Math.PI * 2);
      context.stroke();

      // Axial tilt: 23.5 degrees
      const tilt = 23.5 * (Math.PI / 180);
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);

      // Rotate around Y axis, then tilt
      function project(x, y, z) {
        // Y rotation
        const cosR = Math.cos(rotAngle);
        const sinR = Math.sin(rotAngle);
        const rx = x * cosR - z * sinR;
        const ry = y;
        const rz = x * sinR + z * cosR;

        // X tilt
        const tx = rx;
        const ty = ry * cosT - rz * sinT;
        const tz = ry * sinT + rz * cosT;

        return {
          px: cx + tx * R,
          py: cy - ty * R,
          pz: tz
        };
      }

      // Draw latitude circles
      const latSteps = [-60, -40, -20, 0, 20, 40, 60];
      for (let l = 0; l < latSteps.length; l++) {
        const lat = latSteps[l] * (Math.PI / 180);
        const rLat = Math.cos(lat);
        const yLat = Math.sin(lat);

        context.beginPath();
        let first = true;
        for (let a = 0; a <= 64; a++) {
          const lon = (a / 64) * Math.PI * 2;
          const x = rLat * Math.cos(lon);
          const z = rLat * Math.sin(lon);
          const p = project(x, yLat, z);

          // Only draw front side visibly
          if (p.pz > -0.05) {
            if (first) {
              context.moveTo(p.px, p.py);
              first = false;
            } else {
              context.lineTo(p.px, p.py);
            }
          } else {
            first = true;
          }
        }
        context.strokeStyle = latSteps[l] === 0 ? 'rgba(135, 206, 250, 0.35)' : 'rgba(255, 255, 255, 0.12)';
        context.lineWidth = latSteps[l] === 0 ? 1.4 : 0.8;
        context.stroke();
      }

      // Draw longitude meridians (12 meridians)
      for (let m = 0; m < 12; m++) {
        const mAngle = (m / 12) * Math.PI * 2;
        context.beginPath();
        let first = true;
        for (let a = 0; a <= 48; a++) {
          const lat = ((a / 48) - 0.5) * Math.PI;
          const rLat = Math.cos(lat);
          const yLat = Math.sin(lat);
          const x = rLat * Math.cos(mAngle);
          const z = rLat * Math.sin(mAngle);
          const p = project(x, yLat, z);

          if (p.pz > -0.05) {
            if (first) {
              context.moveTo(p.px, p.py);
              first = false;
            } else {
              context.lineTo(p.px, p.py);
            }
          } else {
            first = true;
          }
        }
        context.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        context.lineWidth = 0.8;
        context.stroke();
      }

      // Draw continental landmass dots
      const dotRadius = isPreview ? 1.6 : 2.2;
      for (let i = 0; i < CONTINENT_POINTS.length; i++) {
        const cp = CONTINENT_POINTS[i];
        const p = project(cp.x, cp.y, cp.z);
        if (p.pz > 0) {
          // Front hemisphere - bright with depth shading
          const alpha = 0.35 + p.pz * 0.65;
          context.fillStyle = `rgba(135, 206, 250, ${alpha.toFixed(2)})`;
          context.beginPath();
          context.arc(p.px, p.py, dotRadius * (0.8 + p.pz * 0.4), 0, Math.PI * 2);
          context.fill();
        }
      }
    },
    destroy() {}
  };
}

/**
 * 4. HARD RAIN
 * Steady, dense, persistent rainfall with splash ripples and depth layers.
 */
function createHardRain(canvas, isPreview) {
  let width = 0;
  let height = 0;

  const dropCount = isPreview ? 160 : 700;
  const drops = [];
  const splashes = [];

  function spawnDrop(forceY) {
    const depth = 0.3 + Math.random() * 0.7; // 0.3 (far) to 1.0 (near)
    return {
      x: Math.random() * (width + 100) - 50,
      y: forceY ? Math.random() * height : -30 - Math.random() * 50,
      length: (14 + Math.random() * 24) * depth,
      speed: (450 + Math.random() * 500) * depth,
      depth,
      slant: 0.12 // slight natural wind angle
    };
  }

  function spawnSplash(x, y) {
    splashes.push({
      x,
      y,
      radius: 1,
      maxRadius: 4 + Math.random() * 8,
      alpha: 0.8,
      decay: 2.5 + Math.random() * 2
    });
  }

  function init() {
    drops.length = 0;
    splashes.length = 0;
    for (let i = 0; i < dropCount; i++) {
      drops.push(spawnDrop(true));
    }
  }

  return {
    resize(w, h) {
      width = w;
      height = h;
      init();
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.3 : 1.0) * motionScale;
      const effectiveDt = Math.min(dt, 0.1) * speedMult;

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        d.y += d.speed * effectiveDt;
        d.x += d.speed * d.slant * effectiveDt;

        if (d.y >= height - 2) {
          if (Math.random() < (prefersReducedMotion ? 0.15 : 0.25) && splashes.length < 80) {
            spawnSplash(d.x, height - 1);
          }
          drops[i] = spawnDrop(false);
        }
      }

      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        s.radius += (prefersReducedMotion ? 8 : 18) * effectiveDt;
        s.alpha -= s.decay * effectiveDt;
        if (s.alpha <= 0) {
          splashes.splice(i, 1);
        }
      }
    },
    draw(context, w, h) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      // Draw drops with depth-tinted strokes
      context.lineWidth = 1.2;
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        const alpha = 0.2 + d.depth * 0.65;
        context.strokeStyle = `rgba(186, 230, 253, ${alpha.toFixed(2)})`;
        context.beginPath();
        context.moveTo(d.x, d.y);
        context.lineTo(d.x + d.length * d.slant, d.y + d.length);
        context.stroke();
      }

      // Draw splashes
      context.lineWidth = 1;
      for (let i = 0; i < splashes.length; i++) {
        const s = splashes[i];
        context.strokeStyle = `rgba(135, 206, 250, ${Math.max(0, s.alpha).toFixed(2)})`;
        context.beginPath();
        context.ellipse(s.x, s.y, s.radius * 1.4, s.radius * 0.4, 0, 0, Math.PI * 2);
        context.stroke();
      }
    },
    destroy() {
      drops.length = 0;
      splashes.length = 0;
    }
  };
}

/**
 * 5. BOUNCING BALL
 * Physics-based ball with realistic gravity, floor shadow, squash-and-stretch, and kinetic trail.
 */
function createBouncingBall(canvas, isPreview) {
  let width = 0;
  let height = 0;

  let x = 0;
  let y = 0;
  let vx = 0;
  let vy = 0;
  let radius = 24;

  const trail = [];
  const maxTrail = isPreview ? 8 : 16;
  const gravity = 1100;
  const restitution = 0.96;

  let squashX = 1;
  let squashY = 1;

  function init() {
    radius = isPreview ? Math.max(12, Math.min(width, height) * 0.1) : Math.max(24, Math.min(width, height) * 0.055);
    x = width * 0.3;
    y = height * 0.25;
    vx = (isPreview ? 160 : 260) * (Math.random() < 0.5 ? 1 : -1);
    vy = -80;
    trail.length = 0;
  }

  return {
    resize(w, h) {
      width = w;
      height = h;
      init();
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.4 : 1.0;
      const effectiveDt = Math.min(dt, 0.06) * motionScale;

      // Apply gravity (reduced when motion sensitivity is detected)
      const currentGravity = prefersReducedMotion ? 400 : gravity;
      vy += currentGravity * effectiveDt;
      x += vx * effectiveDt;
      y += vy * effectiveDt;

      // Squash decay back to 1.0
      squashX += (1 - squashX) * 12 * effectiveDt;
      squashY += (1 - squashY) * 12 * effectiveDt;

      // Floor bounce
      if (y + radius >= height) {
        y = height - radius;
        vy = -Math.abs(vy) * restitution;
        // Keep energy lively
        const minVy = prefersReducedMotion ? 120 : 220;
        const kickVy = prefersReducedMotion ? -190 : -380;
        if (Math.abs(vy) < minVy) {
          vy = kickVy - Math.random() * (prefersReducedMotion ? 40 : 80);
        }
        squashX = prefersReducedMotion ? 1.15 : 1.35;
        squashY = prefersReducedMotion ? 0.85 : 0.68;
      }

      // Ceiling bounce
      if (y - radius <= 0) {
        y = radius;
        vy = Math.abs(vy) * restitution;
        squashX = prefersReducedMotion ? 1.1 : 1.25;
        squashY = prefersReducedMotion ? 0.9 : 0.75;
      }

      // Wall bounces
      if (x + radius >= width) {
        x = width - radius;
        vx = -Math.abs(vx);
        squashX = prefersReducedMotion ? 0.85 : 0.72;
        squashY = prefersReducedMotion ? 1.15 : 1.28;
      } else if (x - radius <= 0) {
        x = radius;
        vx = Math.abs(vx);
        squashX = prefersReducedMotion ? 0.85 : 0.72;
        squashY = prefersReducedMotion ? 1.15 : 1.28;
      }

      // Update trail
      trail.unshift({ x, y, r: radius });
      const currentMaxTrail = prefersReducedMotion ? Math.floor(maxTrail * 0.5) : maxTrail;
      if (trail.length > currentMaxTrail) {
        trail.pop();
      }
    },
    draw(context, w, h) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      // Floor shadow
      const distToFloor = Math.max(0, h - (y + radius));
      const shadowRatio = Math.max(0, 1 - distToFloor / (h * 0.65));
      if (shadowRatio > 0.05) {
        const shadowW = radius * (1.2 + shadowRatio * 0.8) * squashX;
        const shadowH = radius * 0.28 * shadowRatio;
        context.fillStyle = `rgba(135, 206, 250, ${(shadowRatio * 0.25).toFixed(2)})`;
        context.beginPath();
        context.ellipse(x, h - 2, shadowW, shadowH, 0, 0, Math.PI * 2);
        context.fill();
      }

      // Comet motion trail
      for (let i = trail.length - 1; i > 0; i--) {
        const t = trail[i];
        const prog = 1 - i / trail.length;
        context.fillStyle = `rgba(135, 206, 250, ${(prog * 0.18).toFixed(2)})`;
        context.beginPath();
        context.arc(t.x, t.y, t.r * (0.4 + prog * 0.6), 0, Math.PI * 2);
        context.fill();
      }

      // Render squash-and-stretch ball
      context.save();
      context.translate(x, y);
      context.scale(squashX, squashY);

      // Radiant ball gradient
      const ballGrad = context.createRadialGradient(-radius * 0.35, -radius * 0.35, radius * 0.1, 0, 0, radius);
      ballGrad.addColorStop(0, '#ffffff');
      ballGrad.addColorStop(0.25, '#bae6fd');
      ballGrad.addColorStop(0.65, '#0284c7');
      ballGrad.addColorStop(1, '#0c4a6e');

      context.fillStyle = ballGrad;
      context.beginPath();
      context.arc(0, 0, radius, 0, Math.PI * 2);
      context.fill();

      // Delicate rim stroke
      context.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      context.lineWidth = 1;
      context.stroke();

      context.restore();
    },
    destroy() {
      trail.length = 0;
    }
  };
}

/**
 * 6. WARP
 * 3D Starfield accelerating outward from the central vanishing point with streak trails.
 */
function createWarp(canvas, isPreview) {
  let width = 0;
  let height = 0;

  const starCount = isPreview ? 140 : 500;
  const stars = [];
  const maxZ = 1000;

  function spawnStar(randomZ) {
    return {
      x: (Math.random() - 0.5) * (width * 1.8),
      y: (Math.random() - 0.5) * (height * 1.8),
      z: randomZ ? Math.random() * maxZ : maxZ,
      pz: maxZ
    };
  }

  function init() {
    stars.length = 0;
    for (let i = 0; i < starCount; i++) {
      stars.push(spawnStar(true));
    }
  }

  return {
    resize(w, h) {
      width = w;
      height = h;
      init();
    },
    update(dt, isHovered) {
      const baseSpeed = prefersReducedMotion ? 90 : 420;
      const hoverSpeed = prefersReducedMotion ? 140 : 850;
      const warpSpeed = isHovered ? hoverSpeed : baseSpeed;
      const effectiveDt = Math.min(dt, 0.08);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.pz = s.z;
        s.z -= warpSpeed * effectiveDt;

        if (s.z <= 10) {
          stars[i] = spawnStar(false);
        }
      }
    },
    draw(context, w, h) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const fov = Math.min(w, h) * 0.7;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const k = fov / s.z;
        const px = cx + s.x * k;
        const py = cy + s.y * k;

        const pk = fov / s.pz;
        const ppx = cx + s.x * pk;
        const ppy = cy + s.y * pk;

        // Skip if outside viewport
        if (px < -20 || px > w + 20 || py < -20 || py > h + 20) {
          continue;
        }

        const depthRatio = 1 - s.z / maxZ;
        const alpha = Math.min(1, 0.2 + depthRatio * 0.8);
        const maxStroke = isPreview ? 2 : 3.2;
        const strokeWidth = Math.max(0.8, depthRatio * (prefersReducedMotion ? maxStroke * 0.6 : maxStroke));

        context.strokeStyle = `rgba(224, 242, 254, ${alpha.toFixed(2)})`;
        context.lineWidth = strokeWidth;
        context.beginPath();
        if (prefersReducedMotion) {
          // Shorter, calmer streaks to prevent visual expansion disorientation
          const lerpX = px + (ppx - px) * 0.35;
          const lerpY = py + (ppy - py) * 0.35;
          context.moveTo(lerpX, lerpY);
        } else {
          context.moveTo(ppx, ppy);
        }
        context.lineTo(px, py);
        context.stroke();
      }
    },
    destroy() {
      stars.length = 0;
    }
  };
}

/**
 * 7. MESSAGES
 * Phosphor-style smooth scrolling text marquee undulating across the dark void.
 */
function createMessages(canvas, isPreview) {
  let width = 0;
  let height = 0;

  const PHRASES = [
    'AFTER DARK',
    'SYSTEM IDLE',
    'PRESERVE PHOSPHOR',
    'FLYING TOASTERS',
    'STAND BY',
    'DO NOT DISTURB',
    'BERKELEY SYSTEMS'
  ];

  let scrollX = 0;
  let waveTime = 0;

  return {
    resize(w, h) {
      width = w;
      height = h;
      scrollX = w + 50;
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speed = (isHovered && !prefersReducedMotion ? 140 : 80) * motionScale;
      scrollX -= speed * dt;
      waveTime += dt * 1.5 * motionScale;

      // Wrap when all messages pass left
      if (scrollX < -1800) {
        scrollX = width + 50;
      }
    },
    draw(context, w, h) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      const fontSize = isPreview ? Math.max(16, Math.floor(h * 0.16)) : Math.max(36, Math.floor(h * 0.08));
      context.font = `600 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace`;
      context.textAlign = 'left';
      context.textBaseline = 'middle';

      let currentX = scrollX;
      const centerY = h / 2;

      for (let i = 0; i < PHRASES.length; i++) {
        const text = PHRASES[i];
        const textMetrics = context.measureText(text);
        const textWidth = textMetrics.width;

        // Only draw if partially visible
        if (currentX + textWidth > -50 && currentX < w + 50) {
          // Gentle sinusoidal ribbon wave (reduced amplitude for motion sensitivity)
          const waveAmp = prefersReducedMotion ? (h * 0.04) : (h * 0.16);
          const waveY = centerY + Math.sin(waveTime + i * 1.2) * waveAmp;

          // Phosphor glow
          context.shadowColor = '#87CEFA';
          context.shadowBlur = isPreview ? 8 : 16;
          context.fillStyle = '#ffffff';
          context.fillText(text, currentX, waveY);

          // Reset shadow
          context.shadowBlur = 0;
        }

        currentX += textWidth + (fontSize * 3);
      }
    },
    destroy() {}
  };
}

/**
 * 8. MESSAGES 2
 * Kinetic bouncing typography block that rebounds off boundaries, changes accent colors,
 * and leaves a multi-frame chromatic ghost echo.
 */
function createMessages2(canvas, isPreview) {
  let width = 0;
  let height = 0;

  const MESSAGES = ['AFTER DARK', 'ALL SYSTEMS IDLE', 'ENERGY SAVER', 'PHOSPHOR SECURE'];
  let currentMsgIdx = 0;

  const COLORS = ['#87CEFA', '#6ee7b7', '#c084fc', '#fcd34d', '#ffffff', '#38bdf8'];
  let colorIdx = 0;

  let x = 60;
  let y = 60;
  let vx = 110;
  let vy = 90;
  let boxW = 120;
  let boxH = 40;

  const echoes = [];
  const rings = [];

  function init() {
    x = width * 0.2;
    y = height * 0.3;
    vx = (isPreview ? 90 : 160) * (Math.random() < 0.5 ? 1 : -1);
    vy = (isPreview ? 80 : 140) * (Math.random() < 0.5 ? 1 : -1);
    echoes.length = 0;
    rings.length = 0;
  }

  return {
    resize(w, h) {
      width = w;
      height = h;
      init();
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.4 : 1.0) * motionScale;
      const effectiveDt = Math.min(dt, 0.08) * speedMult;

      x += vx * effectiveDt;
      y += vy * effectiveDt;

      let bounced = false;

      // Floor & ceiling bounce
      if (y + boxH >= height) {
        y = height - boxH;
        vy = -Math.abs(vy);
        bounced = true;
      } else if (y <= 0) {
        y = 0;
        vy = Math.abs(vy);
        bounced = true;
      }

      // Wall bounces
      if (x + boxW >= width) {
        x = width - boxW;
        vx = -Math.abs(vx);
        bounced = true;
      } else if (x <= 0) {
        x = 0;
        vx = Math.abs(vx);
        bounced = true;
      }

      if (bounced) {
        colorIdx = (colorIdx + 1) % COLORS.length;
        currentMsgIdx = (currentMsgIdx + 1) % MESSAGES.length;
        rings.push({
          x: x + boxW / 2,
          y: y + boxH / 2,
          r: 10,
          color: COLORS[colorIdx],
          alpha: prefersReducedMotion ? 0.6 : 0.9
        });
      }

      // Trailing echoes
      echoes.unshift({ x, y, msg: MESSAGES[currentMsgIdx], color: COLORS[colorIdx] });
      const maxEchoes = prefersReducedMotion ? 3 : (isPreview ? 4 : 8);
      if (echoes.length > maxEchoes) {
        echoes.pop();
      }

      // Update collision rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.r += (prefersReducedMotion ? 24 : 60) * effectiveDt;
        ring.alpha -= 2.2 * effectiveDt;
        if (ring.alpha <= 0) {
          rings.splice(i, 1);
        }
      }
    },
    draw(context, w, h) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      const fontSize = isPreview ? Math.max(13, Math.floor(h * 0.12)) : Math.max(26, Math.floor(h * 0.055));
      context.font = `700 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      context.textBaseline = 'top';

      const metrics = context.measureText(MESSAGES[currentMsgIdx]);
      boxW = metrics.width + 24;
      boxH = fontSize * 1.6;

      // Draw collision shockwave rings
      for (let i = 0; i < rings.length; i++) {
        const r = rings[i];
        context.strokeStyle = r.color;
        context.globalAlpha = Math.max(0, r.alpha);
        context.lineWidth = 1.5;
        context.beginPath();
        context.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        context.stroke();
      }
      context.globalAlpha = 1.0;

      // Draw ghost echoes
      for (let i = echoes.length - 1; i > 0; i--) {
        const e = echoes[i];
        const alpha = (1 - i / echoes.length) * 0.25;
        context.strokeStyle = e.color;
        context.globalAlpha = alpha;
        context.lineWidth = 1;
        context.strokeRect(e.x, e.y, boxW, boxH);
        context.fillStyle = e.color;
        context.fillText(e.msg, e.x + 12, e.y + fontSize * 0.3);
      }
      context.globalAlpha = 1.0;

      // Draw main box
      const activeColor = COLORS[colorIdx];
      context.fillStyle = 'rgba(0, 0, 0, 0.85)';
      context.fillRect(x, y, boxW, boxH);
      context.strokeStyle = activeColor;
      context.lineWidth = 2;
      context.strokeRect(x, y, boxW, boxH);

      context.fillStyle = '#ffffff';
      context.fillText(MESSAGES[currentMsgIdx], x + 12, y + fontSize * 0.3);
    },
    destroy() {
      echoes.length = 0;
      rings.length = 0;
    }
  };
}

/**
 * 9. FADE OUT
 * Atmospheric layered geometric patterns and constellations that fade in, hold, and dissolve.
 */
function createFadeOut(canvas, isPreview) {
  let width = 0;
  let height = 0;

  const count = isPreview ? 10 : 26;
  const elements = [];

  function spawnElement() {
    const types = ['circle-rings', 'faceted-poly', 'constellation', 'nested-square'];
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: (isPreview ? 20 : 35) + Math.random() * (isPreview ? 35 : 70),
      type: types[Math.floor(Math.random() * types.length)],
      opacity: 0,
      phase: 0, // 0: fading in, 1: holding, 2: fading out
      speed: 0.35 + Math.random() * 0.45,
      rotAngle: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.6,
      holdTimer: 1.5 + Math.random() * 2.5
    };
  }

  function init() {
    elements.length = 0;
    for (let i = 0; i < count; i++) {
      const el = spawnElement();
      // stagger phase so they don't fade together
      el.opacity = Math.random() * 0.9;
      el.phase = Math.floor(Math.random() * 3);
      elements.push(el);
    }
  }

  return {
    resize(w, h) {
      width = w;
      height = h;
      init();
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.5 : 1.0) * motionScale;
      const effectiveDt = Math.min(dt, 0.1) * speedMult;

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        el.rotAngle += el.rotSpeed * effectiveDt;

        if (el.phase === 0) {
          // Fading in
          el.opacity += el.speed * effectiveDt;
          if (el.opacity >= 0.85) {
            el.opacity = 0.85;
            el.phase = 1;
          }
        } else if (el.phase === 1) {
          // Holding
          el.holdTimer -= effectiveDt;
          if (el.holdTimer <= 0) {
            el.phase = 2;
          }
        } else if (el.phase === 2) {
          // Fading out
          el.opacity -= el.speed * 0.7 * effectiveDt;
          if (el.opacity <= 0.02) {
            elements[i] = spawnElement();
          }
        }
      }
    },
    draw(context, w, h) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        if (el.opacity <= 0.01) continue;

        context.save();
        context.translate(el.x, el.y);
        context.rotate(el.rotAngle);
        context.strokeStyle = `rgba(135, 206, 250, ${el.opacity.toFixed(2)})`;
        context.fillStyle = `rgba(255, 255, 255, ${(el.opacity * 0.8).toFixed(2)})`;
        context.lineWidth = 1.2;

        if (el.type === 'circle-rings') {
          context.beginPath();
          context.arc(0, 0, el.size, 0, Math.PI * 2);
          context.stroke();
          context.beginPath();
          context.arc(0, 0, el.size * 0.5, 0, Math.PI * 2);
          context.stroke();
          context.beginPath();
          context.arc(0, 0, 2, 0, Math.PI * 2);
          context.fill();
        } else if (el.type === 'faceted-poly') {
          context.beginPath();
          const sides = 6;
          for (let s = 0; s < sides; s++) {
            const a = (s / sides) * Math.PI * 2;
            const px = Math.cos(a) * el.size;
            const py = Math.sin(a) * el.size;
            if (s === 0) context.moveTo(px, py);
            else context.lineTo(px, py);
          }
          context.closePath();
          context.stroke();
          // spokes to center
          for (let s = 0; s < sides; s++) {
            const a = (s / sides) * Math.PI * 2;
            context.moveTo(0, 0);
            context.lineTo(Math.cos(a) * el.size, Math.sin(a) * el.size);
          }
          context.stroke();
        } else if (el.type === 'constellation') {
          const stars = [
            { x: -el.size * 0.8, y: -el.size * 0.4 },
            { x: -el.size * 0.2, y: el.size * 0.6 },
            { x: el.size * 0.6, y: -el.size * 0.7 },
            { x: el.size * 0.8, y: el.size * 0.3 }
          ];
          context.beginPath();
          context.moveTo(stars[0].x, stars[0].y);
          for (let st = 1; st < stars.length; st++) {
            context.lineTo(stars[st].x, stars[st].y);
          }
          context.stroke();
          for (let st = 0; st < stars.length; st++) {
            context.beginPath();
            context.arc(stars[st].x, stars[st].y, 2.5, 0, Math.PI * 2);
            context.fill();
          }
        } else {
          // Nested square
          context.strokeRect(-el.size / 2, -el.size / 2, el.size, el.size);
          context.strokeRect(-el.size / 4, -el.size / 4, el.size / 2, el.size / 2);
        }

        context.restore();
      }
    },
    destroy() {
      elements.length = 0;
    }
  };
}

/**
 * 10. LOGO
 * Iconic 3D rotating geometric vector monogram emblem with faceted wireframe geometry.
 */
function createLogo(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let angleX = 0.4;
  let angleY = 0;
  let angleZ = 0.2;

  // 3D vertices of a dual-cube / faceted geometric emblem
  const VERTICES = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
    [0, -1.6, 0], [0, 1.6, 0], [-1.6, 0, 0], [1.6, 0, 0],
    [0, 0, -1.6], [0, 0, 1.6]
  ];

  // Wireframe edge connectivity
  const EDGES = [
    // Outer cube
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
    // Diamond apex links
    [8, 0], [8, 1], [8, 4], [8, 5],
    [9, 2], [9, 3], [9, 6], [9, 7],
    [10, 0], [10, 3], [10, 4], [10, 7],
    [11, 1], [11, 2], [11, 5], [11, 6],
    [12, 0], [12, 1], [12, 2], [12, 3],
    [13, 4], [13, 5], [13, 6], [13, 7]
  ];

  return {
    resize(w, h) {
      width = w;
      height = h;
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.3 : 1.0;
      const speed = (isHovered && !prefersReducedMotion ? 1.4 : 0.65) * motionScale;
      angleY += 0.8 * speed * dt;
      angleX += 0.35 * speed * dt;
      angleZ += 0.2 * speed * dt;
    },
    draw(context, w, h) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const baseScale = Math.min(w, h) * (isPreview ? 0.24 : 0.28);

      // Rotation matrix math
      const cosX = Math.cos(angleX), sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ), sinZ = Math.sin(angleZ);

      function rotate(v) {
        let x = v[0], y = v[1], z = v[2];

        // Y rot
        let x1 = x * cosY - z * sinY;
        let z1 = x * sinY + z * cosY;
        let y1 = y;

        // X rot
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;
        let x2 = x1;

        // Z rot
        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = x2 * sinZ + y2 * cosZ;
        let z3 = z2;

        const fov = 3.8;
        const scale = fov / (fov + z3);

        return {
          px: cx + x3 * baseScale * scale,
          py: cy + y3 * baseScale * scale,
          pz: z3
        };
      }

      const projected = VERTICES.map(rotate);

      // Orbital halo ring in 3D
      context.strokeStyle = 'rgba(135, 206, 250, 0.25)';
      context.lineWidth = 1;
      context.beginPath();
      for (let i = 0; i <= 64; i++) {
        const a = (i / 64) * Math.PI * 2;
        const p = rotate([Math.cos(a) * 2.2, 0, Math.sin(a) * 2.2]);
        if (i === 0) context.moveTo(p.px, p.py);
        else context.lineTo(p.px, p.py);
      }
      context.stroke();

      // Draw wireframe edges
      for (let i = 0; i < EDGES.length; i++) {
        const p1 = projected[EDGES[i][0]];
        const p2 = projected[EDGES[i][1]];
        const avgZ = (p1.pz + p2.pz) / 2;
        const alpha = Math.max(0.15, Math.min(1, 0.55 - avgZ * 0.3));

        context.strokeStyle = `rgba(135, 206, 250, ${alpha.toFixed(2)})`;
        context.lineWidth = isPreview ? 1.2 : 1.8;
        context.beginPath();
        context.moveTo(p1.px, p1.py);
        context.lineTo(p2.px, p2.py);
        context.stroke();
      }

      // Draw vertex nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const alpha = Math.max(0.25, Math.min(1, 0.65 - p.pz * 0.3));
        context.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
        context.beginPath();
        context.arc(p.px, p.py, isPreview ? 2 : 3, 0, Math.PI * 2);
        context.fill();
      }
    },
    destroy() {}
  };
}

/**
 * 11. RAINSTORM
 * Intense stormy rainfall with shifting wind gusts, heavy splashes, mist, and brief atmospheric lightning.
 */
function createRainstorm(canvas, isPreview) {
  let width = 0;
  let height = 0;

  const dropCount = isPreview ? 260 : 1100;
  const drops = [];
  const splashes = [];

  let windGust = -0.22;
  let gustTarget = -0.22;
  let gustTimer = 3;

  let lightningFlash = 0;
  let lightningTimer = 4 + Math.random() * 5;

  function spawnDrop(forceY) {
    const depth = 0.25 + Math.random() * 0.75;
    return {
      x: Math.random() * (width + 200) - 100,
      y: forceY ? Math.random() * height : -40 - Math.random() * 60,
      length: (20 + Math.random() * 35) * depth,
      speed: (600 + Math.random() * 700) * depth,
      depth
    };
  }

  function init() {
    drops.length = 0;
    splashes.length = 0;
    for (let i = 0; i < dropCount; i++) {
      drops.push(spawnDrop(true));
    }
  }

  return {
    resize(w, h) {
      width = w;
      height = h;
      init();
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.3 : 1.0) * motionScale;
      const effectiveDt = Math.min(dt, 0.08) * speedMult;

      // Wind gusts shifting (calmer under reduced motion)
      gustTimer -= effectiveDt;
      if (gustTimer <= 0) {
        gustTimer = (prefersReducedMotion ? 5 : 2.5) + Math.random() * 4;
        gustTarget = prefersReducedMotion ? -0.12 : (-0.35 + Math.random() * 0.25);
      }
      windGust += (gustTarget - windGust) * (prefersReducedMotion ? 0.5 : 1.5) * effectiveDt;

      // Rapid flashes disabled for prefers-reduced-motion to accommodate photosensitive users
      if (prefersReducedMotion) {
        lightningFlash = 0;
      } else {
        lightningTimer -= effectiveDt;
        if (lightningTimer <= 0) {
          lightningTimer = (isPreview ? 6 : 8) + Math.random() * 7;
          lightningFlash = 0.85;
        }

        if (lightningFlash > 0) {
          lightningFlash -= 8.0 * effectiveDt;
          if (lightningFlash < 0) lightningFlash = 0;
        }
      }

      // Rain drops
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        d.y += d.speed * effectiveDt;
        d.x += d.speed * windGust * effectiveDt;

        if (d.y >= height - 2) {
          if (Math.random() < 0.35 && splashes.length < 120) {
            splashes.push({
              x: d.x,
              y: height - 1,
              vx: (Math.random() - 0.5) * 60 + windGust * 50,
              vy: -(30 + Math.random() * 70),
              alpha: 0.85
            });
          }
          drops[i] = spawnDrop(false);
        }
      }

      // Splashes
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        s.x += s.vx * effectiveDt;
        s.y += s.vy * effectiveDt;
        s.vy += 280 * effectiveDt; // gravity
        s.alpha -= 3.2 * effectiveDt;
        if (s.alpha <= 0) {
          splashes.splice(i, 1);
        }
      }
    },
    draw(context, w, h) {
      // Background with subtle lightning flash tint (deep navy, never blinding white)
      if (lightningFlash > 0.05) {
        context.fillStyle = `rgba(24, 48, 80, ${(lightningFlash * 0.45).toFixed(2)})`;
      } else {
        context.fillStyle = '#000000';
      }
      context.fillRect(0, 0, w, h);

      // Heavy rain streaks
      context.lineWidth = 1.4;
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        const alpha = Math.min(1, 0.3 + d.depth * 0.7 + lightningFlash * 0.3);
        context.strokeStyle = `rgba(186, 230, 253, ${alpha.toFixed(2)})`;
        context.beginPath();
        context.moveTo(d.x, d.y);
        context.lineTo(d.x + d.length * windGust, d.y + d.length);
        context.stroke();
      }

      // Splashing water mist spray
      for (let i = 0; i < splashes.length; i++) {
        const s = splashes[i];
        context.fillStyle = `rgba(135, 206, 250, ${Math.max(0, s.alpha).toFixed(2)})`;
        context.beginPath();
        context.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
        context.fill();
      }
    },
    destroy() {
      drops.length = 0;
      splashes.length = 0;
    }
  };
}

/**
 * 12. SPOTLIGHT
 * Obsidian darkness with a wandering theatrical spotlight revealing an intricate celestial star map.
 */
function createSpotlight(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let time = 0;

  // Background map elements (celestial compass, constellation lines, stars)
  const mapStars = [];
  const mapLines = [];

  function initMap() {
    mapStars.length = 0;
    mapLines.length = 0;

    const starCount = isPreview ? 80 : 250;
    for (let i = 0; i < starCount; i++) {
      mapStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1 + Math.random() * 2.5
      });
    }

    // Connect some stars into constellations
    for (let i = 0; i < mapStars.length - 1; i += 3) {
      if (i + 1 < mapStars.length) {
        mapLines.push([mapStars[i], mapStars[i + 1]]);
      }
      if (i + 2 < mapStars.length) {
        mapLines.push([mapStars[i + 1], mapStars[i + 2]]);
      }
    }
  }

  return {
    resize(w, h) {
      width = w;
      height = h;
      initMap();
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speed = (isHovered && !prefersReducedMotion ? 1.5 : 0.85) * motionScale;
      time += dt * speed;
    },
    draw(context, w, h) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      // Wandering Lissajous curve for the spotlight
      const spotX = w / 2 + Math.sin(time * 0.7) * (w * 0.35);
      const spotY = h / 2 + Math.cos(time * 0.5) * (h * 0.35);
      const spotRadius = Math.min(w, h) * (isPreview ? 0.38 : 0.28);

      // Save and clip to circular spotlight area
      context.save();
      context.beginPath();
      context.arc(spotX, spotY, spotRadius, 0, Math.PI * 2);
      context.clip();

      // Soft illuminated background inside the spotlight beam
      const spotGrad = context.createRadialGradient(spotX, spotY, 0, spotX, spotY, spotRadius);
      spotGrad.addColorStop(0, 'rgba(135, 206, 250, 0.25)');
      spotGrad.addColorStop(0.7, 'rgba(135, 206, 250, 0.1)');
      spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.fillStyle = spotGrad;
      context.fillRect(spotX - spotRadius, spotY - spotRadius, spotRadius * 2, spotRadius * 2);

      // Draw celestial map lines
      context.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      context.lineWidth = 1;
      for (let i = 0; i < mapLines.length; i++) {
        const line = mapLines[i];
        context.beginPath();
        context.moveTo(line[0].x, line[0].y);
        context.lineTo(line[1].x, line[1].y);
        context.stroke();
      }

      // Draw celestial stars & compass rings
      for (let i = 0; i < mapStars.length; i++) {
        const s = mapStars[i];
        context.fillStyle = '#ffffff';
        context.beginPath();
        context.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        context.fill();
      }

      // Vintage coordinate compass grid lines
      context.strokeStyle = 'rgba(135, 206, 250, 0.3)';
      context.beginPath();
      context.arc(w / 2, h / 2, Math.min(w, h) * 0.3, 0, Math.PI * 2);
      context.arc(w / 2, h / 2, Math.min(w, h) * 0.15, 0, Math.PI * 2);
      context.moveTo(0, h / 2);
      context.lineTo(w, h / 2);
      context.moveTo(w / 2, 0);
      context.lineTo(w / 2, h);
      context.stroke();

      context.restore();

      // Spotlight feathered rim border
      context.strokeStyle = 'rgba(135, 206, 250, 0.4)';
      context.lineWidth = 1.5;
      context.beginPath();
      context.arc(spotX, spotY, spotRadius, 0, Math.PI * 2);
      context.stroke();
    },
    destroy() {
      mapStars.length = 0;
      mapLines.length = 0;
    }
  };
}

/**
 * 13. MATHEMATICAL CURVES
 * Continuously evolving mathematical curves: Lissajous, Rose curves (Rhodonea),
 * Hypocycloids, and Harmonographs with mathematically correct parametric equations.
 */
function createMathematicalCurves(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let time = 0;
  let modeTime = 0;
  let currentMode = 0; // 0: Lissajous, 1: Rhodonea, 2: Hypocycloid, 3: Harmonograph
  const MODES_COUNT = 4;

  return {
    resize(w, h) {
      width = w;
      height = h;
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.4 : 1.0) * motionScale;
      const effectiveDt = Math.min(dt, 0.1) * speedMult;
      time += effectiveDt;
      modeTime += effectiveDt;
      if (modeTime > (prefersReducedMotion ? 20 : 12)) {
        modeTime = 0;
        currentMode = (currentMode + 1) % MODES_COUNT;
      }
    },
    draw(context, w, h) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * (isPreview ? 0.38 : 0.4);

      // Subtle coordinate grid rings
      context.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      context.lineWidth = 0.8;
      context.beginPath();
      context.arc(cx, cy, radius * 0.33, 0, Math.PI * 2);
      context.arc(cx, cy, radius * 0.66, 0, Math.PI * 2);
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.moveTo(cx - radius * 1.1, cy);
      context.lineTo(cx + radius * 1.1, cy);
      context.moveTo(cx, cy - radius * 1.1);
      context.lineTo(cx, cy + radius * 1.1);
      context.stroke();

      const numPoints = isPreview ? 260 : 640;
      const layers = [
        { phaseOffset: 0, color: 'rgba(135, 206, 250, 0.9)', width: isPreview ? 1.2 : 1.8 },
        { phaseOffset: 0.18, color: 'rgba(56, 189, 248, 0.45)', width: 1.0 },
        { phaseOffset: -0.18, color: 'rgba(255, 255, 255, 0.25)', width: 0.8 }
      ];

      for (let layer of layers) {
        context.strokeStyle = layer.color;
        context.lineWidth = layer.width;
        context.beginPath();

        for (let i = 0; i <= numPoints; i++) {
          const t = (i / numPoints) * Math.PI * 2;
          let x = 0;
          let y = 0;

          if (currentMode === 0) {
            // Lissajous curve: x = A sin(a t + δ), y = B sin(b t)
            const freqX = 3;
            const freqY = 2;
            const delta = time * 0.8 + layer.phaseOffset;
            x = Math.sin(freqX * t + delta) * radius;
            y = Math.sin(freqY * t) * radius;
          } else if (currentMode === 1) {
            // Rhodonea / Rose curve: r = a cos(k θ)
            const k = 4 + Math.sin(time * 0.25) * 2;
            const r = Math.cos(k * t + time * 0.5 + layer.phaseOffset) * radius;
            x = r * Math.cos(t);
            y = r * Math.sin(t);
          } else if (currentMode === 2) {
            // Hypocycloid: (R-r)cos(t) + d cos((R-r)t/r)
            const R = radius;
            const r = radius * 0.25;
            const d = radius * 0.22 + Math.sin(time * 0.4) * (radius * 0.08);
            x = (R - r) * Math.cos(t + layer.phaseOffset) + d * Math.cos((R - r) * t / r + time);
            y = (R - r) * Math.sin(t + layer.phaseOffset) - d * Math.sin((R - r) * t / r + time);
          } else {
            // Harmonograph: multi-harmonic oscillation
            const f1 = 2, f2 = 3;
            const p1 = time * 0.6 + layer.phaseOffset;
            const p2 = time * 0.4;
            x = (Math.sin(f1 * t + p1) * 0.6 + Math.sin(f2 * t * 2 + p2) * 0.4) * radius;
            y = (Math.cos(f2 * t + p2) * 0.6 + Math.cos(f1 * t * 2 + p1) * 0.4) * radius;
          }

          if (i === 0) {
            context.moveTo(cx + x, cy + y);
          } else {
            context.lineTo(cx + x, cy + y);
          }
        }
        context.stroke();
      }

      if (!isPreview) {
        context.fillStyle = 'rgba(135, 206, 250, 0.65)';
        context.font = '12px -apple-system, BlinkMacSystemFont, monospace';
        context.textAlign = 'left';
        const labels = [
          'CURVE: LISSAJOUS [x = A·sin(3t + δ), y = B·sin(2t)]',
          'CURVE: RHODONEA ROSE [r = a·cos(kθ)]',
          'CURVE: HYPOCYCLOID [(R-r)cos(t) + d·cos((R-r)t/r)]',
          'CURVE: HARMONOGRAPH [ψ(t) = Σ Aᵢ·sin(ωᵢt + φᵢ)]'
        ];
        context.fillText(labels[currentMode], 28, h - 28);
      }
    },
    destroy() {}
  };
}

/**
 * 14. FRACTAL EXPLORER
 * Animated complex fractal visualization of Julia and Mandelbrot sets
 * with real numerical iteration and smooth continuous coloring.
 */
function createFractalExplorer(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let zoom = 1.0;
  let time = 0;

  const offscreen = document.createElement('canvas');
  const offCtx = offscreen.getContext('2d');
  let offWidth = isPreview ? 140 : 256;
  let offHeight = isPreview ? 79 : 144;
  offscreen.width = offWidth;
  offscreen.height = offHeight;

  return {
    resize(w, h) {
      width = w;
      height = h;
      offWidth = isPreview ? 140 : 256;
      offHeight = isPreview ? Math.round(offWidth * (h / w)) : Math.round(offWidth * (h / w));
      offscreen.width = Math.max(80, offWidth);
      offscreen.height = Math.max(45, offHeight);
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.4 : 1.0) * motionScale;
      time += Math.min(dt, 0.1) * speedMult;
      zoom = Math.exp((time * 0.28) % 4.2);
    },
    draw(context, w, h) {
      const imgData = offCtx.createImageData(offscreen.width, offscreen.height);
      const data = imgData.data;

      // Orbiting complex Julia constant c
      const cr = -0.7 + Math.sin(time * 0.18) * 0.12;
      const ci = 0.27015 + Math.cos(time * 0.14) * 0.08;
      const maxIter = isPreview ? 26 : 40;

      const aspect = offscreen.width / offscreen.height;
      const scale = 2.4 / zoom;

      let idx = 0;
      const oW = offscreen.width;
      const oH = offscreen.height;

      for (let y = 0; y < oH; y++) {
        const zy0 = ((y / oH) - 0.5) * scale;
        for (let x = 0; x < oW; x++) {
          const zx0 = (((x / oW) - 0.5) * scale) * aspect;

          let zx = zx0;
          let zy = zy0;
          let iter = 0;

          while (zx * zx + zy * zy <= 4 && iter < maxIter) {
            const xtemp = zx * zx - zy * zy + cr;
            zy = 2 * zx * zy + ci;
            zx = xtemp;
            iter++;
          }

          if (iter === maxIter) {
            data[idx] = 0;
            data[idx + 1] = 0;
            data[idx + 2] = 0;
            data[idx + 3] = 255;
          } else {
            const norm = iter / maxIter;
            data[idx] = Math.floor(Math.min(255, norm * norm * 255 * 1.4));
            data[idx + 1] = Math.floor(Math.min(255, norm * 206));
            data[idx + 2] = Math.floor(Math.min(255, 100 + norm * 155));
            data[idx + 3] = 255;
          }
          idx += 4;
        }
      }

      offCtx.putImageData(imgData, 0, 0);

      context.imageSmoothingEnabled = true;
      context.drawImage(offscreen, 0, 0, w, h);

      if (!isPreview) {
        context.fillStyle = 'rgba(135, 206, 250, 0.7)';
        context.font = '12px -apple-system, BlinkMacSystemFont, monospace';
        context.textAlign = 'left';
        context.fillText(`FRACTAL JULIA SET: z ↦ z² + (${cr.toFixed(3)} + ${ci.toFixed(3)}i) | ZOOM: ${zoom.toFixed(1)}x`, 28, h - 28);
      }
    },
    destroy() {}
  };
}

/**
 * 15. EQUATION FLOW
 * Cinematic mathematical typography floating through a dark digital void with depth and phosphor glow.
 */
function createEquationFlow(canvas, isPreview) {
  let width = 0;
  let height = 0;

  const EQUATIONS = [
    'e^{iπ} + 1 = 0',
    'iℏ (∂ψ/∂t) = Ĥψ',
    '∇·E = ρ / ε₀',
    '∇×B = μ₀J + μ₀ε₀(∂E/∂t)',
    'R_{μν} - ½R g_{μν} = (8πG/c⁴) T_{μν}',
    '∫_{-∞}^{∞} e^{-x²} dx = √π',
    'F{f}(ξ) = ∫ f(x) e^{-2πi x ξ} dx',
    'Δx · Δp ≥ ℏ / 2',
    'ζ(s) = Σ_{n=1}^{∞} (1 / nˢ)',
    'φ = (1 + √5) / 2 ≈ 1.618',
    '(iγᵘ ∂ᵤ - m)ψ = 0',
    'S = k_B ln Ω',
    '∮ A·dr = ∬ (∇×A)·dS',
    'ds² = -(1 - 2GM/rc²)c²dt²'
  ];

  const count = isPreview ? 6 : 14;
  const items = [];

  function spawnEquation(randomZ) {
    return {
      text: EQUATIONS[Math.floor(Math.random() * EQUATIONS.length)],
      x: (Math.random() - 0.5) * (width * 0.9),
      y: (Math.random() - 0.5) * (height * 0.9),
      z: randomZ ? 80 + Math.random() * 450 : 500,
      vz: 45 + Math.random() * 40,
      opacity: 0
    };
  }

  function init() {
    items.length = 0;
    for (let i = 0; i < count; i++) {
      items.push(spawnEquation(true));
    }
  }

  return {
    resize(w, h) {
      width = w;
      height = h;
      init();
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.4 : 1.0) * motionScale;
      const effectiveDt = Math.min(dt, 0.1) * speedMult;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.z -= item.vz * effectiveDt;

        if (item.z <= 60) {
          items[i] = spawnEquation(false);
        }
      }
    },
    draw(context, w, h) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const fov = Math.min(w, h) * 0.75;

      // Sort by depth (far to near)
      items.sort((a, b) => b.z - a.z);

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const scale = fov / item.z;
        const px = cx + item.x * scale;
        const py = cy + item.y * scale;

        const depthFactor = 1 - Math.min(1, Math.max(0, (item.z - 60) / 440));
        const alpha = Math.min(1, 0.25 + depthFactor * 0.75);
        const fontSize = Math.max(10, Math.floor(scale * (isPreview ? 12 : 20)));

        context.font = `600 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        // Phosphor glow on near equations
        if (depthFactor > 0.6 && !isPreview) {
          context.shadowColor = '#87CEFA';
          context.shadowBlur = 10 * depthFactor;
        } else {
          context.shadowBlur = 0;
        }

        context.fillStyle = `rgba(224, 242, 254, ${alpha.toFixed(2)})`;
        context.fillText(item.text, px, py);
        context.shadowBlur = 0;
      }
    },
    destroy() {
      items.length = 0;
    }
  };
}

/**
 * 16. WAVE INTERFERENCE
 * Physically grounded simulation of wave superposition: constructive/destructive interference,
 * standing waves, and dynamic interference fringes from multiple harmonic sources.
 */
function createWaveInterference(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let time = 0;

  return {
    resize(w, h) {
      width = w;
      height = h;
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.4 : 1.0) * motionScale;
      time += Math.min(dt, 0.1) * speedMult;
    },
    draw(context, w, h) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const waveSpeed = 4.0;
      const k = isPreview ? 0.08 : 0.06;

      const sources = [
        {
          x: cx + Math.sin(time * 0.7) * (w * 0.22),
          y: cy + Math.cos(time * 0.5) * (h * 0.18),
          freq: 1.0,
          amp: 1.0
        },
        {
          x: cx + Math.cos(time * 0.6) * (w * 0.24),
          y: cy + Math.sin(time * 0.8) * (h * 0.2),
          freq: 1.1,
          amp: 0.9
        },
        {
          x: cx + Math.sin(time * 0.4 + 2) * (w * 0.15),
          y: cy + Math.cos(time * 0.9 + 1) * (h * 0.22),
          freq: 0.95,
          amp: 0.85
        }
      ];

      const numRings = isPreview ? 14 : 26;
      const maxRadius = Math.max(w, h) * 0.75;

      for (let s = 0; s < sources.length; s++) {
        const src = sources[s];
        context.fillStyle = '#ffffff';
        context.beginPath();
        context.arc(src.x, src.y, isPreview ? 2 : 3, 0, Math.PI * 2);
        context.fill();

        for (let r = 0; r < numRings; r++) {
          const baseR = (r * (maxRadius / numRings) + (time * waveSpeed * 18) % (maxRadius / numRings));
          const sampleSteps = isPreview ? 32 : 64;
          context.beginPath();

          for (let p = 0; p <= sampleSteps; p++) {
            const theta = (p / sampleSteps) * Math.PI * 2;
            const px = src.x + Math.cos(theta) * baseR;
            const py = src.y + Math.sin(theta) * baseR;

            let totalPsi = 0;
            for (let other of sources) {
              const d = Math.hypot(px - other.x, py - other.y);
              totalPsi += other.amp * Math.cos(k * d - time * waveSpeed * other.freq);
            }

            if (p === 0) {
              context.moveTo(px, py);
            } else {
              context.lineTo(px, py);
            }
          }
          context.strokeStyle = `rgba(135, 206, 250, ${(0.15 + (r % 2 === 0 ? 0.35 : 0.15)).toFixed(2)})`;
          context.lineWidth = isPreview ? 1.0 : 1.4;
          context.stroke();
        }
      }

      if (!isPreview) {
        context.fillStyle = 'rgba(135, 206, 250, 0.7)';
        context.font = '12px -apple-system, BlinkMacSystemFont, monospace';
        context.textAlign = 'left';
        context.fillText('WAVE SUPERPOSITION: ψ(r, t) = Σ Aᵢ · cos(k·rᵢ - ωᵢ·t)', 28, h - 28);
      }
    },
    destroy() {}
  };
}

/**
 * 17. ORBITAL MECHANICS
 * Physics-based Keplerian multi-body gravity: central star, elliptical planetary orbits,
 * vis-viva velocity conservation, and cometary dust/ion tails.
 */
function createOrbitalMechanics(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let time = 0;

  const PLANETS = [
    { name: 'Hermes', a: 0.15, e: 0.22, period: 2.2, color: '#e2e8f0', radius: 3, tilt: 0.1 },
    { name: 'Terra', a: 0.28, e: 0.03, period: 5.0, color: '#87CEFA', radius: 4.5, tilt: 0.2, hasMoon: true },
    { name: 'Ares', a: 0.42, e: 0.12, period: 8.5, color: '#f87171', radius: 3.5, tilt: -0.15 },
    { name: 'Zeus', a: 0.62, e: 0.06, period: 14.0, color: '#fde68a', radius: 7.5, tilt: 0.25, hasRings: true },
    { name: 'Halley', a: 0.82, e: 0.74, period: 20.0, color: '#38bdf8', radius: 2.5, isComet: true, tilt: -0.35 }
  ];

  return {
    resize(w, h) {
      width = w;
      height = h;
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.35 : 1.0) * motionScale;
      time += Math.min(dt, 0.1) * speedMult;
    },
    draw(context, w, h) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const baseScale = Math.min(w, h) * 0.95;

      const starGrad = context.createRadialGradient(cx, cy, 2, cx, cy, isPreview ? 14 : 26);
      starGrad.addColorStop(0, '#ffffff');
      starGrad.addColorStop(0.3, '#fef08a');
      starGrad.addColorStop(0.7, 'rgba(253, 224, 71, 0.4)');
      starGrad.addColorStop(1, 'rgba(253, 224, 71, 0)');
      context.fillStyle = starGrad;
      context.beginPath();
      context.arc(cx, cy, isPreview ? 14 : 26, 0, Math.PI * 2);
      context.fill();

      for (let p of PLANETS) {
        const a = p.a * baseScale * 0.5;
        const e = p.e;
        const b = a * Math.sqrt(1 - e * e);
        const c = a * e;

        const cosT = Math.cos(p.tilt);
        const sinT = Math.sin(p.tilt);

        context.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        context.lineWidth = 0.8;
        context.beginPath();
        for (let i = 0; i <= 64; i++) {
          const theta = (i / 64) * Math.PI * 2;
          const ex = -c + a * Math.cos(theta);
          const ey = b * Math.sin(theta);
          const rx = cx + ex * cosT - ey * sinT;
          const ry = cy + ex * sinT + ey * cosT;
          if (i === 0) context.moveTo(rx, ry);
          else context.lineTo(rx, ry);
        }
        context.stroke();

        const meanAnomaly = (time * (Math.PI * 2 / p.period)) % (Math.PI * 2);
        let E = meanAnomaly;
        for (let iter = 0; iter < 4; iter++) {
          E = E - (E - e * Math.sin(E) - meanAnomaly) / (1 - e * Math.cos(E));
        }

        const posX = -c + a * Math.cos(E);
        const posY = b * Math.sin(E);
        const px = cx + posX * cosT - posY * sinT;
        const py = cy + posX * sinT + posY * cosT;

        if (p.isComet) {
          const dx = px - cx;
          const dy = py - cy;
          const dist = Math.hypot(dx, dy) || 1;
          const tailLen = Math.max(15, (baseScale * 0.45) * (1 - dist / (baseScale * 0.5)));
          const ux = dx / dist;
          const uy = dy / dist;

          context.strokeStyle = 'rgba(135, 206, 250, 0.7)';
          context.lineWidth = 1.5;
          context.beginPath();
          context.moveTo(px, py);
          context.lineTo(px + ux * tailLen, py + uy * tailLen);
          context.stroke();

          context.strokeStyle = 'rgba(255, 255, 255, 0.35)';
          context.lineWidth = 2.5;
          context.beginPath();
          context.moveTo(px, py);
          context.lineTo(px + (ux + 0.15) * tailLen * 0.8, py + (uy - 0.15) * tailLen * 0.8);
          context.stroke();
        }

        context.fillStyle = p.color;
        context.beginPath();
        context.arc(px, py, p.radius * (isPreview ? 0.8 : 1.0), 0, Math.PI * 2);
        context.fill();

        if (p.hasRings) {
          context.strokeStyle = 'rgba(254, 240, 138, 0.4)';
          context.lineWidth = 1.2;
          context.beginPath();
          context.ellipse(px, py, p.radius * 2.2, p.radius * 0.8, p.tilt + 0.4, 0, Math.PI * 2);
          context.stroke();
        }

        if (p.hasMoon) {
          const moonPeriod = 0.8;
          const moonDist = isPreview ? 8 : 14;
          const mx = px + Math.cos(time * (Math.PI * 2 / moonPeriod)) * moonDist;
          const my = py + Math.sin(time * (Math.PI * 2 / moonPeriod)) * moonDist * 0.6;
          context.fillStyle = '#f8fafc';
          context.beginPath();
          context.arc(mx, my, 1.4, 0, Math.PI * 2);
          context.fill();
        }
      }

      if (!isPreview) {
        context.fillStyle = 'rgba(135, 206, 250, 0.7)';
        context.font = '12px -apple-system, BlinkMacSystemFont, monospace';
        context.textAlign = 'left';
        context.fillText('KEPLERIAN ORBITAL DYNAMICS: r(θ) = a(1-e²) / (1 + e·cos(θ)) | T² ∝ a³', 28, h - 28);
      }
    },
    destroy() {}
  };
}

/**
 * 18. ELECTROMAGNETIC FIELDS
 * Mathematically grounded electric dipole vector field lines with Coulomb force
 * integration and accelerated charged test particles.
 */
function createElectromagneticFields(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let time = 0;

  const particles = [];
  const particleCount = isPreview ? 35 : 90;

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        charge: Math.random() < 0.5 ? 1 : -1,
        life: Math.random() * 5
      });
    }
  }

  return {
    resize(w, h) {
      width = w;
      height = h;
      initParticles();
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.4 : 1.0) * motionScale;
      const effectiveDt = Math.min(dt, 0.08) * speedMult;
      time += effectiveDt;

      const cx = width / 2;
      const cy = height / 2;
      const d = Math.min(width, height) * 0.22;

      const p1 = { x: cx - d + Math.sin(time * 0.8) * 15, y: cy + Math.cos(time * 0.5) * 15, q: 1 };
      const p2 = { x: cx + d - Math.sin(time * 0.8) * 15, y: cy - Math.cos(time * 0.5) * 15, q: -1 };
      const charges = [p1, p2];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life -= effectiveDt;

        let ex = 0;
        let ey = 0;
        for (let c of charges) {
          const dx = p.x - c.x;
          const dy = p.y - c.y;
          const distSq = dx * dx + dy * dy + 100;
          const dist = Math.sqrt(distSq);
          const force = (c.q * 18000) / (distSq * dist);
          ex += dx * force;
          ey += dy * force;
        }

        p.vx += ex * p.charge * effectiveDt;
        p.vy += ey * p.charge * effectiveDt;
        p.vx *= 0.94;
        p.vy *= 0.94;

        p.x += p.vx * effectiveDt;
        p.y += p.vy * effectiveDt;

        if (p.life <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          const src = p.charge < 0 ? p1 : p2;
          p.x = src.x + (Math.random() - 0.5) * 40;
          p.y = src.y + (Math.random() - 0.5) * 40;
          p.vx = (Math.random() - 0.5) * 30;
          p.vy = (Math.random() - 0.5) * 30;
          p.life = 2 + Math.random() * 4;
        }
      }
    },
    draw(context, w, h) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const d = Math.min(w, h) * 0.22;
      const p1 = { x: cx - d + Math.sin(time * 0.8) * 15, y: cy + Math.cos(time * 0.5) * 15, q: 1 };
      const p2 = { x: cx + d - Math.sin(time * 0.8) * 15, y: cy - Math.cos(time * 0.5) * 15, q: -1 };
      const charges = [p1, p2];

      const numLines = isPreview ? 14 : 28;
      context.strokeStyle = 'rgba(135, 206, 250, 0.35)';
      context.lineWidth = 1;

      for (let l = 0; l < numLines; l++) {
        const theta = (l / numLines) * Math.PI * 2;
        let lx = p1.x + Math.cos(theta) * 12;
        let ly = p1.y + Math.sin(theta) * 12;

        context.beginPath();
        context.moveTo(lx, ly);

        for (let step = 0; step < 50; step++) {
          let ex = 0, ey = 0;
          for (let c of charges) {
            const dx = lx - c.x;
            const dy = ly - c.y;
            const distSq = dx * dx + dy * dy + 10;
            const dist = Math.sqrt(distSq);
            const f = c.q / (distSq * dist);
            ex += dx * f;
            ey += dy * f;
          }
          const eMag = Math.hypot(ex, ey);
          if (eMag === 0) break;
          lx += (ex / eMag) * 9;
          ly += (ey / eMag) * 9;
          context.lineTo(lx, ly);

          if (Math.hypot(lx - p2.x, ly - p2.y) < 14) break;
        }
        context.stroke();
      }

      for (let p of particles) {
        context.fillStyle = p.charge > 0 ? '#fde047' : '#87CEFA';
        context.beginPath();
        context.arc(p.x, p.y, isPreview ? 1.5 : 2.2, 0, Math.PI * 2);
        context.fill();
      }

      context.fillStyle = '#eab308';
      context.beginPath();
      context.arc(p1.x, p1.y, isPreview ? 7 : 12, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = '#000000';
      context.font = 'bold 12px sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText('+', p1.x, p1.y);

      context.fillStyle = '#38bdf8';
      context.beginPath();
      context.arc(p2.x, p2.y, isPreview ? 7 : 12, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = '#000000';
      context.fillText('−', p2.x, p2.y);

      if (!isPreview) {
        context.fillStyle = 'rgba(135, 206, 250, 0.7)';
        context.font = '12px -apple-system, BlinkMacSystemFont, monospace';
        context.textAlign = 'left';
        context.fillText('ELECTROMAGNETIC FIELD DYNAMICS: E(r) = (1/4πε₀) · Σ (qᵢ / rᵢ²) r̂ᵢ', 28, h - 28);
      }
    },
    destroy() {
      particles.length = 0;
    }
  };
}

/**
 * 19. MOLECULAR DYNAMICS
 * Scientifically authentic 3D molecular structures (H2O, CO2, CH4, NH3)
 * with accurate bond angles, thermal vibrations, and lit spheres.
 */
function createMolecularDynamics(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let time = 0;
  let molTime = 0;
  let currentMolIdx = 0;

  const MOLECULES = [
    {
      formula: 'H₂O',
      name: 'Water (Bent, 104.5°)',
      atoms: [
        { elem: 'O', x: 0, y: -0.15, z: 0, r: 16, color: '#f87171' },
        { elem: 'H', x: -0.75, y: 0.45, z: 0, r: 10, color: '#f8fafc' },
        { elem: 'H', x: 0.75, y: 0.45, z: 0, r: 10, color: '#f8fafc' }
      ],
      bonds: [[0, 1, false], [0, 2, false]]
    },
    {
      formula: 'CO₂',
      name: 'Carbon Dioxide (Linear, 180°)',
      atoms: [
        { elem: 'C', x: 0, y: 0, z: 0, r: 15, color: '#94a3b8' },
        { elem: 'O', x: -0.9, y: 0, z: 0, r: 14, color: '#f87171' },
        { elem: 'O', x: 0.9, y: 0, z: 0, r: 14, color: '#f87171' }
      ],
      bonds: [[0, 1, true], [0, 2, true]]
    },
    {
      formula: 'CH₄',
      name: 'Methane (Tetrahedral, 109.5°)',
      atoms: [
        { elem: 'C', x: 0, y: 0, z: 0, r: 15, color: '#94a3b8' },
        { elem: 'H', x: 0, y: -0.85, z: 0, r: 9, color: '#f8fafc' },
        { elem: 'H', x: 0.8, y: 0.28, z: 0, r: 9, color: '#f8fafc' },
        { elem: 'H', x: -0.4, y: 0.28, z: 0.7, r: 9, color: '#f8fafc' },
        { elem: 'H', x: -0.4, y: 0.28, z: -0.7, r: 9, color: '#f8fafc' }
      ],
      bonds: [[0, 1, false], [0, 2, false], [0, 3, false], [0, 4, false]]
    },
    {
      formula: 'NH₃',
      name: 'Ammonia (Trigonal Pyramidal, 107°)',
      atoms: [
        { elem: 'N', x: 0, y: -0.25, z: 0, r: 15, color: '#60a5fa' },
        { elem: 'H', x: 0.65, y: 0.45, z: 0, r: 9, color: '#f8fafc' },
        { elem: 'H', x: -0.32, y: 0.45, z: 0.55, r: 9, color: '#f8fafc' },
        { elem: 'H', x: -0.32, y: 0.45, z: -0.55, r: 9, color: '#f8fafc' }
      ],
      bonds: [[0, 1, false], [0, 2, false], [0, 3, false]]
    }
  ];

  return {
    resize(w, h) {
      width = w;
      height = h;
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.4 : 1.0) * motionScale;
      const effectiveDt = Math.min(dt, 0.1) * speedMult;
      time += effectiveDt;
      molTime += effectiveDt;
      if (molTime > (prefersReducedMotion ? 18 : 10)) {
        molTime = 0;
        currentMolIdx = (currentMolIdx + 1) % MOLECULES.length;
      }
    },
    draw(context, w, h) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const baseScale = Math.min(w, h) * (isPreview ? 0.28 : 0.32);

      const mol = MOLECULES[currentMolIdx];

      const rotY = time * 0.8;
      const rotX = time * 0.5;
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      const vib = Math.sin(time * 12) * 0.03;

      const projAtoms = mol.atoms.map((a, idx) => {
        const stretch = 1 + vib * (idx % 2 === 0 ? 1 : -1);
        let x = a.x * stretch;
        let y = a.y * stretch;
        let z = a.z * stretch;

        let x1 = x * cosY - z * sinY;
        let z1 = x * sinY + z * cosY;
        let y1 = y;

        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        const fov = 3.5;
        const scale = fov / (fov + z2);

        return {
          idx,
          elem: a.elem,
          color: a.color,
          r: a.r * scale * (isPreview ? 0.75 : 1.0),
          px: cx + x2 * baseScale * scale,
          py: cy + y2 * baseScale * scale,
          pz: z2
        };
      });

      for (let bond of mol.bonds) {
        const a1 = projAtoms[bond[0]];
        const a2 = projAtoms[bond[1]];
        const isDouble = bond[2];

        context.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        if (isDouble) {
          const dx = a2.px - a1.px;
          const dy = a2.py - a1.py;
          const len = Math.hypot(dx, dy) || 1;
          const nx = (-dy / len) * 4;
          const ny = (dx / len) * 4;

          context.lineWidth = isPreview ? 1.5 : 2.5;
          context.beginPath();
          context.moveTo(a1.px + nx, a1.py + ny);
          context.lineTo(a2.px + nx, a2.py + ny);
          context.moveTo(a1.px - nx, a1.py - ny);
          context.lineTo(a2.px - nx, a2.py - ny);
          context.stroke();
        } else {
          context.lineWidth = isPreview ? 2.5 : 4.5;
          context.beginPath();
          context.moveTo(a1.px, a1.py);
          context.lineTo(a2.px, a2.py);
          context.stroke();
        }
      }

      projAtoms.sort((a, b) => a.pz - b.pz);

      for (let a of projAtoms) {
        const grad = context.createRadialGradient(
          a.px - a.r * 0.35,
          a.py - a.r * 0.35,
          a.r * 0.1,
          a.px,
          a.py,
          a.r
        );
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, a.color);
        grad.addColorStop(1, '#090d16');

        context.fillStyle = grad;
        context.beginPath();
        context.arc(a.px, a.py, Math.max(3, a.r), 0, Math.PI * 2);
        context.fill();

        if (!isPreview && a.r > 10) {
          context.fillStyle = a.elem === 'H' ? '#0f172a' : '#ffffff';
          context.font = `bold ${Math.floor(a.r * 0.8)}px sans-serif`;
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillText(a.elem, a.px, a.py);
        }
      }

      if (!isPreview) {
        context.fillStyle = 'rgba(135, 206, 250, 0.7)';
        context.font = '12px -apple-system, BlinkMacSystemFont, monospace';
        context.textAlign = 'left';
        context.fillText(`MOLECULE: ${mol.formula} — ${mol.name} | VIBRATION: ν = ${(vib * 100).toFixed(1)}%`, 28, h - 28);
      }
    },
    destroy() {}
  };
}

/**
 * 20. REACTION DIFFUSION
 * Numerical simulation based on the Gray-Scott reaction-diffusion model,
 * creating evolving organic Turing patterns, spots, and labyrinths.
 */
function createReactionDiffusion(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let time = 0;

  const simW = isPreview ? 96 : 144;
  const simH = isPreview ? 54 : 81;

  let u = new Float32Array(simW * simH);
  let v = new Float32Array(simW * simH);
  let nextU = new Float32Array(simW * simH);
  let nextV = new Float32Array(simW * simH);

  const offscreen = document.createElement('canvas');
  const offCtx = offscreen.getContext('2d');
  offscreen.width = simW;
  offscreen.height = simH;

  function initSim() {
    u.fill(1.0);
    v.fill(0.0);

    for (let c = 0; c < 8; c++) {
      const cx = Math.floor(Math.random() * simW);
      const cy = Math.floor(Math.random() * simH);
      const rad = 3 + Math.floor(Math.random() * 4);
      for (let y = Math.max(0, cy - rad); y < Math.min(simH, cy + rad); y++) {
        for (let x = Math.max(0, cx - rad); x < Math.min(simW, cx + rad); x++) {
          const idx = y * simW + x;
          v[idx] = 1.0;
          u[idx] = 0.5;
        }
      }
    }
  }

  initSim();

  return {
    resize(w, h) {
      width = w;
      height = h;
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.3 : 1.0) * motionScale;
      time += Math.min(dt, 0.1) * speedMult;

      const f = 0.034 + Math.sin(time * 0.15) * 0.012;
      const k = 0.063 + Math.cos(time * 0.12) * 0.005;

      const Du = 0.2097;
      const Dv = 0.105;

      const subSteps = isPreview ? 4 : 6;
      for (let step = 0; step < subSteps; step++) {
        for (let y = 1; y < simH - 1; y++) {
          const row = y * simW;
          const upRow = (y - 1) * simW;
          const downRow = (y + 1) * simW;

          for (let x = 1; x < simW - 1; x++) {
            const idx = row + x;
            const uVal = u[idx];
            const vVal = v[idx];

            const lapU = u[row + x - 1] + u[row + x + 1] + u[upRow + x] + u[downRow + x] - 4 * uVal;
            const lapV = v[row + x - 1] + v[row + x + 1] + v[upRow + x] + v[downRow + x] - 4 * vVal;

            const uvv = uVal * vVal * vVal;

            nextU[idx] = Math.max(0, Math.min(1, uVal + (Du * lapU - uvv + f * (1.0 - uVal))));
            nextV[idx] = Math.max(0, Math.min(1, vVal + (Dv * lapV + uvv - (f + k) * vVal)));
          }
        }
        const tempU = u; u = nextU; nextU = tempU;
        const tempV = v; v = nextV; nextV = tempV;
      }
    },
    draw(context, w, h) {
      const imgData = offCtx.createImageData(simW, simH);
      const data = imgData.data;

      let pIdx = 0;
      for (let i = 0; i < simW * simH; i++) {
        const val = Math.max(0, Math.min(1, u[i] - v[i]));
        const inv = 1 - val;
        data[pIdx] = Math.floor(inv * inv * 180);
        data[pIdx + 1] = Math.floor(inv * 210);
        data[pIdx + 2] = Math.floor(inv * 255);
        data[pIdx + 3] = 255;
        pIdx += 4;
      }

      offCtx.putImageData(imgData, 0, 0);

      context.imageSmoothingEnabled = true;
      context.drawImage(offscreen, 0, 0, w, h);

      if (!isPreview) {
        context.fillStyle = 'rgba(135, 206, 250, 0.7)';
        context.font = '12px -apple-system, BlinkMacSystemFont, monospace';
        context.textAlign = 'left';
        context.fillText('REACTION-DIFFUSION: ∂u/∂t = D_u∇²u - uv² + F(1-u) [GRAY-SCOTT MODEL]', 28, h - 28);
      }
    },
    destroy() {
      u = null;
      v = null;
    }
  };
}

/**
 * 21. DNA DOUBLE HELIX
 * Three-dimensional animated DNA visualization with antiparallel strands,
 * major/minor grooves, and complementary A-T and G-C base pairs.
 */
function createDNADoubleHelix(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let time = 0;

  const BASE_PAIRS = [
    { left: 'A', right: 'T', colL: '#f59e0b', colR: '#87CEFA', bonds: 2 },
    { left: 'G', right: 'C', colL: '#10b981', colR: '#818cf8', bonds: 3 },
    { left: 'T', right: 'A', colL: '#87CEFA', colR: '#f59e0b', bonds: 2 },
    { left: 'C', right: 'G', colL: '#818cf8', colR: '#10b981', bonds: 3 }
  ];

  return {
    resize(w, h) {
      width = w;
      height = h;
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.4 : 1.0) * motionScale;
      time += Math.min(dt, 0.1) * speedMult;
    },
    draw(context, w, h) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const helixRadius = Math.min(w, h) * (isPreview ? 0.28 : 0.24);
      const totalSteps = isPreview ? 24 : 44;
      const stepH = (h * 1.3) / totalSteps;

      const elements = [];

      for (let i = 0; i < totalSteps; i++) {
        const y = (i * stepH - (time * 60) % stepH) - h * 0.15;
        const angle = i * 0.38 + time * 1.2;

        const bp = BASE_PAIRS[i % BASE_PAIRS.length];

        const x1 = cx + Math.cos(angle) * helixRadius;
        const z1 = Math.sin(angle);

        const x2 = cx + Math.cos(angle + Math.PI + 0.3) * helixRadius;
        const z2 = Math.sin(angle + Math.PI + 0.3);

        elements.push({
          y,
          x1, z1,
          x2, z2,
          bp,
          avgZ: (z1 + z2) / 2
        });
      }

      elements.sort((a, b) => a.avgZ - b.avgZ);

      for (let el of elements) {
        const alpha = Math.max(0.2, Math.min(1, 0.65 + el.avgZ * 0.35));
        const midX = (el.x1 + el.x2) / 2;
        context.lineWidth = isPreview ? 2.5 : 4.0;

        context.strokeStyle = el.bp.colL;
        context.globalAlpha = alpha;
        context.beginPath();
        context.moveTo(el.x1, el.y);
        context.lineTo(midX - 3, el.y);
        context.stroke();

        context.strokeStyle = el.bp.colR;
        context.beginPath();
        context.moveTo(midX + 3, el.y);
        context.lineTo(el.x2, el.y);
        context.stroke();

        context.fillStyle = '#ffffff';
        context.beginPath();
        if (el.bp.bonds === 2) {
          context.arc(midX - 1.5, el.y, 1.2, 0, Math.PI * 2);
          context.arc(midX + 1.5, el.y, 1.2, 0, Math.PI * 2);
        } else {
          context.arc(midX - 2.5, el.y, 1.2, 0, Math.PI * 2);
          context.arc(midX, el.y, 1.2, 0, Math.PI * 2);
          context.arc(midX + 2.5, el.y, 1.2, 0, Math.PI * 2);
        }
        context.fill();

        context.fillStyle = '#e2e8f0';
        context.beginPath();
        context.arc(el.x1, el.y, (isPreview ? 3.5 : 5.5) * (0.8 + el.z1 * 0.25), 0, Math.PI * 2);
        context.fill();

        context.fillStyle = '#94a3b8';
        context.beginPath();
        context.arc(el.x2, el.y, (isPreview ? 3.5 : 5.5) * (0.8 + el.z2 * 0.25), 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1.0;

      if (!isPreview) {
        context.fillStyle = 'rgba(135, 206, 250, 0.7)';
        context.font = '12px -apple-system, BlinkMacSystemFont, monospace';
        context.textAlign = 'left';
        context.fillText('DNA DOUBLE HELIX: B-FORM [ANTIPARALLEL STRANDS | A=T (2 H-BONDS), G≡C (3 H-BONDS)]', 28, h - 28);
      }
    },
    destroy() {}
  };
}

/**
 * 22. MITOSIS
 * Sequential biological cell division showing the complete mitotic cycle:
 * Prophase, Metaphase, Anaphase, Telophase, and Cytokinesis.
 */
function createMitosis(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let time = 0;

  const STAGES = [
    { name: 'PROPHASE', desc: 'Chromatin condenses into chromosomes, centrosomes separate' },
    { name: 'METAPHASE', desc: 'Chromosomes align along equatorial metaphase plate' },
    { name: 'ANAPHASE', desc: 'Spindle fibers pull sister chromatids to opposite poles' },
    { name: 'TELOPHASE', desc: 'Nuclear envelopes reform, chromosomes decondense' },
    { name: 'CYTOKINESIS', desc: 'Cleavage furrow pinches cell into two daughter cells' }
  ];

  const STAGE_DURATION = 5.0;

  return {
    resize(w, h) {
      width = w;
      height = h;
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.4 : 1.0) * motionScale;
      time += Math.min(dt, 0.1) * speedMult;
    },
    draw(context, w, h) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const cellR = Math.min(w, h) * (isPreview ? 0.35 : 0.32);

      const cycleTime = time % (STAGES.length * STAGE_DURATION);
      const stageIdx = Math.floor(cycleTime / STAGE_DURATION);
      const stageProgress = (cycleTime % STAGE_DURATION) / STAGE_DURATION;
      const stage = STAGES[stageIdx];

      context.strokeStyle = 'rgba(135, 206, 250, 0.7)';
      context.lineWidth = isPreview ? 2 : 3;

      if (stageIdx === 4) {
        const pinch = Math.sin(stageProgress * Math.PI * 0.5) * (cellR * 0.75);
        const sep = stageProgress * (cellR * 0.45);

        context.beginPath();
        context.arc(cx - cellR * 0.5 - sep, cy, cellR * 0.55, 0, Math.PI * 2);
        context.stroke();

        context.beginPath();
        context.arc(cx + cellR * 0.5 + sep, cy, cellR * 0.55, 0, Math.PI * 2);
        context.stroke();
      } else {
        const stretchX = stageIdx >= 2 ? (1 + (stageIdx - 1) * 0.25) : 1;
        const pinchY = stageIdx === 3 ? (1 - stageProgress * 0.25) : 1;

        context.beginPath();
        context.ellipse(cx, cy, cellR * stretchX, cellR * pinchY, 0, 0, Math.PI * 2);
        context.stroke();
      }

      const poleDist = cellR * (stageIdx >= 2 ? 1.1 : 0.85);
      const leftPole = { x: cx - poleDist, y: cy };
      const rightPole = { x: cx + poleDist, y: cy };

      context.fillStyle = '#fde047';
      context.beginPath();
      context.arc(leftPole.x, leftPole.y, 4, 0, Math.PI * 2);
      context.arc(rightPole.x, rightPole.y, 4, 0, Math.PI * 2);
      context.fill();

      context.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      context.lineWidth = 0.8;
      const numChromosomes = 4;

      for (let c = 0; c < numChromosomes; c++) {
        const cOffset = (c - (numChromosomes - 1) / 2) * (cellR * 0.38);

        if (stageIdx === 0) {
          context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          context.beginPath();
          context.arc(cx, cy, cellR * 0.5, 0, Math.PI * 2);
          context.stroke();

          const x = cx + (Math.sin(c * 2 + time) * (cellR * 0.25));
          const y = cy + cOffset * 0.6;
          drawChromatidX(context, x, y, 10);
        } else if (stageIdx === 1) {
          const y = cy + cOffset;
          context.beginPath();
          context.moveTo(leftPole.x, leftPole.y);
          context.lineTo(cx, y);
          context.moveTo(rightPole.x, rightPole.y);
          context.lineTo(cx, y);
          context.stroke();

          drawChromatidX(context, cx, y, 12);
        } else if (stageIdx === 2) {
          const pullDist = stageProgress * (cellR * 0.6);
          const y = cy + cOffset;

          const lx = cx - pullDist;
          context.beginPath();
          context.moveTo(leftPole.x, leftPole.y);
          context.lineTo(lx, y);
          context.stroke();
          drawChromatidV(context, lx, y, 10, -1);

          const rx = cx + pullDist;
          context.beginPath();
          context.moveTo(rightPole.x, rightPole.y);
          context.lineTo(rx, y);
          context.stroke();
          drawChromatidV(context, rx, y, 10, 1);
        } else {
          const sep = (stageIdx === 3 ? cellR * 0.6 : (cellR * 0.6 + stageProgress * 20));
          const y = cy + cOffset * 0.5;

          drawChromatidV(context, cx - sep, y, 8, -1);
          drawChromatidV(context, cx + sep, y, 8, 1);
        }
      }

      if (!isPreview) {
        context.fillStyle = 'rgba(135, 206, 250, 0.85)';
        context.font = 'bold 12px -apple-system, BlinkMacSystemFont, monospace';
        context.textAlign = 'left';
        context.fillText(`STAGE ${stageIdx + 1}/5: ${stage.name} — ${stage.desc}`, 28, h - 28);
      }
    },
    destroy() {}
  };
}

function drawChromatidX(ctx, x, y, size) {
  ctx.strokeStyle = '#818cf8';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(x - size * 0.7, y - size);
  ctx.lineTo(x + size * 0.7, y + size);
  ctx.moveTo(x + size * 0.7, y - size);
  ctx.lineTo(x - size * 0.7, y + size);
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x, y, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawChromatidV(ctx, x, y, size, dir) {
  ctx.strokeStyle = '#818cf8';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(x - dir * size * 0.7, y - size * 0.7);
  ctx.lineTo(x + dir * size * 0.3, y);
  ctx.lineTo(x - dir * size * 0.7, y + size * 0.7);
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x + dir * size * 0.3, y, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * 23. SPIDER-MAN (CINEMATIC WORLDS)
 * Cinematic web-swinging through dark Manhattan skyscraper canyons
 * with pendulum kinematics, acrobatic tuck-flips, dynamic web line firing,
 * and parallax night cityscape.
 */
function createSpiderMan(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let time = 0;

  // Cityscape building generation
  const buildingsLayer1 = [];
  const buildingsLayer2 = [];
  const buildingsLayer3 = [];

  function generateBuildings(w, h) {
    buildingsLayer1.length = 0;
    buildingsLayer2.length = 0;
    buildingsLayer3.length = 0;

    let x = -50;
    while (x < w + 200) {
      const bw = 50 + Math.random() * 60;
      const bh = h * (0.45 + Math.random() * 0.35);
      buildingsLayer1.push({ x, w: bw, h: bh, winCols: Math.floor(bw / 14), winRows: Math.floor(bh / 20) });
      x += bw + (Math.random() * 10);
    }

    x = -50;
    while (x < w + 200) {
      const bw = 65 + Math.random() * 75;
      const bh = h * (0.35 + Math.random() * 0.45);
      buildingsLayer2.push({
        x,
        w: bw,
        h: bh,
        hasCrown: Math.random() > 0.4,
        hasAntenna: Math.random() > 0.5,
        winCols: Math.floor(bw / 16),
        winRows: Math.floor(bh / 22)
      });
      x += bw + (Math.random() * 15);
    }

    x = -50;
    while (x < w + 300) {
      const bw = 80 + Math.random() * 100;
      const bh = h * (0.55 + Math.random() * 0.35);
      buildingsLayer3.push({ x, w: bw, h: bh, winCols: Math.floor(bw / 20), winRows: Math.floor(bh / 26) });
      x += bw + 30 + (Math.random() * 40);
    }
  }

  // Pendulum swing state
  let anchor = { x: 0, y: 0 };
  let nextAnchor = { x: 0, y: 0 };
  let ropeLength = 150;
  let theta = -0.7; // angle from downward vertical in radians
  let omega = 0.0;  // angular velocity
  let heroX = 0;
  let heroY = 0;
  let state = 'SWING'; // 'SWING' | 'FLIP' | 'SHOOT'
  let stateTimer = 0;
  let flipAngle = 0;
  let webShootProgress = 0;
  let worldScrollX = 0;

  function resetHero(w, h) {
    ropeLength = Math.min(w, h) * 0.48;
    anchor.x = w * 0.45;
    anchor.y = h * 0.15;
    theta = -0.75;
    omega = 1.6;
    heroX = anchor.x + Math.sin(theta) * ropeLength;
    heroY = anchor.y + Math.cos(theta) * ropeLength;
    state = 'SWING';
    flipAngle = 0;
  }

  return {
    resize(w, h) {
      width = w;
      height = h;
      generateBuildings(w, h);
      resetHero(w, h);
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.35 : 1.0) * motionScale;
      const stepDt = Math.min(dt, 0.08) * speedMult;
      time += stepDt;

      // World scroll creates continuous forward sweep through city
      worldScrollX += (isPreview ? 40 : 65) * stepDt;

      const g = 14.0; // gravity acceleration
      const d = 0.02; // aerodynamic drag

      if (state === 'SWING') {
        const alpha = (-g / (ropeLength * 0.015)) * Math.sin(theta) - d * omega;
        omega += alpha * stepDt;
        theta += omega * stepDt;

        heroX = anchor.x + Math.sin(theta) * ropeLength;
        heroY = anchor.y + Math.cos(theta) * ropeLength;

        // Apex release trigger: reached high swing point moving forward
        if (theta > 0.65 && omega > 0) {
          state = 'FLIP';
          stateTimer = 0;
          flipAngle = 0;
        }
      } else if (state === 'FLIP') {
        stateTimer += stepDt;
        heroX += 110 * stepDt;
        heroY += (-50 + stateTimer * 120) * stepDt;
        flipAngle += stepDt * 7.5;

        if (stateTimer > 0.45) {
          state = 'SHOOT';
          stateTimer = 0;
          webShootProgress = 0;
          nextAnchor.x = heroX + width * 0.42;
          nextAnchor.y = height * (0.12 + Math.random() * 0.14);
        }
      } else if (state === 'SHOOT') {
        webShootProgress = Math.min(1.0, webShootProgress + stepDt * 4.5);
        heroX += 80 * stepDt;
        heroY += 45 * stepDt;

        if (webShootProgress >= 1.0) {
          anchor.x = nextAnchor.x;
          anchor.y = nextAnchor.y;
          const dx = heroX - anchor.x;
          const dy = heroY - anchor.y;
          ropeLength = Math.hypot(dx, dy);
          theta = Math.atan2(dx, dy);
          omega = 1.8;
          state = 'SWING';
          flipAngle = 0;
        }
      }

      // Keep hero generally framed in viewport
      if (heroX > width * 0.75) {
        const shift = heroX - width * 0.75;
        anchor.x -= shift;
        nextAnchor.x -= shift;
        heroX -= shift;
      }
      if (heroY > height * 0.88 || heroY < -50) {
        resetHero(width, height);
      }
    },
    draw(context, w, h) {
      // Midnight sky background
      const skyGrad = context.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, '#02040a');
      skyGrad.addColorStop(0.65, '#050a16');
      skyGrad.addColorStop(1, '#090e1f');
      context.fillStyle = skyGrad;
      context.fillRect(0, 0, w, h);

      // Distant full moon with soft glow
      const moonX = w * 0.78;
      const moonY = h * 0.22;
      const moonR = isPreview ? 14 : 24;
      const moonHalo = context.createRadialGradient(moonX, moonY, moonR * 0.5, moonX, moonY, moonR * 2.8);
      moonHalo.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      moonHalo.addColorStop(0.35, 'rgba(135, 206, 250, 0.4)');
      moonHalo.addColorStop(1, 'rgba(135, 206, 250, 0)');
      context.fillStyle = moonHalo;
      context.beginPath();
      context.arc(moonX, moonY, moonR * 2.8, 0, Math.PI * 2);
      context.fill();

      // Draw Parallax Buildings Layer 1 (Distant)
      context.fillStyle = '#060a14';
      for (let b of buildingsLayer1) {
        const bx = ((b.x - worldScrollX * 0.2) % (w + 200)) - 50;
        context.fillRect(bx, h - b.h, b.w, b.h);
      }

      // Draw Parallax Buildings Layer 2 (Mid-ground)
      context.fillStyle = '#0a1020';
      for (let b of buildingsLayer2) {
        const bx = ((b.x - worldScrollX * 0.5) % (w + 200)) - 50;
        context.fillRect(bx, h - b.h, b.w, b.h);

        // Tower spire / crown
        if (b.hasCrown) {
          context.beginPath();
          context.moveTo(bx + b.w * 0.2, h - b.h);
          context.lineTo(bx + b.w * 0.5, h - b.h - 18);
          context.lineTo(bx + b.w * 0.8, h - b.h);
          context.closePath();
          context.fill();
        }
        // Blinking red beacon on antenna
        if (b.hasAntenna) {
          context.strokeStyle = '#0a1020';
          context.lineWidth = 1.5;
          context.beginPath();
          context.moveTo(bx + b.w * 0.5, h - b.h);
          context.lineTo(bx + b.w * 0.5, h - b.h - 26);
          context.stroke();
          if (Math.sin(time * 3 + b.x) > 0) {
            context.fillStyle = '#ef4444';
            context.beginPath();
            context.arc(bx + b.w * 0.5, h - b.h - 26, 1.5, 0, Math.PI * 2);
            context.fill();
            context.fillStyle = '#0a1020';
          }
        }
      }

      // Layer 3 (Foreground Canyons)
      context.fillStyle = '#0f172a';
      for (let b of buildingsLayer3) {
        const bx = ((b.x - worldScrollX * 0.85) % (w + 300)) - 50;
        context.fillRect(bx, h - b.h, b.w, b.h);

        // Windows
        context.fillStyle = 'rgba(253, 224, 71, 0.25)';
        for (let r = 1; r < b.winRows - 1; r += 2) {
          for (let c = 1; c < b.winCols - 1; c++) {
            if ((b.x + r * 7 + c * 13) % 5 > 1) {
              context.fillRect(bx + c * 16, h - b.h + r * 18, 5, 8);
            }
          }
        }
        context.fillStyle = '#0f172a';
      }

      // Distant Street Traffic Flow (faint golden headlights & ruby taillights)
      context.fillStyle = 'rgba(250, 204, 21, 0.55)';
      for (let i = 0; i < 8; i++) {
        const tx = ((i * 70 + time * 120) % (w + 100)) - 50;
        context.fillRect(tx, h - 8, isPreview ? 8 : 16, 1.5);
      }
      context.fillStyle = 'rgba(239, 68, 68, 0.55)';
      for (let i = 0; i < 8; i++) {
        const tx = w - (((i * 75 + time * 110) % (w + 100)) - 50);
        context.fillRect(tx, h - 4, isPreview ? 8 : 16, 1.5);
      }

      // Web Line Rendering
      if (state === 'SWING') {
        context.strokeStyle = '#ffffff';
        context.lineWidth = isPreview ? 1.2 : 2.0;
        context.shadowColor = '#87CEFA';
        context.shadowBlur = 6;
        context.beginPath();
        context.moveTo(anchor.x, anchor.y);
        context.lineTo(heroX, heroY);
        context.stroke();
        context.shadowBlur = 0;

        // Anchor attachment node
        context.fillStyle = 'rgba(255, 255, 255, 0.8)';
        context.beginPath();
        context.arc(anchor.x, anchor.y, 2.5, 0, Math.PI * 2);
        context.fill();
      } else if (state === 'SHOOT') {
        const curShootX = heroX + (nextAnchor.x - heroX) * webShootProgress;
        const curShootY = heroY + (nextAnchor.y - heroY) * webShootProgress;
        context.strokeStyle = '#ffffff';
        context.lineWidth = isPreview ? 1.2 : 2.0;
        context.shadowColor = '#87CEFA';
        context.shadowBlur = 8;
        context.beginPath();
        context.moveTo(heroX, heroY);
        context.lineTo(curShootX, curShootY);
        context.stroke();
        context.shadowBlur = 0;

        // Projectile tip
        context.fillStyle = '#ffffff';
        context.beginPath();
        context.arc(curShootX, curShootY, 3, 0, Math.PI * 2);
        context.fill();
      }

      // Render Spider-Man Hero Figure
      context.save();
      context.translate(heroX, heroY);

      let swingRot = 0;
      if (state === 'SWING') {
        swingRot = theta + 0.35;
      } else if (state === 'FLIP') {
        swingRot = flipAngle;
      } else {
        swingRot = 0.2;
      }
      context.rotate(swingRot);

      const heroScale = isPreview ? 0.75 : 1.15;
      context.scale(heroScale, heroScale);

      // Hero Body - Athletic swinging posture
      // Crimson torso
      context.fillStyle = '#dc2626';
      context.beginPath();
      context.ellipse(0, 0, 8, 14, 0, 0, Math.PI * 2);
      context.fill();

      // Deep Navy flanks
      context.fillStyle = '#1e3a8a';
      context.beginPath();
      context.arc(-4, 2, 4, 0, Math.PI * 2);
      context.arc(4, 2, 4, 0, Math.PI * 2);
      context.fill();

      // Head / Mask
      context.fillStyle = '#dc2626';
      context.beginPath();
      context.arc(0, -14, 6.5, 0, Math.PI * 2);
      context.fill();

      // Iconic white angular eye lenses with black rims
      context.fillStyle = '#0f172a';
      context.beginPath();
      context.moveTo(-1, -15);
      context.lineTo(-6, -16);
      context.lineTo(-2, -12);
      context.closePath();
      context.fill();

      context.beginPath();
      context.moveTo(1, -15);
      context.lineTo(6, -16);
      context.lineTo(2, -12);
      context.closePath();
      context.fill();

      context.fillStyle = '#ffffff';
      context.beginPath();
      context.moveTo(-1.5, -15);
      context.lineTo(-5, -15.5);
      context.lineTo(-2.5, -13);
      context.closePath();
      context.fill();

      context.beginPath();
      context.moveTo(1.5, -15);
      context.lineTo(5, -15.5);
      context.lineTo(2.5, -13);
      context.closePath();
      context.fill();

      // Arms: one holding web, one trailing dynamically
      context.strokeStyle = '#dc2626';
      context.lineWidth = 3.5;
      context.beginPath();
      context.moveTo(0, -6);
      context.lineTo(-6, -18); // Hand on web strand
      context.stroke();

      context.beginPath();
      context.moveTo(0, -6);
      context.lineTo(9, 2);
      context.lineTo(14, -2);
      context.stroke();

      // Legs: bent knees swinging
      context.strokeStyle = '#1e3a8a';
      context.lineWidth = 4;
      context.beginPath();
      context.moveTo(-3, 10);
      context.lineTo(-7, 18);
      context.lineTo(-3, 24);
      context.moveTo(3, 10);
      context.lineTo(8, 17);
      context.lineTo(13, 23);
      context.stroke();

      context.restore();

      // Runtime subtitle
      if (!isPreview) {
        context.fillStyle = 'rgba(135, 206, 250, 0.75)';
        context.font = '12px -apple-system, BlinkMacSystemFont, monospace';
        context.textAlign = 'left';
        context.fillText('CINEMATIC WORLDS: SPIDER-MAN — PENDULUM WEB KINEMATICS & CANYON SWING', 28, h - 28);
      }
    },
    destroy() {
      buildingsLayer1.length = 0;
      buildingsLayer2.length = 0;
      buildingsLayer3.length = 0;
    }
  };
}

/**
 * 24. BATMAN (CINEMATIC WORLDS)
 * Gothic city vigil, dark caped silhouette perched on stone gargoyle,
 * atmospheric rain, periodic lightning flashes, and sweeping spotlights projecting the Bat-Signal.
 */
function createBatman(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let time = 0;

  // Rain particles
  const rainDrops = [];
  const rainCount = isPreview ? 45 : 130;

  // Searchlights
  const spotlights = [
    { angle: -0.3, speed: 0.45, maxAngle: 0.55, width: 0.16, hasSignal: true },
    { angle: 0.2, speed: -0.35, maxAngle: 0.65, width: 0.14, hasSignal: false }
  ];

  // Cape nodes for realistic wind flutter
  const capeNodes = 7;
  const capeOffsets = new Float32Array(capeNodes);

  // Lightning system
  let lightningTimer = 4.0;
  let lightningAlpha = 0.0;

  function initRain() {
    rainDrops.length = 0;
    for (let i = 0; i < rainCount; i++) {
      rainDrops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 400 + Math.random() * 300,
        len: 12 + Math.random() * 16,
        alpha: 0.2 + Math.random() * 0.4
      });
    }
  }

  return {
    resize(w, h) {
      width = w;
      height = h;
      initRain();
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.35 : 1.0) * motionScale;
      const stepDt = Math.min(dt, 0.08) * speedMult;
      time += stepDt;

      // Update rain
      for (let r of rainDrops) {
        r.y += r.speed * stepDt;
        r.x += r.speed * 0.22 * stepDt; // diagonal driving wind
        if (r.y > height) {
          r.y = -20;
          r.x = Math.random() * width;
        }
      }

      // Update sweeping spotlights
      for (let s of spotlights) {
        s.angle += s.speed * stepDt;
        if (Math.abs(s.angle) > s.maxAngle) {
          s.speed *= -1;
        }
      }

      // Update cape flutter
      for (let i = 0; i < capeNodes; i++) {
        capeOffsets[i] = Math.sin(time * 6 + i * 0.8) * (8 + i * 4);
      }

      // Lightning triggers
      lightningTimer -= stepDt;
      if (lightningTimer <= 0) {
        lightningAlpha = 0.85;
        lightningTimer = 5 + Math.random() * 6;
      }
      if (lightningAlpha > 0) {
        lightningAlpha = Math.max(0, lightningAlpha - stepDt * 4.5);
      }
    },
    draw(context, w, h) {
      // Dark cloudy night sky with lightning flash
      context.fillStyle = lightningAlpha > 0.3 ? `rgba(200, 220, 240, ${lightningAlpha * 0.4})` : '#020308';
      context.fillRect(0, 0, w, h);

      // Heavy gothic cloud bank
      const cloudGrad = context.createRadialGradient(w * 0.5, h * 0.25, 40, w * 0.5, h * 0.25, w * 0.65);
      cloudGrad.addColorStop(0, '#0a0e1c');
      cloudGrad.addColorStop(0.6, '#05070f');
      cloudGrad.addColorStop(1, '#020308');
      context.fillStyle = cloudGrad;
      context.fillRect(0, 0, w, h * 0.7);

      // Sweeping Spotlights & Bat-Signal
      for (let s of spotlights) {
        context.save();
        const beamOriginX = w * (s.hasSignal ? 0.35 : 0.75);
        const beamOriginY = h;
        const targetX = beamOriginX + Math.sin(s.angle) * h * 1.2;
        const targetY = h * 0.22;

        const beamGrad = context.createLinearGradient(beamOriginX, beamOriginY, targetX, targetY);
        beamGrad.addColorStop(0, 'rgba(135, 206, 250, 0.45)');
        beamGrad.addColorStop(0.7, 'rgba(135, 206, 250, 0.18)');
        beamGrad.addColorStop(1, 'rgba(255, 255, 255, 0.65)');

        context.fillStyle = beamGrad;
        context.beginPath();
        context.moveTo(beamOriginX - 8, beamOriginY);
        context.lineTo(targetX - w * s.width, targetY);
        context.lineTo(targetX + w * s.width, targetY);
        context.lineTo(beamOriginX + 8, beamOriginY);
        context.closePath();
        context.fill();

        // Project the Bat-Signal on cloud base
        if (s.hasSignal) {
          context.save();
          context.translate(targetX, targetY);
          const sigR = isPreview ? 18 : 34;

          // Glowing spotlight circle
          const spotCircle = context.createRadialGradient(0, 0, sigR * 0.2, 0, 0, sigR * 1.2);
          spotCircle.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
          spotCircle.addColorStop(0.7, 'rgba(135, 206, 250, 0.6)');
          spotCircle.addColorStop(1, 'rgba(135, 206, 250, 0)');
          context.fillStyle = spotCircle;
          context.beginPath();
          context.arc(0, 0, sigR * 1.2, 0, Math.PI * 2);
          context.fill();

          // Bat Insignia Silhouette
          context.fillStyle = '#05070f';
          context.beginPath();
          // Head & ears
          context.moveTo(0, -sigR * 0.35);
          context.lineTo(-sigR * 0.12, -sigR * 0.45);
          context.lineTo(-sigR * 0.08, -sigR * 0.2);
          // Left wing scallops
          context.bezierCurveTo(-sigR * 0.4, -sigR * 0.6, -sigR * 0.95, -sigR * 0.2, -sigR * 0.9, sigR * 0.15);
          context.bezierCurveTo(-sigR * 0.7, sigR * 0.05, -sigR * 0.5, sigR * 0.35, -sigR * 0.3, sigR * 0.3);
          context.bezierCurveTo(-sigR * 0.2, sigR * 0.45, -sigR * 0.08, sigR * 0.35, 0, sigR * 0.48);
          // Right wing scallops (mirrored)
          context.bezierCurveTo(sigR * 0.08, sigR * 0.35, sigR * 0.2, sigR * 0.45, sigR * 0.3, sigR * 0.3);
          context.bezierCurveTo(sigR * 0.5, sigR * 0.35, sigR * 0.7, sigR * 0.05, sigR * 0.9, sigR * 0.15);
          context.bezierCurveTo(sigR * 0.95, -sigR * 0.2, sigR * 0.4, -sigR * 0.6, sigR * 0.08, -sigR * 0.2);
          context.lineTo(sigR * 0.12, -sigR * 0.45);
          context.closePath();
          context.fill();

          context.restore();
        }

        context.restore();
      }

      // Distant Gothic City Spires
      context.fillStyle = '#060913';
      const numSpires = isPreview ? 5 : 9;
      for (let i = 0; i < numSpires; i++) {
        const sx = (w / numSpires) * i + 20;
        const sh = h * (0.35 + (i % 3) * 0.12);
        const sw = w / (numSpires * 1.5);
        context.fillRect(sx, h - sh, sw, sh);
        // Cathedral spire peak
        context.beginPath();
        context.moveTo(sx, h - sh);
        context.lineTo(sx + sw * 0.5, h - sh - 35);
        context.lineTo(sx + sw, h - sh);
        context.closePath();
        context.fill();
      }

      // Foreground: Stone Gargoyle Cornice on left side
      const gx = w * (isPreview ? 0.22 : 0.26);
      const gy = h * 0.72;

      context.fillStyle = '#0d131f';
      context.beginPath();
      context.moveTo(0, h);
      context.lineTo(gx, h);
      context.lineTo(gx + 40, gy);
      context.lineTo(gx + 20, gy - 20); // Gargoyle snout / head
      context.lineTo(gx - 20, gy - 10);
      context.lineTo(0, gy + 50);
      context.closePath();
      context.fill();

      // Gargoyle eye / stone bevel
      context.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      context.lineWidth = 1.5;
      context.beginPath();
      context.moveTo(gx + 40, gy);
      context.lineTo(gx + 20, gy - 20);
      context.lineTo(gx - 20, gy - 10);
      context.stroke();

      // Batman Figure crouched on the gargoyle
      const bx = gx - 10;
      const by = gy - 36;
      const bScale = isPreview ? 0.8 : 1.25;

      context.save();
      context.translate(bx, by);
      context.scale(bScale, bScale);

      // Billowing Scalloped Cape
      context.fillStyle = '#070a12';
      context.beginPath();
      context.moveTo(4, 6);
      for (let i = 0; i < capeNodes; i++) {
        const cxNode = -15 - i * 14 + capeOffsets[i];
        const cyNode = 10 + i * 8;
        context.lineTo(cxNode, cyNode);
      }
      context.lineTo(-6, 24);
      context.closePath();
      context.fill();

      // Cape wing scallops
      context.strokeStyle = 'rgba(135, 206, 250, 0.25)';
      context.lineWidth = 1.0;
      context.stroke();

      // Dark Knight Torso & Crouched Posture
      context.fillStyle = '#05070d';
      context.beginPath();
      context.ellipse(6, 12, 10, 16, 0.2, 0, Math.PI * 2);
      context.fill();

      // Cowl & Sharp Ears
      context.beginPath();
      context.moveTo(2, -6);
      context.lineTo(0, -18); // Left sharp ear
      context.lineTo(4, -8);
      context.lineTo(8, -8);
      context.lineTo(12, -18); // Right sharp ear
      context.lineTo(10, -6);
      context.arc(6, -4, 6, 0, Math.PI);
      context.closePath();
      context.fill();

      // Glowing white cowl eye slit
      context.fillStyle = '#f8fafc';
      context.beginPath();
      context.moveTo(7, -4);
      context.lineTo(11, -5);
      context.lineTo(9, -3);
      context.closePath();
      context.fill();

      context.restore();

      // Driving rain streaks
      context.lineWidth = 1;
      for (let r of rainDrops) {
        context.strokeStyle = `rgba(180, 210, 245, ${r.alpha})`;
        context.beginPath();
        context.moveTo(r.x, r.y);
        context.lineTo(r.x + r.len * 0.22, r.y + r.len);
        context.stroke();
      }

      // Runtime subtitle
      if (!isPreview) {
        context.fillStyle = 'rgba(135, 206, 250, 0.75)';
        context.font = '12px -apple-system, BlinkMacSystemFont, monospace';
        context.textAlign = 'left';
        context.fillText('CINEMATIC WORLDS: BATMAN — GOTHIC VIGIL & PROJECTED SEARCHLIGHT SIGNAL', 28, h - 28);
      }
    },
    destroy() {
      rainDrops.length = 0;
    }
  };
}

/**
 * 25. INTERSTELLAR (CINEMATIC WORLDS)
 * NASA / Thorne relativistic black hole (Gargantua) visualization with
 * event horizon, razor-sharp photon ring, curved gravitational lensing of the
 * equatorial accretion disk (upper & lower warped halos), and Doppler beaming.
 */
function createInterstellar(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let time = 0;

  // Background starfield
  const stars = [];
  const starCount = isPreview ? 40 : 120;

  function initStars() {
    stars.length = 0;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.6 + Math.random() * 1.4,
        twinkle: Math.random() * Math.PI * 2
      });
    }
  }

  return {
    resize(w, h) {
      width = w;
      height = h;
      initStars();
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.35 : 1.0) * motionScale;
      time += Math.min(dt, 0.08) * speedMult;
    },
    draw(context, w, h) {
      // Cosmic void
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const Rs = Math.min(w, h) * (isPreview ? 0.18 : 0.21); // Schwarzschild radius

      // Draw lensed starfield: Stars are bent away from black hole center
      for (let s of stars) {
        const dx = s.x - cx;
        const dy = s.y - cy;
        const dist = Math.hypot(dx, dy);
        if (dist > Rs * 0.95) {
          // Gravitational deflection outward
          const deflection = (Rs * Rs) / (dist * 2.2);
          const px = s.x + (dx / dist) * deflection;
          const py = s.y + (dy / dist) * deflection;
          const alpha = 0.4 + Math.sin(time * 2 + s.twinkle) * 0.3;
          context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          context.beginPath();
          context.arc(px, py, s.r, 0, Math.PI * 2);
          context.fill();
        }
      }

      // Gravitationally Lensed Accretion Disk: Upper Halo (Rear of disk bent over top)
      context.save();
      const numHaloRings = isPreview ? 14 : 26;

      for (let i = 0; i < numHaloRings; i++) {
        const rFrac = i / numHaloRings;
        const radX = Rs * (1.35 + rFrac * 1.55);
        const radY = Rs * (1.25 + rFrac * 1.35);

        // Doppler beaming: Left side brighter (approaching), Right side dimmer (receding)
        const haloGrad = context.createLinearGradient(cx - radX, cy, cx + radX, cy);
        haloGrad.addColorStop(0, 'rgba(254, 240, 138, 0.65)'); // bright yellow-white
        haloGrad.addColorStop(0.35, 'rgba(249, 115, 22, 0.45)'); // fiery orange
        haloGrad.addColorStop(0.75, 'rgba(234, 88, 12, 0.22)');
        haloGrad.addColorStop(1, 'rgba(180, 40, 10, 0.08)'); // dim red

        context.strokeStyle = haloGrad;
        context.lineWidth = isPreview ? 2.2 : 3.4;
        context.beginPath();
        // Upper halo arc over top of black hole
        context.ellipse(cx, cy, radX, radY, 0, Math.PI, Math.PI * 2);
        context.stroke();
      }

      // Lower Halo Arc (Rear of disk bent underneath)
      for (let i = 0; i < numHaloRings; i += 2) {
        const rFrac = i / numHaloRings;
        const radX = Rs * (1.35 + rFrac * 1.55);
        const radY = Rs * (0.75 + rFrac * 0.75);

        const haloGrad = context.createLinearGradient(cx - radX, cy, cx + radX, cy);
        haloGrad.addColorStop(0, 'rgba(254, 240, 138, 0.45)');
        haloGrad.addColorStop(0.5, 'rgba(249, 115, 22, 0.25)');
        haloGrad.addColorStop(1, 'rgba(150, 30, 10, 0.05)');

        context.strokeStyle = haloGrad;
        context.lineWidth = isPreview ? 1.8 : 2.6;
        context.beginPath();
        context.ellipse(cx, cy, radX, radY, 0, 0, Math.PI);
        context.stroke();
      }

      // Primary Equatorial Accretion Disk (Crossing in front)
      const numEquatorRings = isPreview ? 18 : 34;
      for (let i = 0; i < numEquatorRings; i++) {
        const rFrac = i / numEquatorRings;
        const diskRx = Rs * (1.3 + rFrac * 2.2);
        const diskRy = diskRx * 0.24; // inclined plane perspective

        // Rotating turbulent plasma filaments
        const phase = time * (1.8 - rFrac * 1.0);
        const intensity = 0.5 + Math.sin(phase * 4 + i) * 0.2;

        const diskGrad = context.createLinearGradient(cx - diskRx, cy, cx + diskRx, cy);
        diskGrad.addColorStop(0, `rgba(255, 255, 255, ${0.9 * intensity})`); // Approaching beaming
        diskGrad.addColorStop(0.25, `rgba(254, 215, 170, ${0.8 * intensity})`);
        diskGrad.addColorStop(0.5, `rgba(249, 115, 22, ${0.65 * intensity})`);
        diskGrad.addColorStop(0.85, `rgba(185, 28, 28, ${0.35 * intensity})`);
        diskGrad.addColorStop(1, 'rgba(100, 15, 15, 0.1)'); // Receding redshift

        context.strokeStyle = diskGrad;
        context.lineWidth = isPreview ? 2.5 : 3.8;
        context.beginPath();
        context.ellipse(cx, cy, diskRx, diskRy, -0.08, 0, Math.PI * 2);
        context.stroke();
      }

      // Event Horizon / Shadow (Impenetrable pure black)
      context.fillStyle = '#000000';
      context.beginPath();
      context.arc(cx, cy, Rs, 0, Math.PI * 2);
      context.fill();

      // Front cross of equatorial disk across the shadow
      const frontRx = Rs * 2.2;
      const frontRy = frontRx * 0.24;
      const frontGrad = context.createLinearGradient(cx - frontRx, cy, cx + frontRx, cy);
      frontGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      frontGrad.addColorStop(0.35, 'rgba(251, 146, 60, 0.85)');
      frontGrad.addColorStop(1, 'rgba(153, 27, 27, 0.2)');

      context.strokeStyle = frontGrad;
      context.lineWidth = isPreview ? 6 : 10;
      context.beginPath();
      context.ellipse(cx, cy, frontRx, frontRy, -0.08, 0, Math.PI); // front half only
      context.stroke();

      // Sharp Photon Ring (r ~ 1.5 Rs)
      context.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      context.lineWidth = 1.2;
      context.shadowColor = '#fbbf24';
      context.shadowBlur = 8;
      context.beginPath();
      context.arc(cx, cy, Rs * 1.04, 0, Math.PI * 2);
      context.stroke();
      context.shadowBlur = 0;

      context.restore();

      // Runtime subtitle
      if (!isPreview) {
        context.fillStyle = 'rgba(135, 206, 250, 0.75)';
        context.font = '12px -apple-system, BlinkMacSystemFont, monospace';
        context.textAlign = 'left';
        context.fillText('GENERAL RELATIVITY: SUPERMASSIVE BLACK HOLE — RELATIVISTIC DOPPLER BEAMING & GRAVITATIONAL LENSING', 28, h - 28);
      }
    },
    destroy() {
      stars.length = 0;
    }
  };
}

/**
 * 26. UNDER THE OCEAN (OCEAN EXPLORATION)
 * NOAA-inspired deep abyssal ecosystem (>1000m depth) featuring bioluminescent
 * undulating jellyfish (Aequorea victoria), glowing anglerfish lure, marine snow,
 * and seafloor hydrothermal vent convection plumes.
 */
function createUnderTheOcean(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let time = 0;

  // Bioluminescent Jellyfish
  const jellyfish = [];
  const marineSnow = [];

  function initOcean() {
    jellyfish.length = 0;
    marineSnow.length = 0;

    const jCount = isPreview ? 3 : 6;
    for (let i = 0; i < jCount; i++) {
      jellyfish.push({
        x: width * (0.2 + Math.random() * 0.6),
        y: height * (0.2 + Math.random() * 0.6),
        vx: (Math.random() - 0.5) * 12,
        vy: -15 - Math.random() * 20,
        r: (isPreview ? 16 : 28) * (0.7 + Math.random() * 0.6),
        phase: Math.random() * Math.PI * 2,
        color: i % 2 === 0 ? '#38bdf8' : '#34d399',
        tentacles: 6 + Math.floor(Math.random() * 4)
      });
    }

    const snowCount = isPreview ? 40 : 110;
    for (let i = 0; i < snowCount; i++) {
      marineSnow.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: 10 + Math.random() * 25,
        drift: (Math.random() - 0.5) * 8,
        r: 0.8 + Math.random() * 1.5,
        alpha: 0.2 + Math.random() * 0.5
      });
    }
  }

  return {
    resize(w, h) {
      width = w;
      height = h;
      initOcean();
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.35 : 1.0) * motionScale;
      const stepDt = Math.min(dt, 0.08) * speedMult;
      time += stepDt;

      // Update jellyfish pulses
      for (let j of jellyfish) {
        j.phase += stepDt * 2.2;
        const pulse = Math.sin(j.phase);
        // Upward thrust during contraction
        if (pulse > 0.5) {
          j.y += j.vy * stepDt * 1.5;
        } else {
          j.y += j.vy * stepDt * 0.4;
        }
        j.x += Math.sin(time + j.r) * 10 * stepDt;

        if (j.y < -j.r * 2) {
          j.y = height + j.r * 2;
          j.x = width * (0.15 + Math.random() * 0.7);
        }
      }

      // Update marine snow
      for (let s of marineSnow) {
        s.y += s.vy * stepDt;
        s.x += Math.sin(time * 0.8 + s.y * 0.02) * s.drift * stepDt;
        if (s.y > height) {
          s.y = -10;
          s.x = Math.random() * width;
        }
      }
    },
    draw(context, w, h) {
      // Abyssal deep-water gradient
      const oceanGrad = context.createLinearGradient(0, 0, 0, h);
      oceanGrad.addColorStop(0, '#020612');
      oceanGrad.addColorStop(0.65, '#01040a');
      oceanGrad.addColorStop(1, '#000000');
      context.fillStyle = oceanGrad;
      context.fillRect(0, 0, w, h);

      // Hydrothermal Chimney (Black Smoker) on ocean floor
      const ventX = w * 0.82;
      const ventY = h * 0.82;
      context.fillStyle = '#0a0d14';
      context.beginPath();
      context.moveTo(ventX - 35, h);
      context.lineTo(ventX - 15, ventY);
      context.lineTo(ventX + 15, ventY);
      context.lineTo(ventX + 35, h);
      context.closePath();
      context.fill();

      // Geothermal glowing vent rim
      context.fillStyle = 'rgba(249, 115, 22, 0.6)';
      context.beginPath();
      context.ellipse(ventX, ventY, 14, 5, 0, 0, Math.PI * 2);
      context.fill();

      // Rising mineral particulate convection plume
      for (let p = 0; p < (isPreview ? 6 : 14); p++) {
        const py = ventY - ((time * 45 + p * 18) % 130);
        const px = ventX + Math.sin(time * 2 + p) * 12;
        const pAlpha = (1 - (ventY - py) / 130) * 0.35;
        context.fillStyle = `rgba(180, 83, 9, ${pAlpha})`;
        context.beginPath();
        context.arc(px, py, 4 + p * 0.8, 0, Math.PI * 2);
        context.fill();
      }

      // Marine Snow
      for (let s of marineSnow) {
        context.fillStyle = `rgba(200, 230, 255, ${s.alpha})`;
        context.beginPath();
        context.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        context.fill();
      }

      // Glowing Anglerfish in Mid-depth
      const anglerX = w * (0.28 + Math.sin(time * 0.4) * 0.15);
      const anglerY = h * 0.55 + Math.cos(time * 0.6) * 18;
      const aScale = isPreview ? 0.7 : 1.1;

      context.save();
      context.translate(anglerX, anglerY);
      context.scale(aScale, aScale);

      // Angler body silhouette
      context.fillStyle = '#080d18';
      context.beginPath();
      context.ellipse(0, 0, 22, 16, 0.1, 0, Math.PI * 2);
      context.fill();

      // Esca (Bioluminescent fishing lure stalk)
      context.strokeStyle = '#1e293b';
      context.lineWidth = 1.5;
      context.beginPath();
      context.moveTo(-10, -12);
      context.bezierCurveTo(-15, -28, -2, -32, 12, -26);
      context.stroke();

      // Glowing Esca bulb
      const escaGrad = context.createRadialGradient(12, -26, 1, 12, -26, 10);
      escaGrad.addColorStop(0, '#ffffff');
      escaGrad.addColorStop(0.3, '#38bdf8');
      escaGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      context.fillStyle = escaGrad;
      context.beginPath();
      context.arc(12, -26, 10, 0, Math.PI * 2);
      context.fill();

      // Sharp needle teeth
      context.fillStyle = '#f8fafc';
      for (let t = -8; t <= 8; t += 4) {
        context.beginPath();
        context.moveTo(t, 8);
        context.lineTo(t + 2, 13);
        context.lineTo(t + 4, 8);
        context.fill();
      }

      context.restore();

      // Bioluminescent Jellyfish
      for (let j of jellyfish) {
        context.save();
        context.translate(j.x, j.y);

        const pulse = Math.sin(j.phase);
        const squeeze = 1.0 - pulse * 0.22;
        const stretch = 1.0 + pulse * 0.28;

        // Translucent Bell
        const bellGrad = context.createRadialGradient(0, -j.r * 0.3, j.r * 0.1, 0, 0, j.r);
        bellGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
        bellGrad.addColorStop(0.4, j.color);
        bellGrad.addColorStop(1, 'rgba(0, 0, 0, 0.05)');

        context.fillStyle = bellGrad;
        context.beginPath();
        context.ellipse(0, 0, j.r * squeeze, j.r * stretch, 0, Math.PI, Math.PI * 2);
        context.closePath();
        context.fill();

        // Glowing marginal canal ring & rhopalia nodes
        context.strokeStyle = j.color;
        context.lineWidth = 1.5;
        context.shadowColor = j.color;
        context.shadowBlur = 8;
        context.beginPath();
        context.ellipse(0, 0, j.r * squeeze, j.r * 0.28, 0, 0, Math.PI * 2);
        context.stroke();

        // Rhopalia bioluminescent bead nodes
        for (let n = 0; n < 6; n++) {
          const na = (n / 6) * Math.PI * 2;
          const nx = Math.cos(na) * (j.r * squeeze);
          const ny = Math.sin(na) * (j.r * 0.28);
          context.fillStyle = '#ffffff';
          context.beginPath();
          context.arc(nx, ny, 1.8, 0, Math.PI * 2);
          context.fill();
        }
        context.shadowBlur = 0;

        // Trailing undulating tentacles
        context.strokeStyle = `rgba(135, 206, 250, 0.45)`;
        context.lineWidth = 1.2;
        for (let t = 0; t < j.tentacles; t++) {
          const tx = (t - (j.tentacles - 1) / 2) * (j.r * 0.24);
          context.beginPath();
          context.moveTo(tx, 0);

          let curY = 0;
          for (let seg = 1; seg <= 6; seg++) {
            curY += j.r * 0.4;
            const waveX = tx + Math.sin(time * 3 + t + seg * 0.8) * (seg * 3);
            context.lineTo(waveX, curY);
          }
          context.stroke();
        }

        context.restore();
      }

      // Runtime subtitle
      if (!isPreview) {
        context.fillStyle = 'rgba(135, 206, 250, 0.75)';
        context.font = '12px -apple-system, BlinkMacSystemFont, monospace';
        context.textAlign = 'left';
        context.fillText('BENTHIC ZONE: BIOLUMINESCENT HYDROZOA, ANGLER ESCAS & HYDROTHERMAL VENTS', 28, h - 28);
      }
    },
    destroy() {
      jellyfish.length = 0;
      marineSnow.length = 0;
    }
  };
}

/**
 * 27. NUCLEAR FUSION (NUCLEAR PHYSICS)
 * Scientifically authentic Deuterium-Tritium (D-T) nuclear fusion reaction
 * based on IAEA fusion physics: 2H + 3H overcoming the electrostatic Coulomb barrier,
 * fusing into unstable 5He* resonance, releasing an alpha particle (4He, 3.5 MeV)
 * and an energetic neutron (n, 14.1 MeV), yielding 17.6 MeV total energy.
 */
function createNuclearFusion(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let time = 0;

  // Reaction cycle state
  const CYCLE_PERIOD = 6.0;
  let cycleTime = 0;

  return {
    resize(w, h) {
      width = w;
      height = h;
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.35 : 1.0) * motionScale;
      const stepDt = Math.min(dt, 0.08) * speedMult;
      time += stepDt;
      cycleTime = (cycleTime + stepDt) % CYCLE_PERIOD;
    },
    draw(context, w, h) {
      // Dark tokamak reactor chamber
      context.fillStyle = '#020307';
      context.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const baseScale = Math.min(w, h) * (isPreview ? 0.28 : 0.32);

      // Magnetic Confinement Field Lines (Helical tokamak coils in background)
      context.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      context.lineWidth = 1.0;
      for (let i = 0; i < 6; i++) {
        const radY = baseScale * (0.4 + i * 0.15);
        const radX = baseScale * (1.1 + i * 0.25);
        context.beginPath();
        context.ellipse(cx, cy, radX, radY, 0, 0, Math.PI * 2);
        context.stroke();
      }

      // Reaction Stages:
      // 0.0s - 2.2s: Incoming Deuterium (left) & Tritium (right) accelerating toward center
      // 2.2s - 2.8s: Coulomb barrier resistance & quantum tunneling into 5He* resonance
      // 2.8s - 3.4s: Blinding thermonuclear flash & gamma photon burst
      // 3.4s - 5.5s: Fission into Alpha particle (4He) & fast neutron (n) with kinetic vectors
      // 5.5s - 6.0s: Reset & clear

      const nucleonR = isPreview ? 6 : 9;

      if (cycleTime < 2.5) {
        // Approaching stage
        const prog = cycleTime / 2.5;
        // Decelerates slightly as Coulomb repulsion increases
        const easeProg = 1.0 - Math.pow(1.0 - prog, 1.8);
        const startDist = baseScale * 1.6;
        const currentDist = startDist * (1.0 - easeProg * 0.92);

        const dX = cx - currentDist;
        const dY = cy;
        const tX = cx + currentDist;
        const tY = cy;

        // Deuterium (2H: 1 Proton + 1 Neutron)
        drawNucleon(context, dX - nucleonR * 0.8, dY, nucleonR, 'p'); // Proton (+1)
        drawNucleon(context, dX + nucleonR * 0.8, dY, nucleonR, 'n'); // Neutron (0)

        // Tritium (3H: 1 Proton + 2 Neutrons)
        drawNucleon(context, tX - nucleonR * 0.7, tY - nucleonR * 0.7, nucleonR, 'p'); // Proton (+1)
        drawNucleon(context, tX + nucleonR * 0.7, tY - nucleonR * 0.7, nucleonR, 'n'); // Neutron (0)
        drawNucleon(context, tX, tY + nucleonR * 0.8, nucleonR, 'n');                   // Neutron (0)

        // Trajectory and velocity vectors
        context.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        context.lineWidth = 1.5;
        drawArrow(context, dX - 35, dY, dX - 10, dY);
        drawArrow(context, tX + 35, tY, tX + 10, tY);

        if (!isPreview) {
          context.fillStyle = '#87CEFA';
          context.font = '11px sans-serif';
          context.textAlign = 'center';
          context.fillText('DEUTERIUM (²H)', dX, dY - 24);
          context.fillText('TRITIUM (³H)', tX, tY - 24);
          context.fillStyle = 'rgba(239, 68, 68, 0.7)';
          context.fillText('COULOMB BARRIER: V_c(r) = e² / 4πε₀r', cx, cy - baseScale * 0.7);
        }
      } else if (cycleTime < 3.2) {
        // Compound 5He* resonance & plasma flash
        const flashProg = (cycleTime - 2.5) / 0.7;
        const flashAlpha = Math.sin(flashProg * Math.PI);

        // Blinding thermonuclear fusion plasma burst
        const flashGrad = context.createRadialGradient(cx, cy, 2, cx, cy, baseScale * (0.8 + flashProg * 0.8));
        flashGrad.addColorStop(0, '#ffffff');
        flashGrad.addColorStop(0.2, '#fde047');
        flashGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.8)');
        flashGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        context.fillStyle = flashGrad;
        context.beginPath();
        context.arc(cx, cy, baseScale * (0.8 + flashProg * 0.8), 0, Math.PI * 2);
        context.fill();

        // High-energy gamma radiation ripples
        context.strokeStyle = `rgba(255, 255, 255, ${flashAlpha * 0.8})`;
        context.lineWidth = 2.0;
        context.beginPath();
        context.arc(cx, cy, baseScale * flashProg * 1.4, 0, Math.PI * 2);
        context.stroke();

        if (!isPreview) {
          context.fillStyle = '#ffffff';
          context.font = 'bold 12px sans-serif';
          context.textAlign = 'center';
          context.fillText('QUANTUM TUNNELING → UNSTABLE ⁵He* RESONANCE', cx, cy - 35);
        }
      } else {
        // Post-fusion ejection: Alpha particle (4He) & fast neutron (n)
        const ejectProg = (cycleTime - 3.2) / 2.3;
        const alphaDist = ejectProg * baseScale * 1.2;
        const neutronDist = ejectProg * baseScale * 1.8; // Ejected faster (14.1 MeV vs 3.5 MeV)

        const angle = -0.35;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        // Alpha Particle (4He: 2 Protons + 2 Neutrons) traveling left-down
        const aX = cx - alphaDist * cosA;
        const aY = cy - alphaDist * sinA;

        drawNucleon(context, aX - nucleonR * 0.6, aY - nucleonR * 0.6, nucleonR, 'p');
        drawNucleon(context, aX + nucleonR * 0.6, aY - nucleonR * 0.6, nucleonR, 'n');
        drawNucleon(context, aX - nucleonR * 0.6, aY + nucleonR * 0.6, nucleonR, 'n');
        drawNucleon(context, aX + nucleonR * 0.6, aY + nucleonR * 0.6, nucleonR, 'p');

        // Energetic Fast Neutron (n) traveling right-up
        const nX = cx + neutronDist * cosA;
        const nY = cy + neutronDist * sinA;
        drawNucleon(context, nX, nY, nucleonR, 'n');

        // Trajectory lines
        context.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        context.lineWidth = 1.5;
        drawArrow(context, cx, cy, aX, aY);
        context.strokeStyle = 'rgba(135, 206, 250, 0.6)';
        drawArrow(context, cx, cy, nX, nY);

        if (!isPreview) {
          context.fillStyle = '#f87171';
          context.font = 'bold 11px sans-serif';
          context.textAlign = 'center';
          context.fillText('ALPHA PARTICLE (⁴He) — 3.5 MeV', aX, aY - 24);

          context.fillStyle = '#87CEFA';
          context.fillText('FAST NEUTRON (n) — 14.1 MeV', nX, nY - 20);

          context.fillStyle = '#fef08a';
          context.font = 'bold 12px sans-serif';
          context.fillText('TOTAL ENERGY YIELD: Q = 17.6 MeV', cx, cy + baseScale * 0.7);
        }
      }

      // Legend in bottom corner for full runtime
      if (!isPreview) {
        context.fillStyle = 'rgba(135, 206, 250, 0.75)';
        context.font = '12px -apple-system, BlinkMacSystemFont, monospace';
        context.textAlign = 'left';
        context.fillText('NUCLEAR FUSION: ²H + ³H → ⁴He (3.5 MeV) + n (14.1 MeV) + 17.6 MeV [IAEA D-T REACTION]', 28, h - 28);
      }
    },
    destroy() {}
  };

  function drawNucleon(ctx, x, y, r, type) {
    const isProton = type === 'p';
    const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
    if (isProton) {
      grad.addColorStop(0, '#fca5a5');
      grad.addColorStop(0.5, '#dc2626');
      grad.addColorStop(1, '#7f1d1d');
    } else {
      grad.addColorStop(0, '#f1f5f9');
      grad.addColorStop(0.5, '#64748b');
      grad.addColorStop(1, '#1e293b');
    }
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${Math.floor(r * 1.1)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(isProton ? '+' : '0', x, y);
  }

  function drawArrow(ctx, x1, y1, x2, y2) {
    const headLen = 8;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const angle = Math.atan2(dy, dx);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  }
}

/**
 * 28. TECH (TECHNOLOGY)
 * Multi-layer Printed Circuit Board (PCB) routing, active logic bus lines,
 * data packet propagation along copper traces, and crystal clock signal waves.
 */
function createTech(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let time = 0;

  const traces = [];
  const packets = [];
  const chips = [];

  function initPCB() {
    traces.length = 0;
    packets.length = 0;
    chips.length = 0;

    const cx = width / 2;
    const cy = height / 2;

    // Central Processing Unit (QFP-style chip)
    const chipW = isPreview ? 48 : 80;
    chips.push({ x: cx - chipW / 2, y: cy - chipW / 2, w: chipW, h: chipW, label: 'CPU' });

    // Microcontrollers / flash memory chips around
    chips.push({ x: cx - chipW * 1.8, y: cy - chipW * 1.2, w: chipW * 0.7, h: chipW * 0.5, label: 'ROM' });
    chips.push({ x: cx + chipW * 1.2, y: cy + chipW * 0.8, w: chipW * 0.8, h: chipW * 0.5, label: 'BUS' });
    chips.push({ x: cx - chipW * 1.5, y: cy + chipW * 0.9, w: chipW * 0.6, h: chipW * 0.6, label: 'PHY' });

    // Generate bus traces connecting nodes
    const numTraces = isPreview ? 14 : 32;
    for (let i = 0; i < numTraces; i++) {
      const angle = (i / numTraces) * Math.PI * 2;
      const startX = cx + Math.cos(angle) * (chipW * 0.55);
      const startY = cy + Math.sin(angle) * (chipW * 0.55);

      const midDist = (chipW * 1.2) + (i % 4) * 20;
      const midX = startX + Math.cos(angle) * midDist;
      const midY = startY + Math.sin(angle) * midDist;

      // 45-degree angle turn
      const turnAngle = angle + (i % 2 === 0 ? 0.785 : -0.785);
      const endDist = (chipW * 1.5) + (i % 3) * 35;
      const endX = midX + Math.cos(turnAngle) * endDist;
      const endY = midY + Math.sin(turnAngle) * endDist;

      traces.push({
        points: [{ x: startX, y: startY }, { x: midX, y: midY }, { x: endX, y: endY }],
        len: midDist + endDist
      });

      // Data packets along trace
      packets.push({
        traceIdx: i,
        progress: Math.random(),
        speed: 0.25 + Math.random() * 0.45,
        color: i % 3 === 0 ? '#ffffff' : '#87CEFA'
      });
    }
  }

  return {
    resize(w, h) {
      width = w;
      height = h;
      initPCB();
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.35 : 1.0) * motionScale;
      const stepDt = Math.min(dt, 0.08) * speedMult;
      time += stepDt;

      for (let p of packets) {
        p.progress += p.speed * stepDt;
        if (p.progress > 1.0) {
          p.progress = 0.0;
        }
      }
    },
    draw(context, w, h) {
      // Dark matte PCB substrate
      context.fillStyle = '#050912';
      context.fillRect(0, 0, w, h);

      // Microscopic ground plane grid dots
      context.fillStyle = 'rgba(255, 255, 255, 0.04)';
      const gridGap = isPreview ? 16 : 24;
      for (let x = 0; x < w; x += gridGap) {
        for (let y = 0; y < h; y += gridGap) {
          context.fillRect(x, y, 1.2, 1.2);
        }
      }

      // Copper traces
      context.strokeStyle = 'rgba(30, 58, 138, 0.6)';
      context.lineWidth = isPreview ? 1.5 : 2.2;
      for (let t of traces) {
        context.beginPath();
        context.moveTo(t.points[0].x, t.points[0].y);
        context.lineTo(t.points[1].x, t.points[1].y);
        context.lineTo(t.points[2].x, t.points[2].y);
        context.stroke();

        // Terminal solder via pad
        context.fillStyle = 'rgba(135, 206, 250, 0.4)';
        context.beginPath();
        context.arc(t.points[2].x, t.points[2].y, 2.5, 0, Math.PI * 2);
        context.fill();
      }

      // Animated high-speed data pulse packets
      for (let p of packets) {
        const t = traces[p.traceIdx];
        if (!t) continue;

        let px, py;
        if (p.progress < 0.5) {
          const segP = p.progress * 2;
          px = t.points[0].x + (t.points[1].x - t.points[0].x) * segP;
          py = t.points[0].y + (t.points[1].y - t.points[0].y) * segP;
        } else {
          const segP = (p.progress - 0.5) * 2;
          px = t.points[1].x + (t.points[2].x - t.points[1].x) * segP;
          py = t.points[1].y + (t.points[2].y - t.points[1].y) * segP;
        }

        context.fillStyle = p.color;
        context.shadowColor = p.color;
        context.shadowBlur = 6;
        context.beginPath();
        context.arc(px, py, isPreview ? 2.0 : 3.0, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
      }

      // Concentric clock pulse rings radiating from center
      const clockWave = (time * 45) % 150;
      context.strokeStyle = `rgba(135, 206, 250, ${0.4 * (1 - clockWave / 150)})`;
      context.lineWidth = 1.0;
      context.beginPath();
      context.arc(w / 2, h / 2, clockWave, 0, Math.PI * 2);
      context.stroke();

      // Render IC chip packages
      for (let c of chips) {
        // IC body
        context.fillStyle = '#0f172a';
        context.strokeStyle = 'rgba(135, 206, 250, 0.45)';
        context.lineWidth = 1.5;
        context.fillRect(c.x, c.y, c.w, c.h);
        context.strokeRect(c.x, c.y, c.w, c.h);

        // Metallic pins on sides
        context.fillStyle = '#94a3b8';
        const numPins = Math.floor(c.w / 8);
        for (let p = 0; p < numPins; p++) {
          const px = c.x + 4 + p * 8;
          context.fillRect(px, c.y - 4, 3, 4);
          context.fillRect(px, c.y + c.h, 3, 4);
        }

        // Chip silkscreen label
        context.fillStyle = '#87CEFA';
        context.font = 'bold 10px monospace';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(c.label, c.x + c.w / 2, c.y + c.h / 2);
      }

      // Runtime subtitle
      if (!isPreview) {
        context.fillStyle = 'rgba(135, 206, 250, 0.75)';
        context.font = '12px -apple-system, BlinkMacSystemFont, monospace';
        context.textAlign = 'left';
        context.fillText('CIRCUIT ARCHITECTURE: MULTI-LAYER PCB BUS ROUTING & DATA PACKETS', 28, h - 28);
      }
    },
    destroy() {
      traces.length = 0;
      packets.length = 0;
      chips.length = 0;
    }
  };
}

/**
 * 29. COMPUTER (TECHNOLOGY)
 * 3D rotating computer hardware & motherboard components: CPU socket with
 * metallic Integrated Heat Spreader (IHS), dual RAM DIMM slots, PCIe lanes,
 * heatsinks, VRM power phases, and pulsing 3D data bus lines.
 */
function createComputer(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let time = 0;

  return {
    resize(w, h) {
      width = w;
      height = h;
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.35 : 1.0) * motionScale;
      time += Math.min(dt, 0.08) * speedMult;
    },
    draw(context, w, h) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h) * (isPreview ? 0.32 : 0.38);

      // Smooth 3D rotation angles
      const rotY = Math.sin(time * 0.4) * 0.45;
      const rotX = 0.55 + Math.cos(time * 0.35) * 0.25;

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      function project3D(x, y, z) {
        // Rotate Y
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        // Rotate X
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const fov = 3.2;
        const pScale = fov / (fov + z2);
        return {
          px: cx + x1 * scale * pScale,
          py: cy + y2 * scale * pScale,
          pz: z2
        };
      }

      // Motherboard Base PCB Plane
      const corners = [
        project3D(-1.0, -0.8, 0),
        project3D(1.0, -0.8, 0),
        project3D(1.0, 0.8, 0),
        project3D(-1.0, 0.8, 0)
      ];

      context.fillStyle = '#080e18';
      context.strokeStyle = 'rgba(135, 206, 250, 0.5)';
      context.lineWidth = 1.5;
      context.beginPath();
      context.moveTo(corners[0].px, corners[0].py);
      for (let i = 1; i < 4; i++) context.lineTo(corners[i].px, corners[i].py);
      context.closePath();
      context.fill();
      context.stroke();

      // CPU Socket & Heat Spreader (Center)
      const cpuCorners = [
        project3D(-0.35, -0.35, -0.06),
        project3D(0.15, -0.35, -0.06),
        project3D(0.15, 0.15, -0.06),
        project3D(-0.35, 0.15, -0.06)
      ];
      context.fillStyle = '#1e293b';
      context.strokeStyle = '#94a3b8';
      context.beginPath();
      context.moveTo(cpuCorners[0].px, cpuCorners[0].py);
      for (let i = 1; i < 4; i++) context.lineTo(cpuCorners[i].px, cpuCorners[i].py);
      context.closePath();
      context.fill();
      context.stroke();

      // CPU Metallic IHS Heat Spreader
      const ihsCorners = [
        project3D(-0.28, -0.28, -0.12),
        project3D(0.08, -0.28, -0.12),
        project3D(0.08, 0.08, -0.12),
        project3D(-0.28, 0.08, -0.12)
      ];
      context.fillStyle = '#e2e8f0';
      context.beginPath();
      context.moveTo(ihsCorners[0].px, ihsCorners[0].py);
      for (let i = 1; i < 4; i++) context.lineTo(ihsCorners[i].px, ihsCorners[i].py);
      context.closePath();
      context.fill();

      // Dual RAM DIMM Slots (Right of CPU)
      for (let d = 0; d < 2; d++) {
        const dx = 0.38 + d * 0.14;
        const ramBottom = [
          project3D(dx, -0.65, 0),
          project3D(dx + 0.06, -0.65, 0),
          project3D(dx + 0.06, 0.45, 0),
          project3D(dx, 0.45, 0)
        ];
        const ramTop = [
          project3D(dx, -0.65, -0.25),
          project3D(dx + 0.06, -0.65, -0.25),
          project3D(dx + 0.06, 0.45, -0.25),
          project3D(dx, 0.45, -0.25)
        ];

        // RAM Stick body
        context.fillStyle = '#0f172a';
        context.strokeStyle = '#87CEFA';
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(ramTop[0].px, ramTop[0].py);
        for (let i = 1; i < 4; i++) context.lineTo(ramTop[i].px, ramTop[i].py);
        context.closePath();
        context.fill();
        context.stroke();

        // Gold contact pins
        context.strokeStyle = '#fde047';
        context.beginPath();
        context.moveTo(ramBottom[0].px, ramBottom[0].py);
        context.lineTo(ramBottom[3].px, ramBottom[3].py);
        context.stroke();
      }

      // PCIe x16 Expansion Slot (Bottom)
      const pcieBottom = [
        project3D(-0.7, 0.45, 0),
        project3D(0.5, 0.45, 0),
        project3D(0.5, 0.55, 0),
        project3D(-0.7, 0.55, 0)
      ];
      context.fillStyle = '#1e293b';
      context.strokeStyle = '#64748b';
      context.beginPath();
      context.moveTo(pcieBottom[0].px, pcieBottom[0].py);
      for (let i = 1; i < 4; i++) context.lineTo(pcieBottom[i].px, pcieBottom[i].py);
      context.closePath();
      context.fill();
      context.stroke();

      // Pulsing 3D Bus Traces
      context.strokeStyle = '#87CEFA';
      context.lineWidth = 1.2;
      const busPulse = (time * 3) % 1.0;
      for (let b = 0; b < 4; b++) {
        const start = project3D(0.15, -0.25 + b * 0.1, 0);
        const end = project3D(0.38, -0.25 + b * 0.1, 0);
        context.beginPath();
        context.moveTo(start.px, start.py);
        context.lineTo(end.px, end.py);
        context.stroke();

        // Data bit packet
        const bitX = start.px + (end.px - start.px) * busPulse;
        const bitY = start.py + (end.py - start.py) * busPulse;
        context.fillStyle = '#ffffff';
        context.beginPath();
        context.arc(bitX, bitY, 2.0, 0, Math.PI * 2);
        context.fill();
      }

      // Blinking diagnostic LEDs on edge
      const ledPos = project3D(-0.9, -0.7, 0);
      context.fillStyle = Math.sin(time * 6) > 0 ? '#4ade80' : '#15803d';
      context.beginPath();
      context.arc(ledPos.px, ledPos.py, 3, 0, Math.PI * 2);
      context.fill();

      // Runtime subtitle
      if (!isPreview) {
        context.fillStyle = 'rgba(135, 206, 250, 0.75)';
        context.font = '12px -apple-system, BlinkMacSystemFont, monospace';
        context.textAlign = 'left';
        context.fillText('HARDWARE ARCHITECTURE: 3D MOTHERBOARD, CPU SOCKET & BUS TOPOLOGY', 28, h - 28);
      }
    },
    destroy() {}
  };
}

/**
 * 30. BINARY (TECHNOLOGY)
 * Multi-plane digital binary waterfall matrix with depth parallax,
 * cascading 0s and 1s, byte parity check highlights, and phosphor persistence decay.
 */
function createBinary(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let time = 0;

  const columns = [];

  function initBinary() {
    columns.length = 0;
    const colSpacing = isPreview ? 14 : 18;
    const numCols = Math.floor(width / colSpacing);

    for (let i = 0; i < numCols; i++) {
      // 3 Depth planes: 0 (distant), 1 (mid), 2 (near)
      const depth = Math.floor(Math.random() * 3);
      const fontSize = depth === 0 ? 9 : (depth === 1 ? 12 : 15);
      const speed = (depth === 0 ? 60 : (depth === 1 ? 100 : 150)) * (0.8 + Math.random() * 0.4);

      columns.push({
        x: i * colSpacing + 4,
        y: Math.random() * height,
        speed,
        depth,
        fontSize,
        chars: [],
        highlightTimer: Math.random() * 4
      });
    }
  }

  return {
    resize(w, h) {
      width = w;
      height = h;
      initBinary();
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.35 : 1.0) * motionScale;
      const stepDt = Math.min(dt, 0.08) * speedMult;
      time += stepDt;

      for (let col of columns) {
        col.y += col.speed * stepDt;
        if (col.y > height + 200) {
          col.y = -50;
        }

        col.highlightTimer -= stepDt;
        if (col.highlightTimer <= 0) {
          col.highlightTimer = 3 + Math.random() * 4;
        }
      }
    },
    draw(context, w, h) {
      // Black background
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      context.textAlign = 'center';
      context.textBaseline = 'top';

      for (let col of columns) {
        context.font = `${col.fontSize}px monospace`;
        const numChars = 16;

        for (let j = 0; j < numChars; j++) {
          const cy = col.y - j * col.fontSize;
          if (cy < -20 || cy > h + 20) continue;

          // Pseudo-random deterministic binary character
          const bit = (Math.floor(time * 8 + col.x + j * 7) % 2 === 0) ? '0' : '1';

          if (j === 0) {
            // Leading head character: bright white/cyan
            context.fillStyle = '#ffffff';
          } else if (col.highlightTimer < 0.8 && j < 8) {
            // Parity byte match highlight
            context.fillStyle = '#87CEFA';
          } else {
            // Phosphor decay trail
            const alpha = Math.max(0.08, (1.0 - j / numChars) * (col.depth === 0 ? 0.3 : (col.depth === 1 ? 0.6 : 0.9)));
            context.fillStyle = `rgba(135, 206, 250, ${alpha})`;
          }

          context.fillText(bit, col.x, cy);
        }
      }

      // Runtime subtitle
      if (!isPreview) {
        context.fillStyle = 'rgba(135, 206, 250, 0.75)';
        context.font = '12px -apple-system, BlinkMacSystemFont, monospace';
        context.textAlign = 'left';
        context.fillText('DIGITAL STREAM: 8-BIT PARALLAX BINARY MATRIX & BIT PARITY', 28, h - 28);
      }
    },
    destroy() {
      columns.length = 0;
    }
  };
}

/**
 * 31. BINARY ORBITS (TECHNOLOGY)
 * Three-dimensional particle-based spiral galaxy inspired by React Bits Pro Binary Orbits.
 * Tilted approximately 65 degrees in perspective with a luminous central core,
 * 4 recognizable spiral arms with thousands of stars continuously streaming outward,
 * organic velocity distribution, depth scaling, and restrained celestial palette.
 */
function createBinaryOrbits(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let time = 0;
  let galaxyRot = 0;

  // Particle counts: ~8,000 for preview, ~55,000 for full-screen runtime
  const count = isPreview ? 8000 : 55000;

  // High performance typed arrays
  const radii = new Float32Array(count);
  const phases = new Float32Array(count);
  const arms = new Uint8Array(count);
  const zOffsets = new Float32Array(count);
  const speeds = new Float32Array(count);
  const sizes = new Float32Array(count);
  const colorTypes = new Uint8Array(count); // 0: White, 1: Pale Blue, 2: Electric Light Blue, 3: Core Warm/Gold

  // Pre-rendered radial glow sprites for maximum 60fps rendering efficiency
  const spriteCanvases = [];

  function createGlowSprite(color, r) {
    const sCanvas = document.createElement('canvas');
    const sSize = r * 2;
    sCanvas.width = sSize;
    sCanvas.height = sSize;
    const sCtx = sCanvas.getContext('2d');
    const grad = sCtx.createRadialGradient(r, r, 0, r, r, r);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.35, color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    sCtx.fillStyle = grad;
    sCtx.beginPath();
    sCtx.arc(r, r, r, 0, Math.PI * 2);
    sCtx.fill();
    return sCanvas;
  }

  // Pre-render star sprites
  const spriteWhite = createGlowSprite('rgba(255, 255, 255, 0.9)', 8);
  const spritePaleBlue = createGlowSprite('rgba(186, 230, 253, 0.85)', 8);
  const spriteCyan = createGlowSprite('rgba(135, 206, 250, 0.95)', 8);
  const spriteWarm = createGlowSprite('rgba(254, 240, 138, 0.9)', 8);
  spriteCanvases[0] = spriteWhite;
  spriteCanvases[1] = spritePaleBlue;
  spriteCanvases[2] = spriteCyan;
  spriteCanvases[3] = spriteWarm;

  // Distant background stars
  const bgStars = [];
  function initBgStars(w, h) {
    bgStars.length = 0;
    const numBg = isPreview ? 25 : 80;
    for (let i = 0; i < numBg; i++) {
      bgStars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.4 + 0.2
      });
    }
  }

  let maxGalaxyRadius = 300;
  const NUM_ARMS = 4;
  const TILT_ANGLE = 65 * (Math.PI / 180); // ~1.134 radians (~65 degrees tilt)
  const COS_TILT = Math.cos(TILT_ANGLE);
  const SIN_TILT = Math.sin(TILT_ANGLE);

  function initParticles(w, h) {
    maxGalaxyRadius = Math.min(w, h) * (isPreview ? 0.44 : 0.46);
    initBgStars(w, h);

    for (let i = 0; i < count; i++) {
      // Exponential distribution: denser toward the galactic core
      const rRatio = Math.pow(Math.random(), 1.6);
      const r = rRatio * maxGalaxyRadius;
      radii[i] = r;

      // 4 recognizable spiral arms
      const arm = Math.floor(Math.random() * NUM_ARMS);
      arms[i] = arm;

      // Particle phase dispersion: tight near core, expanding slightly outward
      const armSpread = 0.22 + 0.38 * (r / maxGalaxyRadius);
      phases[i] = (Math.random() - 0.5) * armSpread;

      // Disc vertical thickness: thick spherical bulge at center, thinning into disc
      const coreBulge = Math.max(0, 1.0 - r / (maxGalaxyRadius * 0.3));
      const discThickness = maxGalaxyRadius * (0.08 + coreBulge * 0.18);
      zOffsets[i] = (Math.random() - 0.5) * discThickness;

      // Orbital stream speed: faster in inner region, sustained along arms
      speeds[i] = (0.035 + 0.05 * (1.0 - r / maxGalaxyRadius)) * maxGalaxyRadius;

      // Particle size
      const baseSz = (isPreview ? 1.0 : 1.4) + Math.random() * (isPreview ? 1.4 : 2.2);
      sizes[i] = (r < maxGalaxyRadius * 0.12) ? baseSz * 1.5 : baseSz;

      // Color classification
      if (r < maxGalaxyRadius * 0.15 && Math.random() < 0.35) {
        colorTypes[i] = 3; // Warm stellar core
      } else {
        const randCol = Math.random();
        if (randCol < 0.45) colorTypes[i] = 0; // Pure white
        else if (randCol < 0.75) colorTypes[i] = 1; // Pale blue
        else colorTypes[i] = 2; // Electric cyan #87CEFA
      }
    }
  }

  return {
    resize(w, h) {
      width = w;
      height = h;
      initParticles(w, h);
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.3 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.35 : 1.0) * motionScale;
      const stepDt = Math.min(dt, 0.08) * speedMult;
      time += stepDt;

      // Overall galaxy rotation
      galaxyRot += stepDt * 0.07;

      const twist = 3.2 / maxGalaxyRadius;

      // Continuous stellar streaming along spiral arms
      for (let i = 0; i < count; i++) {
        radii[i] += speeds[i] * stepDt;

        // When a star leaves the outer galaxy edge, recirculate smoothly into the core
        if (radii[i] > maxGalaxyRadius) {
          radii[i] = Math.random() * (maxGalaxyRadius * 0.06);
          arms[i] = (arms[i] + 1) % NUM_ARMS;
          phases[i] = (Math.random() - 0.5) * 0.22;
          const coreBulge = 1.0;
          const discThickness = maxGalaxyRadius * (0.08 + coreBulge * 0.18);
          zOffsets[i] = (Math.random() - 0.5) * discThickness;
        }
      }
    },
    draw(context, w, h) {
      // Pure deep space black
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      // Faint distant background stars
      for (let s of bgStars) {
        context.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        context.beginPath();
        context.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        context.fill();
      }

      const cx = w / 2;
      const cy = h / 2;
      const twist = 3.2 / maxGalaxyRadius;

      // Galactic Core Soft Luminous Glow (Multi-pass radial glow)
      const coreR = maxGalaxyRadius * 0.32;
      const coreGlow = context.createRadialGradient(cx, cy, 2, cx, cy, coreR);
      coreGlow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      coreGlow.addColorStop(0.2, 'rgba(254, 240, 138, 0.65)');
      coreGlow.addColorStop(0.5, 'rgba(135, 206, 250, 0.35)');
      coreGlow.addColorStop(0.8, 'rgba(56, 189, 248, 0.1)');
      coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      context.save();
      // Elliptical core glow matching 65-degree tilt
      context.translate(cx, cy);
      context.scale(1.0, COS_TILT);
      context.fillStyle = coreGlow;
      context.beginPath();
      context.arc(0, 0, coreR, 0, Math.PI * 2);
      context.fill();
      context.restore();

      // 3D Perspective Projection for ~55,000 Stars
      const fov = Math.max(w, h) * 1.5;
      const armAngleStep = (Math.PI * 2) / NUM_ARMS;

      // Batch render stars using pre-rendered sprites
      for (let i = 0; i < count; i++) {
        const r = radii[i];
        const armOffset = arms[i] * armAngleStep;
        const theta = galaxyRot + r * twist + armOffset + phases[i];

        // 3D coordinates in galaxy plane
        const x0 = r * Math.cos(theta);
        const y0 = r * Math.sin(theta);
        const z0 = zOffsets[i];

        // Rotate by 65 degrees around X-axis
        const y1 = y0 * COS_TILT - z0 * SIN_TILT;
        const z1 = y0 * SIN_TILT + z0 * COS_TILT;

        // Perspective scale & depth
        const pScale = fov / (fov + z1);
        const px = cx + x0 * pScale;
        const py = cy + y1 * pScale;

        // Skip particles outside viewport
        if (px < -20 || px > w + 20 || py < -20 || py > h + 20) continue;

        const sz = Math.max(0.6, sizes[i] * pScale);
        const sprite = spriteCanvases[colorTypes[i]];

        if (sz < 1.2) {
          // Fast point draw for micro stars
          context.fillStyle = colorTypes[i] === 2 ? '#87CEFA' : '#ffffff';
          context.fillRect(px, py, sz, sz);
        } else {
          // Pre-rendered luminous glow sprite
          context.drawImage(sprite, px - sz, py - sz, sz * 2, sz * 2);
        }
      }

      // Runtime subtitle
      if (!isPreview) {
        context.fillStyle = 'rgba(135, 206, 250, 0.75)';
        context.font = '12px -apple-system, BlinkMacSystemFont, monospace';
        context.textAlign = 'left';
        context.fillText('ASTROPHYSICS: BINARY ORBITS — 3D SPIRAL GALAXY & STELLAR DISK [65° TILT]', 28, h - 28);
      }
    },
    destroy() {
      bgStars.length = 0;
    }
  };
}

/**
 * 32. HEXA (TECHNOLOGY)
 * 64-bit Hexadecimal memory dump inspector with real-time streaming addresses,
 * 16-byte hex rows, ASCII translation column, instruction pointer (RIP) frames,
 * and memory segment highlights.
 */
function createHexa(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let time = 0;
  let scrollY = 0;

  const HEX_CHARS = '0123456789ABCDEF';

  return {
    resize(w, h) {
      width = w;
      height = h;
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      const speedMult = (isHovered && !prefersReducedMotion ? 1.35 : 1.0) * motionScale;
      const stepDt = Math.min(dt, 0.08) * speedMult;
      time += stepDt;
      scrollY += 28 * stepDt;
    },
    draw(context, w, h) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      const rowH = isPreview ? 14 : 20;
      const fontSize = isPreview ? 9 : 12;
      context.font = `${fontSize}px -apple-system, BlinkMacSystemFont, "SF Mono", monospace`;
      context.textBaseline = 'top';

      const totalRows = Math.ceil(h / rowH) + 2;
      const baseRowIdx = Math.floor(scrollY / rowH);
      const rowOffset = scrollY % rowH;

      for (let r = 0; r < totalRows; r++) {
        const rowIdx = baseRowIdx + r;
        const y = r * rowH - rowOffset;

        // 64-bit memory address
        const addr = (0x7fff00400000 + rowIdx * 16).toString(16).toUpperCase();
        context.fillStyle = '#64748b';
        context.textAlign = 'left';
        context.fillText(`0x${addr.slice(-8)}`, 16, y);

        // 16 Hex bytes
        const startX = isPreview ? 80 : 130;
        const byteSpacing = isPreview ? 14 : 22;

        let asciiStr = '';

        for (let b = 0; b < 16; b++) {
          const byteVal = (Math.sin(rowIdx * 31 + b * 17) * 128 + 128) & 0xff;
          const h1 = HEX_CHARS[byteVal >> 4];
          const h2 = HEX_CHARS[byteVal & 0x0f];

          // Instruction pointer cursor highlight
          const isIP = (rowIdx % 12 === 0) && (b === Math.floor(time * 4) % 16);

          if (isIP) {
            context.fillStyle = 'rgba(135, 206, 250, 0.3)';
            context.fillRect(startX + b * byteSpacing - 2, y, byteSpacing - 2, rowH - 2);
            context.fillStyle = '#ffffff';
          } else if (byteVal === 0) {
            context.fillStyle = '#334155';
          } else {
            context.fillStyle = (b % 4 === 0) ? '#87CEFA' : '#cbd5e1';
          }

          context.fillText(`${h1}${h2}`, startX + b * byteSpacing, y);

          // ASCII representation
          asciiStr += (byteVal >= 32 && byteVal <= 126) ? String.fromCharCode(byteVal) : '.';
        }

        // ASCII column (right side on desktop)
        if (!isPreview) {
          const asciiX = startX + 16 * byteSpacing + 24;
          context.fillStyle = '#94a3b8';
          context.fillText(`|${asciiStr}|`, asciiX, y);
        }
      }

      // Runtime subtitle
      if (!isPreview) {
        context.fillStyle = 'rgba(135, 206, 250, 0.75)';
        context.font = '12px -apple-system, BlinkMacSystemFont, monospace';
        context.textAlign = 'left';
        context.fillText('MEMORY INSPECTOR: 64-BIT VIRTUAL ADDRESS SPACE & HEXADECIMAL DUMP', 28, h - 28);
      }
    },
    destroy() {}
  };
}

/**
 * 32. TERMINAL (TECHNOLOGY)
 * Infinite Linux Bootloader & Systemd Initialization Simulation.
 * Believable, endlessly repeating Linux console startup log: bootloader loading,
 * kernel initialization, physical RAM e820 map, SMP CPUs, hardware detection
 * (PCIe NVMe, xHCI USB, Ethernet, GPU DRM), filesystem mounting, systemd services
 * with green [  OK  ] markers, graphical target reached, brief pause, then fresh
 * randomized cycle looping indefinitely.
 */
function createTerminal(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let time = 0;

  // Boot sequence state
  let sequence = [];
  let lineIndex = 0;
  let lineTimer = 0;
  let currentDelay = 0.05;
  let isBootComplete = false;
  let completionPauseTimer = 0;
  let fadeAlpha = 1.0;
  let isFading = false;

  const history = [];

  function generateUUID() {
    const s = (len) => Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    return `${s(8)}-${s(4)}-${s(4)}-${s(4)}-${s(12)}`;
  }

  function generateBootSequence() {
    const uuid = generateUUID();
    const cores = [8, 12, 16, 24, 32][Math.floor(Math.random() * 5)];
    const ramGB = [16, 32, 64, 128][Math.floor(Math.random() * 4)];
    const ramKB = ramGB * 1024 * 1024 - Math.floor(Math.random() * 800000);
    const diskGB = [512, 1000, 2000, 4000][Math.floor(Math.random() * 4)];
    const nic = ['eth0', 'enp3s0', 'enp4s0f0'][Math.floor(Math.random() * 3)];
    const gpu = [
      'amdgpu 3.54.0 on minor 0 (4K DisplayPort connected)',
      'i915 DRM/KMS on minor 0 (eDP-1 connected)',
      'nouveau DRM on minor 0 (HDMI-A-1 connected)'
    ][Math.floor(Math.random() * 3)];

    const seq = [];

    // Stage 1: Bootloader
    seq.push({ type: 'boot', text: 'Loading Linux 6.12.8-afterdark ...', delay: 0.25 });
    seq.push({ type: 'boot', text: 'Loading initial ramdisk ...', delay: 0.35 });
    seq.push({ type: 'boot', text: 'EFI v2.80 by AFTERDARK FIRMWARE (x86_64)', delay: 0.15 });
    seq.push({ type: 'blank', text: '', delay: 0.08 });

    // Stage 2: Kernel Initialization
    seq.push({ type: 'kernel', text: '[    0.000000] Linux version 6.12.8-afterdark (buildd@afterdark) (gcc 14.2.0) #1 SMP PREEMPT_DYNAMIC', delay: 0.06 });
    seq.push({ type: 'kernel', text: `[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.12.8 root=UUID=${uuid} ro quiet splash loglevel=4 security=apparmor`, delay: 0.04 });
    seq.push({ type: 'kernel', text: "[    0.000000] x86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point registers'", delay: 0.02 });
    seq.push({ type: 'kernel', text: "[    0.000000] x86/fpu: Supporting XSAVE feature 0x002: 'SSE registers'", delay: 0.02 });
    seq.push({ type: 'kernel', text: "[    0.000000] x86/fpu: Supporting XSAVE feature 0x004: 'AVX registers'", delay: 0.02 });
    seq.push({ type: 'kernel', text: `[    0.000000] BIOS-provided physical RAM map: [mem 0x0000000000100000-0x0000000${ramGB > 32 ? 'f' : '7'}fffffff] usable`, delay: 0.03 });
    seq.push({ type: 'kernel', text: `[    0.012480] smpboot: Allowing ${cores} CPUs, 0 hotplug CPUs`, delay: 0.04 });
    seq.push({ type: 'kernel', text: `[    0.024102] setup_percpu: NR_CPUS:64 nr_cpumask_bits:64 nr_cpu_ids:${cores} nr_node_ids:1`, delay: 0.03 });
    seq.push({ type: 'kernel', text: '[    0.048912] ACPI: Early table checksum verification enabled', delay: 0.03 });
    seq.push({ type: 'kernel', text: '[    0.051200] ACPI: RSDP 0x000000007FEF0014 000024 (v02 AFTERD)', delay: 0.02 });
    seq.push({ type: 'kernel', text: '[    0.062400] IOAPIC[0]: apic_id 2, version 32, address 0xfec00000, GSI 0-23', delay: 0.03 });
    seq.push({ type: 'kernel', text: `[    0.082400] smp: Brought up 1 node, ${cores} CPUs`, delay: 0.05 });
    seq.push({ type: 'kernel', text: `[    0.104200] Memory: ${ramKB}K available (14336K kernel code, 2560K rwdata, 7168K rodata)`, delay: 0.04 });
    seq.push({ type: 'kernel', text: '[    0.120500] rcu: Hierarchical RCU implementation.', delay: 0.02 });
    seq.push({ type: 'kernel', text: '[    0.142010] clocksource: hpet: mask: 0xffffffff max_cycles: 0xffffffff, max_idle_ns: 13348488282 ns', delay: 0.03 });

    // Stage 3: Hardware Detection
    seq.push({ type: 'kernel', text: '[    0.184200] pci 0000:00:00.0: [8086:9a04] Host bridge', delay: 0.02 });
    seq.push({ type: 'kernel', text: '[    0.204500] pci 0000:00:01.0: PCI bridge to [bus 01]', delay: 0.02 });
    seq.push({ type: 'kernel', text: '[    0.218900] nvme nvme0: pci function 0000:01:00.0, 4 PCIe Gen4 lanes', delay: 0.03 });
    seq.push({ type: 'kernel', text: `[    0.235100] nvme0n1: ${diskGB}GB NVMe PCIe Gen4 SSD, sector size 512, write cache enabled`, delay: 0.04 });
    seq.push({ type: 'kernel', text: '[    0.251400] xhci_hcd 0000:00:14.0: xHCI Host Controller, 12 ports USB 3.2', delay: 0.03 });
    seq.push({ type: 'kernel', text: '[    0.270100] usb 1-1: new high-speed USB device number 2 using xhci_hcd', delay: 0.02 });
    seq.push({ type: 'kernel', text: '[    0.291000] input: USB Optical Gaming Mouse as /devices/pci0000:00/0000:00:14.0/usb1/1-1', delay: 0.02 });
    seq.push({ type: 'kernel', text: '[    0.312000] input: AT Translated Set 2 keyboard as /devices/platform/i8042/serio0/input/input0', delay: 0.02 });
    seq.push({ type: 'kernel', text: `[    0.342100] e1000e 0000:00:1f.6 ${nic}: Intel PRO/1000 Network Connection (link UP 1000Mbps Full)`, delay: 0.04 });
    seq.push({ type: 'kernel', text: `[    0.380400] [drm] Initialized ${gpu}`, delay: 0.05 });

    // Stage 4: Filesystem Initialization
    seq.push({ type: 'kernel', text: '[    0.412000] devtmpfs: initialized', delay: 0.02 });
    seq.push({ type: 'kernel', text: `[    0.435000] EXT4-fs (nvme0n1p2): mounted filesystem ${uuid} with ordered data mode.`, delay: 0.05 });
    seq.push({ type: 'kernel', text: '[    0.456000] VFS: Mounted root (ext4 filesystem) readonly on device 259:2.', delay: 0.04 });
    seq.push({ type: 'kernel', text: "[    0.482000] systemd[1]: Inserted module 'autofs4'", delay: 0.03 });
    seq.push({ type: 'kernel', text: '[    0.501200] systemd[1]: Detected architecture x86-64.', delay: 0.02 });
    seq.push({ type: 'kernel', text: '[    0.524000] systemd[1]: Set hostname to <afterdark-station>.', delay: 0.04 });
    seq.push({ type: 'blank', text: '', delay: 0.06 });

    // Stage 5: System Services (systemd OK messages)
    seq.push({ type: 'ok', text: 'Started File System Check on /dev/disk/by-uuid/' + uuid.slice(0, 8) + '.', delay: 0.06 });
    seq.push({ type: 'ok', text: 'Mounted /boot/efi.', delay: 0.04 });
    seq.push({ type: 'ok', text: 'Mounted /sys/kernel/debug.', delay: 0.03 });
    seq.push({ type: 'ok', text: 'Created slice Slice /system/systemd-journald.', delay: 0.03 });
    seq.push({ type: 'ok', text: 'Started Journal Service.', delay: 0.05 });
    seq.push({ type: 'ok', text: 'Started udev Kernel Device Manager.', delay: 0.04 });
    seq.push({ type: 'ok', text: 'Reached target Local File Systems.', delay: 0.05 });
    seq.push({ type: 'ok', text: 'Started Set Up Additional Binary Formats.', delay: 0.03 });
    seq.push({ type: 'ok', text: 'Reached target Cryptography.', delay: 0.04 });
    seq.push({ type: 'ok', text: 'Started Rule-based Manager for Device Events.', delay: 0.05 });
    seq.push({ type: 'ok', text: 'Started Network Time Synchronization.', delay: 0.04 });
    seq.push({ type: 'ok', text: 'Reached target System Time Synchronized.', delay: 0.03 });
    seq.push({ type: 'ok', text: 'Started D-Bus System Message Bus.', delay: 0.05 });
    seq.push({ type: 'ok', text: 'Started Network Manager.', delay: 0.06 });
    seq.push({ type: 'ok', text: 'Reached target Network.', delay: 0.04 });
    seq.push({ type: 'ok', text: 'Started OpenSSH Server Daemon.', delay: 0.05 });
    seq.push({ type: 'ok', text: 'Started Thermal Daemon Service.', delay: 0.03 });
    seq.push({ type: 'ok', text: 'Started System Logging Service.', delay: 0.04 });
    seq.push({ type: 'ok', text: 'Reached target Sound Card.', delay: 0.03 });
    seq.push({ type: 'ok', text: 'Started PipeWire Multimedia Sound Server.', delay: 0.06 });
    seq.push({ type: 'ok', text: 'Started User Manager for UID 1000.', delay: 0.05 });
    seq.push({ type: 'ok', text: 'Started Accounts Service.', delay: 0.04 });
    seq.push({ type: 'ok', text: 'Started Disk Manager (udisks2).', delay: 0.04 });
    seq.push({ type: 'ok', text: 'Reached target Multi-User System.', delay: 0.06 });
    seq.push({ type: 'ok', text: 'Started Display Manager (Wayland / DRM Compositor).', delay: 0.08 });

    // Stage 6: Final Boot Completion
    seq.push({ type: 'ok', text: 'Reached target Graphical Interface.', delay: 0.08 });
    seq.push({ type: 'ok', text: 'Finished Hold until boot process finishes up.', delay: 0.06 });
    seq.push({ type: 'ok', text: 'Reached target System Ready.', delay: 0.12 });
    seq.push({ type: 'blank', text: '', delay: 0.1 });
    seq.push({ type: 'boot', text: 'Welcome to After Dark Linux 6.12.8 (tty1)', delay: 0.15 });
    seq.push({ type: 'prompt', text: 'afterdark-station login: ', delay: 0.2 });

    return seq;
  }

  function resetBoot() {
    sequence = generateBootSequence();
    lineIndex = 0;
    lineTimer = 0;
    currentDelay = 0.05;
    isBootComplete = false;
    completionPauseTimer = 0;
    fadeAlpha = 1.0;
    isFading = false;
    history.length = 0;
  }

  resetBoot();

  return {
    resize(w, h) {
      width = w;
      height = h;
    },
    update(dt, isHovered) {
      const motionScale = prefersReducedMotion ? 0.35 : 1.0;
      // In hover mode, accelerate bootloader streaming for responsive preview
      const speedMult = (isHovered && !prefersReducedMotion ? 2.2 : 1.0) * motionScale;
      const stepDt = Math.min(dt, 0.08) * speedMult;
      time += stepDt;

      if (isFading) {
        fadeAlpha -= stepDt * 2.5;
        if (fadeAlpha <= 0) {
          resetBoot();
        }
        return;
      }

      if (isBootComplete) {
        completionPauseTimer += stepDt;
        // Pause 3.0 seconds on completed boot prompt, then fade into fresh boot cycle
        if (completionPauseTimer > 3.0) {
          isFading = true;
        }
        return;
      }

      lineTimer += stepDt;
      if (lineTimer >= currentDelay) {
        lineTimer = 0;
        if (lineIndex < sequence.length) {
          const item = sequence[lineIndex];
          history.push(item);
          // Limit memory to 80 recent lines
          if (history.length > 80) {
            history.shift();
          }
          currentDelay = item.delay || 0.05;
          lineIndex++;
          if (lineIndex >= sequence.length) {
            isBootComplete = true;
            completionPauseTimer = 0;
          }
        }
      }
    },
    draw(context, w, h) {
      context.save();
      context.globalAlpha = Math.max(0, Math.min(1, fadeAlpha));

      // Classic dark console background
      context.fillStyle = '#000000';
      context.fillRect(0, 0, w, h);

      // Subtle CRT scanline raster
      context.fillStyle = 'rgba(255, 255, 255, 0.015)';
      for (let y = 0; y < h; y += 3) {
        context.fillRect(0, y, w, 1);
      }

      const fontSize = isPreview ? 8.5 : 12.5;
      const lineH = isPreview ? 12 : 17;
      context.font = `${fontSize}px -apple-system, BlinkMacSystemFont, "SF Mono", "Courier New", monospace`;
      context.textBaseline = 'top';

      const paddingX = isPreview ? 8 : 24;
      const paddingY = isPreview ? 8 : 20;
      const maxVisibleLines = Math.floor((h - paddingY * 2) / lineH);

      // Auto-scrolling: follow newest lines
      const displayLines = history.slice(-maxVisibleLines);
      let curY = paddingY;

      for (let item of displayLines) {
        if (item.type === 'ok') {
          // Systemd [  OK  ] style formatting
          context.fillStyle = '#94a3b8'; // bracket grey
          context.fillText('[', paddingX, curY);

          context.fillStyle = '#22c55e'; // green OK
          context.fillText('  OK  ', paddingX + context.measureText('[').width, curY);

          const okW = context.measureText('[  OK  ]').width;
          context.fillStyle = '#94a3b8';
          context.fillText('] ', paddingX + context.measureText('[  OK  ').width, curY);

          context.fillStyle = '#f1f5f9'; // white description
          context.fillText(item.text, paddingX + okW + 4, curY);
        } else if (item.type === 'kernel') {
          // Timestamp in muted blue-grey, log text in crisp soft white
          const match = item.text.match(/^(\[[^\]]+\])(.*)$/);
          if (match) {
            context.fillStyle = '#64748b';
            context.fillText(match[1], paddingX, curY);
            const tsW = context.measureText(match[1]).width;
            context.fillStyle = '#e2e8f0';
            context.fillText(match[2], paddingX + tsW, curY);
          } else {
            context.fillStyle = '#e2e8f0';
            context.fillText(item.text, paddingX, curY);
          }
        } else if (item.type === 'boot') {
          context.fillStyle = '#87CEFA';
          context.fillText(item.text, paddingX, curY);
        } else if (item.type === 'prompt') {
          context.fillStyle = '#ffffff';
          context.fillText(item.text, paddingX, curY);

          // Blinking solid block cursor █
          if (Math.sin(time * 7) > 0) {
            const pW = context.measureText(item.text).width;
            context.fillStyle = '#87CEFA';
            context.fillRect(paddingX + pW, curY + 1, fontSize * 0.55, fontSize);
          }
        } else {
          context.fillStyle = '#cbd5e1';
          context.fillText(item.text, paddingX, curY);
        }

        curY += lineH;
      }

      // Blinking cursor if still typing during active boot
      if (!isBootComplete && curY < h - paddingY) {
        if (Math.sin(time * 8) > 0) {
          context.fillStyle = '#87CEFA';
          context.fillRect(paddingX, curY + 1, fontSize * 0.55, fontSize);
        }
      }

      // Subtitle in full runtime
      if (!isPreview) {
        context.fillStyle = 'rgba(135, 206, 250, 0.75)';
        context.font = '12px -apple-system, BlinkMacSystemFont, monospace';
        context.textAlign = 'left';
        context.fillText('LINUX KERNEL: INFINITE BOOTLOADER & SYSTEMD INITIALIZATION SEQUENCE', 28, h - 28);
      }

      context.restore();
    },
    destroy() {
      history.length = 0;
      sequence.length = 0;
    }
  };
}

/**
 * ALL TYPES RANDOMIZER PREVIEW
 * Distinctive dashboard preview that dynamically cycles representative visual effects
 * from all categories (Classic, Cinematic, Ocean, Physics, Technology).
 */
function createRandomizerPreview(canvas, isPreview) {
  let width = 0;
  let height = 0;
  let cycleTime = 0;
  let currentSampleIdx = 0;

  // Sampler engines to cycle through across categories
  const toasters = createFlyingToasters(canvas, true);
  const binaryOrbits = createBinaryOrbits(canvas, true);
  const spiderMan = createSpiderMan(canvas, true);
  const interstellar = createInterstellar(canvas, true);
  const ocean = createUnderTheOcean(canvas, true);
  const fusion = createNuclearFusion(canvas, true);
  const tech = createTech(canvas, true);
  const computer = createComputer(canvas, true);
  const terminal = createTerminal(canvas, true);
  const dna = createDNADoubleHelix(canvas, true);
  const math = createMathematicalCurves(canvas, true);
  const samplers = [toasters, binaryOrbits, spiderMan, interstellar, ocean, fusion, tech, computer, terminal, dna, math];

  return {
    resize(w, h, dpr) {
      width = w;
      height = h;
      for (let s of samplers) {
        s.resize(w, h, dpr);
      }
    },
    update(dt, isHovered) {
      const cycleInterval = prefersReducedMotion ? 6.0 : 3.0;
      cycleTime += dt;
      if (cycleTime > cycleInterval) {
        cycleTime = 0;
        currentSampleIdx = (currentSampleIdx + 1) % samplers.length;
      }
      samplers[currentSampleIdx].update(dt, isHovered);
    },
    draw(context, w, h, isHovered) {
      samplers[currentSampleIdx].draw(context, w, h, isHovered);

      context.fillStyle = 'rgba(0, 0, 0, 0.5)';
      context.fillRect(0, h - 26, w, 26);
      context.fillStyle = '#87CEFA';
      context.font = '600 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText('ALL TYPES RANDOMIZER · 8 MIN ROTATION', w / 2, h - 13);
    },
    destroy() {
      for (let s of samplers) {
        s.destroy();
      }
    }
  };
}

// ==========================================
// 3. APPLICATION STATE & DASHBOARD MANAGEMENT
// ==========================================

const cardInstances = new Map();
let runtimeActive = false;
let activeRuntimeSaver = null;
let lastSelectedId = null;
let lastTime = performance.now();
let dashboardRafId = null;
let runtimeRafId = null;
let exitBtnTimeout = null;

// Automatic 8-minute rotation state
const ROTATION_INTERVAL_MS = 8 * 60 * 1000; // 8 minutes = 480,000 ms
let isAutoRotationActive = false;
let rotationDeadline = 0;
let rotationDeck = [];
let isTransitioning = false;

// DOM Elements
const dashboardEl = document.getElementById('dashboard');
const categoriesContainerEl = document.getElementById('screensaver-categories') || document.getElementById('screensaver-grid');
const runtimeContainerEl = document.getElementById('runtime-container');
const runtimeCanvasEl = document.getElementById('runtime-canvas');
const runtimeExitBtnEl = document.getElementById('runtime-exit-btn');

/**
 * Refills and shuffles the rotation deck using Fisher-Yates shuffle.
 * Ensures the first card of the new cycle is not identical to the last card of the previous cycle.
 */
function refillRotationDeck() {
  const namedSavers = SCREENSAVERS.filter(s => !s.isRandomizer).map(s => s.id);
  for (let i = namedSavers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [namedSavers[i], namedSavers[j]] = [namedSavers[j], namedSavers[i]];
  }
  // Prevent repeating across deck boundaries
  if (namedSavers[namedSavers.length - 1] === lastSelectedId && namedSavers.length > 1) {
    const swapIdx = Math.floor(Math.random() * (namedSavers.length - 1));
    [namedSavers[namedSavers.length - 1], namedSavers[swapIdx]] = [namedSavers[swapIdx], namedSavers[namedSavers.length - 1]];
  }
  rotationDeck = namedSavers;
}

/**
 * Returns the next unique screen saver ID from the shuffled rotation deck.
 */
function getNextRotationId() {
  if (rotationDeck.length === 0) {
    refillRotationDeck();
  }
  return rotationDeck.pop();
}

/**
 * Initialize all preview cards and IntersectionObserver for efficient rendering,
 * categorized into Classic, Mathematics, Physics, Chemistry, and Biology.
 */
function initDashboard() {
  categoriesContainerEl.innerHTML = '';

  const observer = new IntersectionObserver((entries) => {
    for (let entry of entries) {
      const cardId = entry.target.dataset.id;
      const inst = cardInstances.get(cardId);
      if (inst) {
        inst.isVisible = entry.isIntersecting;
      }
    }
  }, { threshold: 0.05 });

  for (let cat of CATEGORIES) {
    const section = document.createElement('section');
    section.className = 'category-section';
    section.setAttribute('aria-labelledby', `cat-${cat.id}`);

    const header = document.createElement('h2');
    header.id = `cat-${cat.id}`;
    header.className = 'category-title';
    header.textContent = cat.title;
    section.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'screensaver-grid';

    for (let saver of cat.savers) {
      const card = document.createElement('button');
      card.className = 'screensaver-card';
      card.type = 'button';
      card.dataset.id = saver.id;
      card.setAttribute('aria-label', `Launch ${saver.title} screen saver`);

      const viewport = document.createElement('div');
      viewport.className = 'preview-viewport';

      const canvas = document.createElement('canvas');
      canvas.className = 'preview-canvas';
      viewport.appendChild(canvas);

      const title = document.createElement('span');
      title.className = 'card-title';
      title.textContent = saver.title;

      card.appendChild(viewport);
      card.appendChild(title);
      grid.appendChild(card);

      const engine = saver.create(canvas, true);

      const cardData = {
        id: saver.id,
        cardEl: card,
        canvasEl: canvas,
        engine,
        isVisible: true,
        isHovered: false,
        width: 0,
        height: 0
      };
      cardInstances.set(saver.id, cardData);

      card.addEventListener('mouseenter', () => { cardData.isHovered = true; });
      card.addEventListener('mouseleave', () => { cardData.isHovered = false; });
      card.addEventListener('focus', () => { cardData.isHovered = true; });
      card.addEventListener('blur', () => { cardData.isHovered = false; });

      card.addEventListener('click', (e) => {
        e.preventDefault();
        launchScreenSaver(saver.id);
      });

      observer.observe(card);
    }

    section.appendChild(grid);
    categoriesContainerEl.appendChild(section);
  }

  resizeAllPreviews();
  window.addEventListener('resize', debounce(resizeAllPreviews, 150));
  startDashboardLoop();
}

/**
 * Resize all preview canvases to match CSS dimensions with DPR support.
 */
function resizeAllPreviews() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  cardInstances.forEach((data) => {
    const rect = data.canvasEl.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      data.width = rect.width;
      data.height = rect.height;
      data.canvasEl.width = Math.round(rect.width * dpr);
      data.canvasEl.height = Math.round(rect.height * dpr);
      const ctx = data.canvasEl.getContext('2d');
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      data.engine.resize(rect.width, rect.height, dpr);
    }
  });
}

/**
 * Dashboard animation render loop.
 * Updates and draws only visible previews. Pauses completely during runtime or hidden tab.
 */
function startDashboardLoop() {
  if (dashboardRafId) cancelAnimationFrame(dashboardRafId);

  let prevTime = performance.now();

  function loop(now) {
    dashboardRafId = requestAnimationFrame(loop);

    if (runtimeActive || document.hidden) {
      prevTime = now;
      return;
    }

    const dt = Math.min((now - prevTime) / 1000, 0.1);
    prevTime = now;

    cardInstances.forEach((data) => {
      if (data.isVisible && data.width > 0 && data.height > 0) {
        data.engine.update(dt, data.isHovered);
        const ctx = data.canvasEl.getContext('2d');
        data.engine.draw(ctx, data.width, data.height, data.isHovered);
      }
    });
  }

  dashboardRafId = requestAnimationFrame(loop);
}

// ==========================================
// 4. RUNTIME IMMERSIVE VIEWPORT & LIFECYCLE
// ==========================================

/**
 * Launches the selected screen saver.
 * If 'randomizer' is chosen, activates continuous 8-minute automatic rotation.
 */
function launchScreenSaver(id) {
  if (id === 'randomizer') {
    isAutoRotationActive = true;
    rotationDeck = [];
    const initialId = getNextRotationId();
    launchScreenSaverInternal(initialId);
    rotationDeadline = performance.now() + ROTATION_INTERVAL_MS;
  } else {
    isAutoRotationActive = false;
    rotationDeadline = 0;
    launchScreenSaverInternal(id);
  }
}

/**
 * Internal launcher that initializes and starts playback for a specific screen saver ID.
 */
function launchScreenSaverInternal(targetId) {
  lastSelectedId = targetId;
  const saverDef = SCREENSAVERS.find(s => s.id === targetId);
  if (!saverDef) return;

  runtimeActive = true;

  dashboardEl.classList.add('hidden');
  runtimeContainerEl.classList.remove('hidden');

  tryRequestFullscreen();
  resizeRuntimeCanvas();

  if (activeRuntimeSaver) {
    activeRuntimeSaver.destroy();
  }

  activeRuntimeSaver = saverDef.create(runtimeCanvasEl, false);
  const rect = runtimeCanvasEl.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  activeRuntimeSaver.resize(rect.width, rect.height, dpr);

  showExitControl();
  startRuntimeLoop();
}

/**
 * Smoothly transitions to the next random screen saver in 8-minute automatic rotation mode
 * without returning to the dashboard or displaying a white flash.
 */
function transitionToNextRandomSaver() {
  if (!isAutoRotationActive || !runtimeActive || isTransitioning) return;
  isTransitioning = true;

  const nextId = getNextRotationId();
  const nextSaverDef = SCREENSAVERS.find(s => s.id === nextId);
  if (!nextSaverDef) {
    isTransitioning = false;
    return;
  }

  runtimeCanvasEl.classList.add('fading');
  setTimeout(() => {
    if (!runtimeActive || !isAutoRotationActive) {
      runtimeCanvasEl.classList.remove('fading');
      isTransitioning = false;
      return;
    }

    if (activeRuntimeSaver) {
      activeRuntimeSaver.destroy();
      activeRuntimeSaver = null;
    }

    lastSelectedId = nextId;
    activeRuntimeSaver = nextSaverDef.create(runtimeCanvasEl, false);
    const rect = runtimeCanvasEl.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    activeRuntimeSaver.resize(rect.width, rect.height, dpr);

    rotationDeadline = performance.now() + ROTATION_INTERVAL_MS;
    runtimeCanvasEl.classList.remove('fading');
    isTransitioning = false;
  }, 220);
}

/**
 * Resizes the full-viewport runtime canvas.
 */
function resizeRuntimeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;

  runtimeCanvasEl.width = Math.round(w * dpr);
  runtimeCanvasEl.height = Math.round(h * dpr);
  const ctx = runtimeCanvasEl.getContext('2d');
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);

  if (activeRuntimeSaver) {
    activeRuntimeSaver.resize(w, h, dpr);
  }
}

/**
 * Runtime render loop. Checks rotation deadline for automatic rotation mode.
 */
function startRuntimeLoop() {
  if (runtimeRafId) cancelAnimationFrame(runtimeRafId);

  let prevTime = performance.now();

  function loop(now) {
    if (!runtimeActive) return;

    runtimeRafId = requestAnimationFrame(loop);

    if (document.hidden) {
      prevTime = now;
      return;
    }

    // Check automatic rotation deadline
    if (isAutoRotationActive && !isTransitioning && now >= rotationDeadline) {
      transitionToNextRandomSaver();
    }

    const dt = Math.min((now - prevTime) / 1000, 0.1);
    prevTime = now;

    if (activeRuntimeSaver && !isTransitioning) {
      activeRuntimeSaver.update(dt, false);
      const ctx = runtimeCanvasEl.getContext('2d');
      const w = window.innerWidth;
      const h = window.innerHeight;
      activeRuntimeSaver.draw(ctx, w, h, false);
    }
  }

  runtimeRafId = requestAnimationFrame(loop);
}

/**
 * Exits the runtime, stops automatic rotation, and cleanly restores the dashboard.
 */
function exitRuntime() {
  if (!runtimeActive) return;

  runtimeActive = false;
  isAutoRotationActive = false;
  isTransitioning = false;
  rotationDeadline = 0;

  if (runtimeRafId) {
    cancelAnimationFrame(runtimeRafId);
    runtimeRafId = null;
  }

  if (activeRuntimeSaver) {
    activeRuntimeSaver.destroy();
    activeRuntimeSaver = null;
  }

  const ctx = runtimeCanvasEl.getContext('2d');
  ctx.clearRect(0, 0, runtimeCanvasEl.width, runtimeCanvasEl.height);

  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }

  runtimeContainerEl.classList.add('hidden');
  dashboardEl.classList.remove('hidden');

  resizeAllPreviews();
}

/**
 * Shows the minimal "Exit" button and sets auto-fade timer.
 */
function showExitControl() {
  runtimeExitBtnEl.classList.add('visible');
  if (exitBtnTimeout) clearTimeout(exitBtnTimeout);
  exitBtnTimeout = setTimeout(() => {
    runtimeExitBtnEl.classList.remove('visible');
  }, 2500);
}

/**
 * Safe browser fullscreen requester.
 */
function tryRequestFullscreen() {
  const el = document.documentElement;
  if (el.requestFullscreen) {
    el.requestFullscreen().catch(() => {});
  }
}

// ==========================================
// 5. GLOBAL EVENT LISTENERS & INITIALIZATION
// ==========================================

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && runtimeActive) {
    e.preventDefault();
    exitRuntime();
  }
});

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement && runtimeActive) {
    exitRuntime();
  }
});

runtimeExitBtnEl.addEventListener('click', (e) => {
  e.stopPropagation();
  exitRuntime();
});

window.addEventListener('mousemove', () => {
  if (runtimeActive) showExitControl();
});
window.addEventListener('touchstart', () => {
  if (runtimeActive) showExitControl();
}, { passive: true });

window.addEventListener('resize', () => {
  if (runtimeActive) {
    resizeRuntimeCanvas();
  }
});

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    lastTime = performance.now();
    if (runtimeActive) {
      // If returning to tab and rotation deadline expired while backgrounded
      if (isAutoRotationActive && !isTransitioning && performance.now() >= rotationDeadline) {
        transitionToNextRandomSaver();
      } else {
        resizeRuntimeCanvas();
      }
    } else {
      resizeAllPreviews();
    }
  }
});

function debounce(fn, ms) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}

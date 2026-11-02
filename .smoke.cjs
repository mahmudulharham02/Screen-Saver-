// Headless smoke test for createSpiderMan using a mock 2D canvas context.
const fs = require('fs');

const src = fs.readFileSync('script.js', 'utf8');
const start = src.indexOf('function createSpiderMan');
const endMarker = '\n/**\n * 24. BATMAN';
const end = src.indexOf(endMarker);
if (start < 0 || end < 0) { console.error('markers not found'); process.exit(1); }
let code = src.slice(start, end);
code += '\nreturn createSpiderMan;';
global.prefersReducedMotion = false;

function makeCtx() {
  const noop = () => {};
  return {
    save: noop, restore: noop, translate: noop, rotate: noop, scale: noop,
    beginPath: noop, closePath: noop, moveTo: noop, lineTo: noop, arc: noop,
    ellipse: noop, quadraticCurveTo: noop, bezierCurveTo: noop, rect: noop,
    fill: noop, stroke: noop, fillRect: noop, clearRect: noop, strokeRect: noop,
    fillText: noop, strokeText: noop, setTransform: noop, clip: noop,
    drawImage: noop,
    createLinearGradient: () => ({ addColorStop: noop }),
    createRadialGradient: () => ({ addColorStop: noop }),
    createPattern: () => null,
    measureText: () => ({ width: 10 }),
    getImageData: () => ({ data: new Uint8ClampedArray(4) }),
    putImageData: noop,
    lineWidth: 1, lineCap: 'butt', lineJoin: 'miter', globalAlpha: 1,
    fillStyle: '#000', strokeStyle: '#000', font: '10px sans-serif', textAlign: 'left'
  };
}

global.document = {
  createElement: (tag) => {
    if (tag === 'canvas') {
      return { width: 1, height: 1, getContext: () => makeCtx() };
    }
    return {};
  }
};

const fn = (new Function('document', code)) (global.document);

const sm = fn(null, false); // runtime instance
sm.resize(1920, 1080);

for (let i = 0; i < 3600; i++) {
  sm.update(1 / 60, false);
  sm.draw(makeCtx(), 1920, 1080);
}
sm.resize(500, 400);
for (let i = 0; i < 600; i++) { sm.update(1 / 30, true); sm.draw(makeCtx(), 500, 400); }
const preview = fn(null, true);
preview.resize(240, 160);
for (let i = 0; i < 300; i++) { preview.update(1 / 60, false); preview.draw(makeCtx(), 240, 160); }
sm.destroy();
preview.destroy();
console.log('SMOKE_OK');

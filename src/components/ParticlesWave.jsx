


import { useEffect, useRef } from 'react';

export default function SilkWave() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId, t = 0, last = 0;

    function resize() {
      const r = canvas.getBoundingClientRect();
      canvas.width = (r.width || window.innerWidth) * devicePixelRatio;
      canvas.height = (r.height || window.innerHeight) * devicePixelRatio;
    }

    window.addEventListener('resize', resize);

    function band(topFn, botFn, stops) {
      const W = canvas.width, H = canvas.height;
      ctx.beginPath();
      for (let i = 0; i <= W; i++) {
        const x = i / W;
        i === 0 ? ctx.moveTo(i, topFn(x) * H) : ctx.lineTo(i, topFn(x) * H);
      }
      for (let i = W; i >= 0; i--) ctx.lineTo(i, botFn(i / W) * H);
      ctx.closePath();

      let y0 = Infinity, y1 = -Infinity;
      for (let i = 0; i <= 30; i++) {
        const x = i / 30, a = topFn(x) * H, b = botFn(x) * H;
        if (a < y0) y0 = a;
        if (b > y1) y1 = b;
      }
      const gr = ctx.createLinearGradient(0, y0, 0, y1);
      stops.forEach(s => gr.addColorStop(s[0], s[1]));
      ctx.fillStyle = gr;
      ctx.fill();
    }

    function draw(ts) {
      animId = requestAnimationFrame(draw);
      t += Math.min((ts - last) / 1000, 0.05) * 2;
      last = ts;

      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const CY = 0.50;

      // Back ribbon wave functions
      const bk = x => CY - 0.10 - 0.13 * Math.sin(x * Math.PI * 1.4 + t * 0.55) - 0.04 * Math.sin(x * Math.PI * 3.0 + t * 0.38 + 0.8);
      // Front ribbon wave functions
      const fr = x => CY + 0.04 - 0.11 * Math.sin(x * Math.PI * 1.4 + t * 0.55 + 0.9) - 0.04 * Math.sin(x * Math.PI * 3.0 + t * 0.38 + 2.1);
      // Dark crease / fold line
      const dk = x => CY + 0.02 - 0.12 * Math.sin(x * Math.PI * 1.4 + t * 0.55 + 0.45) - 0.04 * Math.sin(x * Math.PI * 3.0 + t * 0.38 + 1.4);

      // ─── BACK RIBBON ─────────────────────────────────────────────
      // Top face of back ribbon (light-to-dark steel)
      band(x => bk(x) - 0.14, x => dk(x) + 0.005, [
        [0.00, 'rgba(255,255,255,0)'],
        [0.05, 'rgba(190,190,193,0.5)'],
        [0.20, 'rgba(165,165,168,0.85)'],
        [0.50, 'rgba(130,130,134,0.92)'],
        [0.78, 'rgba(90,90,93,0.95)'],
        [0.95, 'rgba(45,45,48,0.98)'],
        [1.00, 'rgba(18,18,20,1)']
      ]);

      // Under-curve of back ribbon (dark valley)
      band(x => dk(x) + 0.005, x => bk(x) + 0.28, [
        [0.00, 'rgba(12,12,14,1)'],
        [0.07, 'rgba(70,70,73,0.96)'],
        [0.30, 'rgba(130,130,133,0.88)'],
        [0.65, 'rgba(175,175,178,0.70)'],
        [0.90, 'rgba(220,220,222,0.30)'],
        [1.00, 'rgba(255,255,255,0)']
      ]);

      // Deep crease / shadow fold on back ribbon
      band(x => dk(x) - 0.010, x => dk(x) + 0.055, [
        [0.00, 'rgba(0,0,0,0)'],
        [0.12, 'rgba(0,0,0,0.88)'],
        [0.40, 'rgba(0,0,0,0.98)'],
        [0.60, 'rgba(0,0,0,0.98)'],
        [0.88, 'rgba(0,0,0,0.88)'],
        [1.00, 'rgba(0,0,0,0)']
      ]);

      // ─── FRONT RIBBON ────────────────────────────────────────────
      // Top face of front ribbon (brighter highlight → steel)
      band(x => fr(x) - 0.22, x => fr(x) + 0.005, [
        [0.00, 'rgba(255,255,255,0)'],
        [0.06, 'rgba(210,210,212,0.55)'],
        [0.25, 'rgba(185,185,188,0.90)'],
        [0.58, 'rgba(145,145,148,0.95)'],
        [0.85, 'rgba(80,80,83,0.97)'],
        [1.00, 'rgba(14,14,16,1)']
      ]);

      // Under-curve of front ribbon
      band(x => fr(x) + 0.005, x => fr(x) + 0.20, [
        [0.00, 'rgba(10,10,12,1)'],
        [0.10, 'rgba(65,65,68,0.96)'],
        [0.38, 'rgba(145,145,148,0.90)'],
        [0.72, 'rgba(195,195,198,0.65)'],
        [0.92, 'rgba(228,228,230,0.28)'],
        [1.00, 'rgba(255,255,255,0)']
      ]);

      // Bright specular highlight along top edge of front ribbon
      band(x => fr(x) - 0.235, x => fr(x) - 0.170, [
        [0.00, 'rgba(255,255,255,0)'],
        [0.15, 'rgba(235,235,237,0.70)'],
        [0.48, 'rgba(245,245,247,0.90)'],
        [0.82, 'rgba(235,235,237,0.70)'],
        [1.00, 'rgba(255,255,255,0)']
      ]);

      // Sharp dark crease at fold of front ribbon
      band(x => fr(x) - 0.016, x => fr(x) + 0.012, [
        [0.00, 'rgba(0,0,0,0)'],
        [0.35, 'rgba(0,0,0,0.80)'],
        [0.65, 'rgba(0,0,0,0.80)'],
        [1.00, 'rgba(0,0,0,0)']
      ]);

      // Secondary micro-highlight on front ribbon belly
      band(x => fr(x) + 0.045, x => fr(x) + 0.090, [
        [0.00, 'rgba(255,255,255,0)'],
        [0.30, 'rgba(200,200,203,0.30)'],
        [0.50, 'rgba(210,210,213,0.45)'],
        [0.70, 'rgba(200,200,203,0.30)'],
        [1.00, 'rgba(255,255,255,0)']
      ]);
    }

    requestAnimationFrame(() => {
      resize();
      requestAnimationFrame(draw);
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        background: '#ffffff'
      }}
    />
  );
}

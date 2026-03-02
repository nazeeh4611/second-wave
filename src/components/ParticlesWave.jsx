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
      canvas.width  = (r.width  || window.innerWidth)  * devicePixelRatio;
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
      for (let i = 0; i <= 20; i++) {
        const x = i / 20;
        const a = topFn(x) * H, b = botFn(x) * H;
        if (a < y0) y0 = a;
        if (b > y1) y1 = b;
      }
      const gr = ctx.createLinearGradient(0, y0, 0, y1);
      stops.forEach(([pos, col]) => gr.addColorStop(pos, col));
      ctx.fillStyle = gr;
      ctx.fill();
    }

    function strokeLine(fn, color, width = 1) {
      const W = canvas.width, H = canvas.height;
      ctx.beginPath();
      for (let i = 0; i <= W; i++) {
        const x = i / W;
        i === 0 ? ctx.moveTo(i, fn(x) * H) : ctx.lineTo(i, fn(x) * H);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = width * devicePixelRatio;
      ctx.stroke();
    }

    function draw(ts) {
      animId = requestAnimationFrame(draw);
      t += Math.min((ts - last) / 1000, 0.05) * 1.8;
      last = ts;

      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const pw = W / devicePixelRatio;
      const isMobile = pw < 768;
      const isTablet = pw >= 768 && pw < 1024;
      const isSmallScreen = isMobile || isTablet;

      if (isSmallScreen) {
        const s = Math.sin, PI = Math.PI;

        const TH = isMobile ? 0.028 : 0.035;
        const A1 = isMobile ? 0.038 : 0.048;
        const A2 = isMobile ? 0.010 : 0.014;

        const rc     = x => 0.50 + A1 * s(x * PI * 1.0 + t * 0.50) + A2 * s(x * PI * 2.5 + t * 0.34 + 1.8);
        const top    = x => rc(x) - TH;
        const crease = x => rc(x) - TH * 0.1;
        const bot    = x => rc(x) + TH;

        band(top, crease, [
          [0.00, 'rgba(255,255,255,0.0)'],
          [0.10, 'rgba(220,220,222,0.55)'],
          [0.40, 'rgba(175,175,178,0.92)'],
          [0.70, 'rgba(120,120,123,0.97)'],
          [1.00, 'rgba(50,50,53,1.0)'],
        ]);

        band(crease, bot, [
          [0.00, 'rgba(15,15,17,1.0)'],
          [0.15, 'rgba(60,60,63,0.95)'],
          [0.50, 'rgba(130,130,133,0.80)'],
          [0.80, 'rgba(190,190,193,0.45)'],
          [1.00, 'rgba(255,255,255,0.0)'],
        ]);

        band(
          x => crease(x) - TH * 0.15,
          x => crease(x) + TH * 0.30,
          [
            [0.00, 'rgba(0,0,0,0.0)'],
            [0.25, 'rgba(0,0,0,0.85)'],
            [0.50, 'rgba(0,0,0,0.97)'],
            [0.75, 'rgba(0,0,0,0.85)'],
            [1.00, 'rgba(0,0,0,0.0)'],
          ]
        );

        band(
          x => top(x),
          x => top(x) + TH * 0.45,
          [
            [0.00, 'rgba(255,255,255,0.0)'],
            [0.20, 'rgba(245,245,247,0.65)'],
            [0.50, 'rgba(255,255,255,0.85)'],
            [0.80, 'rgba(245,245,247,0.65)'],
            [1.00, 'rgba(255,255,255,0.0)'],
          ]
        );

        strokeLine(top,    'rgba(50,50,53,0.55)',     1.0);
        strokeLine(crease, 'rgba(0,0,0,0.65)',        1.2);
        strokeLine(bot,    'rgba(120,120,123,0.20)',  0.7);

      } else {
        const CY   = 0.50;
        const th   = 0.080;
        const amp  = 0.100;
        const amp2 = 0.030;

        const bk = x => CY - 0.080 - amp * Math.sin(x * Math.PI * 1.4 + t * 0.55)
                        - amp2 * Math.sin(x * Math.PI * 3.0 + t * 0.38 + 0.8);
        const fr = x => CY + 0.020 - amp * 0.88 * Math.sin(x * Math.PI * 1.4 + t * 0.55 + 0.9)
                        - amp2 * Math.sin(x * Math.PI * 3.0 + t * 0.38 + 2.1);
        const dk = x => CY + 0.000 - amp * 0.94 * Math.sin(x * Math.PI * 1.4 + t * 0.55 + 0.45)
                        - amp2 * Math.sin(x * Math.PI * 3.0 + t * 0.38 + 1.4);

        band(x => bk(x) - th, x => dk(x) + 0.003, [
          [0.00, 'rgba(255,255,255,0)'],
          [0.05, 'rgba(200,200,203,0.48)'],
          [0.22, 'rgba(170,170,173,0.86)'],
          [0.52, 'rgba(133,133,136,0.93)'],
          [0.80, 'rgba(83,83,86,0.96)'],
          [0.97, 'rgba(36,36,39,0.99)'],
          [1.00, 'rgba(12,12,14,1)'],
        ]);
        band(x => dk(x) + 0.003, x => bk(x) + th * 1.5, [
          [0.00, 'rgba(8,8,10,1)'],
          [0.08, 'rgba(58,58,61,0.95)'],
          [0.34, 'rgba(123,123,126,0.87)'],
          [0.67, 'rgba(170,170,173,0.62)'],
          [0.91, 'rgba(216,216,218,0.23)'],
          [1.00, 'rgba(255,255,255,0)'],
        ]);
        band(x => dk(x) - 0.008, x => dk(x) + 0.042, [
          [0.00, 'rgba(0,0,0,0)'],
          [0.13, 'rgba(0,0,0,0.87)'],
          [0.42, 'rgba(0,0,0,0.98)'],
          [0.58, 'rgba(0,0,0,0.98)'],
          [0.87, 'rgba(0,0,0,0.87)'],
          [1.00, 'rgba(0,0,0,0)'],
        ]);
        band(x => fr(x) - th * 1.45, x => fr(x) + 0.003, [
          [0.00, 'rgba(255,255,255,0)'],
          [0.06, 'rgba(218,218,221,0.54)'],
          [0.27, 'rgba(188,188,191,0.90)'],
          [0.59, 'rgba(148,148,151,0.95)'],
          [0.86, 'rgba(73,73,76,0.97)'],
          [1.00, 'rgba(10,10,12,1)'],
        ]);
        band(x => fr(x) + 0.003, x => fr(x) + th * 1.35, [
          [0.00, 'rgba(6,6,8,1)'],
          [0.11, 'rgba(58,58,61,0.95)'],
          [0.39, 'rgba(138,138,141,0.87)'],
          [0.73, 'rgba(190,190,193,0.60)'],
          [0.93, 'rgba(224,224,226,0.23)'],
          [1.00, 'rgba(255,255,255,0)'],
        ]);
        band(x => fr(x) - th * 1.62, x => fr(x) - th * 1.12, [
          [0.00, 'rgba(255,255,255,0)'],
          [0.17, 'rgba(240,240,242,0.66)'],
          [0.50, 'rgba(250,250,252,0.90)'],
          [0.83, 'rgba(240,240,242,0.66)'],
          [1.00, 'rgba(255,255,255,0)'],
        ]);
        band(x => fr(x) - 0.013, x => fr(x) + 0.014, [
          [0.00, 'rgba(0,0,0,0)'],
          [0.33, 'rgba(0,0,0,0.82)'],
          [0.67, 'rgba(0,0,0,0.82)'],
          [1.00, 'rgba(0,0,0,0)'],
        ]);
        band(x => fr(x) + 0.032, x => fr(x) + 0.068, [
          [0.00, 'rgba(255,255,255,0)'],
          [0.30, 'rgba(200,200,203,0.26)'],
          [0.50, 'rgba(210,210,213,0.40)'],
          [0.70, 'rgba(200,200,203,0.26)'],
          [1.00, 'rgba(255,255,255,0)'],
        ]);
      }
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
        background: '#ffffff',
      }}
    />
  );
}
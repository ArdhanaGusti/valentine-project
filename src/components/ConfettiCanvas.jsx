import { useEffect, useRef } from "react";

export default function ConfettiCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const pieces = Array.from({ length: 200 }).map(createPiece);

    function createPiece() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 6 + 4,
        speed: Math.random() * 3 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`
      };
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        p.y += p.speed;
        if (p.y > canvas.height) Object.assign(p, createPiece());
      });
      requestAnimationFrame(draw);
    }

    draw();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} />;
}

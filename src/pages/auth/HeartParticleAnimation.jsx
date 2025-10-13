import { useEffect, useRef } from "react";

const HeartParticleAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height;
    let forming = false;

    const letters = ["", "", "", "", "", "", ""]; // keep as is
    const hearts = [];
    const heartShape = [];

    // Precompute a heart shape for forming
    for (let t = 0; t < Math.PI * 2; t += 0.1) {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);
      heartShape.push({ x, y });
    }

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight; // full height
      createHearts();
    };

    const createHearts = () => {
      hearts.length = 0;

      letters.forEach((letter) => {
        const particles = [];
        for (let i = 0; i < 100; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 4 + 2, // small hearts
            color: `rgba(255, 182, 193, ${Math.random() * 0.3 + 0.1})`, // light pink, low opacity
          });
        }
        hearts.push({ particles, letter, offsetX: 0 });
      });
    };

    const drawSmallHeart = (x, y, size, color) => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x, y - size / 2, x - size, y - size / 2, x - size, y);
      ctx.bezierCurveTo(x - size, y + size / 2, x, y + size / 1.5, x, y + size);
      ctx.bezierCurveTo(x, y + size / 1.5, x + size, y + size / 2, x + size, y);
      ctx.bezierCurveTo(x + size, y - size / 2, x, y - size / 2, x, y);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    const drawHeart = (heart) => {
      heart.particles.forEach((p) => drawSmallHeart(p.x, p.y, p.size, p.color));

      if (forming) {
        ctx.save();
        ctx.font = "bold 28px 'Great Vibes', cursive";
        ctx.fillStyle = "#820714";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ff7d93";
        ctx.fillText("", width / 2, height / 2); // letters ignored for random hearts
        ctx.restore();
      }
    };
    let gatherCenter = null;

    const updateHeart = (heart) => {
      heart.particles.forEach((p, i) => {
        if (forming) {
          // Pick a new gather center if not exists
          if (!gatherCenter) {
            gatherCenter = {
              x: Math.random() * width,
              y: Math.random() * height,
            };
          }

          // Each particle goes to a heart shape position relative to center
          const shape = heartShape[i % heartShape.length];

          // scale the heart and add random offset
          const scale = 6; // adjust heart size
          const targetX =
            gatherCenter.x + shape.x * scale + (Math.random() - 0.5) * 10;
          const targetY =
            gatherCenter.y - shape.y * scale + (Math.random() - 0.5) * 10;

          p.x += (targetX - p.x) * 0.05;
          p.y += (targetY - p.y) * 0.05;
        } else {
          // Scatter particles randomly
          if (!p.targetX || !p.targetY) {
            p.targetX = Math.random() * width;
            p.targetY = Math.random() * height;
          }
          p.x += (p.targetX - p.x) * 0.02;
          p.y += (p.targetY - p.y) * 0.02;

          if (Math.abs(p.x - p.targetX) < 1 && Math.abs(p.y - p.targetY) < 1) {
            p.targetX = Math.random() * width;
            p.targetY = Math.random() * height;
          }
        }
      });
    };

    // Toggle forming and reset gather center
    const toggle = setInterval(() => {
      forming = !forming;
      if (forming) gatherCenter = null;
    }, 4000);

    // Update the toggle interval to reset gatherCenter

    // const updateHeart = (heart) => {
    //   heart.particles.forEach((p, i) => {
    //     if (forming) {
    //       // If no gather target yet, pick a random position
    //       if (!p.gatherTargetX || !p.gatherTargetY) {
    //         p.gatherTargetX = Math.random() * width;
    //         p.gatherTargetY = Math.random() * height;
    //       }
    //       // Move smoothly to gather target
    //       p.x += (p.gatherTargetX - p.x) * 0.05;
    //       p.y += (p.gatherTargetY - p.y) * 0.05;
    //     } else {
    //       // Scatter to random positions
    //       if (!p.targetX || !p.targetY) {
    //         p.targetX = Math.random() * width;
    //         p.targetY = Math.random() * height;
    //       }
    //       p.x += (p.targetX - p.x) * 0.02;
    //       p.y += (p.targetY - p.y) * 0.02;

    //       // Once close to target, pick new scatter point
    //       if (Math.abs(p.x - p.targetX) < 1 && Math.abs(p.y - p.targetY) < 1) {
    //         p.targetX = Math.random() * width;
    //         p.targetY = Math.random() * height;

    //         // Clear old gather targets so next forming is new
    //         p.gatherTargetX = null;
    //         p.gatherTargetY = null;
    //       }
    //     }
    //   });
    // };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      hearts.forEach(drawHeart);
    };

    const update = () => {
      hearts.forEach(updateHeart);
    };

    const loop = () => {
      update();
      draw();
      requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);

    loop();

    return () => {
      clearInterval(toggle);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
  );
};

export default HeartParticleAnimation;

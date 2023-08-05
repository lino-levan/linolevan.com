import { useEffect, useRef } from "preact/hooks";

let speed = 130;
let frame = 0;
let dropped = false;
let water = new Array(250).fill(0).map(() => 0);
let waterOld = water.slice();

function render(ctx: CanvasRenderingContext2D) {
  ctx.canvas.width = window.innerWidth;

  // air
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, ctx.canvas.width, 100);

  // water
  const waterCopy = water.slice();
  for (let i = 1; i < water.length - 1; i++) {
    const newHeight = water[i - 1] + water[i + 1] - waterOld[i];
    waterCopy[i] = newHeight * 0.995;
  }
  waterOld = water.slice();
  water = waterCopy;

  ctx.fillStyle = "#ccfbf1";
  ctx.beginPath();
  ctx.moveTo(0, 200);

  const averageAmount = 3;
  for (let i = 0; i < water.length; i++) {
    let average = 0;
    let count = 0;
    for (let j = -averageAmount; j < averageAmount; j++) {
      if (i + j >= 0 && i + j < water.length) {
        average += water[i + j];
        count++;
      }
    }
    average /= count;
    ctx.lineTo(i * (ctx.canvas.width / (water.length - 1)), 100 - average);
  }
  ctx.lineTo(ctx.canvas.width, ctx.canvas.height);
  ctx.lineTo(0, ctx.canvas.height);
  ctx.closePath();
  ctx.fill();

  // handle water droplet
  const animFrame = frame % speed;

  if (animFrame === 0) {
    dropped = false;
  }

  const dropletHeight = animFrame * animFrame * 0.2 - 10;
  ctx.fillStyle = "#ccfbf1";
  ctx.ellipse(ctx.canvas.width / 2, dropletHeight, 10, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  if (
    dropletHeight > 100 - water[Math.floor(water.length / 2)] &&
    !dropped
  ) {
    water[Math.floor(water.length / 2)] += 30;
    dropped = true;
  }
  frame++;
}

function Pond() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d") as CanvasRenderingContext2D;

      document.addEventListener("keyup", (e) => {
        if (e.key === "ArrowUp") {
          speed -= 5;
        } else if (e.key === "ArrowDown") {
          speed += 5;
        }

        if (speed < 25) {
          speed = 25;
        }
        console.log(speed);
      });

      const interval = setInterval(() => render(ctx), 1000 / 60);
      return () => {
        clearInterval(interval);
      };
    }
  }, [canvas]);

  return (
    <div>
      <canvas height={100} ref={canvas}></canvas>
    </div>
  );
}

export default Pond;

import React, { useEffect } from "react";
import useCanvas from "../hooks/useCanvas";

function Canvas() {
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };
  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} />;
}

export default Canvas;

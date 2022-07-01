import React, { useEffect, useRef } from "react";

function Shapes() {
  const circleRef = useRef(null);
  const lineRef = useRef(null);
  const rectRef = useRef(null);
  useEffect(() => {
    //rect
    const rect = rectRef.current;
    const ctxr = rect.getContext("2d");
    ctxr.fillStyle = "green";
    ctxr.fillRect(10, 10, 50, 50);
    console.log(ctxr, "ctxr");
    console.log(rect, "rect");

    // circle
    const circle = circleRef.current;
    const ctxc = circle.getContext("2d");
    ctxc.beginPath();
    ctxc.arc(95, 50, 40, 0, 2 * Math.PI);
    ctxc.stroke();

    //line
    const line = lineRef.current;
    const ctxl = line.getContext("2d");
    ctxl.moveTo(0, 0);
    ctxl.lineTo(100, 200);
    ctxl.stroke();
  }, []);

  return (
    <div>
      <h1>Circle</h1>
      <canvas ref={circleRef} />
      <h1>line</h1>
      <canvas ref={lineRef} />
      <h1>rect</h1>
      <canvas ref={rectRef} />
    </div>
  );
}

export default Shapes;

import React, { useEffect } from "react";
import useCanvas from "../customHooks/useCanvas";

function Canvas(props) {
  const { draw, ...rest } = props;
  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} {...rest} />;
}

export default Canvas;

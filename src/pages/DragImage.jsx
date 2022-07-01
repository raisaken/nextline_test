import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { images } from "../assets/Images";

function DragImage() {
  const rectRef = useRef(null);
  const imageRef = useRef(null);
  const [image, setImage] = useState("");
  const handleImageChange = (id) => {
    setImage(id);
  };
  useEffect(() => {
    const rect = rectRef.current;
    const rectContext = rect.getContext("2d");
    rectContext.fillStyle = "green";
    rectContext.fillRect(10, 10, 70, 80);

    const base_image = new Image();
    base_image.src = image;
    base_image.onload = function () {
      rectContext.drawImage(base_image, 10, 10, 70, 80);
    };
  }, [image]);

  //styles

  const canvasStyle = {
    backgroundColor: "blue",
    border: "5px solid red",
    width: "800px",
    height: "600px",
  };

  return (
    // <Container>
    <Row>
      <Col md={8}>
        <h1>Canvas</h1>
        <canvas ref={rectRef} style={canvasStyle} />
      </Col>
      <Col md={4}>
        <h1>Click on Images to add it on canvas</h1>
        <Row>
          {images.map((item) => {
            return (
              <Col
                md={4}
                onClick={() => handleImageChange(item.img)}
                key={item.id}
              >
                <img src={item.img} alt={item.id} />
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
    // </Container>
  );
}

export default DragImage;

import React, { useEffect, useRef } from "react";

function DragImage() {
  const rectRef = useRef(null);
  const imageRef = useRef(null);
  let base_image;
  useEffect(() => {
    const rect = rectRef.current;
    const rectContext = rect.getContext("2d");
    rectContext.fillStyle = "green";
    rectContext.fillRect(10, 10, 40, 40);

    // const image = imageRef.current;
    // const imageContext = image.getContext("2d");

    const base_image = new Image();
    base_image.src = "https://source.unsplash.com/user/c_v_r/200x300 ";
    // imageContext.drawImage(base_image, 100, 100);
    base_image.onload = function () {
      rectContext.drawImage(base_image, 10, 10, 40, 40);
    };
    console.log(base_image, "base image");
  }, []);
  const images = [
    {
      id: 1,
      img: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      img: "https://source.unsplash.com/user/c_v_r/200x300 ",
    },
    {
      id: 3,
      img: "https://picsum.photos/id/237/200/300 ",
    },
  ];

  const imageStyle = {
    display: "flex",
    marginTop: "2%",
    marginLeft: "35%",
  };
  const canvasStyle = {
    backgroundColor: "blue",
    border: "5px solid red",
    width: "1200px",
    height: "600px",
  };
  const setImage = () => {};
  return (
    <>
      <canvas ref={rectRef} style={canvasStyle} />
      <div ref={imageRef}></div>
      <h1>Click on Images</h1>
      <div style={imageStyle}>
        {images.map((item) => {
          return (
            <div onClick={() => setImage(item.id)} key={item.id}>
              <img src={item.img} alt={item.id} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default DragImage;

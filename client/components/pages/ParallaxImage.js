import React from "react";

export default function ParallaxImage({
  url = "/images/b5.jpg",
  children,
  paddingTop = "100px",
  paddingBottom = "75px",
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${url})`,
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "block",
      }}
    >
      {children}
    </div>
  );
}

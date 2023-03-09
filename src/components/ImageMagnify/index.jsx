import React from "react";
import ReactImageMagnify from "react-image-magnify";

const ImageMagnify = (props, title, image) => {
  console.log("image magnify title: ", title)
  return (
    <div>
      <ReactImageMagnify
        {...props}
        {...{
          smallImage: {
            alt: title,
            isFluidWidth: true,
            src: require(image),
          },
          largeImage: {
            src: require(image),
            width: 1000,
            height: 480,
          },
          enlargedImageContainerStyle: {
            zIndex: "1500",
          },
          enlargedImageContainerDimensions: {
            width: "100%",
            height: "100%",
          },
        }}
      />
    </div>
  );
};

export default ImageMagnify;

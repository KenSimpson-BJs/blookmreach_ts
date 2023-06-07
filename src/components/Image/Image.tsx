import React from "react";
import { Button, Container } from "react-bootstrap";
import styles from "./Image.module.scss";
import { getSelectionValue } from "../../utils/general";

interface Image {
  image: image;
  imageFormat: string;
}

export function Image(props: Image): React.ReactElement | null {
  const { image, imageFormat } = props ?? {};

  const { imageDesktop, imageMobile, alt, imgfit } = image;

  const imgOutput = () => {
    return (
      <img
        src={imageMobile}
        alt={alt}
        className={`d-block w-100 h-100 ${
          imgfit && getSelectionValue(imgfit) !== "default"
            ? ` ${styles.imgfit} ${
                styles[`imgfit-${getSelectionValue(imgfit)}`]
              }`
            : ""
        }`}
      />
    );
  };
  const imgWrapper = () => {
    if (imageDesktop)
      return (
        <picture>
          <source media="(min-width: 768px)" srcSet={imageDesktop} />
          {imgOutput()}
        </picture>
      );
    return imgOutput();
  };

  return (
    <div
      className={`d-inline-block ${styles.imgwrap}${
        imageFormat !== "Default"
          ? " mx-auto " + styles[imageFormat.toLowerCase()]
          : ""
      }`}
    >
      {imgWrapper()}
    </div>
  );
}

import React from "react";
import { Button, Container } from "react-bootstrap";
import styles from "./Image.module.scss";
import { getSelectionValue } from "../../utils/general";

interface Image {
  image: image;
}

export function Image(props: Image): React.ReactElement | null {
  const { image } = props ?? {};

  const { imageDesktop, imageMobile, alt, imgfit, icon } = image;

  const imgOutput = () => {
    return (
      <img
        src={imageMobile}
        alt={alt}
        className={`d-block w-100 ${
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
        icon ? ` ${styles.icon}` : ""
      }`}
    >
      {imgWrapper()}
    </div>
  );
}

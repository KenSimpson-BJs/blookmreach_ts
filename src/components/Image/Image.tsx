import React from "react";
import { Button, Container } from "react-bootstrap";
import styles from "./Image.module.scss";
import { selectionValue } from "../../utils/general";

interface Image {
  image: image;
}

export function Image(props: Image): React.ReactElement | null {
  const { image } = props ?? {};

  const { imageDesktop, imageMobile, alt, imgfit, icon } = image;

  return (
    <picture>
      {imageDesktop && (
        <source media="(min-width: 768px)" srcSet={imageDesktop} />
      )}
      <img
        src={imageMobile}
        alt={alt}
        className={`d-block ${styles.img}${icon ? ` ${styles.icon}` : ""}${
          imgfit && selectionValue(imgfit) !== "default"
            ? ` ${styles.imgfit} ${styles[`imgfit-${selectionValue(imgfit)}`]}`
            : ""
        }`}
      />
    </picture>
  );
}

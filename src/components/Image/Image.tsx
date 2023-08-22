import React from "react";
import styles from "./Image.module.scss";
import { getSelectionValue } from "../../utils/general";

interface Image {
  image: image;
  imageFormat: string;
}

export function Image(props: Image): React.ReactElement | null {
  const { image, imageFormat } = props ?? {};

  const { imageDesktop, imageMobile, alt, imgfit } = image;

  const imgOutput = () => (
    <img
      src={imageMobile}
      alt={alt}
      className={`d-block w-100 h-100 ${
        imgfit && getSelectionValue(imgfit) !== "default"
          ? ` ${styles.imgfit} ${styles[`imgfit-${getSelectionValue(imgfit)}`]}`
          : ""
      }`}
    />
  );
  const imgWrapper = () =>
    imageDesktop ? (
      <picture>
        <source media="(min-width: 768px)" srcSet={imageDesktop} />
        {imgOutput()}
      </picture>
    ) : (
      imgOutput()
    );

  const getClassNames = (classNames: string) =>
    classNames
      .split(" ")
      .map((className) => styles[className.toLowerCase()])
      .join(" ");

  return (
    <div
      className={`${styles.imgwrap}${
        imageFormat !== "Default"
          ? " mx-auto " + getClassNames(imageFormat)
          : ""
      }`}
    >
      {imgWrapper()}
    </div>
  );
}

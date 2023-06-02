import React from "react";
import { Container } from "react-bootstrap";
import { ContainerItem, getContainerItemContent } from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";

// internal components
import { Link } from "../Link";
import { Image } from "../Image/Image";
import { CTA } from "../CTA/CTA";

// internal utils
import { setSelectionValue } from "../../utils/general";

// styles
import styles from "./Tile.module.scss";

interface Tile {
  content?: Content;
  cta?: Cta;
  analytics?: Anchor;
  title?: string;
  textAlignment?: string;
  image?: image;
  shadowed?: boolean;
  imageFormat: string;
}

export function Tile(props: Tile): React.ReactElement | null {
  const {
    title,
    content,
    cta,
    image,
    analytics: link,
    imageFormat,
    shadowed,
    textAlignment,
  } = props;

  if (image) {
    if (image.imgfit && imageFormat === "Circular")
      setSelectionValue(image.imgfit, "center");
  }

  const textAlign = () =>
    `text-${textAlignment ? `${textAlignment.toLowerCase()}` : "center"}`;

  const imageContainer = () => {
    return image ? (
      <div
        className={`${styles["tile-image-cont"]}${
          shadowed ? ` ${styles.shadowed}` : ""
        } col-12 px-0`}
      >
        <Image image={image} imageFormat={imageFormat}></Image>
      </div>
    ) : null;
  };

  const titleOutput = () => {
    return (
      title && (
        <h3 className={`font-weight-bold ${textAlign()} mx-auto pt-3`}>
          {title}
        </h3>
      )
    );
  };

  const ctaOutput = () => {
    return cta ? <CTA cta={cta}></CTA> : null;
  };

  const textContainer = (
    titleNode?: React.ReactNode,
    ctaNode?: React.ReactNode
  ) => {
    return (
      <div className={`${styles["tile-text-cont"]} ${textAlign()} col-12 py-3`}>
        {titleNode}
        {content && (
          <div dangerouslySetInnerHTML={{ __html: content.value }}></div>
        )}
        {ctaNode}
      </div>
    );
  };

  const tileOutput = () => {
    if (link && link.href) {
      if (content && content.value.includes("<a"))
        return (
          <>
            <Link
              link={link}
              className={`d-flex flex-wrap text-decoration-none mt-2 ${styles.tile}`}
            >
              {imageContainer()}
              <div className={`col-12 ${textAlign()}`}>{titleOutput()}</div>
              <div className={`col-12 ${textAlign()}`}>{ctaOutput()}</div>
            </Link>
            {textContainer()}
          </>
        );

      return (
        <Link
          link={link}
          className={`d-flex flex-wrap text-decoration-none mt-2 ${styles.tile}`}
        >
          {imageContainer()}
          {textContainer(titleOutput(), ctaOutput())}
        </Link>
      );
    }

    return (
      <>
        {imageContainer()}
        {textContainer(titleOutput())}
      </>
    );
  };

  return <Container>{tileOutput()}</Container>;
}

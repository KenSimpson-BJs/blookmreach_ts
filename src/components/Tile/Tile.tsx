import React from "react";
import { Container } from "react-bootstrap";
import { ContainerItem, getContainerItemContent } from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";

// internal components
import { Link } from "../Link";
import { Image } from "../Image/Image";
import { CTA } from "../CTA/CTA";

// internal utils
import { getSelectionValue, setSelectionValue } from "../../utils/general";

// styles
import styles from "./Tile.module.scss";
import titleStyles from "../ComponentCSSRules/titleTextRules.module.scss";

interface Tile {
  titleText?: titleTextFG;
  cta?: Cta;
  analytics?: Anchor;
  image?: image;
  shadow?: boolean;
  imageFormat: string;
  textAlignment?: string;
}

export function Tile(props: Tile): React.ReactElement | null {
  const {
    titleText,
    cta,
    image,
    analytics: link,
    imageFormat,
    shadow,
    textAlignment,
  } = props;

  if (image) {
    if (image.imgfit && imageFormat === "Circular")
      setSelectionValue(image.imgfit, "center");
  }

  const imageFormatStyles = (imageFormat: string) => {
    if (imageFormat !== "Default")
      return " " + styles[imageFormat.toLowerCase()];
    return "";
  };

  const textAlign = () =>
    `text-${
      textAlignment
        ? textAlignment.toLowerCase()
        : titleText?.textAlignment
        ? getSelectionValue(titleText?.textAlignment)
        : "center"
    }`;

  const imageContainer = () => {
    return image ? (
      <div
        className={`${styles["tile-image-cont"]}${imageFormatStyles(
          imageFormat
        )}${shadow ? " " + styles.shadow : ""} col-12 px-0`}
      >
        <Image image={image} imageFormat={imageFormat}></Image>
      </div>
    ) : null;
  };

  const subcopyClass = (subcopySize: SelectionType | undefined) => {
    if (!subcopySize) return ` ${titleStyles["bjsSubcopyMedium"]}`;
    return ` ${titleStyles["bjsSubcopy" + getSelectionValue(subcopySize)]}`;
  };

  const titleOutput = (titleObj?: titleTextFG) => {
    if (!titleObj || !titleObj.titleText) return;

    const {
      titleText: { title },
      headlineSize,
    } = titleObj;

    const headlineClass = () => {
      if (!headlineSize)
        return ` ${titleStyles["bjsHeadlineMedium"]} mx-auto pt-3`;
      return ` ${titleStyles["bjsHeadline" + getSelectionValue(headlineSize)]}`;
    };

    switch (headlineSize ? getSelectionValue(headlineSize) : "Medium") {
      case "Small":
        return <h4 className={headlineClass()}>{title}</h4>;
      case "Medium":
        return <h3 className={headlineClass()}>{title}</h3>;
      case "Large":
        return <h2 className={headlineClass()}>{title}</h2>;
      case "Huge":
        return <h1 className={headlineClass()}>{title}</h1>;
      default:
        return <h1 className={headlineClass()}>{title}</h1>;
    }
  };

  const ctaOutput = () => {
    return cta ? <CTA cta={cta}></CTA> : null;
  };

  const textContainer = (
    titleNode?: React.ReactNode,
    ctaNode?: React.ReactNode
  ) => {
    if (!titleText?.titleText?.text) return;
    const { text } = titleText.titleText;
    return (
      <div className={`${styles["tile-text-cont"]} ${textAlign()} col-12 py-3`}>
        {titleNode}
        {text && (
          <div
            className={subcopyClass(titleText?.subcopySize)}
            dangerouslySetInnerHTML={{ __html: text.value }}
          ></div>
        )}
        {ctaNode}
      </div>
    );
  };

  const tileOutput = () => {
    if (link?.href) {
      if (titleText?.titleText?.text?.value.includes("<a"))
        return (
          <>
            <Link
              link={link}
              className={`d-flex flex-wrap text-decoration-none mt-2 ${styles.tile}`}
            >
              {imageContainer()}
              <div className={`col-12 ${textAlign()}`}>
                {titleOutput(titleText)}
              </div>
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
          {textContainer(titleOutput(titleText), ctaOutput())}
        </Link>
      );
    }

    return (
      <>
        {imageContainer()}
        {textContainer(titleOutput(titleText))}
      </>
    );
  };

  return (
    <Container
      className={`${
        titleText?.textColor
          ? ` ${
              titleStyles["bjsText" + getSelectionValue(titleText?.textColor)]
            }`
          : ` ${titleStyles["bjsTextGrayBlack"]}`
      } py-3`}
    >
      {tileOutput()}
    </Container>
  );
}

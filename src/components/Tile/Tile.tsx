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
  headlineSize?: string;
  subcopySize?: string;
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
    headlineSize: globalHeadlineSize,
    subcopySize: globalSubcopySize,
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

  const titleOutput = () => {
    if (!titleText || !titleText.titleText) return;
    const {
      titleText: { title },
      headlineSize,
    } = titleText;

    const headlineArg = globalHeadlineSize
      ? globalHeadlineSize
      : getSelectionValue(headlineSize);

    const headlineClass = (headlineSize: SelectionType | string) => {
      return ` ${titleStyles["bjsHeadline" + headlineSize]}`;
    };

    switch (headlineArg) {
      case "Small":
        return <h4 className={headlineClass(headlineArg)}>{title}</h4>;
      case "Medium":
        return <h3 className={headlineClass(headlineArg)}>{title}</h3>;
      case "Large":
        return <h2 className={headlineClass(headlineArg)}>{title}</h2>;
      case "Huge":
        return <h1 className={headlineClass(headlineArg)}>{title}</h1>;
      default:
        return <h1 className={headlineClass(headlineArg)}>{title}</h1>;
    }
  };

  const subcopyClass = () => {
    const subcopyArg = globalSubcopySize
      ? globalSubcopySize
      : titleText && getSelectionValue(titleText?.subcopySize);
    return ` ${titleStyles["bjsSubcopy" + subcopyArg]}`;
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
            className={subcopyClass()}
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

  return (
    <Container
      className={`tile ${
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

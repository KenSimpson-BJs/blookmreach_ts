import React from "react";
import { Container } from "react-bootstrap";

// internal
import { Link, Image, CTA, Title, Subcopy } from "..";

// utils
import { getSelectionValue, textToHorizontalFlex } from "../../utils/general";

// styles
import styles from "./Card.module.scss";
import widthStyles from "../ComponentCSSRules/widthStyles.module.scss";
import titleStyles from "../ComponentCSSRules/titleTextRules.module.scss";

interface Card {
  background?: string;
  titleText?: TitleTextFG;
  layout?: SelectionType;
  cta?: Cta;
  link?: Anchor;
  image?: image;
  icon?: boolean;
  shadow?: boolean;
  imageFormat: string;
  horizontalAlign?: SelectionType;
  verticalAlign?: SelectionType;
  textAlignment?: string;
  headlineSize?: string;
  subcopySize?: string;
  maxWidth?: string;
}

export function Card(props: Card): React.ReactElement | null {
  const {
    background,
    titleText,
    layout,
    cta,
    image,
    imageFormat,
    link: link,
    shadow,
    horizontalAlign,
    verticalAlign,
    textAlignment,
    headlineSize: globalHeadlineSize,
    subcopySize: globalSubcopySize,
    maxWidth,
  } = props;

  const flexDirection =
    layout && layout.selectionValues[0].key.length > 0
      ? layout.selectionValues[0].key
      : "column";
  const fontColor = () =>
    titleText?.textColor
      ? ` ${titleStyles["bjsText" + getSelectionValue(titleText?.textColor)]}`
      : ` ${titleStyles["bjsTextGrayBlack"]}`;

  const titleClass =
    globalHeadlineSize ??
    (titleText?.headlineSize && getSelectionValue(titleText.headlineSize));
  const subcopyClass =
    globalSubcopySize ??
    (titleText?.subcopySize && getSelectionValue(titleText?.subcopySize));
  const verticalAlignClass = verticalAlign
    ? `${getSelectionValue(verticalAlign)}`
    : "center";
  const horitonzalAlignClass = textAlignment
    ? textToHorizontalFlex(textAlignment)
    : horizontalAlign
    ? `${getSelectionValue(horizontalAlign)}`
    : "center";
  const textAlignClass =
    textAlignment?.toLowerCase() ??
    (titleText?.textAlignment
      ? getSelectionValue(titleText?.textAlignment)
      : "center");
  const maxWidthClass = maxWidth ? widthStyles["w-" + maxWidth] : "";
  const imageFormatClassRounded =
    imageFormat === "Rounded" ? ` ${styles.rounded}` : "";
  const imageFormatClass =
    imageFormat === "Circular" || imageFormat === "Icon"
      ? ` px-3 ${textAlignment ? "pt-3" : "py-3 d-flex align-items-center"}`
      : "";

  return (
    <Container
      className={`${widthStyles.unsetContainerWidth} text-${textAlignClass} pt-2 py-3`}
    >
      {link && (
        <Link
          link={link}
          className={`${fontColor()} ${maxWidthClass} d-flex flex-${flexDirection} flex-wrap h-100 text-decoration-none 
          ${styles.card}${imageFormatClassRounded}${styles.shadow ?? ""}`}
          background={background ?? "#fff"}
        >
          {image && (
            <div
              className={`px-0 ${styles["card-image-cont"]}${
                flexDirection.includes("row") ? " col-12 col-sm-7" : " w-100"
              }${imageFormatClass}`}
            >
              <Image
                image={image}
                imageFormat={
                  imageFormat !== "Rounded" ? imageFormat : "Default"
                }
              ></Image>
            </div>
          )}
          <div
            className={`${styles["card-text-cont"]}${
              flexDirection.includes("row")
                ? ` col-12 col-sm-5 d-flex flex-column justify-content-${verticalAlignClass} align-items-${horitonzalAlignClass}`
                : ""
            }`}
          >
            <div>
              <Title title={titleText?.title} titleSize={titleClass ?? ""} />
              <Subcopy
                text={titleText?.text}
                subcopySize={subcopyClass ?? ""}
              />

              {cta && cta?.cta?.length > 0 && <CTA cta={cta}></CTA>}
            </div>
          </div>
        </Link>
      )}
    </Container>
  );
}

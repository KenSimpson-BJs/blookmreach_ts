import React from "react";
import { Container } from "react-bootstrap";

// internal
import { Link } from "../Link/Link";
import { Image } from "../Image/Image";
import { CTA } from "../CTA/CTA";

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

  const titleOutput = () => {
    if (!titleText || !titleText.title) return <></>;
    const { title, headlineSize } = titleText;

    const headlineArg = globalHeadlineSize
      ? globalHeadlineSize
      : getSelectionValue(headlineSize);

    const headlineClass = (headlineSize: SelectionType | string) => {
      return ` ${titleStyles["bjsHeadline" + headlineSize]}`;
    };

    switch (headlineArg) {
      case "Small":
        return (
          <h4
            className={headlineClass(headlineArg)}
            dangerouslySetInnerHTML={{
              __html: title.value,
            }}
          ></h4>
        );
      case "Medium":
        return (
          <h3
            className={headlineClass(headlineArg)}
            dangerouslySetInnerHTML={{
              __html: title.value,
            }}
          ></h3>
        );
      case "Large":
        return (
          <h2
            className={headlineClass(headlineArg)}
            dangerouslySetInnerHTML={{
              __html: title.value,
            }}
          ></h2>
        );
      case "Huge":
        return (
          <h1
            className={headlineClass(headlineArg)}
            dangerouslySetInnerHTML={{
              __html: title.value,
            }}
          ></h1>
        );
      default:
        return (
          <h1
            className={headlineClass(headlineArg)}
            dangerouslySetInnerHTML={{
              __html: title.value,
            }}
          ></h1>
        );
    }
  };

  const subcopyClass = () => {
    const subcopyArg = globalSubcopySize
      ? globalSubcopySize
      : titleText && getSelectionValue(titleText?.subcopySize);
    return ` ${titleStyles["bjsSubcopy" + subcopyArg]}`;
  };

  return (
    <Container
      className={`${widthStyles.unsetContainerWidth} text-${
        textAlignment
          ? textAlignment.toLowerCase()
          : titleText?.textAlignment
          ? getSelectionValue(titleText?.textAlignment)
          : "center"
      } pt-2 py-3`}
    >
      {link && (
        <Link
          link={link}
          className={`${fontColor()} ${
            maxWidth ? widthStyles["w-" + maxWidth] : ""
          } d-flex flex-${flexDirection} flex-wrap h-100 text-decoration-none ${
            styles.card
          }${imageFormat === "Rounded" ? ` ${styles.rounded}` : ""}${
            shadow ? ` ${styles.shadow}` : ""
          }`}
          background={background ?? "#fff"}
        >
          {image && (
            <div
              className={`px-0 ${styles["card-image-cont"]}${
                flexDirection.includes("row") ? " col-12 col-sm-7" : " w-100"
              }${
                imageFormat === "Circular" || imageFormat === "Icon"
                  ? ` px-3 ${
                      textAlignment ? "pt-3" : "py-3 d-flex align-items-center"
                    }`
                  : ""
              }`}
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
                ? ` col-12 col-sm-5 d-flex flex-column justify-content-${
                    verticalAlign
                      ? `${getSelectionValue(verticalAlign)}`
                      : "center"
                  } align-items-${
                    textAlignment
                      ? textToHorizontalFlex(textAlignment)
                      : horizontalAlign
                      ? `${getSelectionValue(horizontalAlign)}`
                      : "center"
                  }`
                : ""
            }`}
          >
            <div>
              {titleOutput()}
              {titleText?.text && (
                <div
                  className={subcopyClass()}
                  dangerouslySetInnerHTML={{
                    __html: titleText?.text?.value,
                  }}
                ></div>
              )}
              {cta && cta?.cta?.length > 0 && <CTA cta={cta}></CTA>}
            </div>
          </div>
        </Link>
      )}
    </Container>
  );
}

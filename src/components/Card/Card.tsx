import React from "react";
import { Container } from "react-bootstrap";

// internal
import { Link } from "../Link";
import { Image } from "../Image/Image";
import { CTA } from "../CTA/CTA";

// utils
import { getSelectionValue, textToHorizontalFlex } from "../../utils/general";

// styles
import styles from "./Card.module.scss";
import titleStyles from "../ComponentCSSRules/titleTextRules.module.scss";

interface Card {
  background?: string;
  titleText?: titleTextFG;
  layout?: SelectionType;
  cta?: Cta;
  analytics?: Anchor;
  image?: image;
  icon?: boolean;
  shadow?: boolean;
  imageFormat: string;
  horizontalAlign?: SelectionType;
  verticalAlign?: SelectionType;
  textAlignment?: string;
}

export function Card(props: Card): React.ReactElement | null {
  const {
    background,
    titleText,
    layout,
    cta,
    image,
    imageFormat,
    analytics: link,
    shadow,
    horizontalAlign,
    verticalAlign,
    textAlignment,
  } = props;

  const flexDirection = layout ? layout.selectionValues[0].key : "column";

  const titleOutput = (titleObj?: titleTextFG) => {
    if (!titleObj || !titleObj.titleText) return <></>;

    const {
      titleText: { title },
      headlineSize,
    } = titleObj;

    const headlineClass = () => {
      if (!headlineSize) return ` ${titleStyles["bjsHeadlineMedium"]}`;
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

  const subcopyClass = (subcopySize: SelectionType | undefined) => {
    if (!subcopySize) return ` ${titleStyles["bjsSubcopyMedium"]}`;
    return ` ${titleStyles["bjsSubcopy" + getSelectionValue(subcopySize)]}`;
  };

  return (
    <Container
      className={`text-${
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
          className={`d-flex flex-${flexDirection} flex-wrap h-100 text-decoration-none ${
            styles.card
          }${imageFormat === "Rounded" ? ` ${styles.rounded}` : ""}${
            shadow ? ` ${styles.shadow}` : ""
          }`}
          background={background ? background : "#fff"}
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
              titleText?.textColor
                ? ` ${
                    titleStyles[
                      "bjsText" + getSelectionValue(titleText?.textColor)
                    ]
                  }`
                : ` ${titleStyles["bjsTextGrayBlack"]}`
            }${
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
              {titleOutput(titleText)}
              {titleText?.titleText?.text && (
                <div
                  className={subcopyClass(titleText?.subcopySize)}
                  dangerouslySetInnerHTML={{
                    __html: titleText?.titleText?.text?.value,
                  }}
                ></div>
              )}
              {cta && <CTA cta={cta}></CTA>}
            </div>
          </div>
        </Link>
      )}
    </Container>
  );
}

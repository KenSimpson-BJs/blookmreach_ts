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

  const rounded: boolean = true;
  const flexDirection = layout ? layout.selectionValues[0].key : "column";

  return (
    <Container
      className={`text-${
        textAlignment
          ? textAlignment.toLowerCase()
          : titleText?.textAlignment
          ? getSelectionValue(titleText?.textAlignment)
          : "center"
      } pt-2`}
    >
      {link && (
        <Link
          link={link}
          className={`d-flex flex-${flexDirection} flex-wrap h-100 text-decoration-none ${
            styles.card
          }${rounded ? ` ${styles.rounded}` : ""}${
            shadow ? ` ${styles.shadow}` : ""
          }`}
          background={background ? background : "#fff"}
        >
          {image && (
            <div
              className={`px-0 ${styles["card-image-cont"]}${
                flexDirection.includes("row") ? " col-12 col-sm-7" : " w-100"
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
              {titleText?.titleText?.title && (
                <h3
                  className={`font-weight-bold${
                    titleText?.headlineSize
                      ? ` ${
                          titleStyles[
                            "bjsHeadline" +
                              getSelectionValue(titleText?.headlineSize)
                          ]
                        }`
                      : ` ${titleStyles["bjsHeadlineMedium"]}`
                  }`}
                >
                  {titleText?.titleText?.title}
                </h3>
              )}
              {titleText?.titleText?.text && (
                <div
                  className={`${
                    titleText?.subcopySize
                      ? ` ${
                          titleStyles[
                            "bjsSubcopy" +
                              getSelectionValue(titleText?.subcopySize)
                          ]
                        }`
                      : ` ${titleStyles["bjsSubcopyMedium"]}`
                  }`}
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

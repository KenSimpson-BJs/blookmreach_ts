import React from "react";
import { Container } from "react-bootstrap";

// internal
import { Link } from "../Link";
import { Image } from "../Image/Image";
import { CTA } from "../CTA/CTA";

// utils
import { getSelectionValue, textToHorizontalFlex } from "../../utils/general";

// styles
import styles from "./BannerCTA.module.scss";
import titleStyles from "../ComponentCSSRules/titleTextRules.module.scss";
import widthStyles from "../ComponentCSSRules/widthStyles.module.scss";

interface BannerCTA {
  background?: string;
  titleText?: titleTextFG;
  cta?: Cta;
  analytics?: Anchor;
  image?: image;
  imageFormat: string;
  icon?: boolean;
  shadow?: boolean;
  rounded?: boolean;
  verticalAlign?: SelectionType;
  horizontalAlign?: SelectionType;
  disclaimer?: Content;
  textAlignment?: string;
  maxWidth?: string;
}

export function BannerCTA(props: BannerCTA): React.ReactElement | null {
  const {
    background,
    titleText,
    cta,
    disclaimer,
    image,
    imageFormat,
    analytics: link,
    shadow,
    rounded,
    textAlignment,
    verticalAlign,
    horizontalAlign,
    maxWidth,
  } = props;

  const bannerOutput = () => {
    return (
      <>
        {image && (
          <div className={`px-0 ${styles["banner-image-cont"]}`}>
            <Image
              image={image}
              imageFormat={imageFormat === "Rounded" ? imageFormat : "Default"}
            ></Image>
            <div
              className={`${styles["banner-text-cont"]}${
                titleText?.textColor
                  ? ` ${
                      titleStyles[
                        "bjsText" + getSelectionValue(titleText?.textColor)
                      ]
                    }`
                  : ` ${titleStyles["bjsTextGrayBlack"]}`
              } text-${
                textAlignment
                  ? textAlignment.toLowerCase()
                  : titleText?.textAlignment
                  ? getSelectionValue(titleText?.textAlignment)
                  : "center"
              } d-flex flex-column justify-content-${
                verticalAlign ? `${getSelectionValue(verticalAlign)}` : "center"
              } align-items-${
                textAlignment
                  ? textToHorizontalFlex(textAlignment)
                  : horizontalAlign
                  ? `${getSelectionValue(horizontalAlign)}`
                  : "center"
              } py-3`}
            >
              <div>
                {titleText?.titleText?.title && (
                  <h2
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
                  </h2>
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
                {link && link.href && cta && <CTA cta={cta}></CTA>}
                {disclaimer && (
                  <div
                    className={styles.disclaimer}
                    dangerouslySetInnerHTML={{
                      __html: disclaimer.value,
                    }}
                  ></div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <Container>
      {link && link.href ? (
        <Link
          link={link}
          className={`${maxWidth ? widthStyles["w-" + maxWidth] : ""} ${
            styles.banner
          }${imageFormat === "Rounded" ? ` ${styles.rounded}` : ""}${
            shadow ? ` ${styles.shadow}` : ""
          }`}
          background={background ? background : "#fff"}
        >
          {bannerOutput()}
        </Link>
      ) : (
        <div
          className={`${maxWidth ? widthStyles["w-" + maxWidth] : ""} ${
            styles.banner
          }${imageFormat === "Rounded" ? ` ${styles.rounded}` : ""}${
            shadow ? ` ${styles.shadow}` : ""
          }`}
        >
          {bannerOutput()}
        </div>
      )}
    </Container>
  );
}

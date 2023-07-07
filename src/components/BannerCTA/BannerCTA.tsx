import React from "react";
import { Container } from "react-bootstrap";

// internal
import { Link } from "../Link/Link";
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
  link?: Anchor;
  image?: image;
  imageFormat: string;
  icon?: boolean;
  shadow?: boolean;
  verticalAlign?: SelectionType;
  horizontalAlign?: SelectionType;
  disclaimer?: Content;
  textAlignment?: string;
  maxWidth?: string;
  headlineSize?: string;
  subcopySize?: string;
}

export function BannerCTA(props: BannerCTA): React.ReactElement | null {
  const {
    background,
    titleText,
    cta,
    disclaimer,
    image,
    imageFormat,
    link: link,
    shadow,
    textAlignment,
    verticalAlign,
    horizontalAlign,
    maxWidth,
    headlineSize: globalHeadlineSize,
    subcopySize: globalSubcopySize,
  } = props;

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

  const textColorClass = () =>
    titleText?.textColor
      ? ` ${titleStyles["bjsText" + getSelectionValue(titleText?.textColor)]}`
      : ` ${titleStyles["bjsTextGrayBlack"]}`;

  const textAlignmentClass = () =>
    textAlignment
      ? "align-items-" + textAlignment.toLowerCase()
      : titleText?.textAlignment
      ? "align-items-" + getSelectionValue(titleText?.textAlignment)
      : "align-items-center";

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
              className={`${styles["banner-text-cont"]}${textColorClass} text-${
                textAlignment
                  ? textAlignment.toLowerCase()
                  : titleText?.textAlignment
                  ? getSelectionValue(titleText?.textAlignment)
                  : "center"
              } d-flex flex-column justify-content-${
                verticalAlign ? `${getSelectionValue(verticalAlign)}` : "center"
              } ${textAlignmentClass} py-3`}
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
                {link?.href && cta && cta?.cta?.length > 0 && (
                  <CTA cta={cta}></CTA>
                )}
                {disclaimer && (
                  <div
                    className={titleStyles.disclaimer}
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
    <Container className={`py-3 ${widthStyles.unsetContainerWidth}`}>
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

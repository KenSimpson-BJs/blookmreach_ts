import React from "react";
import { Container } from "react-bootstrap";

// internal
import { Link, Image, CTA, Title, Subcopy } from "..";

// utils
import { getSelectionValue, textToHorizontalFlex } from "../../utils/general";

// styles
import styles from "./BannerCTA.module.scss";
import titleStyles from "../ComponentCSSRules/titleTextRules.module.scss";
import widthStyles from "../ComponentCSSRules/widthStyles.module.scss";

interface BannerCTA {
  background?: string;
  titleText?: TitleTextFG;
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

  console.log(horizontalAlign);

  const fontColor = () => {
    const selectedColor = titleText?.textColor
      ? getSelectionValue(titleText.textColor)
      : "GrayBlack";
    return ` ${titleStyles["bjsText" + selectedColor]}`;
  };

  // horiontal alignment of the text container
  const containerAlignments = () => {
    const alignmentValue =
      textAlignment ||
      (horizontalAlign && getSelectionValue(horizontalAlign)) ||
      "center";

    return `align-items-md-${alignmentValue.toLowerCase()}`;
  };

  // alignment of the text within it's container
  const textAlignmentClass = () => {
    const alignmentFromTitleText = titleText?.textAlignment
      ? getSelectionValue(titleText?.textAlignment)
      : null;

    return textAlignment
      ? textAlignment.toLowerCase()
      : alignmentFromTitleText || "center";
  };

  const bannerOutput = () => {
    return (
      image && (
        <div className={`px-0 ${styles["banner-image-cont"]}`}>
          <Image
            image={image}
            imageFormat={imageFormat === "Rounded" ? imageFormat : "Default"}
          ></Image>
          <div
            className={`${
              styles["banner-text-cont"]
            } d-flex flex-column justify-content-start justify-content-md-${
              verticalAlign ? getSelectionValue(verticalAlign) : "center"
            } align-items-center ${containerAlignments()} py-3`}
          >
            <div className={`text-${textAlignmentClass()}`}>
              <Title
                title={titleText?.title ?? { value: "" }}
                titleSize={
                  globalHeadlineSize ??
                  (titleText?.headlineSize
                    ? getSelectionValue(titleText?.headlineSize)
                    : "")
                }
                className="mb-3"
              />

              <Subcopy
                text={titleText?.text}
                subcopySize={
                  globalSubcopySize ??
                  (titleText?.subcopySize
                    ? getSelectionValue(titleText?.subcopySize)
                    : "")
                }
                className="mb-2"
              />
              {link?.href && cta && cta?.cta?.length > 0 && <CTA cta={cta} />}
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
      )
    );
  };

  const commonClassName = `${fontColor()} ${
    maxWidth ? widthStyles["w-" + maxWidth] : ""
  } ${styles.banner}${imageFormat === "Rounded" ? ` ${styles.rounded}` : ""}${
    shadow ? ` ${styles.shadow}` : ""
  }`;

  return (
    <Container className={`py-3 ${widthStyles.unsetContainerWidth}`}>
      {link && link.href ? (
        <Link
          link={link}
          className={commonClassName}
          background={background ? background : "#fff"}
        >
          {bannerOutput()}
        </Link>
      ) : (
        <div className={commonClassName}>{bannerOutput()}</div>
      )}
    </Container>
  );
}

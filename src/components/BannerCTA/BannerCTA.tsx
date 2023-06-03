import React from "react";
import { Container } from "react-bootstrap";

// internal
import { Link } from "../Link";
import { Image } from "../Image/Image";
import { CTA } from "../CTA/CTA";

// styles
import styles from "./BannerCTA.module.scss";
import { getSelectionValue } from "../../utils/general";

interface BannerCTA {
  background?: string;
  title?: string;
  content?: Content;
  cta?: Cta;
  analytics?: Anchor;
  image?: image;
  imageFormat: string;
  icon?: boolean;
  shadowed?: boolean;
  rounded?: boolean;
  textAlignment?: string;
}

export function BannerCTA(props: BannerCTA): React.ReactElement | null {
  const {
    background,
    title,
    content,
    cta,
    image,
    imageFormat,
    analytics: link,
    textAlignment,
    shadowed,
    rounded,
  } = props;

  const bannerOutput = () => {
    return (
      <>
        {image && (
          <div className={`px-0 ${styles["banner-image-cont"]}`}>
            <Image image={image} imageFormat={imageFormat}></Image>
            <div
              className={`${styles["banner-text-cont"]} text-${
                textAlignment ? textAlignment : "center"
              } d-flex flex-column justify-content-center align-items-center py-3`}
            >
              {title && <h3 className="font-weight-bold">{title}</h3>}
              {content && (
                <div dangerouslySetInnerHTML={{ __html: content.value }}></div>
              )}
              {link && link.href && cta && <CTA cta={cta}></CTA>}
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
          className={`${styles.banner}${rounded ? ` ${styles.rounded}` : ""}${
            shadowed ? ` ${styles.shadowed}` : ""
          }`}
          background={background ? background : "#fff"}
        >
          {bannerOutput()}
        </Link>
      ) : (
        <div
          className={`${styles.banner}${rounded ? ` ${styles.rounded}` : ""}${
            shadowed ? ` ${styles.shadowed}` : ""
          }`}
        >
          {bannerOutput()}
        </div>
      )}
    </Container>
  );
}

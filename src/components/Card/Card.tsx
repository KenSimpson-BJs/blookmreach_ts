import React from "react";
import { Container } from "react-bootstrap";

// internal
import { Link } from "../Link";
import { Image } from "../Image/Image";
import { CTA } from "../CTA/CTA";

// styles
import styles from "./Card.module.scss";

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
  textAlignment: string;
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
    textAlignment,
  } = props;

  const rounded: boolean = true;
  const flexDirection = layout ? layout.selectionValues[0].key : "column";

  return (
    <Container className={`text-${textAlignment.toLowerCase()} pt-2`}>
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
              flexDirection.includes("row")
                ? " col-12 col-sm-5 d-flex flex-column align-items-center justify-content-center"
                : ""
            } py-3 px-2`}
          >
            {titleText?.titleText?.title && (
              <h3 className="font-weight-bold">
                {titleText?.titleText?.title}
              </h3>
            )}
            {titleText?.titleText?.text && (
              <div
                dangerouslySetInnerHTML={{
                  __html: titleText?.titleText?.text?.value,
                }}
              ></div>
            )}
            {cta && <CTA cta={cta}></CTA>}
          </div>
        </Link>
      )}
    </Container>
  );
}

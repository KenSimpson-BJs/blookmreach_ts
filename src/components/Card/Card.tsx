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
  title?: string;
  content?: Content;
  layout?: SelectionType;
  cta?: Cta;
  analytics?: Anchor;
  image?: image;
  icon?: boolean;
  shadowed?: boolean;
}

export function Card(props: Card): React.ReactElement | null {
  const {
    background,
    title,
    content,
    layout,
    cta,
    image,
    analytics: link,
    icon,
    shadowed,
  } = props;

  const rounded: boolean = true;
  const flexDirection = layout ? layout.selectionValues[0].key : "column";

  if (image && icon) image.icon = icon;

  return (
    <Container>
      {link && (
        <Link
          link={link}
          className={`d-flex flex-${flexDirection} flex-wrap text-decoration-none mt-2 ${
            styles.card
          }${rounded ? ` ${styles.rounded}` : ""}${
            shadowed ? ` ${styles.shadowed}` : ""
          }`}
          background={background ? background : "#fff"}
        >
          {image && (
            <div
              className={`px-0 ${styles["card-image-cont"]}${
                image.icon ? ` mx-auto pt-3` : ""
              }${flexDirection.includes("row") ? " col-12 col-sm-7" : ""}`}
            >
              <Image image={image}></Image>
            </div>
          )}
          <div
            className={`${styles["card-text-cont"]}${
              flexDirection.includes("row")
                ? " col-12 col-sm-5 d-flex flex-column align-items-center justify-content-center"
                : ""
            } py-3`}
          >
            {title && <h3 className="font-weight-bold">{title}</h3>}
            {content && (
              <div dangerouslySetInnerHTML={{ __html: content.value }}></div>
            )}
            {cta && <CTA cta={cta}></CTA>}
          </div>
        </Link>
      )}
    </Container>
  );
}

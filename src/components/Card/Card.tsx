import React from "react";
import { Container, Col } from "react-bootstrap";
import {
  ContainerItem,
  Document,
  getContainerItemContent,
  Reference,
} from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";

// internal
import { Link } from "../Link";
import { CTA } from "../CTA";

// styles
import styles from "./Card.module.scss";

interface Card {
  background?: string;
  title?: string;
  content?: Content;
  layout?: SelectionType;
  cta?: Cta;
  analytics?: Anchor;
  image?: Image;
}

export function Card({
  component,
  page,
}: BrProps<ContainerItem>): React.ReactElement | null {
  if (!component || !page) {
    return null;
  }

  const {
    background,
    title,
    content,
    layout,
    cta,
    image,
    analytics: link,
  } = getContainerItemContent<Card>(component, page) ?? {};

  const secondary: boolean = false;
  const rounded: boolean = true;
  const flexDirection = layout ? layout.selectionValues[0].key : "column";

  return (
    <Container>
      {link && (
        <Link
          link={link}
          className={`d-flex flex-${flexDirection} text-decoration-none mt-2 ${
            styles.card
          }${rounded ? ` ${styles.rounded}` : ""}`}
          background={background ? background : "#fff"}
        >
          {image && (
            <div
              className={`${styles["card-img-cont"]}${
                flexDirection.includes("row")
                  ? " col-7 d-flex flex-column align-items-center justify-content-center"
                  : ""
              }`}
            >
              <picture>
                {image.imageDesktop && (
                  <source
                    media="(min-width: 768px)"
                    srcSet={image.imageDesktop}
                  />
                )}
                <img
                  src={image.imageMobile}
                  alt={image.alt}
                  className="d-block w-100"
                />
              </picture>
            </div>
          )}
          <div
            className={`${styles["card-text-cont"]}${
              flexDirection.includes("row")
                ? " col-5 d-flex flex-column align-items-center justify-content-center"
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

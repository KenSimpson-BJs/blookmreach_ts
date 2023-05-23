import React from "react";
import { Container } from "react-bootstrap";
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
    cta,
    image,
    analytics: link,
  } = getContainerItemContent<Card>(component, page) ?? {};

  const secondary: boolean = false;
  const rounded: boolean = true;

  return (
    <Container>
      {link && (
        <Link
          link={link}
          className={`d-flex flex-column text-decoration-none mt-2 ${
            styles.card
          }${rounded ? ` ${styles.rounded}` : ""}`}
          background={background ? background : "#fff"}
        >
          {image && (
            <div className={styles["card-img-cont"]}>
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
          <div className={`${styles["card-text-cont"]} py-3`}>
            {title && <h3 className="font-weight-bold">{title}</h3>}
            {content && (
              <p dangerouslySetInnerHTML={{ __html: content.value }}></p>
            )}
            {cta && <CTA cta={cta}></CTA>}
          </div>
        </Link>
      )}
    </Container>
  );
}

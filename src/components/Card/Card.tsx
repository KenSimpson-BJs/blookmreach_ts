import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "../Link";
import {
  ContainerItem,
  Document,
  getContainerItemContent,
  Reference,
} from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";
import styles from "./Card.module.scss";

interface Card {
  title?: string;
  content?: Content;
  cta?: string;
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
    title,
    content,
    cta,
    image,
    analytics: link,
  } = getContainerItemContent<Card>(component, page) ?? {};

  const secondary = false;

  return (
    <Container className={`${styles.thisAClass}`}>
      {title && <h3 className="mb-2">{title}</h3>}
      {link && (
        <Link
          link={link}
          className="d-flex flex-column text-decoration-none mt-2"
        >
          {image && (
            <div className="card-img-cont">
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
          <div className="card-text-cont">
            {title && <h3 className="font-weight-bold">{title}</h3>}
            {content && (
              <p dangerouslySetInnerHTML={{ __html: content.value }}></p>
            )}
            {cta && (
              <span
                className={`btn${
                  secondary ? " btn-secondary" : " btn-primary"
                }`}
              >
                {cta}
              </span>
            )}
          </div>
        </Link>
      )}
    </Container>
  );
}

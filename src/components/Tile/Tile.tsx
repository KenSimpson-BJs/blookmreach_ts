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
import { Image } from "../Image/Image";
import { CTA } from "../CTA";

// styles
import styles from "./Tile.module.scss";

interface Tile {
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

export function Tile({
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
  } = getContainerItemContent<Tile>(component, page) ?? {};
  const { icon, shadowed } = component.getParameters<Tile>();

  const secondary: boolean = false;
  const rounded: boolean = true;
  const flexDirection = layout ? layout.selectionValues[0].key : "column";

  if (image && icon) image.icon = icon;

  return (
    <Container>
      {link && (
        <Link
          link={link}
          className={`d-flex flex-${flexDirection} flex-wrap text-decoration-none mt-2 ${
            styles.Tile
          }${rounded ? ` ${styles.rounded}` : ""}${
            shadowed ? ` ${styles.shadowed}` : ""
          }`}
          background={background ? background : "#fff"}
        >
          {image && (
            <div
              className={`px-0 ${styles["Tile-img-cont"]}${
                image.icon ? ` mx-auto pt-3` : ""
              }${flexDirection.includes("row") ? " col-12 col-sm-7" : ""}`}
            >
              <Image image={image}></Image>
            </div>
          )}
          <div
            className={`${styles["Tile-text-cont"]}${
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

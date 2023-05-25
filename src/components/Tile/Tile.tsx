import React from "react";
import { Container } from "react-bootstrap";
import { ContainerItem, getContainerItemContent } from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";

// internal components
import { Link } from "../Link";
import { Image } from "../Image/Image";
import { CTA } from "../CTA/CTA";

// internal utis
import { setSelectionValue } from "../../utils/general";

// styles
import styles from "./Tile.module.scss";

interface Tile {
  content?: Content;
  cta?: Cta;
  analytics?: Anchor;
  title?: string;
  variant: string;
  image?: image;
  shadowed?: boolean;
  rounded?: boolean;
}

export function Tile({
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
  } = getContainerItemContent<Tile>(component, page) ?? {};
  const { rounded, shadowed, variant } = component.getParameters<Tile>();

  if (image) {
    if (image && image.imgfit && variant === "Circular")
      setSelectionValue(image.imgfit, "center");
    image.icon = variant === "Icon";
    console.log(image.icon);
  }

  if (content) console.log(content.value);
  if (content && content.value.includes("<a"))
    return (
      <Container>
        {link && (
          <Link
            link={link}
            className={`d-flex flex-wrap text-decoration-none mt-2 ${styles.tile}`}
          >
            {image && (
              <div
                className={`${styles["tile-image-cont"]}${
                  variant === "Circular" ? ` ${styles.circular}` : ""
                }${rounded ? ` ${styles.rounded}` : ""}${
                  shadowed ? ` ${styles.shadowed}` : ""
                } col-12${
                  image.icon ? ` ${styles["tile-icon"]} pt-3` : ""
                } px-0`}
              >
                <Image image={image}></Image>
              </div>
            )}
            {title && (
              <h3 className="font-weight-bold mx-auto pt-3">{title}</h3>
            )}
          </Link>
        )}
        <div className={`${styles["tile-text-cont"]} col-12 pb-3`}>
          {content && (
            <div dangerouslySetInnerHTML={{ __html: content.value }}></div>
          )}
          {cta && <CTA cta={cta}></CTA>}
        </div>
      </Container>
    );

  return (
    <Container>
      {link && (
        <Link
          link={link}
          className={`d-flex flex-wrap text-decoration-none mt-2 ${styles.tile}`}
        >
          {image && (
            <div
              className={`${styles["tile-image-cont"]}${
                variant === "Circular" ? ` ${styles.circular}` : ""
              }${rounded ? ` ${styles.rounded}` : ""}${
                shadowed && !image.icon ? ` ${styles.shadowed}` : ""
              } col-12${
                image.icon ? ` ${styles["tile-icon"]} mx-auto pt-3` : ""
              } px-0`}
            >
              <Image image={image}></Image>
            </div>
          )}
          <div className={`${styles["tile-text-cont"]} col-12 py-3`}>
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

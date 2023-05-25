import React from "react";
import { Container } from "react-bootstrap";
import { ContainerItem, getContainerItemContent } from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";

// internal components
import { Link } from "../Link";
import { Image } from "../Image/Image";
import { CTA } from "../CTA";

// internal utis
import { getSelectionValue, setSelectionValue } from "../../utils/general";

// styles
import styles from "./Tile.module.scss";

interface Tile {
  title?: string;
  content?: Content;
  cta?: Cta;
  analytics?: Anchor;
  image?: image;
  icon?: boolean;
  shadowed?: boolean;
  variant: string;
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
  const { shadowed, variant } = component.getParameters<Tile>();

  const secondary: boolean = false;
  const rounded: boolean = false;

  if (image && image.imgfit && variant === "Circular")
    setSelectionValue(image.imgfit, "center");

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
                } col-12${image.icon ? ` mx-auto pt-3` : ""} px-0`}
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
                shadowed ? ` ${styles.shadowed}` : ""
              } col-12${image.icon ? ` mx-auto pt-3` : ""} px-0`}
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

import React from "react";
import { Button, Container, Row } from "react-bootstrap";
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
  icon?: boolean;
  shadowed?: boolean;
  rounded?: boolean;
  textAlignment?: SelectionType;
}

export function BannerCTA({
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
    textAlignment,
  } = getContainerItemContent<BannerCTA>(component, page) ?? {};
  const { shadowed, rounded } = component.getParameters<BannerCTA>();

  return (
    <Container>
      {link && (
        <Link
          link={link}
          className={`${styles.banner}${rounded ? ` ${styles.rounded}` : ""}${
            shadowed ? ` ${styles.shadowed}` : ""
          }`}
          background={background ? background : "#fff"}
        >
          {image && (
            <div
              className={`px-0 ${styles["banner-image-cont"]}${
                image.icon ? ` mx-auto pt-3` : ""
              }`}
            >
              <Image image={image}></Image>
              <div
                className={`${styles["banner-text-cont"]} text-${
                  textAlignment ? getSelectionValue(textAlignment) : "center"
                } py-3`}
              >
                {title && <h3 className="font-weight-bold">{title}</h3>}
                {content && (
                  <div
                    dangerouslySetInnerHTML={{ __html: content.value }}
                  ></div>
                )}
                {cta && <CTA cta={cta}></CTA>}
              </div>
            </div>
          )}
        </Link>
      )}
    </Container>
  );
}

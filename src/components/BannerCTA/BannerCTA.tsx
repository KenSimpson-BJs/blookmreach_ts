import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import {
  ContainerItem,
  Document,
  getContainerItemContent,
  Reference,
} from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";
// import { Link } from "../Link";
// import { BrRichTextContent } from "../BrRichTextContent";
// import styles from "./BannerCTA.module.scss";

interface BannerCTACompound {
  title?: string;
  content?: Content;
  cta?: string;
  link?: Reference;
}

export function BannerCTA({
  component,
  page,
}: BrProps<ContainerItem>): React.ReactElement | null {
  if (!component || !page) {
    return null;
  }

  const { title, content, cta, link } =
    getContainerItemContent<BannerCTACompound>(component, page) ?? {};
  const document = link && page?.getContent<Document>(link);

  return (
    <Container>
      {title && <h3 className="mb-2">{title}</h3>}
      {/* {content && (
          <BrRichTextContent page={page!} content={{ html: content.value }} />
        )} */}
      {cta && (
        <Button
          // as={Link}
          href={document?.getUrl()}
          variant="light"
          className="text-primary mt-3"
        >
          {cta}
        </Button>
      )}
    </Container>
  );
}

// internal
import { Link } from "../Link";
import { Image } from "../Image/Image";
import { CTA } from "../CTA/CTA";

// styles
import styles from "./Card.module.scss";
import { getSelectionValue } from "../../utils/general";

interface Card {
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
    textAlignment,
  } = getContainerItemContent<Card>(component, page) ?? {};
  const { shadowed, rounded } = component.getParameters<Card>();

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

import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import {
  ContainerItem,
  Document,
  getContainerItemContent,
  Reference,
} from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";
import styles from "./NewComponent.module.scss";

interface NewComponent {
  title?: string;
  content?: Content;
  cta?: string;
  link?: Reference;
}

export function NewComponent({
  component,
  page,
}: BrProps<ContainerItem>): React.ReactElement | null {
  if (!component || !page) {
    return null;
  }

  const { title, content, cta, link } =
    getContainerItemContent<NewComponent>(component, page) ?? {};
  const document = link && page?.getContent<Document>(link);

  return (
    <Container className={`${styles.thisAClass}`}>
      Hello World
      {title && <h3 className="mb-2">{title}</h3>}
      {cta && (
        <Button
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

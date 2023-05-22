import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import styles from "./Card.module.scss";

interface Card {
  title?: string;
  cta?: string;
  link?: string;
}

export function Card(props: Card): React.ReactElement | null {
  //   if (!component || !page) { return null; }

  const { title, cta, link } = props;

  return (
    <Container className={`${styles.thisAClass}`}>
      Hello World
      {title && <h3 className="mb-2">{title}</h3>}
      {cta && (
        <Button href={link} variant="light" className="text-primary mt-3">
          {cta}
        </Button>
      )}
    </Container>
  );
}

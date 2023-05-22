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

interface OpenHTML {
  title?: string;
  content?: Content;
  cta?: string;
  link?: string;
}

export function OpenHTML({
  component,
  page,
}: BrProps<ContainerItem>): React.ReactElement | null {
  if (!component || !page) {
    return null;
  }

  const { title, content, cta, link } =
    getContainerItemContent<OpenHTML>(component, page) ?? {};
  return <div>OpenHTML</div>;
}

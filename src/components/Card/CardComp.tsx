import React from "react";
import { ContainerItem, getContainerItemContent } from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";

// internal
import { Card } from "./Card";

interface CardComp {
  background?: string;
  title?: string;
  content?: Content;
  layout?: SelectionType;
  cta?: Cta;
  analytics?: Anchor;
  image?: image;
  icon?: boolean;
  shadowed?: boolean;
  imageFormat: string;
}

export function CardComp({
  component,
  page,
}: BrProps<ContainerItem>): React.ReactElement | null {
  if (!component || !page) {
    return null;
  }

  const { background, title, content, layout, cta, image, analytics } =
    getContainerItemContent<CardComp>(component, page) ?? {};
  const { shadowed, imageFormat } = component.getParameters<CardComp>();

  return (
    <Card
      background={background}
      title={title}
      content={content}
      layout={layout}
      cta={cta}
      image={image}
      imageFormat={imageFormat}
      analytics={analytics}
      shadowed={shadowed}
    ></Card>
  );
}

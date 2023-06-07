import React from "react";
import { ContainerItem, getContainerItemContent } from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";

// internal
import { Card } from "./Card";

// utils
import { getSelectionValue } from "../../utils/general";

interface CardComp {
  background?: string;
  titleText: titleTextFG;
  layout?: SelectionType;
  textAlignment?: SelectionType;
  cta?: Cta;
  analytics?: Anchor;
  image?: image;
  icon?: boolean;
  shadow?: boolean;
  imageFormat: string;
}

export function CardComp({
  component,
  page,
}: BrProps<ContainerItem>): React.ReactElement | null {
  if (!component || !page) {
    return null;
  }

  const {
    background,
    titleText,
    layout,
    cta,
    image,
    analytics,
    textAlignment,
  } = getContainerItemContent<CardComp>(component, page) ?? {};
  const { shadow, imageFormat } = component.getParameters<CardComp>();

  return (
    <Card
      background={background}
      titleText={titleText}
      layout={layout}
      cta={cta}
      image={image}
      imageFormat={imageFormat}
      analytics={analytics}
      shadow={shadow}
      textAlignment={
        textAlignment ? getSelectionValue(textAlignment) : "center"
      }
    ></Card>
  );
}

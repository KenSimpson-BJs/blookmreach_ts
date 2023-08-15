import React from "react";
import { ContainerItem, getContainerItemContent } from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";

// internal components
import { Tile } from "./Tile";

// internal utils
import { setSelectionValue } from "../../utils/general";

interface TileComp {
  titleText: TitleTextFG;
  cta?: Cta;
  link?: Anchor;
  variant: string;
  image?: image;
  shadow?: boolean;
  imageFormat: string;
  maxWidth: string;
  textAlignment: string;
}

export function TileComp({
  component,
  page,
}: BrProps<ContainerItem>): React.ReactElement | null {
  if (!component || !page) {
    return null;
  }

  const { titleText, cta, image, link } =
    getContainerItemContent<TileComp>(component, page) ?? {};
  const { maxWidth, imageFormat, shadow, textAlignment } =
    component.getParameters<TileComp>();

  if (image) {
    if (image.imgfit && imageFormat === "Circular")
      setSelectionValue(image.imgfit, "center");
  }

  return (
    <Tile
      titleText={titleText}
      cta={cta}
      image={image}
      link={link}
      imageFormat={imageFormat}
      shadow={shadow}
      maxWidth={maxWidth}
      textAlignment={textAlignment}
    ></Tile>
  );
}

import React from "react";
import { ContainerItem, getContainerItemContent } from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";

// internal components
import { Tile } from "./Tile";

// internal utils
import { setSelectionValue } from "../../utils/general";

interface TileComp {
  content?: Content;
  cta?: Cta;
  analytics?: Anchor;
  title?: string;
  variant: string;
  textAlignment?: string;
  image?: image;
  shadowed?: boolean;
  rounded?: boolean;
}

export function TileComp({
  component,
  page,
}: BrProps<ContainerItem>): React.ReactElement | null {
  if (!component || !page) {
    return null;
  }

  const { title, content, cta, image, analytics } =
    getContainerItemContent<TileComp>(component, page) ?? {};
  const { rounded, shadowed, variant, textAlignment } =
    component.getParameters<TileComp>();

  if (image) {
    if (image.imgfit && variant === "Circular")
      setSelectionValue(image.imgfit, "center");
    image.icon = variant === "Icon";
  }

  return (
    <Tile
      title={title}
      content={content}
      cta={cta}
      image={image}
      analytics={analytics}
      rounded={rounded}
      shadowed={shadowed}
      variant={variant}
      textAlignment={textAlignment}
    ></Tile>
  );
}

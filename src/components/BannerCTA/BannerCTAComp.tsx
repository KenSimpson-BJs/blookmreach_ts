import React from "react";
import { ContainerItem, getContainerItemContent } from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";

// internal
import { BannerCTA } from "./BannerCTA";

interface BannerCTAComp {
  background?: string;
  titleText: titleTextFG;
  cta?: Cta;
  link?: Anchor;
  image?: image;
  imageFormat: string;
  shadow?: boolean;
  verticalAlign?: SelectionType;
  horizontalAlign?: SelectionType;
  disclaimer?: Content;
  maxWidth: string;
}

export function BannerCTAComp({
  component,
  page,
}: BrProps<ContainerItem>): React.ReactElement | null {
  if (!component || !page) {
    return null;
  }

  const {
    background,
    titleText,
    cta,
    image,
    link,
    verticalAlign,
    horizontalAlign,
    disclaimer,
  } = getContainerItemContent<BannerCTAComp>(component, page) ?? {};
  const { shadow, imageFormat, maxWidth } =
    component.getParameters<BannerCTAComp>();

  return (
    <BannerCTA
      background={background}
      titleText={titleText}
      cta={cta}
      image={image}
      imageFormat={imageFormat}
      link={link}
      shadow={shadow}
      verticalAlign={verticalAlign}
      horizontalAlign={horizontalAlign}
      disclaimer={disclaimer}
      maxWidth={maxWidth}
    ></BannerCTA>
  );
}

import React from "react";
import { ContainerItem, getContainerItemContent } from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";

// internal
import { BannerCTA } from "./BannerCTA";

interface BannerCTAComp {
  background?: string;
  titleText: titleTextFG;
  cta?: Cta;
  analytics?: Anchor;
  image?: image;
  imageFormat: string;
  shadowed?: boolean;
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
    analytics,
    verticalAlign,
    horizontalAlign,
    disclaimer,
  } = getContainerItemContent<BannerCTAComp>(component, page) ?? {};
  const { shadowed, imageFormat, maxWidth } =
    component.getParameters<BannerCTAComp>();

  return (
    <BannerCTA
      background={background}
      titleText={titleText}
      cta={cta}
      image={image}
      imageFormat={imageFormat}
      analytics={analytics}
      shadowed={shadowed}
      verticalAlign={verticalAlign}
      horizontalAlign={horizontalAlign}
      disclaimer={disclaimer}
      maxWidth={maxWidth}
    ></BannerCTA>
  );
}

import React from "react";
import { ContainerItem, getContainerItemContent } from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";

// internal
import { BannerCTA } from "./BannerCTA";

// styles
import { getSelectionValue } from "../../utils/general";

interface BannerCTAComp {
  background?: string;
  title?: string;
  content?: Content;
  cta?: Cta;
  analytics?: Anchor;
  image?: image;
  imageFormat: string;
  shadowed?: boolean;
  textAlignment?: SelectionType;
}

export function BannerCTAComp({
  component,
  page,
}: BrProps<ContainerItem>): React.ReactElement | null {
  if (!component || !page) {
    return null;
  }

  const { background, title, content, cta, image, analytics, textAlignment } =
    getContainerItemContent<BannerCTAComp>(component, page) ?? {};
  const { shadowed, imageFormat } = component.getParameters<BannerCTAComp>();

  return (
    <BannerCTA
      background={background}
      title={title}
      content={content}
      cta={cta}
      image={image}
      imageFormat={imageFormat}
      analytics={analytics}
      textAlignment={
        textAlignment ? getSelectionValue(textAlignment) : "center"
      }
      shadowed={shadowed}
    ></BannerCTA>
  );
}

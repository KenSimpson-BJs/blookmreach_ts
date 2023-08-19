// external
import React from "react";
import { Row, Col } from "react-bootstrap";
import { ContainerItem, getContainerItemContent } from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";

// internal
import { Link } from "./Link";
import { NavigationContainer } from "./Navigation.style";
import { getMaxWidth } from "../../utils/general";

// styles
import titleStyles from "../ComponentCSSRules/titleTextRules.module.scss";

interface NavigationComp {
  maxWidth: MaxWidthValue;
  version: string;
  spacing: string;
  textSize: string;
  buttonSize: string;
  fontColor: string;
  buttonBackground?: string;
  buttonBackgroundHover?: string;
  edgeAlign: boolean;
}

interface NavigationContent {
  links: Links[];
}

interface Links {
  label: string;
  link: Anchor;
}

export function Navigation({
  component,
  page,
}: BrProps<ContainerItem>): React.ReactElement | null {
  if (!component || !page) return null;
  const { links } =
    getContainerItemContent<NavigationContent>(component, page) ?? {};
  if (!links) return null;
  const {
    maxWidth,
    textSize,
    edgeAlign,
    version,
    spacing,
    buttonSize,
    fontColor,
    buttonBackground,
    buttonBackgroundHover,
  } = component.getParameters<NavigationComp>() ?? {};

  const getSubcopyClass: string | undefined = {
    Large: titleStyles["bjsSubcopyLarge"],
    Medium: titleStyles["bjsSubcopyMedium"],
    Small: titleStyles["bjsSubcopySmall"],
  }[textSize];

  const getSize: string | undefined = {
    None: "noSpacing fit-content-btn",
    Medium: "mediumSpacing fit-content-btn",
    Small: "smallSpacing fit-content-btn",
    Large: "largeSpacing fit-content-btn",
    Fill: "fill-btn",
    "Fit Content": "fit-content-btn",
  }[buttonSize];

  const getGap: string | undefined = {
    None: "noGap",
    Medium: "mediumGap",
    Small: "smallGap",
    Large: "largeGap",
  }[spacing];

  const edgeAlignClass = edgeAlign
    ? "justify-content-between"
    : "justify-content-center";
  return (
    <NavigationContainer
      version={version}
      fontColor={fontColor}
      buttonBackground={buttonBackground || "#fff"}
      buttonBackgroundHover={buttonBackgroundHover || "#f1f1f1"}
    >
      <Row
        className={`${edgeAlignClass} ${getGap} ${getMaxWidth(
          maxWidth
        )} my-0 mx-auto py-4 px-3`}
      >
        {links &&
          links.map((linkData, index) => (
            <Col key={index} className={`list-item px-0 ${getSize}`}>
              <Link link={linkData.link} className={`link ${getSubcopyClass}`}>
                {linkData.label}
              </Link>
            </Col>
          ))}
      </Row>
    </NavigationContainer>
  );
}

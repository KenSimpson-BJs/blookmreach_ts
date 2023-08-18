import React, { useMemo } from "react";
import { Nav, Alert, Row, Col } from "react-bootstrap";
import {
  ContainerItem,
  Document,
  getContainerItemContent,
  Reference,
} from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";
import widthStyles from "../bloomreach-components/ComponentCSSRules/widthStyles.module.scss";
import { Link } from "../../bloomreach-components/Link";
import { NavigationContainer } from "./Navigation.style";

const MAX_DOCUMENTS = 5;

const DOCUMENT_PARAMS = [...Array(MAX_DOCUMENTS).keys()].map(
  (n) => `document${n + 1}`
);

interface NavigationComp {
  buttonBackgroundHover?: string;
  buttonBackground?: string;
  fontColor?: string;
  buttonSize: string;
  edgeAlign?: boolean;
  spacing?: string;
  textSize?: string;
  version?: string;
  maxWidth: string;
  links: any;
}

export function Navigation({
  component,
  page,
}: BrProps<ContainerItem>): React.ReactElement | null {
  const { links } =
    getContainerItemContent<NavigationComp>(component, page) ?? {};
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
  const subcopyStyle = (value: string) => {
    switch (value) {
      case "Large":
        return "bjsSubcopyLarge";
      case "Medium":
        return "bjsSubcopyMedium";
      case "Small":
        return "bjsSubcopySmall";
    }
  };
  const getSpacing = (value: string) => {
    switch (value) {
      case "None":
        return "noSpacing";
      case "Medium":
        return "mediumSpacing";
      case "Small":
        return "smallSpacing";
      case "Large":
        return "largeSpacing";
    }
  };
  const getGap = (value: string) => {
    switch (value) {
      case "None":
        return "noGap";
      case "Medium":
        return "mediumGap";
      case "Small":
        return "smallGap";
      case "Large":
        return "largeGap";
    }
  };
  return (
    <NavigationContainer
      maxWidth={maxWidth}
      textSize={textSize}
      spacing={spacing}
      buttonSize={buttonSize}
      fontColor={fontColor}
      version={version}
      edgeAlign={edgeAlign}
      buttonBackground={buttonBackground}
      buttonBackgroundHover={buttonBackgroundHover}
    >
      <Row
        className={`${
          edgeAlign
            ? "justify-content-between"
            : `justify-content-center ${getSpacing(spacing)}`
        } ${getGap(spacing)} m-0 py-4`}
      >
        {links.map((linkData, index) => (
          <Col
            key={index}
            className={`list-item p-0 ${
              buttonSize == "Fit Content" ? "fit-content-btn" : "fill-btn"
            }`}
          >
            <Link
              link={linkData?.link}
              className={`link ${getSpacing(spacing)} ${subcopyStyle(
                textSize
              )}`}
            >
              {linkData?.label}
            </Link>
          </Col>
        ))}
      </Row>
    </NavigationContainer>
  );
}

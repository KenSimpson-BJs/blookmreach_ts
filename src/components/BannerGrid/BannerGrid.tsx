/*
 * Copyright 2020-2023 Bloomreach
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import {
  Reference,
  ContainerItem,
  getContainerItemContent,
} from "@bloomreach/spa-sdk";
import { BrManageContentButton, BrProps } from "@bloomreach/react-sdk";
import { BannerCTA, Tile, Card } from "..";

// utils
import { getEffectiveMultipleDocumentParameters } from "../../utils/param-utils";

// styles
import styles from "./BannerGrid.module.scss";
import widthStyles from "../ComponentCSSRules/widthStyles.module.scss";
import titleStyles from "../ComponentCSSRules/titleTextRules.module.scss";

const MAX_DOCUMENTS = 1;
const DOCUMENT_PARAMS = [...Array(MAX_DOCUMENTS).keys()].map(
  (n) => `document${n + 1}`
);

interface BannerGridModels {
  document1?: Reference;
}

interface BannerGridParameters {
  maxWidth: string;
  backgroundColor?: string;
  titleSize: string;
  variant: string;
  imageFormat: string;
  shadow: boolean;
  rowLength: string;
  textAlignment: string;
  headlineSize: string;
  subcopySize: string;
}

interface BannerGridCompound {
  bannerCardTile: BannerCardTile[];
}

export function BannerGrid({
  component,
  page,
}: BrProps<ContainerItem>): React.ReactElement | null {
  const {
    variant,
    rowLength,
    shadow,
    textAlignment,
    imageFormat,
    maxWidth,
    titleSize,
    headlineSize,
    subcopySize,
    backgroundColor,
    ...params
  } =
    component?.getParameters<BannerGridParameters & Record<string, any>>() ||
    {};

  const models = component?.getModels<BannerGridModels>();
  const docParams = getEffectiveMultipleDocumentParameters(
    page,
    models,
    MAX_DOCUMENTS
  );

  const error = useMemo(() => {
    return (
      Object.entries(params).filter(
        ([key, value]) => DOCUMENT_PARAMS.includes(key) && value
      ).length > docParams?.length
    );
  }, [docParams.length, params]);

  if (!component || !page) {
    return null;
  }
  const { title, text } =
    getContainerItemContent<titleText>(component, page) ?? {};

  const titleOutput = () => {
    if (!title) return null;

    const titleClass = () =>
      ` pb-3 pb-md-4 ${titleStyles["bjsHeadline" + titleSize]}`;

    switch (titleSize) {
      case "Small":
        return (
          <h4
            className={titleClass()}
            dangerouslySetInnerHTML={{
              __html: title.value,
            }}
          ></h4>
        );
      case "Medium":
        return (
          <h3
            className={titleClass()}
            dangerouslySetInnerHTML={{
              __html: title.value,
            }}
          ></h3>
        );
      case "Large":
        return (
          <h2
            className={titleClass()}
            dangerouslySetInnerHTML={{
              __html: title.value,
            }}
          ></h2>
        );
      case "Huge":
        return (
          <h1
            className={titleClass()}
            dangerouslySetInnerHTML={{
              __html: title.value,
            }}
          ></h1>
        );
      default:
        return (
          <h1
            className={titleClass()}
            dangerouslySetInnerHTML={{
              __html: title.value,
            }}
          ></h1>
        );
    }
  };

  if (!component || !page) {
    return null;
  }

  if (!docParams.length && !error) {
    return page?.isPreview() ? (
      <div className="has-edit-button">
        <BrManageContentButton
          documentTemplateQuery="new-reference-spa-bannercardtilectype-document"
          folderTemplateQuery="new-reference-spa-bannercardtilectype-folder"
          parameter="document1"
          root="content/bannergrid-docs"
          relative
        />
      </div>
    ) : null;
  }

  if (docParams.length < 1) return null;

  const { bannerCardTile } =
    docParams[0].document.getData<BannerGridCompound>();

  const returnVariant = (variant: string, props: any) => {
    if (variant === "Tile") return <Tile {...props}></Tile>;
    if (variant === "Card") return <Card {...props}></Card>;
    return <BannerCTA {...props}></BannerCTA>;
  };

  const returnColClass = (rowLength: string) => {
    const num = parseInt(rowLength);
    if (num >= 3) {
      return `col-6 col-sm-4 ${
        num > 5
          ? "col-md-3 col-lg-2"
          : num > 4
          ? "col-md-3 col-lg-5c"
          : num === 4
          ? "col-md-3 col-lg-3"
          : "col-md-4"
      }`;
    }
    return "col-6";
  };

  return (
    <div
      className={`${styles["banner-grid"]} mx-auto py-3`}
      style={
        backgroundColor
          ? {
              borderTop: "1px solid #ccc",
              backgroundColor: backgroundColor,
            }
          : {}
      }
    >
      {titleOutput()}
      <Row
        className={`${
          widthStyles["w-" + maxWidth]
        } justify-content-center align-items-stretch pt-3`}
      >
        {bannerCardTile &&
          bannerCardTile.map((item: BannerCardTile, key) => {
            const props = {
              imageFormat,
              shadow,
              textAlignment,
              headlineSize,
              subcopySize,
              ...item,
            };

            return (
              <Col
                key={key}
                className={`${rowLength ? returnColClass(rowLength) : ""} ${
                  variant !== "Tile" ? "px-0" : ""
                }`}
              >
                {variant ? returnVariant(variant, { ...props }) : ""}
              </Col>
            );
          })}
      </Row>
    </div>
  );
}

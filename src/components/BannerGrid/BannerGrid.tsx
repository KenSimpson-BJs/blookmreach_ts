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
import { Col, Row, Container } from "react-bootstrap";
import {
  Reference,
  ContainerItem,
  getContainerItemContent,
} from "@bloomreach/spa-sdk";
import { BrManageContentButton, BrProps } from "@bloomreach/react-sdk";
import { BannerCTA, Tile, Card, Title } from "..";

// utils
import { getEffectiveMultipleDocumentParameters } from "../../utils/param-utils";

// styles
import styles from "./BannerGrid.module.scss";
import widthStyles from "../ComponentCSSRules/widthStyles.module.scss";

const MAX_DOCUMENTS = 1;
const DOCUMENT_PARAMS = [...Array(MAX_DOCUMENTS).keys()].map(
  (n) => `document${n + 1}`
);

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
  borderTop: boolean;
}

interface BannerGridModels {
  document1?: Reference;
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
    borderTop,
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

  if (!component || !page || docParams.length < 1) return null;

  const { title } = getContainerItemContent<TitleText>(component, page) ?? {};

  const { bannerCardTile } =
    docParams[0].document.getData<BannerGridCompound>();

  const returnVariant = (variant: string, props: any) => {
    const variants: Record<string, React.ReactElement> = {
      Tile: <Tile {...props} />,
      Card: <Card {...props} />,
      default: <BannerCTA {...props} />,
    };

    return variants[variant] || variants.default;
  };

  const returnColClass = (rowLength: string) => {
    const num = parseInt(rowLength);
    if (num >= 3) {
      const colMapping: Record<number, string> = {
        3: "col-6 col-sm-4",
        4: "col-md-3 col-lg-3",
        5: "col-md-3 col-lg-5c",
        6: "col-md-3 col-lg-2",
      };
      return colMapping[num] || "col-md-4";
    }
    return "col-6";
  };

  return (
    <div
      className={`${styles["banner-grid"]} mx-auto px-3 py-4`}
      style={
        backgroundColor
          ? {
              borderTop: borderTop ? "1px solid #ccc" : "",
              backgroundColor: backgroundColor,
            }
          : {}
      }
    >
      {title?.value && title?.value.length > 0 && (
        <Title
          title={title ?? { value: "" }}
          titleSize={titleSize ?? ""}
          className="pb-3 text-center"
        />
      )}
      <Container className={`${widthStyles["w-" + maxWidth]} p-0 mx-auto`}>
        <Row
          className={`${styles["row-adjustment"]} justify-content-center align-items-stretch pt-2 pb-3`}
        >
          {bannerCardTile &&
            bannerCardTile.map((item: BannerCardTile, key) => {
              const props = {
                imageFormat,
                shadow,
                textAlignment,
                headlineSize,
                subcopySize,
                gridFlex: true,
                ...item,
              };
              return (
                <Col
                  key={key}
                  className={`${rowLength ? returnColClass(rowLength) : ""} ${
                    variant !== "Tile" ? "px-0" : ""
                  }`}
                >
                  {variant ? returnVariant(variant, { ...props }) : null}
                </Col>
              );
            })}
        </Row>
      </Container>
    </div>
  );
}

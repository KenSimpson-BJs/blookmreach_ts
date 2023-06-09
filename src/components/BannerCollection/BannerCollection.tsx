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
import { Reference, ContainerItem } from "@bloomreach/spa-sdk";
import { BrManageContentButton, BrProps } from "@bloomreach/react-sdk";
import { BannerCTA, Tile, Card } from "../../components";
import styles from "./BannerCollection.module.scss";
import { getEffectiveMultipleDocumentParameters } from "../../utils/param-utils";

const MAX_DOCUMENTS = 1;
const DOCUMENT_PARAMS = [...Array(MAX_DOCUMENTS).keys()].map(
  (n) => `document${n + 1}`
);

interface BannerCollectionModels {
  document1?: Reference;
}

interface BannerCollectionParameters {
  title: string;
  variant: string;
  rowLength: string;
  shadow: boolean;
  textAlignment: string;
  imageFormat: string;
}

interface BannerCollectionCompound {
  bannerCardTile: BannerCardTile[];
}

export function BannerCollection({
  component,
  page,
}: BrProps<ContainerItem>): React.ReactElement | null {
  const {
    title,
    variant,
    rowLength,
    shadow,
    textAlignment,
    imageFormat,
    ...params
  } =
    component?.getParameters<
      BannerCollectionParameters & Record<string, any>
    >() || {};

  const models = component?.getModels<BannerCollectionModels>();
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

  const { bannerCardTile } =
    docParams[0].document.getData<BannerCollectionCompound>();
  if (!docParams.length && !error) {
    return page?.isPreview() ? (
      <div className="has-edit-button">
        <BrManageContentButton
          documentTemplateQuery="new-reference-spa-bannercardtilectype-document"
          folderTemplateQuery="new-reference-spa-bannercardtilectype-folder"
          parameter="document1"
          root="content"
          relative
        />
      </div>
    ) : null;
  }

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
          ? "col-md-4 col-lg-3"
          : "col-md-4"
      }`;
    }
    return "col-6";
  };

  return (
    <div className={`${styles["banner-grid"]} banner-grid mx-auto my-4`}>
      <h3 className="mb-4">{title}</h3>
      <Row className="align-items-stretch">
        {bannerCardTile &&
          bannerCardTile.map((item: BannerCardTile, key) => {
            const props = { imageFormat, shadow, textAlignment, ...item };

            return (
              <Col
                key={key}
                className={rowLength ? returnColClass(rowLength) : ""}
              >
                {variant ? returnVariant(variant, { ...props }) : ""}
              </Col>
            );
          })}
      </Row>
    </div>
  );
}

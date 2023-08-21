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

import React from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import {
  Reference,
  ContainerItem,
  getContainerItemContent,
} from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";

import { BannerCTA, Tile, Card } from "..";
import styles from "./Slider.module.scss";
import { getEffectiveMultipleDocumentParameters } from "../../utils/param-utils";

const DOCUMENTS_PER_SLIDE = 1;

interface MultiBannerCarouselParameters {
  interval?: number;
}

interface SliderModels {
  document1: Reference;
}
interface SliderCompound {
  banners: BannerCardTile[];
}

interface MultiBannerCarouselCompound {
  title: string;
}

export function MultiBannerCarousel({
  component,
  page,
}: BrProps<ContainerItem>): React.ReactElement | null {
  if (!component || !page) {
    return null;
  }

  const { interval = 0 } =
    component.getParameters<MultiBannerCarouselParameters>();
  const { title } =
    getContainerItemContent<MultiBannerCarouselCompound>(component, page) ?? {};
  const slides: Array<string> = [""];

  const returnVariant = (variant: string, props?: any) => {
    if (variant === "Tile") return <Tile {...props}></Tile>;
    if (variant === "Card") return <Card {...props}></Card>;
    return <BannerCTA {...props}></BannerCTA>;
  };
  const models = component?.getModels<SliderModels>();
  const docParams = getEffectiveMultipleDocumentParameters(page, models, 1);
  if (!docParams[0]) return null;
  const { bannerCardTile: banners } =
    docParams[0].document.getData<SliderCompound>();
  console.log(banners);

  // Because the props object is used in both SSR and CSR, we should avoid mutating it.
  // for (let i = 0; i < (banners?.length ?? 0); i += DOCUMENTS_PER_SLIDE) {
  //   slides.push(banners!.slice(i, i + DOCUMENTS_PER_SLIDE));
  // }

  return (
    <div className="mw-container mx-auto my-4">
      {title && <h3 className={styles.carouselTitle}>{title}</h3>}
      <Carousel
        controls={slides.length > 1}
        indicators={false}
        interval={interval}
        prevIcon={
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="2x"
            className="text-secondary"
          />
        }
        nextIcon={
          <FontAwesomeIcon
            icon={faChevronRight}
            size="2x"
            className="text-secondary"
          />
        }
        className={styles.carousel}
      >
        {slides.map((slide, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Carousel.Item key={index}>
            <Row>
              {/* {slide.map((slide, index) => (
                // eslint-disable-next-line react/no-array-index-index
                <Col
                  key={`${index}-${index}`}
                  xs={12 / DOCUMENTS_PER_SLIDE}
                >
                  {returnVariant("Banner")}
                </Col>
              ))} */}
              Hello World!
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

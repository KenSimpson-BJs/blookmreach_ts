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

/* eslint-disable camelcase */

interface ChannelParameters {
  discoveryAccountId: string;
  discoveryDomainKey?: string;
  discoveryViewId?: string;
  discoveryRealm: string;
  graphql_baseurl?: string;
  graphqlTenantName?: string;
}

interface Content {
  value: string;
}

interface Anchor {
  hpPlacement: boolean;
  newTab: boolean;
  href: string;
  data_gtm_position: string;
  data_gtm_id: string;
  data_gtm_name: string;
  data_gtm_creative: string;
}

interface Cta {
  cta: string;
  style: SelectionType;
}

interface image {
  imageMobile: string;
  imageDesktop?: string;
  alt: string;
  imgfit?: SelectionType;
}

interface BannerCardTileDocument {
  document?: import("@bloomreach/spa-sdk").Reference;
}

interface BannerCardTile {
  background?: string;
  titleText: titleTextFG;
  cta?: string;
  image?: image;
  analytics?: Anchor;
  layout?: SelectionType;
  verticalAlign: SelectionType;
  horizontalAlign: SelectionType;
}

interface titleText {
  title?: Content;
  text?: Content;
}

interface titleTextFG {
  title?: Content;
  text?: Content;
  textAlignment: SelectionType;
  headlineSize: SelectionType;
  subcopySize: SelectionType;
  textColor: SelectionType;
}

interface BannerDocument {
  content: Content;
  cta?: string;
  image?: import("@bloomreach/spa-sdk").Reference;
  link?: import("@bloomreach/spa-sdk").Reference;
  title?: string;
}

interface ContentDocument {
  content: Content;
  date?: number;
  image?: import("@bloomreach/spa-sdk").Reference;
  introduction?: string;
  title?: string;
}

interface ProductDocument {
  brand: string;
  description: string;
  pid: string;
  title: string;
  price: number;
  sale_price?: number;
  thumb_image?: string;
  url: string;
}

interface ResourceBundle {
  keys: string[];
  messages: string[];
}

interface SelectionType {
  selectionValues: { key: string; label: string }[];
}

interface OpenGraphCompound {
  description: string;
  image?: import("@bloomreach/spa-sdk").Reference;
  type: string;
  locale: string;
  url: string;
}

interface PageDocument {
  title: string;
  description: string;
  preventIndexing: boolean;
  ogCompound: OpenGraphCompound;
}

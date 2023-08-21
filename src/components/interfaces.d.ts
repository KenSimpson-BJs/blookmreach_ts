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

interface TitleText {
  title?: Content;
  text?: Content;
}

interface TitleTextFG {
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

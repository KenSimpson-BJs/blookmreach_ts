[Back To Home](../../../)

# TitleAndText Component

The `TitleAndText` component is used to display a banner with customizable text and CTA options. It provides features to control text alignment, font sizes, colors, and responsiveness. The component supports both a standard banner layout and a "Pencil Banner" variant.

## Usage

```jsx
import { TitleAndText } from "path/to/TitleAndText";

// Usage within a Bloomreach component
<TitleAndText component={component} page={page} />;
```

## Component Properties

- `component`: The Bloomreach component instance.
- `page`: The current page instance.

## Component Parameters

- `backgroundColor`: The background color of the banner.
- `fontColor`: The font color of the text.
- `headlineSize`: The size of the headline text (Small, Medium, Large, Huge).
- `subcopySize`: The size of the subcopy text (Small, Medium, Large).
- `textAlignment`: The alignment of the text content (center, left, right).
- `variant`: The variant of the banner (Pencil Banner or default).

## Linked Content Type

- `textLink`: Reference to a content item of type `BannerFieldGroup`.

## Direct Content Fields

- `Disclaimer`: Dropdown control for adjusting the max width of the container around the children content.

  - `maxWidth`: Maximum width of the container (default: "1280px").

- `Banner/Card – Vertical Alignment`: Dropdown control for the vertical container alignment of the text group.

  - `verticalAlign`: Vertical alignment options (center, start, end).

- `Banner/Card – Horizontal Alignment`: Dropdown control for the horizontal container alignment of the text group.
  - `horizontalAlign`: Horizontal alignment options (center, start, end).

## Content Fieldgroups

### TitleTextFieldGroup

A custom fieldgroup containing title and text input fields.

- `Title and Text`: Title and text input fields.

  - `Title`: String field for the title.
  - `Text`: Rich Text Editor field for the text content.

- `Text Alignment`: Dropdown control for alignment of all text relative to its container.

  - `textAlignment`: Text alignment options (center, left, right).

- `Headline Size`: Dropdown control for the headline element hierarchy (h1, h2, h3, h4) and its respective font size.

  - `headlineSize`: Headline size options (Small, Medium, Large, Huge).

- `SubCopy Size`: Dropdown control for the subcopy font size.

  - `subcopySize`: Subcopy size options (Small, Medium, Large).

- `Text Color`: Dropdown control for the color of all text outside of CTA.
  - `textColor`: Text color options (Red, GrayBlack, White).

### CTA

Fields for configuring the Call to Action (CTA) button.

- `CTA`: Text field for the CTA button.

  - `cta`: Call to Action text.

- `CTA Style`: Dropdown control for styling options of the CTA button.
  - `style`: CTA style options (default=Link, primary=Button Primary, secondary=Button Secondary).

### Analytics

Fields for adding analytics attributes to the component.

- `Home Page`: Boolean checkbox for determining classes returned for analytics gathering.

  - `hpPlacement`: Home page placement option.

- `Open in a new tab?`: Boolean checkbox for determining anchor target.

  - `newTab`: Open in a new tab option.

- `Href`: String value for the href URL.

  - `href`: Href URL value.

- `data-gtm-position`: Analytics page position value.

  - `data_gtm_position`: Page position value.

- `data-gtm-id`: Analytics id value.

  - `data_gtm_id`: Analytics id value.

- `data-gtm-name`: Analytics naming value.

  - `data_gtm_name`: Analytics naming value.

- `data-gtm-creative`: Another analytics naming value.
  - `data_gtm_creative`: Analytics creative value.

### Image

Fields for configuring images within the banner.

- `Mobile Image`: Mobile image URL.

  - `imageMobile`: Mobile image URL.

- `Desktop Image`: Desktop image URL.

  - `imageDesktop`: Desktop image URL.

- `Alt Tag`: Alternative text for the image.

  - `alt`: Alternative text.

- `Image Fit and Alignment`: Fit and alignment options for the image.
  - `imgfit`: Image fit and alignment options (default=None, center=Center, top=Top, bottom=Bottom, left=Left, right=Right).

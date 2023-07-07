[Back To Home](../../../)

# CTA

CTA is an application component that can be used wherever CTAs are required - both for buttons and links. It is a display component only, and thus would sit as a child of whatever button or link is used. It requires a string be passed for the CTA text, and can be passed a style property to control the component's visual output

## Component Properties

- cta
- style

- ### cta – required

  Required string that's displayed as text within the CTA - this would be your Learn More, Shop Now or similar CTA texts

  - [string]

- ### style - optional

  Optional property used for selecting the style output of CTA. Default styling inherits the font size and color of the parent element

  - [string]

- ### background - optional

  Optional property for passing a background color to the link component. Can be hex, rgb, rgba, hsl, hsla or a generic color name (ex: blue, red, chartreuse)

  - [string]

- ### children - required
  Required property for passing the children of the link component. This has to be either another React component, HTML, or a string
  - [React.ReactNode | string]

## Linked Content Type:

- Anchor (Custom)
  - hpPlacement: boolean;
  - newTab: boolean;
  - href: string;
  - data_gtm_position: string;
  - data_gtm_id: string;
  - data_gtm_name: string;
  - data_gtm_creative: string;

[Back To Home](../../../)

# Link

Link is an application component that can be used wherever links are required. It is solely a wrapper for linked content, and thus requires children and a link (Link) object, and can accept classes and a background color. It internally handles all the analytics attributes data passed to it so they display on the anchor element properly

## Component Properties

- link
- className
- background
- children

- ### link – required

  Required link object that passes href, target and analytics options. This object is defined by a custom type called Anchor, outlined below and defined in [brx.d.ts](../brx.d.ts)

  - [Link: Anchor]

  - ### className - optional
    Optional property for passing classnames to the link component. Not currently restricted
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

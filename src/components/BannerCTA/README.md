# Banner CTA

Banner CTA is used for displaying a large central or hero image, and can display live text over the image. The alignment of text within this component is fairly customizable, however the container does not expand to fit the text content. As a result, content editors will need to ensure that their text is visible for both mobile and desktop users.

## Component Properties

- ### Max Width – required
  Used to control the max width of the banner container. The outermost element of BannerCTA spans full width regardless of the size selected by the dropdown
  - maxWidth [dropdown: string] {default: “1280px”}
    - Values: [“900px”¸ “1280px”, “Full”]
- ### Image Format – required
  Required dropdown field to select the image output for the banner. In regards to banner, this controls rounded vs square corners - Circular and Icon options are not supported with BannerCTA
  - imageFormat [dropdown: string] {default: “Default”}
    - Values: [“Default”, “Rounded”]
- ### Shadow – required
  A hover shadow is applied by default to provide some indication to the user of when the banner is currently hoevered or selected. This option will prompt the banner to apply a lighter shadow to the image by default to provide some static elevation, which wil transition to the darker shadow on hover
  - shadow [simple: boolean]

## Linked Content Type:

- referencespa:BannerFieldGroup

---

## Direct Content Fields

- ### Disclaimer
  Dropdown control for adjusting the max width of the container around the children content. The outermost element of BannerGrid spans full width regardless of the size selected by the dropdown
  - maxWidth [dropdown: string] {default: “1280px”}
    - Values: [“900px”¸ “1280px”, “Full”]
- ### Banner/Card – Vertical Alignment
  Dropdown control for the vertical container alignment of the text group
  - verticalAlign (Static Dropdown: SelectionType)
  - Values: [center=Center,start=Top,end=Bottom]
- ### Banner/Card – Horizontal Alignment
  Dropdown control for the horizontal container alignment of the text group - this is different from text-alignment
  - horizontalAlign (Static Dropdown: SelectionType)
  - Values: [center=Center,start=Left,end=Right]

## Content Fieldgroups

- ### TitleTextFieldGroup

  All below properties are used within the CTA component

  - #### Title and Text – required (Custom Fieldgroup)
    This is a custom fieldgroup already present in BR that's used to contain the title and text input fields
    - titleText (Title and text)
    - ##### Title
      String field for Title. This outputs within a headline tag (h1-h4) and currently supports use of some inline HTML tags such as line breaks, strong, underline, italicized and superscript elements. Use of any additional tags
      - title (string)
    - ##### Text
      Rich Text Editor field for Text. The html structure of this can be modified through source and does have some html preprocessing to prevent specific elements or attributes from being used
      - text (Rich Text Editor: Content)
  - #### Text Alignment – required
    Dropdown control for alignment of all text relative to it's container using the text-alignment property
    - textAlignment (Static Dropdown: SelectionType)
      - Values: [center=Center,left=Left,right=Right]
  - #### Headline Size - required
    Dropdown control for the headline element hierarchy (h1, h2, h3, h4) and it's respective font size
    - headlineSize (Static Dropdown: SelectionType)
      - Values: [Small,Medium,Large,Huge]
  - #### SubCopy Size - required
    Dropdown control for the subcopy font size
    - subcopySize (Static Dropdown: SelectionType)
      - Values: [Small,Medium,Large]
  - #### Text Color
    Dropdown control for the color of all text outside of CTA (unless the CTA style is set to link)
    - textColor (Static Dropdown: SelectionType)
      - Values: [Red,GrayBlack,White]

- ### CTA

  All below properties are used within the CTA component

  - #### CTA
    Text field for what's shown on the CTA - i.e. Shop Now, Learn More, Shop All, etc
  - cta (string)
  - #### CTA Style - required with CTA
    Dropdown control for available styling options for the CTA - varies between different button versions and a link
    - style (Static Dropdown: SelectionType)
      - Values: [default=”Link”, primary=”Button Primary”, secondary=”Button Secondary”]

- ### Analytics

  All below properties used within Link component

  - #### Home Page
    Boolean checkbox for determining classes returned for analytics gathering
    - hpPlacement (boolean)
  - #### Open in a new tab?
    Boolean checkbox for determining anchor target
    - newTab (boolean)
  - #### Href
    String value for the href url
    - href (string)
  - #### data-gtm-position
    Analytics page position value - an expanded version of data-gtm-id
    - data_gtm_position (string)
  - #### data-gtm-id
    Analytics id value -
    - data_gtm_id (string)
  - #### data-gtm-name
    Analytics naming value -
    - data_gtm_name (string)
  - #### data-gtm-creative
    Another nalytics naming value - should almost always be the same value as data-gtm-name
    - data_gtm_creative (string)

- ### Image
  - #### Mobile Image
    Used to control the max width of the container around the children content.
    - imageMobile (string)
  - #### Desktop Image
    Used to control the max width of the container around the children content.
    - imageDesktop (string)
  - #### Alt Tag
    Used to control the max width of the container around the children content.
    - alt (string)
  - #### Image Fit and Alignment
    Used to control the max width of the container around the children content.
    - imgfit (Static Dropdown: SelectionType)
    - Values: [default=None,center=Center,top=Top,bottom=Bottom,
      left=Left,right=Right]

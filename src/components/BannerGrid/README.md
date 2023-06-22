# Banner Grid

Banner Grid is a grid display of a dynamic number of children. It's children can be BannerCTA, Card or Tile components. Data specific to these components is passed through a reference content document of BannerCardTileCType, a compound document type of fields related to BannerCTA, Card and Tile. The component has the following properties and options

- ### Background Color
  Optional background color property, applied to the overall parent container of the Banner Grid. This will span the full width of the screen always, and applies a single top border for some visual separation
  - backgroundColor [simple: string] {default: “#fff}
- ### Max Width – required
  Used to control the max width of the container around the children content. The outermost element of BannerGrid spans full width regardless of the size selected by the dropdown
  - maxWidth [dropdown: string] {default: “1280px”}
    - Values: [“900px”¸ “1280px”, “Full”]
- ### Title
  Optional string field to provide a center aligned title to the top of the Banner Grid component
  - titleProp [simple: string]
- ### Title Size
  Sets the title size and element for the BannerGrid title
  - titleSize [dropdown: string]
    - Values: ["Small","Medium","Large","Huge]
- ### Banner/Card/Tile document – required
  Content picker for the component that will provide data to the children of BannerGrid. The length of this document is not limited, and there are additional fields that can be filled out to apply specific effects to each individual child component
  - document1 [content path: Reference]
  - Uses BannerCardTileCType document template
- ### Variant – required
  Required dropdown field to select the type of grid child component
  - variant [dropdown: string] {default: “Banner”}
    - Values: [“BannerCTA”, “Tile”, “Card”]
- ### Image Format – required
  Required dropdown field to select the image output for the children components
  - imageFormat [dropdown: string] {default: “Default”}
    - Values: [“Default”, “Rounded”, “Circular”, “Icon”]
- ### Grid Row Length (Desktop) – required
  Required dropdown field to select the row length for baner grid. This length is altered based on the screen size, and can be anywhere between 2-6 in length
  - rowLength [dropdown: string] {default: “4”}
    - Values: [“2”, “3”, “4”, “5”, “6”]
- ### Shadow – required
  A hover shadow is applied by default to all child components to provide some indication to the user of which child is currently selected. This option, when selected, will prompt the children components to apply a lighter shadow to the component by default to provide some static elevation, which wil transition to the darker shadow on hover
  - shadow [simple: boolean]
- ### Headline Size - required
  Sets the headline size and element for all children of BannerGrid
  - headlineSize [dropdown: string]
    - Values: ["Small","Medium","Large","Huge"]
- ### SubCopy Size - required
  Sets the subcopy size for all children of BannerGrid
  -subcopySize [dropdown: string]
  - Values: ["Small","Medium","Large"]
- ### Text Alignment – required
  Required dropdown field to select the text alignment for all child components only
  - textAlignment [dropdown: string] {default: “Center”}
    - Values: [“Center”, “Left”, “Right”]

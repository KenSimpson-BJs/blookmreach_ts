# Bloomreach Work

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It runs using the Bloomreach CMS as it's data backend. The components built within this are prototypes and may or may not be used down the road

## Available Scripts

For dev mode [http://localhost:3000](http://localhost:3000), run from project root:
### `yarn start`

You will see any lint errors in the console. Lint errors will kill a build in CICD

### `yarn test`
Launches the default CRA test runner in the interactive watch mode.\

### `npm run build`
Builds the app for production to the `build` folder.\

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# Available components

From the CMS
- Banner Grid
- Banner CTA

Within the application
- Card
- Tile
- Link
- Image
- CTA

# CMS Components

## Banner Grid

Banner Grid is a grid display of a dynamic number of children. It's children can be BannerCTA, Card or Tile components. Data specific to these components is passed through a reference content document of BannerCardTileCType, a compound document type of fields related to BannerCTA, Card and Tile. The component has the following properties and options
 - ### Title
    Optional string field to provide a center aligned title to the top of the Banner Grid component
   - titleProp [simple: string]
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
 - ### Text Alignment – required
    Required dropdown field to select the text alignment for all child components only
   - textAlignment [dropdown: string] {default: “Center”}
     - Values: [“Center”, “Left”, “Right”]
 - ### Shadow – required
    A hover shadow is applied by default to all child components to provide some indication to the user of which child is currently selected. This option, when selected, will prompt the children components to apply a lighter shadow to the component by default to provide some static elevation, which wil transition to the darker shadow on hover
   - shadow [simple: boolean]
 - ### Banner/Card/Tile document – required
    Content picker for the component that will provide data to the children of BannerGrid. The length of this document is not limited, and there are additional fields that can be filled out to apply specific effects to each individual child component
   -  document1 [content path: Reference]
     -  Uses BannerCardTileCType document template
 - ### Max Width – required
    Used to control the max width of the container around the children content. The outermost element of BannerGrid spans full width regardless of the size selected by the dropdown 
   - maxWidth [dropdown: string] {default: “1280px”}
     - Values: [“900px”¸ “1280px”, “Full”]
 - ### Title Size
    Sets the title size and element for the BannerGrid title
   - titleSize [dropdown: string]
     - Values: ["Small","Medium","Large","Huge] 
 - ### Headline Size - required
    Sets the headline size and element for all children of BannerGrid
   - headlineSize [dropdown: string]
     - Values: ["Small","Medium","Large","Huge"]
 - ### SubCopy Size - required
    Sets the subcopy size for all children of BannerGrid
   -subcopySize [dropdown: string]
     - Values: ["Small","Medium","Large"] 

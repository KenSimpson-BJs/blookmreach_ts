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

** Note from the developer: All components document their available properties, fields and their inputs. If you provide inputs or data outside of what's recommended in the component documentation, you do so with the understanding that things may break as a result, and the resulting issues will be on you, the content editor, to resolve **

## Available within the CMS

- [Banner Grid](src/components/BannerGrid)
- [Banner CTA](src/components/BannerCTA)
- [Card](src/components/Card)
- [Tile](src/components/Tile)

## Only available within the application

- [Link](src/components/Link)
- [Image](src/components/Image)
- [CTA](src/components/CTA)

# CMS Components

## Banner Grid

Banner Grid is a grid display of a dynamic number of children. It's children can be BannerCTA, Card or Tile components. Data specific to these components is passed through a reference content document of BannerCardTileCType, a compound document type of fields related to BannerCTA, Card and Tile. The component has additional properties allowing for easier control of how content is displayed within the component

## Banner CTA

Banner CTA is used for displaying a large central or hero image, with or without a CT link, and can accept text to display over the banner. BannerCTA accepts text for headline, subcopy, CTA and disclaimer, and for the image: a mobile image, alt tag and optional desktop image

## Card

Card is used for displaying text and imagery together within a clickable visual container. Card has a variety of layouts and image formats, including icons, a fairly customizable text placement, and will accept text for headline, subcopy and CTA, and for the image: a mobile image, alt tag and optional desktop image

## Tile

Tile is used for displaying text and imagery together, but without a clickable visual container. Tile has a variety of image formats, including icons and circular images, and will accept text for headline, subcopy and CTA, and for the image: a mobile image, alt tag and optional desktop image. Additionally, Tile will also accept inline-links within it's subcopy

# Application Components

Application components are components used with or within other components to cut down on the amount of duplicated code and ensure that things that are used in multiple places around the site are all displayed the same way

## Link

Link is a component used within other components for wrapping elements in a clickable link. It accepts and manages all inputs from the analytics fieldgroup, and will accept classes passed to it.

## Image

Image is a component used within other components for displaying images. As a result, it needs to be, and is, a component with a highly adaptable layout

## CTA

CTA is a component used within other components for managing the output of all CTA's.

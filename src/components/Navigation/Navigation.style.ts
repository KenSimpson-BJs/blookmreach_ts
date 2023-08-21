import styled from "styled-components";
import widthStyles from "../bloomreach-components/ComponentCSSRules/widthStyles.module.scss";

interface NavigationWrapper {
  version: string;
  fontColor: string;
  buttonBackground: string;
  buttonBackgroundHover: string;
}

const buttonVersion = (version: string) => version.includes("Button");

export const NavigationContainer = styled.div<NavigationWrapper>(
  ({
    version,
    buttonBackground = "#fff",
    fontColor = "#000",
    buttonBackgroundHover = "#f1f1f1",
  }) => `
  .list-item {
    padding: 1px;
  }
  .link {
    ${
      buttonVersion(version) &&
      `background-color: ${buttonBackground}!important;`
    } 
    border-radius: ${version == "Rounded Button" ? "4px" : "0"};
    color: ${fontColor};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;    
    text-align: center;
    transition: var(--transitionLinear);
    height: 100%;
    
    ${
      buttonVersion(version) &&
      `
      &:hover {
        background-color: ${buttonBackgroundHover}!important;
      }`
    }

    
  }
  
  .noSpacing > * {
    padding: 0px;
  }
  .smallSpacing > * {
    padding: 4px;
  }
  .mediumSpacing > * {
    padding: 8px;
  }
  .largeSpacing > * {
    padding: 16px;
  }
  .smallSpacing, .mediumSpacing, .largeSpacing {
    
  }
  .noGap {
    gap: 0px;
  }
  .smallGap {
    gap: 8px;
  }
  .mediumGap {
    gap: 16px;
  }
  .largeGap {
    gap: 32px;
  }

  .fit-content-btn {
    flex-basis: auto;
    width: fit-content;
    max-width: fit-content;
    white-space: nowrap;
  }
  .fit-content-btn-size > *, .fill-btn > * {
    padding: 0.5rem 0.5rem;
  }

  .fill-btn {
    flex-grow: 1;
    flex-shrink: 1;
    max-width: none;
  }
`
);

import styled from 'styled-components';
import widthStyles from "../bloomreach-components/ComponentCSSRules/widthStyles.module.scss";

interface NavigationWrapper {
  version: string;
  fontColor: string;
  buttonBackground: string;
  buttonBackgroundHover: string;
}

const buttonVersion = (version: string) => version.includes("Button");

export const NavigationContainer = styled.div<NavigationWrapper>(
  ({version, buttonBackground = "#fff", fontColor = "#000", buttonBackgroundHover = "#f1f1f1"}) => `
  .list-item {
    margin: 1px;
  }
  .link {
    ${buttonVersion(version) && `background-color: ${buttonBackground}!important;`} 
    border-radius: ${version == 'Rounded Button' ? '4px' : '0'};
    color: ${fontColor};
    width: 100%;
    display: block;
    text-align: center;
    transition: var(--transitionLinear);
    
    ${buttonVersion(version) && `
      &:hover {
        background-color: ${buttonBackgroundHover}!important;
      }`}
  }
  .bjsSubcopySmall {
    font-size: 14px;
    line-height: 18px;
  }
  .bjsSubcopyMedium {
    font-size: 16px;
    line-height: 20px;
  }
  .bjsSubcopyLarge {
    font-size: 18px;
    line-height: 24px;
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
  }
  .fit-content-btn > *, .fill-btn > * {
    padding: 0.5rem 0.5rem;
  }

  .fill-btn {
    flex-grow: 1;
    max-width: none;
  }
`);

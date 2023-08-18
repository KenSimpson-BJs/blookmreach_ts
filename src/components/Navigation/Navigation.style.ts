import styled from 'styled-components';

export const NavigationContainer = styled.div`
  .list-item {
    max-width: ${props => props.maxWidth};
    margin: 1px;
  }
  .link {
    background-color: ${props =>
      props.version == 'Rounded Button' || props.version == 'Button'
        ? props.buttonBackground
        : ''} !important;
    border-radius: ${props => (props.version == 'Rounded Button' ? '4px' : '0')};
    color: ${props => props.fontColor};
    width: 100%;
    display: block;
    text-align: center;
    &:hover {
      background-color: ${props =>
        props.version == 'Rounded Button' || props.version == 'Button'
          ? props.buttonBackgroundHover
          : ''} !important;
    }
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
  .noSpacing {
    padding: 0px;
  }
  .mediumSpacing {
    padding: 8px;
  }
  .smallSpacing {
    padding: 4px;
  }
  .largeSpacing {
    padding: 16px;
  }
  .noGap {
    gap: 0px;
  }
  .mediumGap {
    gap: 8px;
  }
  .smallGap {
    gap: 4px;
  }
  .largeGap {
    gap: 16px;
  }

  .fit-content-btn {
    flex-basis: auto;
    width: fit-content;
    max-width: fit-content;
  }

  .fill-btn {
    flex-grow: 1;
    max-width: none;
  }
`;

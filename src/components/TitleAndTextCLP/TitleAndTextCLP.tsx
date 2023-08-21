import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Document, ContainerItem, getContainerItemContent, Reference } from '@bloomreach/spa-sdk';
import { BrProps } from '@bloomreach/react-sdk';
import styled from 'styled-components';
import { CTA } from '../ReturnToHomeCTA';
import { sanitize } from '../../../../utils/helper';
import { getSelectionValue, textToHorizontalFlex } from '../../bloomreach-components/general';
import { Link } from '../../bloomreach-components/Link';

const TitleAndTextContainer = styled.div`
  background: ${props => props.backgroundColor};
  background-position: center;
  background-size: cover;
  color: ${props => props.fontColor};
  font-family: 'roboto', sans-serif;
  .errorText {
    margin-bottom: 30px;
  }

  [class*='_bjsHeadline'] {
    font-weight: 700;
  }
  [class*='_bjsHeadline'],
  [class*='_bjsSubcopy'] {
    > * {
      margin-bottom: 0;
    }
  }

  .bjsHeadlineSmall {
    font-size: 18px;
    line-height: 24px;
    margin: 8px 0;
  }
  .bjsHeadlineMedium {
    font-size: 20px;
    line-height: 28px;
    margin: 16px 0;
  }
  .bjsHeadlineLarge {
    font-size: 24px;
    line-height: 32px;
    margin: 16px 0;
  }
  .bjsHeadlineHuge {
    font-size: 36px;
    line-height: 48px;
    margin: 16px 0;
  }

  .bjsSubcopySmall {
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 8px;
  }
  .bjsSubcopyMedium {
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 8px;
  }
  .bjsSubcopyLarge {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 24px;
  }

  .disclaimer {
    font-size: 14px;
  }

  @media screen and (min-width: 768px) {
    .bjsHeadlineSmall {
      font-size: 20px;
      line-height: 26px;
      margin: 16px 0;
    }
    .bjsHeadlineMedium {
      font-size: 24px;
      line-height: 30px;
      margin: 16px 0;
    }
    .bjsHeadlineLarge {
      font-size: 36px;
      line-height: 42px;
      margin: 24px 0;
    }
    [class*='_card__'],
    [class*='_banner__'] {
      .bjsHeadlineSmall,
      .bjsHeadlineMedium,
      .bjsHeadlineLarge {
        margin: 4px 0;
      }
    }
    .bjsHeadlineHuge {
      font-size: 72px;
      line-height: 96px;
      margin: 32px 0;
    }

    .bjsSubcopySmall {
      font-size: 14px;
      line-height: 18px;
      margin-bottom: 8px;
    }
    .bjsSubcopyMedium {
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 24px;
    }
    [class*='_card__'] {
      .bjsSubcopySmall,
      .bjsSubcopyMedium {
        margin-bottom: 4px;
      }
    }
    .bjsSubcopyLarge {
      font-size: 24px;
      line-height: 30px;
      margin-bottom: 36px;
    }
  }

  .bjsTextRed {
    color: var(--bjsRed);
  }
  .bjsTextGrayBlack {
    color: var(--bjsGrayBlack);
  }
  .bjsTextWhite {
    color: var(--bjsWhite);
  }

  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  .bjsSubcopyMedium {
    margin: 0;
    p {
      margin: 0;
    }
  }
  .link_pencil {
    font-weight: 400;
    text-decoration: underline;
  }

  .sidebar-link {
    .title {
      font-weight: 400;
      text-decoration: underline;
    }
  }

  &.pencil-banner-wrap {
    font-family: 'roboto', sans-serif;
    font-size: 14px;
    position: relative;
    padding: 0 150px 0 20px;
    min-height: 42px;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
      padding: 0;
    }
    .pb-main-section {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      min-height: inherit;
      .bjsSubcopyMedium {
        font-size: 14px;
        margin: 0;
        p {
          margin: 0;
        }
      }
      .link_pencil {
        text-decoration: underline;
        text-transform: uppercase;
      }
    }
    .sidebar-link {
      position: absolute;
      right: 10px;
      top: 0;
      a {
        margin: 0;
        font-size: 13px;
        text-decoration: underline;
        font-weight: 400;
      }
      .title {
        font-size: 13px;
        font-weight: 400;
      }
    }
  }
  .pb-link-wrap,
  .UsableNetAssistive .title {
    color: ${props => props.fontColor};
  }
`;

interface TXTCLP {
  background?: string;
  titleText?: any;
  cta?: Cta;
  link?: Anchor;
}

export function TitleAndTextCLP({ bannerClp }): React.ReactElement | null {
  const { background, titleText, cta, link: link } = bannerClp;

  const { title, text, textAlignment, headlineSize, subcopySize, textColor } = titleText;
  console.log({ bannerClp });

  // const models = component?.getModels();

  // const {
  //   backgroundColor,
  //   fontColor,
  //   headlineSize,
  //   subcopySize,
  //   textAlignment,
  //   textLink,
  //   variant
  // } = component.getParameters();
  // const titleAndTextData = page.getContent(textLink).getData();
  // const {
  //   cta,
  //   name,
  //   link,
  //   titleText: { title, text, textColor },
  //   displayName,
  //   disclaimer
  // } = props;
  // if (!component || !page) {
  //   return null;
  // }

  const subcopyStyle = (value: string) => {
    switch (value) {
      case 'Large':
        return 'bjsSubcopyLarge';
      case 'Medium':
        return 'bjsSubcopyMedium';
      case 'Small':
        return 'bjsSubcopySmall';
    }
  };

  const clpBoxOutput = () => {
    return (
      <TitleAndTextContainer backgroundColor={background} fontColor={getSelectionValue(textColor)}>
        <section
          className={`text-${getSelectionValue(textAlignment).toLowerCase()} pb-main-section `}>
          {getSelectionValue(headlineSize) === 'Huge' && title && (
            <h1 className="bjsHeadlineHuge mb-2">{title?.value}</h1>
          )}
          {getSelectionValue(headlineSize) === 'Large' && title && (
            <h2 className="bjsHeadlineLarge mb-2">{title?.value}</h2>
          )}
          {getSelectionValue(headlineSize) === 'Medium' && title && (
            <h3 className="bjsHeadlineMedium mb-2">{title?.value}</h3>
          )}
          {getSelectionValue(headlineSize) === 'Small' && title && (
            <h4 className="bjsHeadlineSmall mb-2">{title?.value}</h4>
          )}
          {text && (
            <>
              <div
                className={subcopyStyle(subcopySize)}
                dangerouslySetInnerHTML={{ __html: sanitize(text?.value) }}></div>

              {cta && link?.href && <CTA cta={cta} link={link} />}
            </>
          )}
        </section>
      </TitleAndTextContainer>
    );
  };

  return (
    <>{link && link.href ? <Link link={link}>{clpBoxOutput()}</Link> : <>{clpBoxOutput()}</>}</>
  );
}

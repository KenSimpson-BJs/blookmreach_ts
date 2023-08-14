import React, { useRef } from "react";
import {
  Document,
  ContainerItem,
  getContainerItemContent,
  Reference,
} from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";
import styled from "styled-components";
import { Link, CTA } from "..";
// import { sanitize } from "../../../../utils/helper";
import styles from "./TitleAndText.module.scss";
import titleStyles from "../ComponentCSSRules/titleTextRules.module.scss";

interface TitleTextParameters {
  backgroundColor: string;
  fontColor: string;
  headlineSize: string;
  subcopySize: string;
  textAlignment: string;
  variant: string;
}
interface TitleTextModels {
  textLink: Reference;
}
interface TitleTextCompound {
  cta: Cta;
  link?: Anchor;
  titleText: titleTextFG;
  disclaimer: Content;
}

interface StyledInterface {
  backgroundcolor: string;
  fontcolor: string;
}

function sanitize(arg: string) {
  return arg;
}

const TitleAndTextContainer = styled.div<StyledInterface>(
  ({ backgroundcolor = "#fff", fontcolor = "#000" }) => `
    background-color: ${backgroundcolor};
    color: ${fontcolor};
    font-family: "roboto", sans-serif;
  
    .pb-link-wrap,
    .UsableNetAssistive, .pencil-text {
      color: ${fontcolor};
    }
`
);

const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
  e.preventDefault();
  console.log("A11y clicked!");
};

function throttle(func: Function, limit: number) {
  let throttled = false;
  if (!throttled) {
    func();
    throttled = true;
    setTimeout(() => (throttled = false), limit);
  }
}

export function TitleAndText({
  component,
  page,
}: BrProps<ContainerItem>): React.ReactElement | null {
  const a11yEl = React.useRef<HTMLDivElement>(null);
  const pencilEl = React.useRef<HTMLDivElement>(null);
  if (!component || !page) {
    return null;
  }
  const { textLink } = component.getModels<TitleTextModels>();
  if (!textLink) return null;

  const {
    backgroundColor,
    fontColor,
    headlineSize,
    subcopySize,
    textAlignment,
    variant,
  } = component.getParameters<TitleTextParameters>();
  const titleAndTextData = page
    .getContent(textLink)!
    .getData<TitleTextCompound>();
  const {
    cta,
    link,
    titleText: { title, text },
    disclaimer,
  } = titleAndTextData;
  if (!component || !page) {
    return null;
  }

  if (component.isHidden()) {
    return page.isPreview() ? <div /> : null;
  }

  window.addEventListener("resize", () => {
    throttle(() => {
      if (pencilEl.current !== null && a11yEl.current !== null) {
        let offsetWidth;
        if (window.innerWidth >= 768) {
          offsetWidth = `${a11yEl.current.offsetWidth}px`;
        } else {
          offsetWidth = `1rem`;
        }

        pencilEl.current.style.paddingLeft = offsetWidth;
        pencilEl.current.style.paddingRight = offsetWidth;
      }
    }, 60);
  });

  const titleOutput = (title: Content, titleSize: string) => {
    if (!title) return null;
    const titleClass = () => `${titleStyles["bjsHeadline" + titleSize]}`;

    switch (titleSize) {
      case "Small":
        return (
          <h4
            className={titleClass()}
            dangerouslySetInnerHTML={{
              __html: sanitize(title.value),
            }}
          ></h4>
        );
      case "Medium":
        return (
          <h3
            className={titleClass()}
            dangerouslySetInnerHTML={{
              __html: sanitize(title.value),
            }}
          ></h3>
        );
      case "Large":
        return (
          <h2
            className={titleClass()}
            dangerouslySetInnerHTML={{
              __html: sanitize(title.value),
            }}
          ></h2>
        );
      case "Huge":
        return (
          <h1
            className={titleClass()}
            dangerouslySetInnerHTML={{
              __html: sanitize(title.value),
            }}
          ></h1>
        );
      default:
        return (
          <h1
            className={titleClass()}
            dangerouslySetInnerHTML={{
              __html: sanitize(title.value),
            }}
          ></h1>
        );
    }
  };
  const subcopyOutput = (pencil: boolean) => {
    if (!text) return null;
    const subcopyStyle = (value: string) => {
      switch (value) {
        case "Large":
          return titleStyles["bjsSubcopyLarge"];
        case "Medium":
          return titleStyles["bjsSubcopyMedium"];
        case "Small":
          return titleStyles["bjsSubcopySmall"];
      }
    };
    return pencil ? (
      <>
        <span
          auto-data="pencilBanner_Text"
          dangerouslySetInnerHTML={{ __html: sanitize(text?.value) }}
        ></span>
        {ctaOutput("pencil-text", variant)}
      </>
    ) : (
      <div
        className={`${subcopyStyle(subcopySize)} mb-0`}
        dangerouslySetInnerHTML={{
          __html: sanitize(text?.value),
        }}
      ></div>
    );
  };
  const ctaOutput = (classes: string = "", variant?: string) => {
    if (!cta || !link?.href) return null;
    return (
      <Link link={link} className={classes}>
        <CTA cta={cta} variant={variant} />
      </Link>
    );
  };

  return (
    <TitleAndTextContainer
      backgroundcolor={backgroundColor}
      fontcolor={fontColor}
      className={`${
        variant === "Pencil Banner"
          ? `${styles["pencil-banner-wrap"]} py-1`
          : ""
      }`}
    >
      <section
        className={`text-${textAlignment.toLowerCase()} ${
          styles["pb-main-section"]
        } ${variant != "Pencil Banner" && "errorText"}`}
      >
        {variant === "Pencil Banner" && (
          <>
            <div
              ref={pencilEl}
              style={
                a11yEl.current && window.innerWidth >= 768
                  ? {
                      paddingLeft: `${a11yEl.current.offsetWidth}px`,
                      paddingRight: `${a11yEl.current.offsetWidth}px`,
                    }
                  : {}
              }
            >
              {subcopyOutput(true)}
            </div>
            <div className="accessibility_button text-center" ref={a11yEl}>
              <a href="#" className="UsableNetAssistive" onClick={clickHandler}>
                Enable Accessibility
              </a>
            </div>
          </>
        )}

        {variant !== "Pencil Banner" && (
          <>
            {titleOutput(title ?? { value: "" }, headlineSize)}
            {subcopyOutput(false)}
            {disclaimer && (
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitize(disclaimer?.value),
                }}
                className={`${titleStyles.disclaimer} mb-3`}
              ></div>
            )}
            {ctaOutput()}
          </>
        )}
      </section>
    </TitleAndTextContainer>
  );
}

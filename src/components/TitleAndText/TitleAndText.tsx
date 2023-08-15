// external
import React, { useRef, ReactElement } from "react";
import { ContainerItem, Reference } from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";
import styled from "styled-components";

// utils
// import { sanitize } from "../../../../utils/helper";

// internal components
import { Link, CTA } from "..";

// styles
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
}: BrProps<ContainerItem>): ReactElement | null {
  const a11yEl = useRef<HTMLDivElement>(null);
  const pencilEl = useRef<HTMLDivElement>(null);
  const models = component?.getModels<TitleTextModels>();
  if (!component || !page || !models?.textLink) return null;

  const {
    backgroundColor,
    fontColor,
    headlineSize,
    subcopySize,
    textAlignment,
    variant,
  } = component.getParameters<TitleTextParameters>();
  const titleAndTextData = page
    .getContent(models.textLink)!
    .getData<TitleTextCompound>();
  const {
    cta,
    link,
    titleText: { title, text },
    disclaimer,
  } = titleAndTextData;

  if (component.isHidden()) {
    return page.isPreview() ? <div /> : null;
  }

  window.addEventListener("resize", () => {
    throttle(() => {
      if (!pencilEl.current || !a11yEl.current) return;
      const offsetWidth =
        window.innerWidth >= 768 ? `${a11yEl.current.offsetWidth}px` : `1rem`;
      pencilEl.current.style.paddingLeft = offsetWidth;
      pencilEl.current.style.paddingRight = offsetWidth;
    }, 60);
  });

  const titleOutput = (title: Content, titleSize: string) => {
    if (!title) return null;

    const tagNum: number = {
      Small: 4,
      Medium: 3,
      Large: 2,
      Huge: 1,
    }[titleSize]!;
    const TitleTag = ({ children }: React.PropsWithChildren<{}>) => {
      const titleClass = titleStyles["bjsHeadline" + titleSize];
      return React.createElement(
        `h${tagNum}`,
        {
          className: titleClass,
          dangerouslySetInnerHTML: { __html: sanitize(title.value) },
        },
        children
      );
    };
    return <TitleTag />;
  };
  const subcopyOutput = (pencil: boolean) => {
    if (!text) return null;

    const subcopyClass: string | undefined = {
      Large: titleStyles["bjsSubcopyLarge"],
      Medium: titleStyles["bjsSubcopyMedium"],
      Small: titleStyles["bjsSubcopySmall"],
    }[subcopySize];

    return pencil ? (
      <span
        auto-data="pencilBanner_Text"
        dangerouslySetInnerHTML={{ __html: sanitize(text?.value) }}
      ></span>
    ) : (
      <div
        className={`${subcopyClass} mb-0`}
        dangerouslySetInnerHTML={{
          __html: sanitize(text?.value),
        }}
      ></div>
    );
  };
  const ctaOutput = (classes: string = "", variant?: string) =>
    cta && link?.href ? (
      <Link link={link} className={classes}>
        <CTA cta={cta} variant={variant} />
      </Link>
    ) : null;
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
        } ${variant !== "Pencil Banner" && "errorText"}`}
      >
        {variant === "Pencil Banner" ? (
          <>
            <div
              ref={pencilEl}
              style={{
                ...(a11yEl.current && window.innerWidth >= 768
                  ? {
                      paddingLeft: `${a11yEl.current.offsetWidth}px`,
                      paddingRight: `${a11yEl.current.offsetWidth}px`,
                    }
                  : {}),
              }}
            >
              {subcopyOutput(true)}
              {ctaOutput("pencil-text", variant)}
            </div>
            <div
              className="accessibility_button text-center pt-2 pt-md-0"
              ref={a11yEl}
            >
              <a href="#" className="UsableNetAssistive" onClick={clickHandler}>
                Enable Accessibility
              </a>
            </div>
          </>
        ) : (
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

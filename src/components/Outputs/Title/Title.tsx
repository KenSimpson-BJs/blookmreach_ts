import React from "react";
import { sanitize } from "../../../utils/general";
import titleStyles from "../../ComponentCSSRules/titleTextRules.module.scss";

interface TitleOutputProps {
  title: Content | undefined;
  titleSize: string;
  className?: string;
}

export const Title: React.FC<TitleOutputProps> = ({
  title,
  titleSize,
  className = "",
}) => {
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
        className: `${titleClass} ${className}`,
        dangerouslySetInnerHTML: { __html: sanitize(title.value) },
      },
      children
    );
  };

  return <TitleTag />;
};

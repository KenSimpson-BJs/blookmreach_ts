import React from "react";
import { sanitize } from "../../../utils/general";
import titleStyles from "../../ComponentCSSRules/titleTextRules.module.scss";

interface SubcopyOutputProps {
  text: Content | undefined; // Assuming Content is a type used elsewhere
  subcopySize: string;
  pencil?: boolean;
  className?: string;
}

export const Subcopy: React.FC<SubcopyOutputProps> = ({
  text,
  subcopySize,
  pencil = false,
  className = "",
}) => {
  if (!text) return null;

  const subcopyClass: string | undefined = {
    Large: titleStyles["bjsSubcopyLarge"],
    Medium: titleStyles["bjsSubcopyMedium"],
    Small: titleStyles["bjsSubcopySmall"],
  }[subcopySize];

  return pencil ? (
    <span
      auto-data="pencilBanner_Text"
      dangerouslySetInnerHTML={{ __html: sanitize(text.value) }}
    ></span>
  ) : (
    <div
      className={`${subcopyClass} ${className} mb-0`}
      dangerouslySetInnerHTML={{
        __html: sanitize(text.value),
      }}
    ></div>
  );
};

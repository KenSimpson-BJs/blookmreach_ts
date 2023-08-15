import React from "react";
import { getSelectionValue, sanitize } from "../../utils/general";
import styles from "./CTA.module.scss";

interface CTA {
  cta: Cta;
  variant?: string;
}

export function CTA(props: CTA): React.ReactElement | null {
  const {
    cta: { cta, style },
    variant,
  } = props ?? {};

  const getCTAClass = (styleValue: string) => {
    type StyleMapping = {
      [key: string]: string;
      "Pencil Banner": string;
      primary: string;
      secondary: string;
      link_red: string;
      link_drk: string;
    };
    const styleMapping: StyleMapping = {
      "Pencil Banner": styles.link_pencil,
      primary: `btn btn-primary`,
      secondary: `btn btn-secondary`,
      link_red: styles.link_red,
      link_drk: styles.link_drk,
    };
    return styleMapping[styleValue] || styles.link;
  };

  const ctaStyle = variant
    ? getCTAClass(variant)
    : style
    ? getCTAClass(getSelectionValue(style))
    : styles.link;

  return (
    <>
      {cta && (
        <span className={ctaStyle}>
          <b dangerouslySetInnerHTML={{ __html: sanitize(cta) }} />
        </span>
      )}
    </>
  );
}

import React from "react";
import styles from "./CTA.module.scss";

interface CTA {
  cta: Cta;
}

export function CTA(props: CTA): React.ReactElement | null {
  const { cta, style } = props.cta ?? {};

  console.log(style.selectionValues);

  const returnStyle = (value: string) => {
    switch (value) {
      case "primary":
        return `btn btn-primary`;
      case "secondary":
        return `btn btn-secondary`;
      default:
        return "link";
    }
  };

  return <span className={returnStyle("primary")}>{cta}</span>;
}

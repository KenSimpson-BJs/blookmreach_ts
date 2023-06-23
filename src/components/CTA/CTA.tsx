import React from "react";
import { getSelectionValue } from "../../utils/general";
import styles from "./CTA.module.scss";

interface CTA {
  cta?: Cta;
}

export function CTA(props: CTA): React.ReactElement | null {
  const { cta, style } = props.cta ?? {};

  const returnStyle = (value: string) => {
    switch (value) {
      case "primary":
        return `btn btn-primary`;
      case "secondary":
        return `btn btn-secondary`;
      case "link_red":
        return `${styles.link_red}`;
      case "link_drk":
        return `${styles.link_drk}`;
      default:
        return `${styles.link_drk}`;
    }
  };

  return (
    <>
      {cta && (
        <span className={style && returnStyle(getSelectionValue(style))}>
          <b>{cta}</b>
        </span>
      )}
    </>
  );
}

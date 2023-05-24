import React from "react";

interface CTA {
  cta: Cta;
}

export function CTA(props: CTA): React.ReactElement | null {
  const {
    cta,
    style: {
      selectionValues: {
        [0]: { key: style },
      },
    },
  } = props.cta ?? {};

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

  return <span className={returnStyle(style)}>{cta}</span>;
}

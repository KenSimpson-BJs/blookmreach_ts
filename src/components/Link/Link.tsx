import React from "react";

interface Link {
  link: Anchor;
  className?: string;
  background?: string;
  children: React.ReactNode | string;
}

export function Link(props: Link): React.ReactElement | null {
  const { className, link, children, background } = props ?? {};

  const {
    hpPlacement,
    newTab,
    href,
    data_gtm_id,
    data_gtm_position,
    data_gtm_name,
    data_gtm_creative,
  } = link;

  const linkClassName = !hpPlacement
    ? "plp-espot-gtm-tag plp-espot-gtm-view"
    : "hp-espot-gtm-tag hp-espot-gtm-view";

  const computedClassName = className
    ? `${linkClassName} ${className}`
    : linkClassName;

  const linkStyle = { backgroundColor: background ? background : "inherit" };

  return (
    <a
      href={href}
      target={newTab ? "_blank" : "_self"}
      data-gtm-id={data_gtm_id}
      data-gtm-position={data_gtm_position}
      data-gtm-name={data_gtm_name}
      data-gtm-creative={data_gtm_creative}
      className={computedClassName}
      style={linkStyle}
    >
      {children}
    </a>
  );
}

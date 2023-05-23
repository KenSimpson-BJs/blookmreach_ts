import React from "react";
import { Button, Container } from "react-bootstrap";
import styles from "./Link.module.scss";

interface Link {
  link: Anchor;
  className?: string;
  children: React.ReactNode | string;
}

export function Link(props: Link): React.ReactElement | null {
  const { className, link, children } = props ?? {};

  return (
    <a
      href={link.href}
      data-gtm-id={link.data_gtm_id}
      data-gtm-position={link.data_gtm_position}
      data-gtm-name={link.data_gtm_name}
      data-gtm-creative={link.data_gtm_creative}
      className={`${
        !link.hpPlacement
          ? "plp-espot-gtm-tag plp-espot-gtm-view"
          : "hp-espot-gtm-tag hp-espot-gtm-view"
      }${className ? ` ${className}` : ""}`}
    >
      {children}
    </a>
  );
}

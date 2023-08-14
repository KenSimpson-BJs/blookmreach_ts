import React from "react";
import { BrProps } from "@bloomreach/react-sdk";
import { Reference, ContainerItem } from "@bloomreach/spa-sdk";

interface HeaderModels {
  navbar: Reference;
  megaMenu: Reference;
  categoryNavigation: Reference;
}

export function Header({
  component,
  page,
}: BrProps<ContainerItem>): React.ReactElement | null {
  const models = component?.getModels<HeaderModels>();
  console.log(models);
  console.log(!models);

  if (!component || !page) {
    return null;
  }

  return <div className="py-5">Hello Header!</div>;
}

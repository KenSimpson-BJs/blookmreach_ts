import widthStyles from "../components/ComponentCSSRules/widthStyles.module.scss";

export const getSelectionValue = (arg: SelectionType) => {
  return arg.selectionValues[0].key;
};

export const setSelectionValue = (arg: SelectionType, value: string) => {
  arg.selectionValues[0].key = value;
};

export const textToHorizontalFlex = (alignment: string) => {
  if (alignment === "Left") return "start";
  if (alignment === "Right") return "end";
  return "center";
};

export function sanitize(arg: string) {
  return arg;
}

export const getMaxWidth = (maxWidth: MaxWidthValue) =>
  widthStyles[`w-${maxWidth}`] ?? "w-75";

export const getSelectionValue = (arg: SelectionType) => {
  return arg.selectionValues[0].key;
};
export const setSelectionValue = (arg: SelectionType, value: string) => {
  arg.selectionValues[0].key = value;
};

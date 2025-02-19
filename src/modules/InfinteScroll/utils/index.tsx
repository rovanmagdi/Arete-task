export const CustomSplit = (
    string: string,
    index: number,
    splitter: string = "/"
  ) => {
    return string.split(splitter)[index];
  };
  
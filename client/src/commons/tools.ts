export const getCSSVar = (name: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(name);

export const equalsIgnoreCase = (first?: string, other?: string): boolean => {
  if (!first && !other) {
    return true;
  } else if (first || other) {
    return false;
  }
  return (
    first!.trim().toLocaleLowerCase() === other!.trim().toLocaleLowerCase()
  );
};

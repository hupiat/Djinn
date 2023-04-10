export const getCSSVar = (name: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(name);

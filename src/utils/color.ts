import type { CssColor } from "../types";

export const rgbToCssColor = ({ r, g, b, a = 1 }: RGBA): CssColor => {
  if (a !== 1) {
    return `rgba(${[r, g, b]
      .map((n) => Math.round(n * 255))
      .join(", ")}, ${a.toFixed(2)})`;
  }
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.padStart(2, "0");
  };

  const hex = [toHex(r), toHex(g), toHex(b)].join("");
  return `#${hex}`;
};

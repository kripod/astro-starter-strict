const DEFAULT_MIN_SCREEN = 320;
const DEFAULT_MAX_SCREEN = 1536;

const HTML_FONT_SIZE = 16;

/**
 * It takes a number, adds a very small number to it, multiplies it by 100, rounds it, and then divides it by 100
 * @param num - The number to be rounded.
 */
const cleanNumber = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

/**
 * Transforms pixels to rems
 * @param px
 */
const pxToRem = (px: number | string) =>
  `${cleanNumber(Number(px) / HTML_FONT_SIZE)}rem`;

/**
 * Determines how fluid typography scales
 */
const getPreferredValue = (
  minSize: number,
  maxSize: number,
  minScreenSize: number,
  maxScreenSize: number,
) => {
  const vwCalc = cleanNumber(
    (100 * (maxSize - minSize)) / (maxScreenSize - minScreenSize),
  );
  const remCalc = cleanNumber(
    (minScreenSize * maxSize - maxScreenSize * minSize) /
      (minScreenSize - maxScreenSize),
  );

  return `${vwCalc}vw + ${pxToRem(remCalc)}`;
};

export const createFluidValue = (
  minSize: number,
  maxSize: number,
  minScreenSize: number = DEFAULT_MIN_SCREEN,
  maxScreenSize: number = DEFAULT_MAX_SCREEN,
) =>
  `clamp(${pxToRem(minSize)}, ${getPreferredValue(
    minSize,
    maxSize,
    minScreenSize,
    maxScreenSize,
  )}, ${pxToRem(maxSize)})`;

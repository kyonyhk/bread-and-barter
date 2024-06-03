export const colorId = [
  `green100`,
  `yellow100`,
  `red100`,
  `black`,
  `white`,
] as const;

export type ColorId = (typeof colorId)[number];

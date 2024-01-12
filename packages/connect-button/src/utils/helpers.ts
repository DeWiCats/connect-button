export const getPublicAddress = (publicAddress: string) => {
  if (!publicAddress) return undefined;

  return `${publicAddress.slice(0, 4)}..${publicAddress.slice(-4)}`;
};

export const EVENT_KEYS = {
  BACKSPACE: "Backspace",
  LEFT_ARROW: "ArrowLeft",
  UP_ARROW: "ArrowUp",
  RIGHT_ARROW: "ArrowRight",
  DOWN_ARROW: "ArrowDown",
  LOWER_E: "e",
  UPPER_E: "E",
  MINUS: "-",
  PERIOD: ".",
} as const;

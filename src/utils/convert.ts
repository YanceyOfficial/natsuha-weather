export const convertCelsiusFahrenheit = (type: boolean, value: number) => {
  if (type) {
    return (value * 1.8 + 32);
  } else {
    return ((value - 32) / 1.8);
  }
}

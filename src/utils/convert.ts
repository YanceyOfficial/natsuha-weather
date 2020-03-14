export const convertCelsiusFahrenheit = (type: boolean, value: number) => {
  if (type) {
    return value * 1.8 + 32
  } else {
    return (value - 32) / 1.8
  }
}

export const convertKmMiles = (type: boolean, value: number) => {
  if (type) {
    return value * 0.621371192
  } else {
    return value / 0.621371192
  }
}

export const convertMillibarsInches = (type: boolean, value: number) => {
  if (type) {
    return value * 0.0296134
  } else {
    return value / 0.0296134
  }
}

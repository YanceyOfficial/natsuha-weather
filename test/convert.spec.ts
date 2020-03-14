import * as convert from '../utils/convert'

test('should get right date', () => {
  expect(convert.convertCelsiusFahrenheit(true, 20)).toBe(68)
  expect(convert.convertCelsiusFahrenheit(false, 32)).toBe(0)
})

test('should get right date', () => {
  expect(convert.convertKmMiles(true, 20)).toBe(12.42742384)
  expect(convert.convertKmMiles(false, 0.621371192)).toBe(1)
})

test('should get right date', () => {
  expect(convert.convertMillibarsInches(true, 1)).toBe(0.0296134)
  expect(convert.convertMillibarsInches(false, 0.0296134)).toBe(1)
})

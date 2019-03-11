import * as utils from '../utils/util';

test('should get right date', () => {
  expect(utils.formatJSONDate('2019-03-10T04:15:40.629Z')).toBe('2019-03-10 12:15:40')
})

test('should get right date', () => {
  expect(utils.hourTo12('2019-03-10T04:15:40.629Z')).toBe('3/10, 4:15 AM')
})

test('should get right date', () => {
  expect(utils.hourTo12Lite(14)).toBe('2 PM')
  expect(utils.hourTo12Lite(7)).toBe('7 AM')
})

test('should get right date', () => {
  expect(utils.upperFirstLetter('AFTERNOON')).toBe('Afternoon')
  expect(utils.upperFirstLetter('YANCEY_LEO')).toBe('Yancey_Leo')
})

test('should get right date', () => {
  expect(utils.getImageUrl('Temperature', 'clear_day')).toBe('https://s.yimg.com/os/weather/1.0.1/shadow_icon/60x60/clear_day@2x.png')
  expect(utils.getImageUrl('Precipitation', 0)).toBe('https://s.yimg.com/os/weather/1.0.1/precipitation/54x60/rain_ico_0@2x.png')
  expect(utils.getImageUrl('Moon', 2)).toBe('https://s.yimg.com/os/weather/1.0.1/moon/ic_moonphase_2@3x.png')
})

test('should get right date', () => {
  expect(utils.getRainfallIconName(25)).toBe(20)
})

test('should get right date', () => {
  expect(utils.windDirectFormat('North North West')).toBe('NNW')
  expect(utils.windDirectFormat('North')).toBe('North')
})

test('should get right date', () => {
  expect(utils.getWindSpeed(0)).toBe(3.5625)
  expect(utils.getWindSpeed(6)).toBe(3.125)
  expect(utils.getWindSpeed(11)).toBe(2.6875)
  expect(utils.getWindSpeed(16)).toBe(2.25)
  expect(utils.getWindSpeed(21)).toBe(1.8125)
  expect(utils.getWindSpeed(-1)).toBe(3.5625)
})

test('should get right date', () => {
  expect(utils.formatSunRiseAndSetDate(22700)).toBe('6:18')
  expect(utils.formatSunRiseAndSetDate(22000)).toBe('6:08')
  expect(utils.formatSunRiseAndSetDate(43200)).toBe('12:00')
})

test('should get right date', () => {
  expect(utils.formatWeek(0)).toBe('Sunday')
})

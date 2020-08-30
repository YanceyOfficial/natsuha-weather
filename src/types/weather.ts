import Region from './region'

export interface WeatherProps {
  weatherStore: {
    weatherData: Weather
    metaData: Meta
    curWoeid: string
    curCountryName: string
    curCityName: string
    isFahrenheit: boolean
    backgroudImageUrl: string
    widthBackgroudImageUrl: string
    showModal: boolean
    showSearch: boolean
    isSearching: boolean
    regionList: Region[]

    getLanguage: () => void
    getStorage: () => void
    getSetting: () => void
    getWeatherById: (woeid: string) => void
    getWoeid: (lat: number, lon: number, lang: string) => void
    getRegion: (text: string) => void
    getPosition: () => void
    handleTemperatureTypeChange: (type: boolean) => void
    showSearchDialog: () => void
    hideSearchDialog: () => void
    handleInputTextChange: (e: any) => void
    handleSelectRegionChange: (woeid: string, qualifiedName: string) => void
    deleteHistoryItemByWoeid: (woeid: string) => void
  }
  needBlur?: boolean
}

export interface Meta {
  conditionMap: {}
  skycode: {}
}

export interface Weather {
  woeid?: number
  unit?: string
  sunAndMoon: SunAndMoon
  provider?: Provider
  precipitations: Precipitation[]
  photos: Photo[]
  observation: Observation
  location: Location
  forecasts: Forecasts
}

interface SunAndMoon {
  moonPhase: number
  sunrise: number
  sunset: number
}

interface Provider {
  name: string
}

interface Precipitation {
  probability: number
  timeSlot: string
}

interface Photo {
  dayOrNight?: string
  id?: string
  owner?: string
  ownerName: string
  resolutions: Resolution[]
}

interface Resolution {
  height: number
  width: number
  url: string
}

interface Observation extends Condition, Wind, Temperature {
  barometricPressure: number
  uvDescription: string
  uvIndex: number
  visibility: number
}

interface DayPartText {
  text: string
  dayPart: string
}

interface Location {
  countryName: string
  displayName: string
  latitude?: number
  longitude?: number
  offsetSecs?: number
  photoWoeid?: number
  woeid?: number
}

interface Forecasts {
  daily: Daily[]
  hourly: Hourly[]
}

interface Daily extends Condition, Temperature {}

interface Hourly extends Condition, Wind, Temperature {}

interface Condition {
  conditionCode: number
  conditionDescription: string
  dayPartTexts: DayPartText[]
  humidity: number
  localTime: {
    day?: number
    hour?: number
    timestamp: string
    weekday?: number
  }
  observationTime: {
    day?: number
    hour: number
    timestamp?: string
    weekday: number
  }
  precipitationProbability: number
}

interface Wind {
  windDirection?: number
  windDirectionCode: string
  windSpeed: number
}

interface Temperature {
  temperature: {
    feelsLike: number
    high: number
    low: number
    now: number
  }
}

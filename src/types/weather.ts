import IRegion from './region';
export interface IWeatherProps {
  weatherStore: {
    weatherData: IWeather;
    metaData: IMeta;
    curWoeid: string;
    curCountryName: string;
    curCityName: string;
    isFahrenheit: boolean;
    backgroudImageUrl: string;
    widthBackgroudImageUrl: string;
    showModal: boolean;
    showSearch: boolean;
    isSearching: boolean;
    regionList: IRegion[];

    getLanguage: () => void;
    getStorage: () => void;
    getSetting: () => void;
    getWeatherById: (woeid: string) => void;
    getWoeid: (lat: number, lon: number) => void;
    getRegion: (text: string) => void;
    getPosition: () => void;
    handleTemperatureTypeChange: (type: boolean) => void;
    showSearchDialog: () => void;
    hideSearchDialog: () => void;
    handleInputTextChange: (e: any) => void;
    handleSelectRegionChange: (woeid: string, qualifiedName: string) => void;
    deleteHistoryItemByWoeid: (woeid: string) => void;
  };
  needBlur: boolean;
}

export interface IMeta {
  conditionMap: {};
  skycode: {};
}

export interface IWeather {
  woeid ? : number;
  unit ? : string;
  sunAndMoon: ISunAndMoon;
  provider ? : IProvider;
  precipitations: IPrecipitation[];
  photos: IPhoto[];
  observation: IObservation;
  location: ILocation;
  forecasts: IForecasts;
}

interface ISunAndMoon {
  moonPhase: number;
  sunrise: number;
  sunset: number;
}

interface IProvider {
  name: string;
}

interface IPrecipitation {
  probability: number;
  timeSlot: string;
}

interface IPhoto {
  dayOrNight ? : string;
  id ? : string;
  owner ? : string;
  ownerName: string;
  resolutions: IResolution[];
}

interface IResolution {
  height: number;
  width: number;
  url: string;
}

interface IObservation extends ICondition, IWind, ITemperature {
  barometricPressure: number;
  uvDescription: string;
  uvIndex: number;
  visibility: number;
}

interface IDayPartText {
  text: string;
  dayPart: string;
}

interface ILocation {
  countryName: string;
  displayName: string;
  latitude ? : number;
  longitude ? : number;
  offsetSecs ? : number;
  photoWoeid ? : number;
  woeid ? : number;
}

interface IForecasts {
  daily: IDaily[];
  hourly: IHourly[];
}

interface IDaily extends ICondition, ITemperature {}

interface IHourly extends ICondition, IWind, ITemperature {}

interface ICondition {
  conditionCode: number;
  conditionDescription: string;
  dayPartTexts: IDayPartText[];
  humidity: number;
  localTime: {
    day ? : number;
    hour ? : number;
    timestamp: string;
    weekday ? : number;
  };
  observationTime: {
    day?: number;
    hour: number;
    timestamp?: string;
    weekday: number;
  };
  precipitationProbability: number;
}

interface IWind {
  windDirection ? : number;
  windDirectionCode: string;
  windSpeed: number;
}

interface ITemperature {
  temperature: {
    feelsLike: number;
    high: number;
    low: number;
    now: number;
  };
}

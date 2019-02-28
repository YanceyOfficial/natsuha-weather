export interface IWeatherProps {
  weatherStore: {
    weatherData: IWeather;
    curSkyCode: string;
    metaData: IMeta;
    isF: boolean;
    updateKey: number;
    getWeatherById: Function;
    getRegion: Function;
    getPosition: Function;
    handleTemperatureType: Function;
    renderTrigger: Function;
  };
};

export interface IMeta {
  conditionMap: {};
  skycode: {};
}

export interface IWeather {
  woeid: number;
  unit: string;
  sunAndMoon: ISunAndMoon;
  provider: IProvider;
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
  dayOrNight?: string;
  id?: string;
  owner?: string;
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
  latitude?: number;
  longitude?: number;
  offsetSecs?: number;
  photoWoeid?: number;
  woeid?: number;
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
    day?: number;
    hour?: number;
    timestamp: string;
    weekday?: number;
  };
  observationTime?: {
    day: number;
    hour: number;
    timestamp: string;
    weekday: number;
  };
  precipitationProbability?: number;
}

interface IWind {
  windDirection?: number;
  windDirectionCode: string;
  windSpeed: number;
}

interface ITemperature {
  temperature: {
    feelsLike: number;
    high: number;
    low: number;
    now: number;
  }
}

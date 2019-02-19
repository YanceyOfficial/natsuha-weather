type PageStateProps = {
  counterStore: {
    counter: number;
    increment: Function;
    decrement: Function;
    incrementAsync: Function;
  };
  weatherStore: {
    weatherData: any;
    getWeatherById: Function;
    getRegion: Function;
  };
};

export default interface Index {
  props: PageStateProps;
}

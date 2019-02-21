export default interface IRegionList {
  regionList: IRegion[];
}

interface IRegion {
  woeid: number;
  lat: number;
  lon: number;
  country: string;
  city: string;
  qualifiedName: string;
}

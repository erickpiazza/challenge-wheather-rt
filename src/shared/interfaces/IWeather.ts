import {ICoord} from './ICoord';

interface IWeatherMain {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface IWeather {
  name: string;
  id: number;
  main: IWeatherMain;
  coord: ICoord;
}

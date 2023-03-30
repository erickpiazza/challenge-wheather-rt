import {AxiosResponse} from 'axios';
import api from '../api/axios';
import {appid, ICoord, IWeather} from '../shared';

interface IPayload {
  coord: ICoord;
}

interface IOutputWeather extends IWeather {}

export default async function getWeather({
  coord,
}: IPayload): Promise<IOutputWeather | undefined> {
  return await api
    .get(
      `data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&units=metric&lang=pt_br&appid=${appid}`,
    )
    .then((response: AxiosResponse<IOutputWeather>) => {
      console.log('response', response);
      return response.data;
    })
    .catch(err => {
      return err;
    });
}

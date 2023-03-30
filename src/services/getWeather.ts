import {AxiosResponse} from 'axios';
import api from '../api/axios';
import {ICoord, IWeather} from '../shared/interfaces';

interface IPayload {
  coord: ICoord;
}
const appid = 'f6a5ec855dd41922293af61f6ba32181';

interface IOutputWeather extends IWeather {}

export default async function getWeather({
  coord,
}: IPayload): Promise<IOutputWeather | undefined> {
  return await api
    .get(
      `weather?lat=${coord.lat}&lon=${coord.lon}&units=metric&lang=pt_br&appid=${appid}`,
    )
    .then((response: AxiosResponse<IOutputWeather>) => {
      console.log('response', response);
      return response.data;
    })
    .catch(err => {
      return err;
    });
}

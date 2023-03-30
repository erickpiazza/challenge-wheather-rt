import {AxiosResponse} from 'axios';
import api from '../api/axios';
import {appid, ICoord} from '../shared';

interface IPayload {
  city: string;
}

interface IOutputLocation extends ICoord {}

export default async function getLocation({
  city,
}: IPayload): Promise<IOutputLocation | undefined> {
  return await api
    .get(`geo/1.0/direct?q=${city}&limit=5&appid=${appid}`)
    .then((response: AxiosResponse<IOutputLocation>) => {
      console.log('response', response);
      return response.data;
    })
    .catch(err => {
      return err;
    });
}

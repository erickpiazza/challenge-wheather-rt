import {AxiosResponse} from 'axios';
import api from '../api/axios';
import {appid, ILocation} from '../shared';

interface IPayload {
  city: string;
}

interface IOutputLocation extends Array<ILocation> {}

export default async function getLocation({
  city,
}: IPayload): Promise<IOutputLocation> {
  return await api
    .get(`geo/1.0/direct?q=${city}&limit=5&appid=${appid}`)
    .then((response: AxiosResponse<IOutputLocation>) => {
      console.log('response', response);
      return response.data;
    })
    .catch(() => {
      return [];
    });
}

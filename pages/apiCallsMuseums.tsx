import axios from 'axios';
import { Artifact } from '../constants/types';

export const getFromCollection = async (): Promise<Artifact> => {
  const data = await axios
    .get(`/api/getimage`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return undefined;
    });

  return data as Promise<Artifact>;
};

import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';
import { Artifact } from '../../constants/types';

dotenv.config();

const handler = async (req: NextApiRequest, res: NextApiResponse<Artifact>) => {
  const totalObjectsIds = await getTotalObjects();
  const object = await callObjectUntilPrimaryImage(totalObjectsIds);
  res.status(200).json(object);
};

const getTotalObjects = async () => {
  return axios
    .get('https://collectionapi.metmuseum.org/public/collection/v1/search', {
      params: {
        q: '',
        hasImages: true,
      },
    })
    .then((response) => {
      return response.data.objectIDs;
    })
    .catch((error) => {
      console.log(error);
      return undefined;
    });
};

const getObjectById = async (id: string) => {
  return axios
    .get(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return undefined;
    });
};

const MAX_TRIES = 10;
//! Tries to get an object with a primary image

const callObjectUntilPrimaryImage = async (
  totalObjectsIds: string[],
  tries: number = 0
): Promise<Artifact> => {
  const randomIdIndex = Math.floor(Math.random() * totalObjectsIds.length);
  const randomId = totalObjectsIds[randomIdIndex];
  console.log('before the object', randomId);
  const object = await getObjectById(randomId);
  console.log('the object', object);
  console.log('in call number', tries);

  //TODO: Check the id is not in the Backend yet when collection is done

  if (!object.primaryImageSmall && tries < MAX_TRIES) {
    return callObjectUntilPrimaryImage(totalObjectsIds, tries + 1);
  }
  return object;
};

export default handler;

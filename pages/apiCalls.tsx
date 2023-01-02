import axios from 'axios';

export type Artifact = {
  title: string;
  medium: string;
  objectID: string;
  objectURL: string;
  primaryImage: string;
  objectName: string;
  region: string;
  culture: string;
  artistAlphaSort: string;
  artistPrefix: string;
  artistNationality: string;
  objectDate: string;
};

export const getFromCollection = async (): Promise<Artifact> => {
  const totalObjectsIds = await getTotalObjects();
  const randomIdIndex = Math.floor(Math.random() * totalObjectsIds.length);
  const randomId = totalObjectsIds[randomIdIndex];
  //TODO: Check the id is not in the Backend yet

  const response = axios
    .get(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`
    )
    .then((response) => {
      // handle success
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
      return undefined;
    })
    .finally(() => {
      // always executed
    });

  return response as Promise<Artifact>;
};

const getTotalObjects = async () => {
  const response = await axios.get(
    'https://collectionapi.metmuseum.org/public/collection/v1/search',
    {
      params: {
        q: '',
        hasImages: true,
      },
    }
  );
  return response.data.objectIDs;
};

import axios from 'axios';

export const getFromCollection = async () => {
  const totalObjects = await getTotalObjects();
  const randomId = Math.floor(Math.random() * totalObjects);
  //TODO: Check the id is not in the Backend yet

  axios
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
    })
    .finally(() => {
      // always executed
    });
};

const getTotalObjects = async () => {
  const response = await axios.get(
    'https://collectionapi.metmuseum.org/public/collection/v1/objects'
  );
  return response.data.total;
};

import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';

dotenv.config();

type Data = {
  name: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const key = process.env.SD_API_KEY;
  const body = { ...req.body, key };

  return axios
    .post(`https://stablediffusionapi.com/api/v3/text2img`, body)
    .then((response) => {
      // handle success
      console.log('the res in backend is: ', response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      // handle error
      console.log(error);
      res.status(200).json(error.response.data);
    })
    .finally(() => {
      // always executed
    });
};

export default handler;

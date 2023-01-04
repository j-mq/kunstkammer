import axios from 'axios';

export type ImageData = {
  output: string[];
};

export const generateImage = async () => {
  const body = {
    prompt:
      'ultra realistic close up portrait ((beautiful pale cyberpunk female with heavy black eyeliner)), blue eyes, shaved side haircut, hyper detail, cinematic lighting, magic neon, dark red city, Canon EOS R3, nikon, f/1.4, ISO 200, 1/160s, 8K, RAW, unedited, symmetrical balance, in-frame, 8K',
    negative_prompt:
      '((out of frame)), ((extra fingers)), mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), (((tiling))), ((naked)), ((tile)), ((fleshpile)), ((ugly)), (((abstract))), blurry, ((bad anatomy)), ((bad proportions)), ((extra limbs)), cloned face, (((skinny))), glitchy, ((extra breasts)), ((double torso)), ((extra arms)), ((extra hands)), ((mangled fingers)), ((missing breasts)), (missing lips), ((ugly face)), ((fat)), ((extra legs)), anime',
    width: '512',
    height: '512',
    samples: '1',
    num_inference_steps: '20',
    seed: null,
    guidance_scale: 7.5,
    webhook: null,
    track_id: null,
  };

  const data = await axios
    .post(`/api/genimage`, body)
    .then((response) => {
      // handle success
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

  console.log('the res in front', data);
  return data as unknown as Promise<ImageData>;
};

export const transformImage = async (prompt: string, imageURL: string) => {
  const body = {
    prompt,
    negative_prompt:
      '((out of frame)), ((extra fingers)), mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), (((tiling))), ((naked)), ((tile)), ((fleshpile)), ((ugly)), (((abstract))), blurry, ((bad anatomy)), ((bad proportions)), ((extra limbs)), cloned face, (((skinny))), glitchy, ((extra breasts)), ((double torso)), ((extra arms)), ((extra hands)), ((mangled fingers)), ((missing breasts)), (missing lips), ((ugly face)), ((fat)), ((extra legs)), anime',
    init_image: imageURL,
    width: '512',
    height: '512',
    samples: '1',
    num_inference_steps: '30',
    seed: null,
    guidance_scale: 7.5,
    strength: 0.7,
    webhook: null,
    track_id: null,
  };

  const data = await axios
    .post(`/api/transimage`, body)
    .then((response) => {
      // handle success
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

  console.log('the res in front', data);
  return data as unknown as Promise<ImageData>;
};

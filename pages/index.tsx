import Head from 'next/head';
import styled from 'styled-components';
import { useState } from 'react';
import { getFromCollection } from './apiCallsMuseums';
import { Artifact } from '../constants/types';
import Button from './components/Button';
import TextInput from './components/TextInput';

const Container = styled.main`
  padding: 40px;
  height: 100vh;
  display: grid;
  overflow-x: hidden;
  overflow-y: auto;
  justify-items: center;
  grid-template-areas:
    'title'
    'main'
    'footer';
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr auto;
  background: ${(props) => props.theme.pageBackground};
`;

const Title = styled.div`
  grid-area: title;
  font-size: 32px;
  text-align: center;
  text-shadow: 0px 0px 5px #de8bc9;
`;

const Main = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 720px;
`;

const ImageContainer = styled.img`
  width: 300px;
  height: 300px;
  object-fit: contain;
`;

const Footer = styled.div`
  grid-area: footer;
`;

type DiscoverProps = {};

const Discover = (props: DiscoverProps) => {
  const [chestButtonDisabled, setChestButtonDisabled] = useState(true);
  const [discovererName, setDiscovererName] = useState('');
  const [loading, setLoading] = useState(false);
  const [artifact, setArtifact] = useState<Artifact | undefined>(undefined);
  const [artifactPrompt, setArtifactPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const onDiscovererNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscovererName(e.target.value);
    setChestButtonDisabled(e.target.value.length === 0);
  };

  const getArtist = (artifact: Artifact) => {
    if (artifact.artistPrefix || artifact.artistAlphaSort || artifact.culture) {
      return `by ${artifact.artistPrefix} ${artifact.artistAlphaSort} ${artifact.culture}`;
    }
    return '';
  };

  const getArtifactPrompt = (artifact: Artifact) => {
    return `This is ${artifact.title}, a ${artifact.objectName}, ${
      artifact.region
    } ${artifact.artistNationality} ${artifact.culture} 
    ${getArtist(artifact)}, made in ${artifact.medium}, made on the year ${
      artifact.objectDate
    }`;
  };

  const onChestButtonClick = async () => {
    setLoading(true);
    const data = await getFromCollection();
    if (data) {
      const artifactPrompt = getArtifactPrompt(data);
      setLoading(false);
      setArtifact(data);
      setArtifactPrompt(artifactPrompt);

      //! Commented to avoid using AI API Credits
      // if (data.primaryImageSmall) {
      //   const transformed = await transformImage(
      //     artifactPrompt,
      //     data.primaryImageSmall
      //   );
      //   setGeneratedImage(transformed.output[0]);
      // }
    } else {
      setError('Error getting Artifact');
    }
  };

  // const onClickGenerate = async () => {
  //   setLoading(true);
  //   const generated = await generateImage();

  //   if (generated.output.length > 0) {
  //     setLoading(false);
  //     setGeneratedImage(generated.output[0]);
  //   }
  // };

  //TODOs:
  // - Do some prompt engineering for cohesive results
  // - Design the UI and apply full flow
  // - Make Backend and DB to save generated images
  // - Connect DB data to show gallery

  return (
    <>
      <Head>
        <title>Do AI Dream of Electric Curiosities?</title>
        <meta
          name='description'
          content='ai image generation based on museum collections'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container>
        <Title>Do AI Dream of Electric Curiosities?</Title>
        <Main>
          {error && <div>{error}</div>}
          {loading && <div>Loading...</div>}
          {artifact && (
            <>
              <ImageContainer src={artifact.primaryImageSmall}></ImageContainer>
              <div>{artifactPrompt}</div>
              <a href={artifact.objectURL} target='_blank'>
                Original Source
              </a>
            </>
          )}
          <button disabled={chestButtonDisabled} onClick={onChestButtonClick}>
            Chest Button
          </button>
          <TextInput
            placeholder='Input your name to open'
            value={discovererName}
            onChange={onDiscovererNameChange}
            maxCharacters={30}
            width='230px'
          />
          {generatedImage && (
            <ImageContainer src={generatedImage}></ImageContainer>
          )}
          {/* <button onClick={onClickGenerate}>GenerateTest</button> */}
        </Main>
        <Footer>
          <Button onClick={() => console.log('Go To Collection')} width='200px'>
            Collection
          </Button>
        </Footer>
      </Container>
    </>
  );
};

export default Discover;

import Head from 'next/head';
import { Inter } from '@next/font/google';
import styled from 'styled-components';
import { useState } from 'react';
import { getFromCollection } from './apiCalls';

const Container = styled.main`
  padding: 40px;
  height: 100vh;
  display: grid;
  overflow-x: hidden;
  overflow-y: hidden;
  justify-items: center;
  grid-template-areas:
    'title'
    'main'
    'footer';
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr auto;
`;

const Title = styled.div`
  grid-area: title;
`;

const Main = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Footer = styled.div`
  grid-area: footer;
`;

type DiscoverProps = {};

const Discover = (props: DiscoverProps) => {
  const [chestButtonDisabled, setChestButtonDisabled] = useState(true);
  const [discovererName, setDiscovererName] = useState('');

  const onDiscovererNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscovererName(e.target.value);
    setChestButtonDisabled(e.target.value.length === 0);
  };

  const onChestButtonClick = () => {
    getFromCollection();
  };

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
          <button disabled={chestButtonDisabled} onClick={onChestButtonClick}>
            Chest Button
          </button>
          <input
            type='text'
            placeholder='Input your name to open'
            value={discovererName}
            onChange={onDiscovererNameChange}
          />
        </Main>
        <Footer>
          <button>Collection</button>
        </Footer>
      </Container>
    </>
  );
};

export default Discover;

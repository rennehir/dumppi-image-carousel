import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import ImageSlider from './ImageSlider';

const token = process.env.REACT_APP_DATOCMS_API_TOKEN;

const client = new ApolloClient({
  uri: `https://graphql.datocms.com/`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ImageSlider />
    </ApolloProvider>
  );
};

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
//first we import the symbols that we need from the apollo client
// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from 'apollo/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
//intializing Apollo client by passing it as a constructor
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);


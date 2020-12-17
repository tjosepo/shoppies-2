import React from 'react';
import { render } from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/core';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { Footer, Main } from './components/';
import { theme } from './mui-theme';
import './index.scss';

function App() {
  const restLink = new RestLink({ uri: "https://omdbapi.com" });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: restLink
  });

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Main />
        <Footer />
      </ApolloProvider>
    </ThemeProvider>
  )
}

render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

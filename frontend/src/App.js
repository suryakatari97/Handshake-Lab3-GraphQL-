import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main.js';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:3001/graphql"
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;

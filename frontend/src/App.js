import React from "react";
//import './App.css';

// ************** Apollo Client ***************
import { onError } from "apollo-link-error";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
// *********************************************

//--- User defined modules ----
import Burner from "./components/Layouts/Burner";
//import Routes from "./components/Layouts/Routes";
import Footer from "./components/Layouts/Footer";
import Header from "./components/Layouts/Header";

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: "http://localhost:4800/graphql"
});

const client = new ApolloClient({
  cache,
  link,
  onError: onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  })
});

//***********************************************
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App container">
        <Burner />
        <Header />
        {/* <Routes /> */}
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;

/*
import React from "react";
//import logo from './logo.svg';
//import './App.css';
import Burner from "./components/Burner";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="container">
      <Burner className="App-header" />
      <Header className="App-header" />
      <Footer className="App-header" />
    </div>
  );
}

export default App;
*/

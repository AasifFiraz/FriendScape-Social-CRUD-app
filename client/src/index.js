import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: 'https://friendscape-api.herokuapp.com/',
});

const authLink = setContext((_, { headers }) => {
  const currentUser = JSON.parse(localStorage.getItem("CURRENT_USER"))
  
  return {
    headers: {
      ...headers,
      authorization: currentUser ? `Bearer ${currentUser.token}` : ""
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    ,
  </React.StrictMode>
);

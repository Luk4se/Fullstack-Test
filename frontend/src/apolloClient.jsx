import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://scandiweb-test-backend-g3ln.onrender.com/graphql', // your backend endpoint
  cache: new InMemoryCache(),
});

export default client;

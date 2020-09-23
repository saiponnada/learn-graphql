import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const GET_LOGIN_INFO = gql`
  query GetLoginInfo {
    viewer {
      login
    }
  }
`;

export const GET_REPO_LIST = gql`
  query listRepos($queryString: String!) {
    rateLimit {
      cost
      remaining
      resetAt
    }
    search(query: $queryString, type: REPOSITORY, first: 20) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            name
            createdAt
            description
            url
            owner {
              login
              id
              url
            }
          }
        }
      }
    }
  }
`;

const apiRoot = 'https://api.github.com/graphql';
const httpLink = createHttpLink({
  uri: apiRoot,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

/*
export function fetchAPI(query, accessToken) {
  return fetch(apiRoot, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache',
    headers: {
      'content-type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

// Refs
//https://developer.github.com/v4/guides/forming-calls/#authenticating-with-graphql

https://medium.com/@fabiomolinar/using-githubs-graphql-to-retrieve-a-list-of-repositories-their-commits-and-some-other-stuff-ccbbb4e96d78

*/

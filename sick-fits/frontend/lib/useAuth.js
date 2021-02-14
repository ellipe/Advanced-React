import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

export const USER_AUTHENTICATED_QUERY = gql`
  query USER_AUTHENTICATED_QUERY {
    authenticatedItem {
      ... on User {
        id
        name
        email
      }
    }
  }
`;

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          name
          email
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      email
      name
    }
  }
`;
export default function useAuth() {
  const { data } = useQuery(USER_AUTHENTICATED_QUERY);
  return {
    user: data?.authenticatedItem,
  };
}

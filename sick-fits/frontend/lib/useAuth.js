import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

export const CURRENT_USER_AUTH = gql`
  query CURRENT_USER_AUTH {
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

export default function useAuth() {
  const { data } = useQuery(CURRENT_USER_AUTH);
  return {
    user: data?.authenticatedItem,
  };
}

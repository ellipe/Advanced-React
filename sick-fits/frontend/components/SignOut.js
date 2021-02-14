import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { USER_AUTHENTICATED_QUERY } from '../lib/useAuth';

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut() {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [
      {
        query: USER_AUTHENTICATED_QUERY,
      },
    ],
  });
  return (
    <button type="button" onClick={signout}>
      Sign Out
    </button>
  );
}

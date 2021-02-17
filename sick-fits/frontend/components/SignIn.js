import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { SIGNIN_MUTATION, CURRENT_USER_QUERY } from '../lib/useAuth';
import DisplayError from './ErrorMessage';

function SignIn() {
  const router = useRouter();

  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { data, error: signinError }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin();
    resetForm();
  };

  if (
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordSuccess'
  ) {
    router.push('/');
  }

  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <DisplayError error={error || signinError} />
      <h2>Sign Into Your Account</h2>
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={inputs.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  );
}

export default SignIn;

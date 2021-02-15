import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { RESET_PASSWORD_MUTATION } from '../lib/useAuth';
import DisplayError from './ErrorMessage';

export default function ResetPassword({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [reset, { data, loading, error: resetError }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      variables: inputs,
    }
  );

  const error = data?.reedemUserPasswordResetToken?.code
    ? data?.reedemUserPasswordResetToken
    : undefined;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await reset();
    resetForm();
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <DisplayError error={error || resetError} />
      <h2>Reset Your Password</h2>
      <fieldset disabled={loading}>
        {!error && <p>Success! Check your email for a link!</p>}
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
        <label htmlFor="email">
          Password
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={inputs.password}
            onChange={handleChange}
            autoComplete="password"
          />
        </label>
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}

ResetPassword.propTypes = {
  token: PropTypes.string.isRequired,
};

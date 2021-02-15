import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { REQUEST_PASSWORD_RESET } from '../lib/useAuth';
import DisplayError from './ErrorMessage';

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [request, { data, error }] = useMutation(REQUEST_PASSWORD_RESET, {
    variables: inputs,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await request();
    resetForm();
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <h2>Request Password Reset</h2>
      <fieldset>
        {!error && data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link!</p>
        )}
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
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}

RequestReset.propTypes = {};

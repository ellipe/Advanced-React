import { useState } from 'react';

export default function useForm(initialState = {}) {
  const [inputs, setInputs] = useState(initialState);

  const handleChange = (e) => {
    let { name, value, type } = e.target;

    switch (type) {
      case 'number':
        value = parseFloat(value);
        break;
      case 'file':
        [value] = e.target.files;
        break;
      default:
        break;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const resetForm = () => {
    setInputs(initialState);
  };

  const clearForm = () => {
    const empty = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ''])
    );
    setInputs(empty);
  };

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}

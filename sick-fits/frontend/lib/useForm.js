import { useState, useEffect } from 'react';

export default function useForm(initialState = {}) {
  const [inputs, setInputs] = useState(initialState);
  const initialValues = Object.values(initialState).join(''); // this is needed to avoid an infinite loop.

  useEffect(() => {
    setInputs(initialState);
  }, [initialValues]);

  const handleChange = (e) => {
    let { name, value, type } = e.target;

    switch (type) {
      case 'number':
        value = value && value >= 0 ? parseFloat(value) : 0;
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

import PropTypes from 'prop-types';

export default function Page({ children }) {
  return (
    <>
      <h2>Nav</h2>
      <h1>A</h1>
      {children}
    </>
  );
}

Page.propTypes = {
  children: PropTypes.object,
};

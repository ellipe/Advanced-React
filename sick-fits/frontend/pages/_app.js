import PropTypes from 'prop-types';
import Page from './Page';

export default function App({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
};

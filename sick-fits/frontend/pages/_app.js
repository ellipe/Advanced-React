import { ApolloProvider } from '@apollo/client';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Router from 'next/router';
import withData from '../lib/withData';
import Page from '../components/Page';

// import 'nprogress/nprogress.css';
import '../components/styles/nprogress.css';
import { CartProvider } from '../lib/useCart';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <CartProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return pageProps;
};

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
  apollo: PropTypes.any,
};

export default withData(MyApp);

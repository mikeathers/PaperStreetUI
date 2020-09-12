import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { ConnectedRouter } from 'connected-next-router';
import { wrapper, store } from 'store';
import { Provider } from 'react-redux';
import BasicLayout from '../components/layouts/BasicLayout';

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <ConnectedRouter>
      <BasicLayout>
        <Component {...pageProps} />
      </BasicLayout>
    </ConnectedRouter>
  </Provider>
);

export default wrapper.withRedux(WrappedApp);

import BasicLayout from "../components/layouts/BasicLayout";
import React, { FC } from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-next-router";
import { wrapper, store } from "store";

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <BasicLayout>
      <ConnectedRouter>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ConnectedRouter>
    </BasicLayout>
  );
};

export default wrapper.withRedux(WrappedApp);

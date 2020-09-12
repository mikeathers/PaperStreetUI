/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Router from 'next/router';
import { store } from 'store';

const login = '/login?redirected=true';

const WrappedComponent = (WrappedComponent: any) => {
  const { user } = store.getState().auth;
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async ({ res }) => {
    if (!user.isAuthenticated) {
      if (res) {
        res?.writeHead(302, {
          Location: login,
        });
        res?.end();
      } else {
        Router.replace(login);
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps(user);
      return { ...wrappedProps, user };
    }

    return { user };
  };

  return hocComponent;
};

export default WrappedComponent;

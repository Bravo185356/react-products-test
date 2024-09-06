import React from 'react';
import classes from './Layout.module.scss';
import { AppHeader } from '../components/AppHeader/AppHeader';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <AppHeader />
      <main className={classes.body}>{children}</main>
    </div>
  );
};

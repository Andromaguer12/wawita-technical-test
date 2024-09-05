/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentProps } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './DashboardHome.module.scss';

export default function DashboardHome({
  children,
  showHeader,
  showFooter
}: ComponentProps<any>) {

  function getRandomZeroOrOne(): 0 | 1 {
    return Math.random() < 0.5 ? 0 : 1;
  }
  
  return (
    <>
      <div className={getRandomZeroOrOne() ? styles.dashboard2 : styles.dashboard}> 
        {showHeader && <Header />}
        <div className={styles.dashboardComponent}>{children}</div>
      </div>
      {showFooter && <Footer />}
    </>
  );
}

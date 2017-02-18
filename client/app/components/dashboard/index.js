import React, { Component } from 'react';

import Footer from '../footer';
import Header from '../header';
import c from 'classnames';

import dashboardStyles from './dashboard.css';
import Breadcrumb from './breadcrumb';
import MyPrototype from './myPrototype';
import Examples from './examples';

const Dashboard = ({
  createNewPrototype,
  dashboard,
  clonePrototype,
  ...props,
}) => {
  return (
    <div>
      <Header
        logoutFn={()=>{}}
        imageUrl='http://img.mediatek.com/150/mtk.linkit/profile/3492e14e-f0fb-4718-a9a7-a49e95d8cb30.jpeg'/>
      <div className={dashboardStyles.base}>
        <Breadcrumb />
        <MyPrototype createNewPrototype={createNewPrototype} userPrototypes={dashboard.userPrototypes}/>
        <Examples clonePrototype={clonePrototype} templates={dashboard.templates}/>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
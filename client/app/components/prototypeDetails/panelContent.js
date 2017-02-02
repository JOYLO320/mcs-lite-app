import { connect } from 'react-redux';
import React, { Component } from 'react';

import panelHeaderStyles from './panelContent.css';
import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelBody from 'mtk-ui/lib/PanelBody';
import PanelIcon from 'mtk-ui/lib/PanelIcon';

const PanelHeaderLayout = () => {
  return (
    <div className={panelHeaderStyles.base}>
      <Panel>
        <PanelHeader>
          <PanelIcon iconName="bookmark" />
          <div className={panelHeaderStyles.content}>
            <ul>
              <li>Data channel</li>
              <li>Test device</li>
            </ul>
          </div>
        </PanelHeader>
        <PanelBody />
      </Panel>
    </div>
  );
}

export default PanelHeaderLayout;
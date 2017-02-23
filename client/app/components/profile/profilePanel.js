import React from 'react';
import pure from 'recompose/pure';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';

import Panel from 'mtk-ui/lib/Panel';
import PanelIcon from 'mtk-ui/lib/PanelIcon';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelBody from 'mtk-ui/lib/PanelBody';
import Avatar from 'mtk-ui/lib/Avatar';
import A from 'mcs-lite-ui/lib/A';
import IconAccount from 'mcs-lite-icon/lib/IconAccount';

import messages from './messages';
import { withGetMessages } from 'react-intl-inject-hoc';

import styles from './ProfilePanel.css';

const Column = ({ label, children }) => (
  <div className={styles.column}>
    <div>{label}</div>
    <div>{children}</div>
  </div>
)

const ProfilePanel = ({
  userName,
  email,
  onEditUserNameClick,
  onChangePasswordClick,
  getMessages: t,
}) => (
  <Panel className={styles.panel}>
    <PanelHeader>
      <PanelIcon icon={<IconAccount size={24}/>} />
      <div className={styles.panelHeaderContent}>
        {t('profile')}
      </div>
    </PanelHeader>
    <PanelBody className={styles.panelBody}>
      <div>
        <Avatar size={150} />
      </div>
      <div>
        <Column
          label={t('userName')}
        >
          {userName}
          <A
            className={styles.editUserName}
            onClick={onEditUserNameClick}
          >
            {t('editUserName')}
          </A>
        </Column>
        <Column label="Email">{email}</Column>
        <Column
          label={t('password')}
        >
          <A onClick={onChangePasswordClick}>
            {t('editPassword')}
          </A>
        </Column>
        <Column
          label={t('language')}
        >
          繁體中文
        </Column>
      </div>
    </PanelBody>
  </Panel>
);

export default compose(
  pure,
  withHandlers({
    onEditUserNameClick: props => () => props.setDialogShow('editUserName'),
    onChangePasswordClick: props => () => props.setDialogShow('changePassword'),
  }),
  withGetMessages(messages, 'Profile'),
)(ProfilePanel);

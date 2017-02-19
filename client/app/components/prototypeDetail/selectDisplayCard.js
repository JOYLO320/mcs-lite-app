import React, { Component } from 'react';

import Button from 'mtk-ui/lib/Button';
import Hr from 'mtk-ui/lib/Hr';

import displayCardStyles from './selectDisplayCard.css';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import withGetMessages from '../../utils/withGetMessage';
import messages from './messages';

const DisplayCardLayout = ({
  title,
  description,
  submitDisplayCard,
  getMessages: t,
}) => {
  return (
    <div className={displayCardStyles.base}>
      <div className={displayCardStyles.content}></div>
      <b className={displayCardStyles.title}>{title}</b>
      <Hr className={displayCardStyles.hr}/>
      <p className={displayCardStyles.description}>
      {description}
      </p>
      <Button className={displayCardStyles.button} onClick={submitDisplayCard}>
      {t('add')}
      </Button>
    </div>
  );
}

export default compose(
  pure,
  withHandlers({
    submitDisplayCard: props => () => {
      props.setIsCreateDataChannel(true),
      props.setDisplayCardType(props.displayCardType)
    },
  }),
  withGetMessages(messages, 'PrototypeDetail'),
)(DisplayCardLayout);
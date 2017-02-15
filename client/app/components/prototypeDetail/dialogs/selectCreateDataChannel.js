import React, { Component } from 'react';

import Button from 'mtk-ui/lib/Button';

import Dialog from 'mtk-ui/lib/Dialog';
import DialogHeader from 'mtk-ui/lib/DialogHeader';
import DialogBody from 'mtk-ui/lib/DialogBody';
import Hr from 'mtk-ui/lib/Hr';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import SelectDisplayCard from '../selectDisplayCard';
import selectCreateDataChannelStyles from './selectCreateDataChannel.css'

import CreateDataChannel from './createDataChannel';

const CreateDataChannelDialog = ({
  closeSelectCreateDataChannel,
  setIsCreateDataChannel,
  isCreateDataChannel,
  displayCardType,
  setDisplayCardType,
  isSelectCreateDataChannel,
  prototypeId,
}) => {
  return (
    <Dialog
      show={isSelectCreateDataChannel}
      size="large"
      onHide={closeSelectCreateDataChannel}
    >
      <DialogHeader>
        <div>Add data channel</div>
      </DialogHeader>
      <DialogBody className={selectCreateDataChannelStyles.content}>
        <SelectDisplayCard setIsCreateDataChannel={setIsCreateDataChannel} displayCardType={1} setDisplayCardType={setDisplayCardType} title="Controller" description="The controller data channels allow you to control the status of your devices. eg, ON/OFF for a switch" />
        <SelectDisplayCard setIsCreateDataChannel={setIsCreateDataChannel} displayCardType={2} setDisplayCardType={setDisplayCardType} title="Display" description="The display data channels allow you to get the data from your devices." />
        <CreateDataChannel prototypeId={prototypeId} displayCardType={displayCardType} isCreateDataChannel={isCreateDataChannel} setIsCreateDataChannel={setIsCreateDataChannel} />
      </DialogBody>
    </Dialog>
  );
}

export default compose(
  pure,
  withState('displayCardType', 'setDisplayCardType', 0),
  withState('isCreateDataChannel', 'setIsCreateDataChannel', false),
  withHandlers({
    closeSelectCreateDataChannel: props => () => props.setIsSelectCreateDataChannel(false),
  }),
 )(CreateDataChannelDialog)
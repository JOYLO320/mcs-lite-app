import React, { Component } from 'react';

import deletePrototypeStyles from './deletePrototype.css';

import Button from 'mtk-ui/lib/Button';

import Dialog from 'mtk-ui/lib/Dialog';
import DialogHeader from 'mtk-ui/lib/DialogHeader';
import DialogBody from 'mtk-ui/lib/DialogBody';
import DialogFooter from 'mtk-ui/lib/DialogFooter';
import InputForm from 'mtk-ui/lib/InputForm';
import InputText from 'mtk-ui/lib/InputText';
import InputTextarea from 'mtk-ui/lib/InputTextarea';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import notice from './notice.png';

const DeletePrototypeDialog = ({
  selectMenuValue,
  closeDeletePrototype,
}) => {
  return (
    <Dialog
      show={selectMenuValue === 'delete'}
      size="small"
      onHide={closeDeletePrototype}
    >
      <DialogHeader>
        <div>Notice!</div>
      </DialogHeader>
      <DialogBody className={deletePrototypeStyles.content}>
        <img src={notice} className={deletePrototypeStyles.img}/>
        <p>Are you sure you want to delete? You cannot revert this action.</p>
      </DialogBody>
      <DialogFooter>
        <Button kind="cancel" onClick={closeDeletePrototype}>Cancel</Button>
        <Button kind="primary" >
          OK
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default compose(
  pure,
  withHandlers({
    closeDeletePrototype: props => () => props.setSelectMenuValue(''),
  }),
 )(DeletePrototypeDialog)
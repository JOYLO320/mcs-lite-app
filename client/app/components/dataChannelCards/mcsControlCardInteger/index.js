import React, { Component } from 'react';
import { render } from 'react-dom';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';
import { default as lifecycle } from 'recompose/lifecycle';

import DataChannelCard from 'mcs-lite-ui/lib/DataChannelCard';
import DataChannelAdapter from 'mcs-lite-ui/lib/DataChannelAdapter';

import moment from 'moment';
import More from '../common/more';

import IconMoreVert from 'mcs-lite-icon/lib/IconMoreVert';

const DisplayStringLayout = ({
  updatedAt,
  value,
  setValue,
  description,
  className,
  title,
  id,
  format,
  isPrototype,
  isDevice,
}) => {
  return (
    <DataChannelCard
      className={className}
      title={title}
      subtitle={'Last data point time : ' + moment(updatedAt).format('YYYY-MM-DD h:mm')}
      description={description}
      header={<More isPrototype={isPrototype} isDevice={isDevice}/>}
    >
      <DataChannelAdapter
        dataChannelProps={{
          id,
          type: 'INTEGER_CONTROL',
          values: { value },
          format,
        }}
        eventHandler={({type, id, value}) => {
          console.log(type);
          switch(type) {
            case 'clear':
              setValue('');
              break;
            case 'change':
              setValue(value);
              break;
            case 'submit':
              break;
            default:
          }
        }}
      />
    </DataChannelCard>
  );
}

export default compose(
  pure,
  withState('value', 'setValue', (props)=> props.value || 0),
  withState('updatedAt', 'setUpdatedAt', (props)=> props.updatedAt || ''),
)(DisplayStringLayout)


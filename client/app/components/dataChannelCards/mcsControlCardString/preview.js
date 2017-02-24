import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';

import DataChannelAdapter from 'mcs-lite-ui/lib/DataChannelAdapter';

const PreviewLayout = ({
  format,
  value,
}) => {
  let labels = [];
  return (
    <div style={{ width: '100%' }}>
      <DataChannelAdapter
        dataChannelProps={{
          id: '',
          type: 'STRING_CONTROL',
          values: { value: value },
        }}
        eventHandler={console.log}
      />
    </div>
  );
}

export default compose(
  pure,
)(PreviewLayout);
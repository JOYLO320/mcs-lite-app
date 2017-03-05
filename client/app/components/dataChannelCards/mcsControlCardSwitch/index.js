import React from 'react';
import { pure } from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const DisplayStringLayout = ({
  value,
  setValue,
  id,
  onSubmit,
}) => (
  <DataChannelAdapter
    dataChannelProps={{
      id,
      type: 'SWITCH_CONTROL',
      values: { value },
    }}
    eventHandler={({
      type,
      id: datachannelId,
      values,
    }) => {
      switch (type) {
        case 'clear':
          setValue('');
          break;
        case 'change':
          setValue(values.value);
          break;
        case 'submit':
          onSubmit(datachannelId, { value: values.value });
          break;
        default:
      }
    }}
  />
);

export default pure(DisplayStringLayout);

import React from 'react';
import {
  compose,
  pure,
  withState,
} from 'recompose';
import {
  DataChannelCard,
  DataChannelAdapter,
} from 'mcs-lite-ui';
import moment from 'moment';
import More from '../common/more';

const DisplayStringLayout = ({
  updatedAt,
  description,
  className,
  title,
  id,
  format,
  value,
  setValue,
  isPrototype,
  isDevice,
  onSubmit,
}) => (
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
        type: 'PWM_CONTROL',
        values: { value: value.value, period: value.period },
        format,
      }}
      eventHandler={({ type, id, values }) => {
        switch(type) {
          case 'clear':
            setValue({ value: '', period: '' });
            break;
          case 'change':
            setValue({ value: values.value, period: values.period });
            break;
          case 'submit':
            onSubmit(id, {
              value: values.value,
              period: values.period,
            });
            break;
          default:
        }
      }}
    />
  </DataChannelCard>
);

export default compose(
  pure,
  withState('value', 'setValue', (props)=> props.value || { value: 0, period: 0 }),
  withState('updatedAt', 'setUpdatedAt', (props)=> props.updatedAt || ''),
)(DisplayStringLayout);

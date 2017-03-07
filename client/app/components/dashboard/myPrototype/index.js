import React from 'react';
import { Link } from 'react-router';
import c from 'classnames';
import moment from 'moment';

import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelIcon from 'mtk-ui/lib/panelIcon';
import PanelBody from 'mtk-ui/lib/PanelBody';
import Button from 'mtk-ui/lib/Button';
import Table from 'mtk-ui/lib/table/Table';
import TableHeader from 'mtk-ui/lib/table/TableHeader';
import TableCell from 'mtk-ui/lib/table/TableCell';
import MiUnfold from 'mtk-icon/lib/MiUnfold';
import MiFold from 'mtk-icon/lib/MiFold';
import Heading from 'mcs-lite-ui/lib/Heading';
import IconOverview from 'mcs-lite-icon/lib/IconOverview';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';

import CreateNewPrototypeDialog from '../../common/dialogs/createNewPrototype';
import Hr from '../../common/hr';
import productBanner from '../../prototypes/productBanner.png';
import DeviceList from '../deviceList';

import styles from './styles.css';

const LastUpdatePrototype = pure(({
  devices,
  prototypeId,
  prototypeName,
  updatedAt,
  isDeviceListShow,
  setIsDeviceListShow,
  t,
}) => (
  <div>
    <div className={styles.prototypeContent}>
      <img
        src={productBanner}
        className={styles.prototypeImg}
        alt="banner"
      />
      <div className={styles.cell}>
        {t('prototypeName')}
        <Link
          to={`/prototypes/${prototypeId}`}
          className={styles.link}
        >
          {prototypeName}
        </Link>
      </div>
      <div className={styles.cell}>
        {t('lastUpdateTime')}
        <div>{moment(updatedAt).format('YYYY-MM-DD h:mm')}</div>
      </div>
    </div>
    <a
      className={styles.link}
      onClick={() => setIsDeviceListShow(!isDeviceListShow)}
    >
      {t('testDeviceList')}
      {isDeviceListShow ? <MiUnfold /> : <MiFold />}
    </a>
    {
      isDeviceListShow &&
        <Table className={styles.deviceList}>
          <TableHeader>
            <TableCell>{t('deviceName')}</TableCell>
            <TableCell>{t('deviceId')}</TableCell>
            <TableCell>{t('deviceKey')}</TableCell>
            <TableCell>{t('lastDataPointTime')}</TableCell>
          </TableHeader>
          {
            devices.length === 0
            ? <div className={styles.noDevices}>{t('noAnyDevice')}</div>
            :
              devices.map(device => (
                <DeviceList
                  deviceId={device.deviceId}
                  deviceKey={device.deviceKey}
                  updatedAt={device.updatedAt}
                  deviceName={device.deviceName}
                  key={device.deviceId}
                />
              ))
          }
        </Table>
    }
  </div>
));

const MyPrototypeLayout = ({
  getMessages: t,
  createNewPrototype,
  isCreatePrototype,
  setIsCreatePrototype,
  openCreatePrototype,
  userPrototypes,
  isDeviceListShow,
  setIsDeviceListShow,
}) => (
  <div className={styles.base}>
    {
      isCreatePrototype &&
        <CreateNewPrototypeDialog
          createNewPrototype={createNewPrototype}
          isCreatePrototype={isCreatePrototype}
          setIsCreatePrototype={setIsCreatePrototype}
          isDashboard
        />
    }
    <Panel>
      <PanelHeader className={styles.panelHeader}>
        <PanelIcon icon={<IconOverview />} />
        <span>{t('myPrototype')}</span>
      </PanelHeader>
    </Panel>
    <PanelBody>
      <div className={styles.header}>
        <Heading level={4}>
          {t('lastUpdatePrototype')}
        </Heading>
        <Link
          to="/prototypes"
          className={styles.link}
        >
          {t('allPrototypes')}
        </Link>
      </div>
      <Hr />
      {
        userPrototypes.prototypeId ?
          <LastUpdatePrototype
            prototypeName={userPrototypes.prototypeName}
            prototypeId={userPrototypes.prototypeId}
            devices={userPrototypes.devices}
            updatedAt={userPrototypes.updatedAt}
            isDeviceListShow={isDeviceListShow}
            setIsDeviceListShow={setIsDeviceListShow}
            t={t}
          />
        :
          <div className={styles.noAnyPrototypes}>
            <p>{t('noAnyPrototypes')}</p>
            <Button type="submit" className={styles.button} onClick={openCreatePrototype}>
              {t('create')}
            </Button>
          </div>
      }
    </PanelBody>
  </div>
);

export default compose(
  pure,
  withState('isCreatePrototype', 'setIsCreatePrototype', false),
  withState('isDeviceListShow', 'setIsDeviceListShow', false),
  withHandlers({
    openCreatePrototype: props => () => props.setIsCreatePrototype(true),
  }),
  withGetMessages(messages, 'Dashboard'),
)(MyPrototypeLayout);

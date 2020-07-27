import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify, faTimes } from '@fortawesome/free-solid-svg-icons';
import dashboardStyles from '../../styles/dashboard.module.scss';
import SignedIn from '../business/signed-in';
import useAuth from '../../utils/useAuth';
import useWindowSize from '../../utils/useWindowSize';
import SidebarItem from './sidebar-item';

const MOBILE_WIDTH = 960;

const MobileButton = ({ open }) => {
  return (
    <div className={dashboardStyles.mobileButton} onClick={open} role="button" tabIndex={0}>
      <FontAwesomeIcon icon={faAlignJustify} size="2x" />
    </div>
  );
};

const CloseButton = ({ close }) => {
  return (
    <div className={dashboardStyles.mobileButton} style={{ position: 'absolute', right: '20px', top: '20px' }} onClick={close} role="button" tabIndex={0}>
      <FontAwesomeIcon icon={faTimes} size="2x" />
    </div>
  );
};

const MobileBackdrop = ({
  open, close, items, onClick, delayedOpen, signOut,
}) => {
  return (
    <div className={open ? `${dashboardStyles.mobileBackdrop} fade-in` : `${dashboardStyles.mobileBackdrop} fade-out`} style={!delayedOpen ? { display: 'none' } : {}}>
      <CloseButton close={close} />

      <div style={{ minHeight: '60px', width: '100%' }} />
      {items.map((item) => {
        return (
          <SidebarItem title={item} key={item} onClick={onClick} />
        );
      })}

      <SidebarItem title="Sign out" key="logout" onClick={() => { signOut(); }} />
    </div>
  );
};

const DashboardHeader = ({ items, setActive }) => {
  const { user, signOut } = useAuth();
  const { width } = useWindowSize();
  const [open, setOpen] = useState(false);
  const [delayedOpen, setDelayedOpen] = useState(false);

  useEffect(() => {
    if (!open) setTimeout(() => { setDelayedOpen(open); }, 500);
    else setDelayedOpen(open);
  }, [open]);

  const openBackdrop = () => setOpen(true);
  const close = () => setOpen(false);

  const onClick = (item) => {
    close();
    setActive(item);
  };

  return (
    <>
      <div className={dashboardStyles.dashboardHeader}>
        <SignedIn user={user} nameClass={dashboardStyles.name} buttonClass={dashboardStyles.dashboardButton} />
        {width <= MOBILE_WIDTH && <MobileButton items={items} open={openBackdrop} />}
      </div>

      <MobileBackdrop open={open} close={close} items={items} onClick={onClick} delayedOpen={delayedOpen} signOut={signOut} />
    </>
  );
};

export default DashboardHeader;

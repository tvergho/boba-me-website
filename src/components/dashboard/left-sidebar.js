import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import dashboardStyles from '../../styles/dashboard.module.scss';
import SidebarItem from './sidebar-item';

const LeftSidebar = ({
  data, items, active, setActive,
}) => {
  return (
    <div className={dashboardStyles.leftSidebar}>
      <object data={data?.photos[0]} aria-label="Business" type="image/jpeg" />

      <div className={dashboardStyles.businessInfo}>
        <div style={{ fontWeight: 700 }}>{data?.name}</div>

        <div style={{
          display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        }}
        >
          <FontAwesomeIcon icon={faCompass} color="white" style={{ marginRight: '10px' }} />
          <div style={{ fontWeight: 300 }}>{data ? `${data?.city}, ${data?.state}` : ''}</div>
        </div>
      </div>

      {items.map((item) => {
        console.log(item, active);
        return (
          <SidebarItem title={item} key={item} active={item === active} onClick={(title) => { setActive(title); }} />
        );
      })}
    </div>
  );
};

export default LeftSidebar;

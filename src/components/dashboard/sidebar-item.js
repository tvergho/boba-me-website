import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import dashboardStyles from '../../styles/dashboard.module.scss';

const SidebarItem = ({ title, active, onClick }) => {
  return (
    <div className={dashboardStyles.sidebarItem} onClick={() => { onClick(title); }} role="button" tabIndex={0}>
      <div className={active ? dashboardStyles.active : dashboardStyles.inactive}>{title}</div>
      <FontAwesomeIcon icon={faChevronRight} size="2x" color={active ? '#FFB7B2' : ''} />
    </div>
  );
};

export default SidebarItem;

import React from 'react';
import dashboardStyles from '@styles/dashboard.module.scss';
import useWindowSize from '@utils/useWindowSize';

const DashboardScreen = ({
  title, description, mainWidth, leftCol, rightCol, topRight,
}) => {
  const { width } = useWindowSize();
  let width1 = mainWidth ? `${mainWidth}%` : '60%';
  let width2 = mainWidth ? `${100 - mainWidth}%` : '40%';

  if (width <= 960) {
    width1 = '100%';
    width2 = '100%';
  }

  return (
    <div className={dashboardStyles.screen}>
      <div className={dashboardStyles.col} style={{ width: width1 }}>
        <div className={dashboardStyles.colHeader}>

          <div className={dashboardStyles.colHeader}>
            <h2>{title}</h2>
            <div className={dashboardStyles.desc}>{description}</div>
          </div>

          {width <= 960 && topRight}
        </div>

        {leftCol}
      </div>

      <div className={dashboardStyles.col} style={{ width: width2 }}>
        {width > 960 && topRight}
        {rightCol}
      </div>
    </div>
  );
};

export default DashboardScreen;

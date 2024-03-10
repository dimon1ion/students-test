import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import "./style.css";

interface IPageLayoutProps {
  children: React.ReactNode
}

function PageLayout({children}: IPageLayoutProps) {

  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
        {children}
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node
}

export default memo(PageLayout);

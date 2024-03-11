import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import "./style.css";

interface IPageLayoutProps {
  children?: React.ReactNode,
  position?: "center",
}

function PageLayout(props: IPageLayoutProps) {

  const cn = bem('PageLayout');

  return (
    <div className={cn({position: props.position})}>
        {props.children}
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node
}

export default memo(PageLayout);

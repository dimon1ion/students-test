import React, {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';

interface SideLayoutProps {
  children: React.ReactNode,
  side?: 'start' | 'end' | 'between' | 'center',
  padding?: 'small' | 'medium',
}

function SideLayout({children, side, padding}: SideLayoutProps) {
  const cn = bem('SideLayout');
  return (
    <div className={cn({side, padding})}>
      {children}
    </div>
  );
}

export default memo(SideLayout);

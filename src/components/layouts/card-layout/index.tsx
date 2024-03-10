import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';

interface ICardLayoutProps{
  children: React.ReactNode
}

function CardLayout({children}: ICardLayoutProps) {
  const cn = bem('CardLayout');
  return (
    <div className={cn()}>
        {children}
    </div>
  );
}

export default memo(CardLayout);

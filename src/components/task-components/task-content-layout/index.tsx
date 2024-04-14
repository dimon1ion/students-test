import {memo} from "react";
import './style.css';

interface TaskContentLayoutProps {
  children: React.ReactNode,
}

function TaskContentLayout({children}: TaskContentLayoutProps){
  return (
    <div className='TaskContentLayout'>
      {children}
    </div>
  )
}

export default memo(TaskContentLayout);

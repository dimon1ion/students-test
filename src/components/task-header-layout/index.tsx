import {memo} from "react";
import './style.css';

interface TaskHeaderLayoutProps {
  children: React.ReactNode,
}

function TaskHeaderLayout({children}: TaskHeaderLayoutProps){
  return (
    <div className='TaskHeaderLayout'>
      {children}
    </div>
  )
}

export default memo(TaskHeaderLayout);

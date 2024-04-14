import {memo} from "react";
import './style.css';

interface IRightSideTaskTemplateProps {
  children: React.ReactNode,
}

function RightSideTaskTemplate({children}: IRightSideTaskTemplateProps){
  return (
    <div className='RightSideTaskTemplate'>
      {children}
    </div>
  )
}

export default memo(RightSideTaskTemplate);

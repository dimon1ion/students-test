import {memo} from "react";
import './style.css';

interface ILeftSideTaskTemplateProps {
  children: React.ReactNode,
}

function LeftSideTaskTemplate({children}: ILeftSideTaskTemplateProps){
  return (
    <div className='LeftSideTaskTemplate'>
      {children}
    </div>
  )
}

export default memo(LeftSideTaskTemplate);

import {memo} from "react";
import './style.css';

interface HeadProps {
  children: React.ReactNode,
}

function Head({children}: HeadProps){
  return (
    <div className='Head'>
      {children}
    </div>
  )
}

export default memo(Head);

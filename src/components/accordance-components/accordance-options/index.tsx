import {memo} from "react";
import './style.css';

interface IAccordanceOptionsProps {
  children: React.ReactNode,
}

function AccordanceOptions({children}: IAccordanceOptionsProps){
  return (
    <div className='AccordanceOptions'>
      {children}
    </div>
  )
}

export default memo(AccordanceOptions);

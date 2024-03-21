import {memo} from "react";
import './style.css';

interface AccordanceTemplateProps {
  children: React.ReactNode,
}

function AccordanceTemplate({children}: AccordanceTemplateProps){
  return (
    <div className='AccordanceTemplate'>
      {children}
    </div>
  )
}

export default memo(AccordanceTemplate);

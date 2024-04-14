import {memo} from "react";
import './style.css';

interface TestTemplateProps {
  children: React.ReactNode,
}

function TestTemplate({children}: TestTemplateProps){
  return (
    <div className='TestTemplate'>
      {children}
    </div>
  )
}

export default memo(TestTemplate);

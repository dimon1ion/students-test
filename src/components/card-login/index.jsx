import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CardLogin({children, content}) {
  const cn = bem('CardForm');
  return (
    <div className={cn({content})}>
        {children}
    </div>
  );
}

CardLogin.propTypes = {
  children: PropTypes.node,
  content: PropTypes.oneOf(['center'])
}

CardLogin.defaultProps = {};

export default memo(CardLogin);

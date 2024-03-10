import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function HeaderForm({ children, position }) {

    const cn = bem('HeaderForm');
    return (
        <h1 className={cn({position})}>{children}</h1>
    )
}

HeaderForm.propTypes = {
    children: PropTypes.node,
    position: PropTypes.oneOf(["left", "center", "right"])
}

HeaderForm.defaultProps = {
    position: "center"
}

export default memo(HeaderForm);
import {memo} from "react";
import './style.css';
import { Spin, SpinProps } from "antd";

interface SpinnerProps {
  active: boolean,
  children?: React.ReactNode,
  size?: SpinProps["size"]
}

function Spinner({size, active, children}: SpinnerProps) {
  if (active) {
    return <Spin spinning delay={500} size={size}>{children}</Spin>
  } else {
    return children;
  }
}

export default memo(Spinner);

import { memo } from "react";
import { Button, ButtonProps } from "antd";
import "./style.css";

function ButtonForm(props : ButtonProps & React.RefAttributes<HTMLElement>) {
    return (
        <Button {...props} className={"ButtonForm"}>
            {props.children}
        </Button>
    )
}

export default memo(ButtonForm);
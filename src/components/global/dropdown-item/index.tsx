import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

interface IDropdownItemProps {
    image?: any;
    text: string;
    onClick: () => void;
}

function DropdownItem(props: IDropdownItemProps) {
    const cn = bem("DropdownItem");

    return (
        <div className={cn()} onClick={props.onClick}>
            <img src={props.image} className={cn("image")} alt=""/>
            {props.text}
        </div>
    )
}

export default memo(DropdownItem);
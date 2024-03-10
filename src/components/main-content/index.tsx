import React, { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

interface IMainContentProps {
    children: React.ReactNode;
}

function MainContent(props: IMainContentProps) {
    const cn = bem("MainContent");

    return(
        <div className={cn("")}>
            {props.children}
        </div>
    )
}

export default memo(MainContent);
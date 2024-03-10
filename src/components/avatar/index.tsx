import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import icon from "./icon.svg";
import arrow from "./arrow_down.svg";

interface IAvatarProps {
  title: string;
  img?: string;
  open: boolean;
}


function Avatar(props: IAvatarProps) {
  const cn = bem("Avatar");

  return (
    <div className={cn()}>
      <div className={cn("imageWrapper")}>
        <img src={props.img || icon} alt="" />
      </div>
      <div className={cn("title")}>
        {props.title.split(" ").map((str) => (
          <span key={str} className={cn("name")}>{str}</span>
        ))}
      </div>
      <img src={arrow} className={cn("arrow", {open: props.open})} alt=""/>
    </div>
  );
}

export default memo(Avatar);

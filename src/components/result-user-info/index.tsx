import React, { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import modulesDone from "./modules.svg";

interface IResultUserInfo {
  title: string;
  stats: {
    modules: number,
  }
}

function ResultUserInfo(props: IResultUserInfo) {
  const cn = bem("ResultUserInfo");

  return (
    <div className={cn()}>
      <h1 className={cn("title")}>{props.title}</h1>
      <div className={cn("stats")}>
        <div>
          <div className={cn("statsNumber")}>{props.stats.modules}</div>
          <div className={cn("statsName")}>
            <img src={modulesDone} alt="" className={cn("statsImage")} />
            <span>Пройдено модулей</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ResultUserInfo);

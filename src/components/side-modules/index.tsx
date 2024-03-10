import { memo } from "react";
import { cn as bem } from "@bem-react/classname";

interface ISideModulesProps {
  modules: { title: string }[];
}
function SideModules(props: ISideModulesProps) {
  const cn = bem("SideModules");

  return <div className={cn()}>
    <div>Модули</div>
    {props.modules.map((moduleName, index) => (
        <div className={cn("item")}>{index + 1}. {moduleName.title}</div>
    ))}
  </div>;
}

export default memo(SideModules);

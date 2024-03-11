import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import { NavLink } from "react-router-dom";
import "./style.css";

interface IItem {
  key: number;
  link: string;
  title: string;
}

interface MainNavProps {
  items: IItem[];
//   onNavigate: (item: IItem) => void;
}

function MainNav({ items }: MainNavProps) {
  const cn = bem("Menu");
  return (
    <ul className={cn()}>
      {items.map((item) => (
        <NavLink
          to={item.link}
          key={item.key}
          className={({ isActive }) => cn("item", { active: isActive })}
        //   onClick={() => onNavigate(item)}
        >
          {item.title}
        </NavLink>
      ))}
    </ul>
  );
}

export default memo(MainNav);

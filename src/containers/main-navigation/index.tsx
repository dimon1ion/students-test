import { memo, useMemo } from "react";
import "./style.css";
import MainNav from "@src/components/main-nav";

function MainNavigation() {
  const options = {
    menu: useMemo(
      () => [
        { key: 1, title: "Главная", link: "/" },
        { key: 2, title: "Результаты", link: "/results" },
      ],
      []
    ),
  };

  return <MainNav items={options.menu}/>;
}

export default memo(MainNavigation);

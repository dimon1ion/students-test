import Head from "@src/components/global/head";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import SideLayout from "@src/components/layouts/side-layout";
import { Dropdown, MenuProps } from "antd";
import Avatar from "@src/components/global/avatar";
import DropdownItem from "@src/components/global/dropdown-item";
import exitIcon from "./exit.svg";
import useClickOutside from "@src/hooks/use-click-outside";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import MainNavigation from "@src/containers/main-navigation";

function MainHeader() {
  const store = useStore();
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const ref = useRef(null);

  const select = useSelector((state) => ({
    user: state.session.user,
  }));

  useClickOutside(ref, () => {
    callbacks.toggleOpen(false);
  });

  const callbacks = {
    toggleOpen: useCallback(
      (value?: boolean) => {
        setIsOpenDropdown((prev) => (value == undefined ? !prev : value));
      },
      [setIsOpenDropdown]
    ),
    onExit: useCallback(() => {
      store.actions.session.signOut();
    }, [store]),
  };

  const options = {
    items: useMemo<MenuProps["items"]>(
      () => [
        {
          label: (
            <DropdownItem
              image={exitIcon}
              text="Выход"
              onClick={callbacks.onExit}
            />
          ),
          key: "2",
        },
      ],
      []
    ),
  };

  return (
    <Head>
      <SideLayout side={"between"}>
        <MainNavigation />
        <Dropdown
          open={isOpenDropdown}
          menu={{ items: options.items }}
          trigger={["click"]}
        >
          <div ref={ref} onClick={() => callbacks.toggleOpen()}>
            <Avatar
              title={`${select.user.name} ${select.user.surname}`}
              open={isOpenDropdown}
            />
          </div>
        </Dropdown>
      </SideLayout>
    </Head>
  );
}

export default memo(MainHeader);

import Head from "@src/components/head";
import PageLayout from "@src/components/layouts/page-layout";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import SideLayout from "@src/components/layouts/side-layout";
import { Dropdown, MenuProps } from "antd";
import Avatar from "@src/components/avatar";
import DropdownItem from "@src/components/dropdown-item";
import exitIcon from "./exit.svg";
import useClickOutside from "@src/hooks/use-click-outside";
import MainContent from "@src/components/main-content";
import MainModules from "@src/containers/main-modules";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";

function Main() {
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
    <PageLayout>
      <Head>
        <SideLayout side={"between"}>
          <div></div>
          <Dropdown open={isOpenDropdown} menu={{ items: options.items }} trigger={["click"]}>
            <div ref={ref} onClick={() => callbacks.toggleOpen()}>
              <Avatar
                title={`${select.user.name} ${select.user.surname}`}
                open={isOpenDropdown}
              />
            </div>
          </Dropdown>
        </SideLayout>
      </Head>
      <MainContent>
        <MainModules />
      </MainContent>
    </PageLayout>
  );
}

export default memo(Main);

import { memo } from "react";
import { Outlet } from "react-router-dom";

function Tasks() {
    return (
        <Outlet/>
    );
}

export default memo(Tasks);
import {memo} from "react";
import Spinner from "src/components/spinner";

interface ISideModulesProps {
}
// @ts-ignore
function SideModules(props: ISideModulesProps) {

  return(
    <Spinner active={false}>
      <></>
    </Spinner>
  )
}

export default memo(SideModules);

import {memo, useEffect} from "react";
import useSelector from "@src/hooks/use-selector";
import {useLocation, useNavigate} from "react-router-dom";
import Spinner from "@src/components/global/spinner";
import PageLayout from "@src/components/layouts/page-layout";

interface IProtectedProps {
    children: React.ReactNode,
    redirect: string
}
// TODO - компонент, который проверяет в ROUTE наличие нужных параметров /?параметр&параметр2 
function RequireParams({children, redirect}: IProtectedProps) {

  const select = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting
  }));

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!select.exists && !select.waiting) {
      navigate(redirect, {state: { back: location.pathname }});
    }
  }, [select.exists, select.waiting]);

  if (!select.exists || select.waiting){
    return (<PageLayout position="center"><Spinner size="large" active/></PageLayout>)
  } else {
    return children;
  }
}

export default memo(RequireParams);

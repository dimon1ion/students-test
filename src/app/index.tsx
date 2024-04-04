import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Main from "./main";
import Protected from "@src/containers/protected";
import useStore from "@src/hooks/use-store";
import useInit from "@src/hooks/use-init";
import Test from "./tasks/finish-test";
import Accordance from "./tasks/accordance";
import Test2 from "./tasks/test2";
import Result from "./result";

function App() {

  const store = useStore();
  useInit(async () => {
    await store.actions.session.remind();
  })

  return (
    <>
      <Routes>
          <Route path={'login'} element={<Login/>} />
          <Route path={''} element={<Protected redirect="/login"><Main/></Protected>} />
          <Route path={'/results'} element={<Protected redirect="/login"><Result/></Protected>} />
          <Route path={"task/*"}>
            <Route path="accordance/:id" element={<Protected redirect="/login"><Accordance/></Protected>}/>
            <Route path="test/:id" element={<Protected redirect="/login"><Test2/></Protected>}/>
            <Route path="finish_test/:id" element={<Protected redirect="/login"><Test/></Protected>}/>
          </Route>
          <Route path={"task"} element={"Как вы сюда попали только вы знаете, но я ценю вашу попытку узнать большее"}/>
          <Route path="*" element={"Как вы сюда попали только вы знаете, но я ценю вашу попытку узнать большее"}/>
      </Routes>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Main from "./main";
import Protected from "@src/containers/protected";
import useStore from "@src/hooks/use-store";
import useInit from "@src/hooks/use-init";
import Tasks from "./tasks";
import Test from "./tasks/test";

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
            <Route path={"task"} element={<Protected redirect="/login"><Tasks/></Protected>}>
              <Route path="test/:id" element={<Test/>}/>
            </Route>
        </Routes>
    </>
  );
}

export default App;

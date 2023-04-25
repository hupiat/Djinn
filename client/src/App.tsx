import React from "react";
import SidebarContext from "./components/Sidebar/context";
import ViewAssets from "./components/assets/ViewAssets";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  PATH_ANALYTICS,
  PATH_ASSETS,
  PATH_MONITORING,
  PATH_ROOT,
} from "./components/Sidebar/paths";
import { useMiddlewareContext } from "./commons/middleware/context";
import Login from "./components/Login";

function App() {
  const { user } = useMiddlewareContext();
  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <SidebarContext>
          <Routes>
            <Route path={PATH_ROOT} element={<ViewAssets />} />
            <Route path={PATH_ASSETS} element={<ViewAssets />} />
            <Route path={PATH_MONITORING} element={<></>} />
            <Route path={PATH_ANALYTICS} element={<></>} />
          </Routes>
        </SidebarContext>
      )}
    </Router>
  );
}

export default App;

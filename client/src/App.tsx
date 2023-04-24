import React from "react";
import SidebarContext from "./components/Sidebar/context";
import ViewAssets from "./components/assets/ViewAssets";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  PATH_ANALYTICS,
  PATH_ASSETS,
  PATH_MONITORING,
} from "./components/Sidebar/paths";
import MiddlewareContext from "./commons/middleware/context";

function App() {
  return (
    <MiddlewareContext>
      <Router>
        <SidebarContext>
          <Routes>
            <Route path={"/"} element={<></>} />
            <Route path={PATH_ASSETS} element={<ViewAssets />} />
            <Route path={PATH_MONITORING} element={<></>} />
            <Route path={PATH_ANALYTICS} element={<></>} />
          </Routes>
        </SidebarContext>
      </Router>
    </MiddlewareContext>
  );
}

export default App;

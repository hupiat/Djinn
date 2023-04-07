import React from "react";
import Sidebar from "./components/Sidebar";
import SidebarContext from "./components/Sidebar/context";

function App() {
  return (
    <SidebarContext>
      <Sidebar />
    </SidebarContext>
  );
}

export default App;

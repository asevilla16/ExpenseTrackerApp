import React from "react";
import logo from "./6289247.png";
import "./App.css";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";

function App() {
  const items: MenuItem[] = [
    {
      label: "Home",
    },
    {
      label: "Montly Reports",
    },
    {
      label: "Weekly Reports",
    },
  ];

  const end = <img alt="logo" src={logo} height="40" className="mr-2"></img>;

  return (
    <div className="App">
      <header>
        <div className="card">
          <Menubar className="menu" start={end} model={items} />
        </div>
      </header>
    </div>
  );
}

export default App;

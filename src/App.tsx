import React from "react";
import logo from "./6289247.png";
import "./App.css";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import Router from "./routes/router";

function App() {
  const items: MenuItem[] = [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "Reports",
      url: "/monthly-report",
    },
    {
      label: "Settings",
      items: [
        {
          label: "Categories",
          url: "/settings/categories",
        },
      ],
    },
  ];

  const end = <img alt="logo" src={logo} height="40" className="mr-2"></img>;

  return (
    <div className="App">
      <header>
        <Menubar className="menu" start={end} model={items} />
        <Router />
      </header>
    </div>
  );
}

export default App;

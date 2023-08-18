import React from "react";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import personicon from './Images/Icon/personicon.svg';
import charticon from './Images/Icon/charticon.svg';
import dashboardicon from './Images/Icon/dashboardicon.svg';

const _nav = [
  // {
  //   component: CNavTitle,
  //   name: "Components",
  // },
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <img src={dashboardicon} width="17px" className="ms-2 me-3"></img>,
  },
  // {
  //   component: CNavItem,
  //   name: "Charts",
  //   to: "/chart",
  //   icon: <img src={charticon} width="22px" className="ms-2 me-3"></img>,
  // },
  {
    component: CNavGroup,
    name: "Charts",
    to: "/charts",
    icon: <img src={charticon} width="22px" className="ms-2 me-3"></img>,
    items: [
      {
        component: CNavItem,
        name: "Group Chart",
        to: "/charts/groupchart",
      },
      {
        component: CNavItem,
        name: "Stacked Chart",
        to: "/charts/stackedchart",
      },
      {
        component: CNavItem,
        name: "Candlestick chart",
        to: "/charts/candlestickchart",
      },
      {
        component: CNavItem,
        name: "Map Chart",
        to: "/charts/mapchart",
      },
      {
        component: CNavItem,
        name: "Pie Chart",
        to: "/charts/piechart",
      },
      {
        component: CNavItem,
        name: "SunBurst Chart",
        to: "/charts/sunburstchart",
      },
    ],
  },
  {
    component: CNavItem,
    name: "About Us",
    to: "/aboutus",
    icon: <img src={personicon} width="22px" className="ms-2 me-3"></img>,
  },
];

export default _nav;

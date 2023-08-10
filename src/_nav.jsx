import React from "react";
import { CNavItem, CNavTitle } from "@coreui/react";
import personicon from './Images/Icon/personicon.svg';
import charticon from './Images/Icon/charticon.svg';

const _nav = [
  {
    component: CNavTitle,
    name: "Components",
  },
  {
    component: CNavItem,
    name: "Charts",
    to: "/dashboard",
    icon: <img src={charticon} width="22px" className="ms-2 me-3"></img>,
  },
  {
    component: CNavItem,
    name: "About Us",
    to: "/aboutus",
    icon: <img src={personicon} width="22px" className="ms-2 me-3"></img>,
  },
];

export default _nav;

import React from "react";
import CIcon from "@coreui/icons-react";
import { cilChartPie } from "@coreui/icons";
import { CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavTitle,
    name: "Components",
  },
  {
    component: CNavItem,
    name: "Chart",
    to: "/dashboard",
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
];

export default _nav;

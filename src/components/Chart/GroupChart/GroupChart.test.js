import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import GroupChart from "./GroupChart";
import { CustomContext } from "src/components/CustomContext";

const groupData = [
    { id: "1", month: "Jan", petrolprice: "55", dieselprice: "35" },
    { id: "2", month: "Feb", petrolprice: "58", dieselprice: "37" },
    { id: "3", month: "Mar", petrolprice: "67", dieselprice: "48" },
    { id: "4", month: "Apr", petrolprice: "79", dieselprice: "59" },
];

const contextValue = {
    groupDataSet: groupData,
    updateDataGroup: "false",
}

describe("GroupChart Component", () => {

    it("renders chart correctly", () => {
        render(
            <CustomContext.Provider value={contextValue}>
                <GroupChart
                    chartId="test-chart"
                    parentWidth={800}
                    parentHeight={600}
                    isModal={false}
                    borderSize="1px"
                    tooltipShow={true}
                    showLabels={true}
                />
            </CustomContext.Provider>
        );

        const chart = screen.getByTestId("test-chart");
        expect(chart).toBeInTheDocument();
    });

    it("renders heading when isModal is true", () => {
        render(
            <CustomContext.Provider value={contextValue}>
                <GroupChart
                    chartId="test-chart"
                    parentWidth={800}
                    parentHeight={600}
                    isModal={true}
                    borderSize="1px"
                    tooltipShow={true}
                    showLabels={true}
                />
            </CustomContext.Provider>
        );

        const label = screen.getByText("Petrol v/s Diesel (In $USD)");
        expect(label).toBeInTheDocument();

    });

    it("update chart when data changes", () => {
        const updatedGroupData = [
            { id: "1", month: "Jan", petrolprice: "50", dieselprice: "30" },
            { id: "2", month: "Feb", petrolprice: "60", dieselprice: "40" },
        ];

        const updatedContextValue = {
            groupDataSet: updatedGroupData,
            updateDataGroup: "true",
        };

        render(
            <CustomContext.Provider value={updatedContextValue}>
                <GroupChart
                    chartId="test-chart"
                    parentWidth={800}
                    parentHeight={600}
                    isModal={false}
                    borderSize="1px"
                    tooltipShow={true}
                    showLabels={true}
                />
            </CustomContext.Provider>
        );
    });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ViewDataGroup from "../ViewDataGroup";
import { CustomContext } from "src/components/CustomContext";

const mockGroupDataSet = [
    {
        id: 1,
        month: "January",
        petrolprice: 100,
        dieselprice: 80,
    },
    {
        id: 2,
        month: "February",
        petrolprice: 110,
        dieselprice: 85,
    },
];

const contextValue = {
    crudData: [],
    setDeleteId: "",
    setUpdateValue: mockGroupDataSet,
    setIsEdit: "true",
    groupDataSet: mockGroupDataSet,
    setaddDataCrud: "true"
};

describe('GroupChartPage Component', () => {
    it("render the component with correct content", () => {
        render(
            <CustomContext.Provider value={contextValue}>
                <ViewDataGroup />
            </CustomContext.Provider>
        )
    })

    it("render table with correct headers", () => {
        render(
            <CustomContext.Provider value={contextValue}>
                <ViewDataGroup />
            </CustomContext.Provider>
        )

        expect(screen.getByText("No.")).toBeInTheDocument();
        expect(screen.getByText("Month")).toBeInTheDocument();
        expect(screen.getByText("Petrol Price")).toBeInTheDocument();
        expect(screen.getByText("Diesel Price")).toBeInTheDocument();
        expect(screen.getByText("Action")).toBeInTheDocument();
    })

    it("renders table rows correctly", () => {
        render(
            <CustomContext.Provider value={contextValue}>
                <ViewDataGroup />
            </CustomContext.Provider>
        );
        
        const rows = screen.getAllByRole("row");
        expect(rows).toHaveLength(mockGroupDataSet.length + 1);
    });

})

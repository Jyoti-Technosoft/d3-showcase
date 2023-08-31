import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import AddDataGroup from "../AddDataGroup";
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
    setShowToast: jest.fn(),
    isEdit: "false",
    updateValue: mockGroupDataSet,
    groupDataSet: mockGroupDataSet,
    setGroupDataSet: jest.fn(),
    setUpdateDataGroup: jest.fn(),
    setaddDataCrud: jest.fn()
};

describe('GroupChartPage Component', () => {
    it("render the component with correct content", () => {
        render(
            <CustomContext.Provider value={contextValue}>
                <AddDataGroup />
            </CustomContext.Provider>
        )
    })

    it("render form with correct labels", () => {
        render(
            <CustomContext.Provider value={contextValue}>
                <AddDataGroup />
            </CustomContext.Provider>
        )

        expect(screen.getByText("Month")).toBeInTheDocument();
        expect(screen.getByText("Petrol Price")).toBeInTheDocument();
        expect(screen.getByText("Diesel Price")).toBeInTheDocument();
    })

    it("cancel button work correctly", () => {
        render(
            <CustomContext.Provider value={contextValue}>
                <AddDataGroup />
            </CustomContext.Provider>
        );

        const cancelButton = screen.getByText("Cancel");
        fireEvent.click(cancelButton);

        expect(contextValue.setaddDataCrud).toHaveBeenCalledWith(false);
    });

})

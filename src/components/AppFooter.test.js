import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import AppFooter from "./AppFooter";

describe("AppFooter component", () => {
    it("render the component with correct content", () =>{
        render (<AppFooter/>)

        expect(screen.getByText("Jyoti Technosoft LLP. All Rights Reserved by")).toBeInTheDocument();
    })

    it("go to correct link", () =>{
        render(<AppFooter/>)

        expect(screen.getByRole('link', { name: 'Jyoti Technosoft LLP' })).toHaveAttribute('href', 'https://www.jyotitechnosoft.com')
    })
})
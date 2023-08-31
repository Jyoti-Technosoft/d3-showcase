import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AboutUS from "./AboutUS";

describe("AboutUS component", () => {
  it("renders the component with correct content", () => {
    render(<AboutUS />);
    
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Jyoti Technosoft LLP")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("has a working Contact Us button", () => {
    render(<AboutUS />);
    
    const contactButton = screen.getByText("Contact Us");
    expect(contactButton).toHaveAttribute("href", "https://www.jyotitechnosoft.com/contact-us");
    expect(contactButton).toHaveAttribute("target", "_blank");
  });

});

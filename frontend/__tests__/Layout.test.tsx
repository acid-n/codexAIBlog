import { render, screen } from "@testing-library/react";
jest.mock("next/font/google", () => ({
  Playfair_Display: () => ({
    className: "playfair",
    variable: "--font-playfair",
  }),
}));

import RootLayout from "../src/app/layout";

test("renders navigation and footer", () => {
  const { container } = render(<RootLayout>child</RootLayout>);
  expect(container.querySelector("html")).not.toBeNull();
  expect(screen.getByRole("heading", { name: /musson/i })).toBeInTheDocument();
  expect(screen.getByText(/search/i)).toBeInTheDocument();
  expect(container.querySelector("footer")?.textContent).toMatch(
    /musson blog/i,
  );
  expect(container.querySelector("body")?.textContent).toMatch(/child/);
});

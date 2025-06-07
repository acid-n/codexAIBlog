import { render, screen } from "@testing-library/react";
import RootLayout from "../src/app/layout";

test("renders navigation and footer", () => {
  const { container } = render(<RootLayout>child</RootLayout>);
  expect(container.querySelector("html")).not.toBeNull();
  expect(screen.getByRole("link", { name: /musson/i })).toBeInTheDocument();
  expect(screen.getByRole("searchbox")).toBeInTheDocument();
  expect(container.querySelector("footer")?.textContent).toMatch(
    /musson blog/i,
  );
  expect(container.querySelector("body")?.textContent).toMatch(/child/);
});

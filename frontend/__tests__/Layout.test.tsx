import { render } from "@testing-library/react";
import RootLayout from "../src/app/layout";

it("wraps children with html and body", () => {
  const { container } = render(<RootLayout>child</RootLayout>);
  expect(container.querySelector("html")).not.toBeNull();
  expect(container.querySelector("body")?.textContent).toBe("child");
});

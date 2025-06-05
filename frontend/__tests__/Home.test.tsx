import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";

test("renders greeting", () => {
  render(<Home />);
  expect(
    screen.getByRole("heading", { name: /hello musson/i }),
  ).toBeInTheDocument();
});

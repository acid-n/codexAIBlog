import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";

test("renders latest posts heading", () => {
  render(<Home />);
  expect(
    screen.getByRole("heading", { name: /последние статьи/i }),
  ).toBeInTheDocument();
});

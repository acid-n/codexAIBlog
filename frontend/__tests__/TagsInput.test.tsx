import { render, screen } from "@testing-library/react";
import TagsInput from "../src/components/TagsInput";

describe("TagsInput", () => {
  test("fallback message shown when no tags", () => {
    render(<TagsInput available={[]} value={[]} onChange={() => {}} />);
    expect(screen.getByText(/теги не загрузились/i)).toBeInTheDocument();
  });

  test("shows tag suggestions", () => {
    render(
      <TagsInput
        available={[{ id: 1, name: "Tech" }]}
        value={[]}
        onChange={() => {}}
      />,
    );
    expect(screen.getByPlaceholderText(/добавить тег/i)).toBeInTheDocument();
  });
});

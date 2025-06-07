import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostForm from "../src/components/PostForm";

describe("PostForm", () => {
  const tags = [{ id: 1, name: "Tech" }];

  test("generates slug from title", async () => {
    const user = userEvent.setup();
    render(<PostForm allTags={tags} onSubmit={() => {}} />);
    const titleInput = screen.getByLabelText(/заголовок/i);
    await user.type(titleInput, "Тестовый пост");
    expect(screen.getByLabelText(/slug/i)).toHaveValue("testovyj-post");
  });
});

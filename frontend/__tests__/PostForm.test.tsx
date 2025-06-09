import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostForm from "../src/components/PostForm";

describe("PostForm", () => {
  test("generates slug from title", async () => {
    const user = userEvent.setup();
    process.env.NEXT_PUBLIC_ENABLE_TAGS = "false";
    render(<PostForm onSubmit={() => {}} />);
    const titleInput = screen.getByLabelText(/заголовок/i);
    await user.type(titleInput, "Тестовый пост");
    expect(screen.getByLabelText(/slug/i)).toHaveValue("testovyj-post");
  });
});

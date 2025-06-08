import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminNav from "../src/components/AdminNav";
import PostCard from "../src/components/PostCard";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("../src/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));
const { useAuth } = require("../src/contexts/AuthContext");

describe("AdminNav", () => {
  test("guest has no panel", () => {
    useAuth.mockReturnValue({ user: null });
    const { container } = render(<AdminNav />);
    expect(container.firstChild).toBeNull();
  });

  test("renders panel with icons", () => {
    useAuth.mockReturnValue({
      user: { id: 1, username: "admin", email: "a@a", isStaff: false },
      logout: jest.fn(),
    });
    const { container } = render(<AdminNav />);
    expect(screen.getByRole("link", { name: /создать пост/i })).toHaveAttribute(
      "href",
      "/admin/create-post",
    );
    expect(container).toMatchSnapshot();
  });

  test("logout called", async () => {
    const logout = jest.fn();
    useAuth.mockReturnValue({
      user: { id: 1, username: "john", email: "", isStaff: false },
      logout,
    });
    const user = userEvent.setup();
    render(<AdminNav />);
    await user.click(screen.getByRole("button", { name: /выход/i }));
    expect(logout).toHaveBeenCalled();
  });
});

describe("PostCard edit icon", () => {
  test("shown only for author", () => {
    useAuth.mockReturnValue({
      user: { id: 1, username: "john", email: "", isStaff: false },
    });
    const post = {
      id: 1,
      slug: "test",
      title: "t",
      description: "d",
      author: 1,
    };
    const { unmount } = render(<PostCard post={post} />);
    expect(screen.getByLabelText(/редактировать/i)).toBeInTheDocument();

    unmount();
    const other = { ...post, author: 2 };
    render(<PostCard post={other} />);
    expect(screen.queryByLabelText(/редактировать/i)).toBeNull();
  });
});

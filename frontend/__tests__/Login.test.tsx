import {
  renderHook,
  act,
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, useAuth } from "../src/contexts/AuthContext";
import LoginForm from "../src/components/login/LoginForm";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
  useSearchParams: () => ({ get: () => null }),
}));

function makeJwt(username = "test") {
  const payload = {
    user_id: 1,
    email: `${username}@ex.com`,
    username,
    exp: Math.floor(Date.now() / 1000) + 3600,
  };
  const base64 = Buffer.from(JSON.stringify(payload))
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return `header.${base64}.sig`;
}

describe("AuthContext login", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("successful login stores tokens", async () => {
    const access = makeJwt();
    const refresh = makeJwt();
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      headers: { get: () => "application/json" },
      json: () => Promise.resolve({ access, refresh }),
    }) as any;
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );
    const { result } = renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await result.current.login("u", "p");
    });
    expect(localStorage.getItem("accessToken")).toBe(access);
    expect(result.current.user?.username).toBe("test");
  });

  test("handles invalid credentials", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      headers: { get: () => "application/json" },
      json: () => Promise.resolve({ detail: "Invalid" }),
    }) as any;
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );
    const { result } = renderHook(() => useAuth(), { wrapper });
    await expect(
      act(async () => {
        await result.current.login("u", "p");
      }),
    ).rejects.toThrow("Invalid");
  });

  test("handles non-json response", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      headers: { get: () => "text/html" },
      text: () => Promise.resolve("<html>404</html>"),
    }) as any;
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );
    const { result } = renderHook(() => useAuth(), { wrapper });
    await expect(
      act(async () => {
        await result.current.login("u", "p");
      }),
    ).rejects.toThrow();
  });
});

describe("LoginForm", () => {
  test("shows error on empty fields", async () => {
    render(
      <AuthProvider>
        <LoginForm nextPath="/" />
      </AuthProvider>,
    );
    const form = screen.getByTestId("login-form");
    fireEvent.submit(form);
    expect(await screen.findByText(/имя пользователя/i)).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import http from "http";

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
  return `h.${base64}.s`;
}

describe("auth e2e", () => {
  const PORT = 8999;
  let server: http.Server;
  let AuthProvider: any;
  let LoginForm: any;

  beforeAll((done) => {
    process.env.NEXT_PUBLIC_API_URL = `http://localhost:${PORT}`;
    // Import modules after setting env so API_URL is correct
    AuthProvider = require("../src/contexts/AuthContext").AuthProvider;
    LoginForm = require("../src/components/login/LoginForm").default;
    server = http.createServer((req, res) => {
      if (req.url === "/token/" && req.method === "POST") {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ access: makeJwt(), refresh: makeJwt() }));
      }
    });
    server.listen(PORT, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  test("login via fetch with CORS", async () => {
    render(
      <AuthProvider>
        <LoginForm nextPath="/" />
      </AuthProvider>,
    );

    fireEvent.change(screen.getByPlaceholderText(/имя пользователя/i), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByPlaceholderText(/пароль/i), {
      target: { value: "pass" },
    });

    fireEvent.submit(screen.getByTestId("login-form"));

    await screen.findByText("Войти", {}, { timeout: 3000 });

    expect(localStorage.getItem("accessToken")).not.toBeNull();
  });
});

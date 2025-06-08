import { NextRequest } from "next/server";
import { middleware } from "../middleware";

describe("auth middleware", () => {
  test("redirect guest from admin page", () => {
    const req = new NextRequest(
      new Request("http://test.local/admin/create-post"),
    );
    const res = middleware(req);
    const location = res.headers.get("location");
    const redirect = location ? new URL(location) : null;
    expect(redirect?.pathname).toBe("/login");
    expect(redirect?.searchParams.get("next")).toBe("/admin/create-post");
  });
});

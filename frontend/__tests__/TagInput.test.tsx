import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TagInput from "../src/components/TagInput";

let mockFetch: jest.Mock;

describe("TagInput", () => {
  beforeEach(() => {
    mockFetch = jest.fn();
    // @ts-ignore
    global.fetch = mockFetch;
    mockFetch.mockReset();
    process.env.NEXT_PUBLIC_ENABLE_TAGS = "true";
  });

  afterEach(() => {
    // @ts-ignore
    delete global.fetch;
  });

  test("shows warning on fetch failure", async () => {
    mockFetch.mockResolvedValue({ ok: false });
    render(<TagInput value={[]} onChange={() => {}} />);
    await waitFor(() =>
      expect(screen.getByText(/теги не загрузились/i)).toBeInTheDocument(),
    );
  });

  test("allows adding tag on success", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, name: "Tech" }],
    });
    const user = userEvent.setup();
    function Wrapper() {
      const [v, setV] = React.useState<number[]>([]);
      return <TagInput value={v} onChange={setV} />;
    }
    render(<Wrapper />);
    const input = await screen.findByPlaceholderText(/добавить тег/i);
    await user.type(input, "Tech{enter}");
    expect(await screen.findByText("Tech")).toBeInTheDocument();
  });
});

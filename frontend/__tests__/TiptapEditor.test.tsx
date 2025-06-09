import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TiptapEditor from "../src/components/tiptap-editor";

jest.mock("../src/components/image-uploader", () => (props: any) => (
  <button onClick={() => props.onUploadComplete(new Blob())}>Вставить</button>
));

beforeAll(() => {
  // @ts-ignore
  global.URL.createObjectURL = jest.fn(() => "blob:url");
});

describe("TiptapEditor", () => {
  test("toggle bullet list", async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(<TiptapEditor content={null} onChange={onChange} />);
    const button = screen.getByLabelText(/маркированный список/i);
    await user.click(button);
    expect(button.className).toMatch(/bg-gray-200/);
    expect(onChange).toHaveBeenCalled();
  });

  test("insert link", async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    window.prompt = jest.fn().mockReturnValue("http://example.com");
    render(<TiptapEditor content={null} onChange={onChange} />);
    await user.click(screen.getByLabelText(/ссылка/i));
    expect(window.prompt).toHaveBeenCalled();
  });

  test("insert image", async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    window.prompt = jest.fn().mockReturnValueOnce("alt").mockReturnValueOnce("100");
    render(<TiptapEditor content={null} onChange={onChange} />);
    await user.click(screen.getByLabelText(/изображение/i));
    await user.click(screen.getByText(/вставить/i));
    expect(onChange).toHaveBeenCalled();
  });
});

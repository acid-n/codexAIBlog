import { render } from "@testing-library/react";
import TiptapEditor from "../src/components/tiptap-editor";

test("render toolbar", () => {
  const { container } = render(<TiptapEditor content={null} onChange={() => {}} />);
  expect(container.firstChild).toMatchSnapshot();
});

import { Node, mergeAttributes } from "@tiptap/core";

export interface SliderOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    slider: {
      setSlider: (images: string[]) => ReturnType;
    };
  }
}

export const Slider = Node.create<SliderOptions>({
  name: "slider",
  group: "block",
  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      images: {
        default: [],
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="slider"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(
        { "data-type": "slider", class: "image-slider" },
        this.options.HTMLAttributes,
        HTMLAttributes,
      ),
      ...((HTMLAttributes as any).images || []).map((src: string) => [
        "img",
        { src },
      ]),
    ];
  },

  addCommands() {
    return {
      setSlider:
        (images: string[]) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { images },
          });
        },
    };
  },
});

export default Slider;

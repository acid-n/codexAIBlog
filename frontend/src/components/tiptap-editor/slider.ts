import { Node, mergeAttributes } from "@tiptap/core";

export interface SliderOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    slider: {
      setSlider: (
        opts: { images: string[]; delay: number; autoplay: boolean },
      ) => ReturnType;
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
      delay: {
        default: 3000,
      },
      autoplay: {
        default: false,
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
        {
          "data-type": "slider",
          class: "image-slider",
          "data-delay": (HTMLAttributes as any).delay,
          "data-autoplay": (HTMLAttributes as any).autoplay,
        },
        this.options.HTMLAttributes,
        HTMLAttributes,
      ),
      [
        "button",
        { class: "prev", "data-action": "prev" },
        "‹",
      ],
      ...((HTMLAttributes as any).images || []).map((src: string) => [
        "img",
        { src },
      ]),
      [
        "button",
        { class: "next", "data-action": "next" },
        "›",
      ],
    ];
  },

  addCommands() {
    return {
      setSlider:
        (opts: { images: string[]; delay: number; autoplay: boolean }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: opts,
          });
        },
    };
  },
});

export default Slider;

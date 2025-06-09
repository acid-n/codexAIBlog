"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Slider from "./slider";
import Tooltip from "../Tooltip";

const ImageWithSize = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute("width"),
        renderHTML: (attributes) =>
          attributes.width ? { width: attributes.width } : {},
      },
    };
  },
});
import { useEffect, useState } from "react";
import {
  FaBold,
  FaItalic,
  FaImage,
  FaLink,
  FaHeading,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaCode,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
  FaRedo,
  FaPalette,
  FaHighlighter,
} from "react-icons/fa";
import ImageUploader from "../image-uploader";

function MenuButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip content={label}>
      <button
        type="button"
        aria-label={label}
        onClick={onClick}
        className={`p-1 ${active ? "bg-gray-200" : ""}`}
      >
        {children}
      </button>
    </Tooltip>
  );
}

interface Props {
  content: any;
  onChange: (content: any) => void;
  editable?: boolean;
}

export default function TiptapEditor({
  content,
  onChange,
  editable = true,
}: Props) {
  const [showUploader, setShowUploader] = useState(false);
  const [showSliderUploader, setShowSliderUploader] = useState(false);
  const editor = useEditor({
    // решение проблемы гидратации SSR в TipTap
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Color,
      TextStyle,
      Highlight,
      ImageWithSize,
      Link,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: "Начните писать ваш пост...",
      }),
      Slider,
    ],
    content,
    editable,
    onUpdate({ editor }) {
      onChange(editor.getJSON());
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  const insertImage = (url: string) => {
    const alt = prompt("Описание") || "";
    const width = prompt("Ширина (%)", "100") || "100";
    editor
      .chain()
      .focus()
      .setImage({ src: url, alt, width } as any)
      .run();
  };

  const insertSlider = (urls: string[]) => {
    const delay = Number(prompt("Задержка между слайдами (мс)", "3000") || 3000);
    const autoplay = confirm("Автопрокрутка?");
    editor.commands.setSlider({ images: urls, delay, autoplay });
  };

  return (
    <div>
      <div className="flex flex-wrap gap-1 mb-2 border-b pb-2">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          label="Полужирный"
        >
          <FaBold />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          label="Подчёркнутый"
        >
          <FaUnderline />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          label="Зачёркнутый"
        >
          <FaStrikethrough />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          label="Курсив"
        >
          <FaItalic />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          label="Заголовок H2"
        >
          <FaHeading />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          label="Маркированный список"
        >
          <FaListUl />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          label="Нумерованный список"
        >
          <FaListOl />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          label="Цитата"
        >
          <FaQuoteRight />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          label="Код"
        >
          <FaCode />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          label="Разделитель"
        >
          ―
        </MenuButton>
        <MenuButton onClick={() => setShowUploader(true)} label="Изображение">
          <FaImage />
        </MenuButton>
        <MenuButton onClick={() => setShowSliderUploader(true)} label="Слайдер">
          Слайдер
        </MenuButton>
        <label className="p-1 cursor-pointer">
          <FaPalette />
          <input
            type="color"
            className="hidden"
            onChange={(e) =>
              editor.chain().focus().setColor(e.target.value).run()
            }
          />
        </label>
        <label className="p-1 cursor-pointer">
          <FaHighlighter />
          <input
            type="color"
            className="hidden"
            onChange={(e) =>
              editor
                .chain()
                .focus()
                .setHighlight({ color: e.target.value })
                .run()
            }
          />
        </label>
        <MenuButton onClick={() => editor.chain().undo().run()} label="Отменить">
          <FaUndo />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().redo().run()} label="Повторить">
          <FaRedo />
        </MenuButton>
        <MenuButton
          onClick={() => {
            const url = prompt("Введите URL", "http://");
            if (url)
              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
          }}
          label="Ссылка"
        >
          <FaLink />
        </MenuButton>
      </div>
      <EditorContent
        editor={editor}
        className="p-2 min-h-[300px] resize-y focus:outline-none"
      />
      {showUploader && (
        <div className="mt-2">
          <ImageUploader
            onUploadComplete={(file) => {
              const blob = Array.isArray(file) ? file[0] : file;
              const url = URL.createObjectURL(blob);
              insertImage(url);
              setShowUploader(false);
            }}
          />
        </div>
      )}
      {showSliderUploader && (
        <div className="mt-2">
          <ImageUploader
            multiple
            onUploadComplete={(files) => {
              const urls = (Array.isArray(files) ? files : [files]).map((f) =>
                URL.createObjectURL(f),
              );
              insertSlider(urls);
              setShowSliderUploader(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

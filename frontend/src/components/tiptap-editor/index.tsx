"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Strike from "@tiptap/extension-strike";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Placeholder from "@tiptap/extension-placeholder";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Slider from "./slider";
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
      Strike,
      Color,
      TextStyle,
      Highlight,
      Image,
      Link,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      HorizontalRule,
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
    const alt = prompt("Alt text") || "";
    editor.chain().focus().setImage({ src: url, alt }).run();
  };

  const insertSlider = (urls: string[]) => {
    editor.commands.setSlider(urls);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-1 mb-2 border-b pb-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1 ${editor.isActive("bold") ? "bg-gray-200" : ""}`}
        >
          <FaBold />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1 ${editor.isActive("underline") ? "bg-gray-200" : ""}`}
        >
          <FaUnderline />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1 ${editor.isActive("strike") ? "bg-gray-200" : ""}`}
        >
          <FaStrikethrough />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1 ${editor.isActive("italic") ? "bg-gray-200" : ""}`}
        >
          <FaItalic />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-1 ${
            editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""
          }`}
        >
          <FaHeading />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1 ${
            editor.isActive("bulletList") ? "bg-gray-200" : ""
          }`}
        >
          <FaListUl />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1 ${
            editor.isActive("orderedList") ? "bg-gray-200" : ""
          }`}
        >
          <FaListOl />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1 ${
            editor.isActive("blockquote") ? "bg-gray-200" : ""
          }`}
        >
          <FaQuoteRight />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-1 ${editor.isActive("codeBlock") ? "bg-gray-200" : ""}`}
        >
          <FaCode />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-1"
        >
          ―
        </button>
        <button
          type="button"
          onClick={() => setShowUploader(true)}
          className="p-1"
        >
          <FaImage />
        </button>
        <button
          type="button"
          onClick={() => setShowSliderUploader(true)}
          className="p-1"
        >
          Слайдер
        </button>
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
        <button
          type="button"
          onClick={() => editor.chain().undo().run()}
          className="p-1"
        >
          <FaUndo />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().redo().run()}
          className="p-1"
        >
          <FaRedo />
        </button>
        <button
          type="button"
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
          className="p-1"
        >
          <FaLink />
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="border rounded p-2 min-h-[300px] resize-y"
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

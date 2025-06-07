"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
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
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Link,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
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
    editor.chain().focus().setImage({ src: url }).run();
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
          onClick={() => setShowUploader(true)}
          className="p-1"
        >
          <FaImage />
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
            onUploadComplete={(url) => {
              insertImage(url as string);
              setShowUploader(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

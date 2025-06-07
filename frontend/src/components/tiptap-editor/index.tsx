"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

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
  const editor = useEditor({
    extensions: [StarterKit],
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

  return (
    <EditorContent
      editor={editor}
      className="border rounded p-2 min-h-[200px]"
    />
  );
}

import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface Props {
  value?: string;
  onChange?: (html: string) => void;
}

export default function QuillEditor({ value, onChange }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const isSettingContent = useRef(false);

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    const quill = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: "Nhập nội dung bài viết...",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
      },
    });

    quill.on("text-change", () => {
      if (isSettingContent.current) return;
      onChange?.(quill.root.innerHTML);
    });

    quillRef.current = quill;
  }, []);

  useEffect(() => {
    if (!quillRef.current || value === undefined) return;

    const currentHTML = quillRef.current.root.innerHTML;
    if (currentHTML === value) return;

    isSettingContent.current = true;
    quillRef.current.clipboard.dangerouslyPasteHTML(value);
    isSettingContent.current = false;
  }, [value]);

  return (
    <div
      ref={editorRef}
      style={{
        minHeight: 280,
        background: "#fff",
        borderRadius: 6,
      }}
    />
  );
}

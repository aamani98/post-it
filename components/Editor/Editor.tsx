import { EditorHeader } from "@/components/Editor/EditorHeader";
import EditorToolbar from "./EditorToolbar";
import EditorTeaxtArea from "./EditorTextArea";
import markdownFormatters from "@/features/editor/markdownFormatters";

import { useRef } from "react";

const Editor = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const formatOnClick = (formatter: string) => {
    const textArea = textAreaRef.current;
    console.log(formatter + " clicked");
    if (textArea) {
      const {
        selectionStart,
        selectionEnd,
        newSelectionEnd,
        newSelectionStart,
        replaceSelectionWith,
      } = markdownFormatters[formatter].format(textArea);
      textArea.contentEditable = "true";
      textArea.focus();
      textArea.setSelectionRange(selectionStart, selectionEnd);
      try {
        if (replaceSelectionWith === "") {
          document.execCommand("delete", false);
        } else {
          document.execCommand("insertText", false, replaceSelectionWith);
        }
      } catch (error) {
        textArea.value = `${textArea.value.slice(
          0,
          selectionStart
        )}${replaceSelectionWith}${textArea.value.slice(-1 * selectionEnd)}`;
      }
      textArea.contentEditable = "false";
      textArea.setSelectionRange(newSelectionStart, newSelectionEnd);
    }
  };
  return (
    <div className="mx-auto w-full max-w-3xl min-h-[calc(100vh-5.5rem)] lg:min-h-[calc(100vh-6.5rem)] grid grid-cols-[100%] grid-rows-[1fr_60px]">
      <div className="border-[1px] border-subtle rounded-xl bg-white flex flex-col">
        {/* Editor Header --> Title and cover image. */}
        <EditorHeader />
        {/* Editor Toolbar */}
        <EditorToolbar formatOnClick={formatOnClick} />
        {/* Editor TextArea */}
        <EditorTeaxtArea ref={textAreaRef} />
      </div>
      <div className="flex justify-end items-center">
        <button className="px-4 py-2 bg-default text-white text-sm font-medium h-9 border rounded-md inline-flex items-center justify-center whitespace-nowrap disabled:cursor-not-allowed">
          Publish
        </button>
      </div>
    </div>
  );
};

export default Editor;

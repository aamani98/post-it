import { useEffect, useRef, useState } from "react";

export const EditorHeader = () => {
  const tref = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (tref.current) {
      tref.current.style.height = "0px";
      const scrollHeight = tref.current.scrollHeight;
      tref.current.style.height = scrollHeight + "px";
    }
  }, [tref, title]);

  return (
    <div className="p-4 lg:p-5 space-y-3">
      <textarea
        className="w-full resize-none font-semibold md:font-bold lg:font-extrabold 
            text-default text-2xl md:text-3xl lg:text-4xl py-2 whitespace-pre-wrap focus:outline-none"
        placeholder="Title of the article"
        ref={tref}
        rows={1}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        <button className="px-4 py-2 bg-subtle text-dark text-sm font-medium h-9 border rounded-md inline-flex items-center justify-center whitespace-nowrap disabled:cursor-not-allowed">
          Add Cover Image
        </button>
      </div>
    </div>
  );
};

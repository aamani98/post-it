import { RefObject, TextareaHTMLAttributes, forwardRef } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>

const EditorTeaxtArea = forwardRef<HTMLTextAreaElement,Props>((props,ref) => {
    return (
        <div className="p-4 lg:p-5 flex-grow">
            <textarea className="w-full h-full bg-transparent outline-none border-none resize-none" ref={ref} />
        </div>
    )
})

export default EditorTeaxtArea;
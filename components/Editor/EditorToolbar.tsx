import markdownFormatters from "@/features/editor/markdownFormatters";

type EditorToolbarProps = {
    formatOnClick : (formatter : string) => void
}

const EditorToolbar = ({formatOnClick}:EditorToolbarProps) => {
    return(
        <div className="px-4 py-2 lg:px-5 lg:py-3 bg-subtle flex flex-wrap">
                {Object.keys(markdownFormatters).map(formatter => (
                    <button key={formatter} className="p-2 hover:bg-gray-200 hover:border-[1px] hover:rounded border-[1px] border-transparent" onClick={() => formatOnClick(formatter)}>
                        {markdownFormatters[formatter].icon}
                    </button>
                ))}
        </div>
    )
}

export default EditorToolbar;
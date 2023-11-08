import { ReactNode } from "react";
import { BsTypeBold, BsTypeItalic } from "react-icons/bs";
import { BiHeading } from "react-icons/bi";

type markdownFormattersType = {
  [key: string]: {
    label: string;
    icon: ReactNode;
    keyboardShortcut?: string;
    format: (textarea: HTMLTextAreaElement) => {
      selectionStart: number;
      selectionEnd: number;
      replaceSelectionWith: string;
      newSelectionStart: number;
      newSelectionEnd: number;
    };
  };
};

const getSelectionData = ({
  selectionStart,
  selectionEnd,
  value,
}: {
  selectionStart: number;
  selectionEnd: number;
  value: string;
}): {
  textAfterSelection: string;
  textBeforeSelection: string;
  selectedText: string;
} => {
  const textBeforeSelection = value.substring(0, selectionStart);
  const textAfterSelection = value.substring(selectionEnd, value.length);
  const selectedText = value.substring(selectionStart, selectionEnd);
  return { textAfterSelection, textBeforeSelection, selectedText };
};

const undoOrAddInlineFormatting = ({
  selectionStart,
  selectionEnd,
  value,
  prefix,
  suffix,
}: {
  selectionStart: number;
  selectionEnd: number;
  value: string;
  prefix: string;
  suffix: string;
}) => {
  const { selectedText, textAfterSelection, textBeforeSelection } =
    getSelectionData({ selectionStart, selectionEnd, value });

  const prefixLength = prefix.length;
  const suffixLength = suffix.length;

  console.log("$$$$$", {
    selectionStart,
    selectionEnd,
    value,
    selectedText,
    textAfterSelection,
    textBeforeSelection,
    prefixLength,
    suffixLength,
  });

  // Check if selected text has formatting
  const selectedTextHasFormatting =
    selectedText.slice(0, prefixLength) === prefix &&
    selectedText.slice(suffixLength * -1) === suffix;

  if (selectedTextHasFormatting) {
    return {
      selectionStart: selectionStart,
      selectionEnd: selectionEnd,
      replaceSelectionWith: selectedText.slice(prefixLength, -1 * suffixLength),
      newSelectionStart: selectionStart,
      newSelectionEnd: selectionEnd - (prefixLength + suffixLength),
    };
  }

  //   Check if immediate surrounding of selected text has formatting
  const surroundingHasFormatting =
    textBeforeSelection.slice(-1 * prefixLength) === prefix &&
    textAfterSelection.slice(0, suffixLength) === suffix;

  if (surroundingHasFormatting) {
    return {
      selectionStart: selectionStart - prefixLength,
      selectionEnd: selectionEnd + suffixLength,
      replaceSelectionWith: selectedText,
      newSelectionStart: selectionStart - prefixLength,
      newSelectionEnd: selectionEnd - prefixLength,
    };
  }

  //   No formatting --> Add formatting

  return {
    selectionStart: selectionStart,
    selectionEnd: selectionEnd,
    replaceSelectionWith: prefix + selectedText + suffix,
    newSelectionStart: selectionStart + prefixLength,
    newSelectionEnd: selectionEnd + prefixLength,
  };
};

const markdownFormatters: markdownFormattersType = {
  bold: {
    label: "Bold",
    icon: <BsTypeBold size={24} />,
    keyboardShortcut: "ctrl+b",
    format: ({ selectionStart, selectionEnd, value }) => {
      return undoOrAddInlineFormatting({
        selectionEnd,
        selectionStart,
        value,
        prefix: "**",
        suffix: "**",
      });
    },
  },
  italic: {
    label: "Italic",
    icon: <BsTypeItalic size={24} />,
    keyboardShortcut: "ctrl+i",
    format: ({ selectionStart, selectionEnd, value }) => {
      return undoOrAddInlineFormatting({
        selectionEnd,
        selectionStart,
        value,
        prefix: "_",
        suffix: "_",
      });
    },
  },
  heading: {
    label: "Heading",
    icon: <BiHeading size={24} />,
    format: () => ({
      selectionStart: 0,
      selectionEnd: 0,
      replaceSelectionWith: "",
      newSelectionStart: 0,
      newSelectionEnd: 0,
    }),
  },
};

export default markdownFormatters;

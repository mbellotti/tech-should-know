import React, { FC, ReactComponentElement, ReactElement } from "react";

import { ChainedCommands, Editor } from "@tiptap/react";

type commands =
  | "blur"
  | "setParagraph"
  | "toggleBlockquote"
  | "toggleBold"
  | "toggleBulletList"
  | "toggleCode"
  | "toggleOrderedList"
  | "toggleStrike"
  | "toggleItalic"
  | "toggleUnderline"
  | "unsetAllMarks"
  | "undo";
const IconButton: FC<{
  name: string;
  editor: Editor;
  fn: commands;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  additionalClasses?: string;
}> = ({ additionalClasses, editor, fn, Icon, name }) => {
  let className = editor.isActive(name) ? "active" : "";
  className += ` ${additionalClasses}`;
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus()[fn]().run();
      }}
      disabled={!editor.can().chain().focus()[fn]().run()}
      className="btn"
    >
      <Icon className={className} />
    </button>
  );
};

export default IconButton;

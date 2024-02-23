import { Editor } from "@tiptap/react";
import { FC, Ref, useEffect, useState } from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import IconButton from "./IconButton";
import React from "react";
import { Modal } from "bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { ReactComponent as Blockquote } from "../../../../../assets/icons/blockquote.svg";
import { ReactComponent as Bold } from "../../../../../assets/icons/bold.svg";
import { ReactComponent as BulletList } from "../../../../../assets/icons/bullet_list.svg";
import { ReactComponent as Code } from "../../../../../assets/icons/code_block.svg";
import { ReactComponent as Clear } from "../../../../../assets/icons/clear.svg";
import { ReactComponent as Italic } from "../../../../../assets/icons/italic.svg";
import { ReactComponent as NoteIcon } from "../../../../../assets/icons/note.svg";
import { ReactComponent as NumList } from "../../../../../assets/icons/num_list.svg";
import { ReactComponent as Paragraph } from "../../../../../assets/icons/paragraph_icon.svg";
import { ReactComponent as Strikethrough } from "../../../../../assets/icons/strikethrough.svg";
import { ReactComponent as TextSize } from "../../../../../assets/icons/text_size.svg";

import { ReactComponent as Underline } from "../../../../../assets/icons/i_underline.svg";
import { ReactComponent as Undo } from "../../../../../assets/icons/undo.svg";
import { ArticleParams, Note } from "../store/types";

function crudNote(editor: Editor, noteIdx: number) {
  const noteEditor = document.getElementById("noteEditor");
  if (noteEditor == null) return;
  if (editor.isActive("highlight")) {
    //Removing note
    //Don't worry about decrementing noteIdx, more trouble then it's worth
    editor.chain().focus().toggleHighlight().run();
  } else {
    //Creating note
    editor.chain().focus().toggleHighlight().run();
    //Launch modal
    var note = Modal.getOrCreateInstance(noteEditor, { focus: false });
    const node = document.getElementById("note-idx");
    if (node) {
      node.value = noteIdx;
      note.show();
    }
  }
}

const ToolbarNormal: FC<{
  editor: Editor;
  upsert: (update: ArticleParams) => void;
  name: string;
  content: string;
  notes?: Note[];
  showNote?: boolean;
}> = ({ editor, name, notes, upsert, showNote }) => {
  const [noteIdx, setNoteIdx] = useState(notes?.length || 0);

  useEffect(() => {
    setNoteIdx(notes?.length || 0);
  }, [notes]);

  return (
    <div className="editor justify-content-between">
      <ButtonToolbar className="mb-3" aria-label="Text editor toolbar">
        <div className="dropdown">
          <button
            className="btn dropdown-toggle"
            type="button"
            id="heading"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <TextSize />
          </button>
          <div className="dropdown-menu" aria-labelledby="heading">
            <a
              className="dropdown-item"
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleHeading({ level: 1 }).run();
              }}
            >
              H1
            </a>
            <a
              className="dropdown-item"
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleHeading({ level: 2 }).run();
              }}
            >
              H2
            </a>
            <a
              className="dropdown-item"
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleHeading({ level: 3 }).run();
              }}
            >
              H3
            </a>
          </div>
        </div>
        <ButtonGroup className="me-2" aria-label="Text style">
          <IconButton
            name={"bold"}
            editor={editor}
            fn={"toggleBold"}
            additionalClasses="editorIcon"
            Icon={Bold}
          />

          <IconButton
            name={"italic"}
            editor={editor}
            fn={"toggleItalic"}
            additionalClasses="editorIcon"
            Icon={Italic}
          />

          <IconButton
            name={"underline"}
            editor={editor}
            fn={"toggleUnderline"}
            additionalClasses="editorIcon"
            Icon={Underline}
          />

          <IconButton
            name={"strike"}
            editor={editor}
            fn={"toggleStrike"}
            additionalClasses="editorIcon"
            Icon={Strikethrough}
          />
        </ButtonGroup>
        <ButtonGroup className="me-2" aria-label="Block style">
          <IconButton
            name={"code"}
            editor={editor}
            fn={"toggleCode"}
            additionalClasses="editorIcon"
            Icon={Code}
          />

          <IconButton
            name={"paragraph"}
            editor={editor}
            fn={"setParagraph"}
            additionalClasses="editorIcon"
            Icon={Paragraph}
          />

          <IconButton
            name={"bulletList"}
            editor={editor}
            fn={"toggleBulletList"}
            additionalClasses="editorIcon"
            Icon={BulletList}
          />

          <IconButton
            name={"orderedList"}
            editor={editor}
            fn={"toggleOrderedList"}
            additionalClasses="editorIcon"
            Icon={NumList}
          />

          <IconButton
            name={"blockquote"}
            editor={editor}
            fn={"toggleBlockquote"}
            additionalClasses="editorIcon"
            Icon={Blockquote}
          />
          {showNote && (
            <button
              onClick={(e) => {
                e.preventDefault();
                crudNote(editor, noteIdx);
              }}
              className="btn"
            >
              <NoteIcon
                className={
                  editor.isActive("highlight")
                    ? "editorIcon active"
                    : "editorIcon"
                }
              />
            </button>
          )}
        </ButtonGroup>
        <IconButton
          additionalClasses={"editorIcon"}
          name={"undo"}
          editor={editor}
          fn={"undo"}
          Icon={Undo}
        />

        <IconButton
          additionalClasses={"editorIcon"}
          name={"clear"}
          editor={editor}
          fn={"unsetAllMarks"}
          Icon={Clear}
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            upsert({ [name]: editor.getHTML() });
          }}
          className="btn btn-outline"
        >
          Save
        </button>
      </ButtonToolbar>
    </div>
  );
};

export default ToolbarNormal;

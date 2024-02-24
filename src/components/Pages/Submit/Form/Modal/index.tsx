import React, { FC, useCallback, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ArticleParams, Note } from "../store/types";
import { Editor } from "@tiptap/react";

const NoteModal: FC<{
  id?: number;
  editor: Editor;
  unsetId: (val: undefined) => void;
  notes: Note[];
  saveNote: (id: number, value: Note) => void;
}> = ({ id, editor, notes, saveNote, unsetId }) => {
  const [value, setValue] = useState<Note>({ text: "", id: 0 });

  useEffect(() => {
    if (id) {
      const note = notes[id];
      setValue({ text: note?.text, id: id });
    }
  }, [id]);

  return (
    <Modal show={id != null} onHide={() => unsetId(undefined)}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          id="note-body"
          rows={10}
          value={value?.text}
          onChange={(e) =>
            setValue((v) => {
              return { text: e.target.value, id: v.id };
            })
          }
        ></textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => unsetId(undefined)}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            if (id) {
              editor.chain().setTextSelection(1000000).run();
              editor.chain().toggleHighlight().run();
              saveNote(id, value);
            }
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NoteModal;

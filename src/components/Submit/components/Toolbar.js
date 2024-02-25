import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {Bold, Italic, IUnderline, Strikethrough, CodeBlock, Blockquote, Undo, BulletList, NumList, Clear, Paragraph, TextSize, Note} from '../../Icons.js'
import { Modal } from 'bootstrap'

import { getNoteId, setNoteId } from '../utils/notes.js';
import { updateValuesFromEditor } from '../utils/form.js';

const ToolBarButton = ({ additionalClasses, editor, fn, Icon, name }) => {

//     <ToolBarButton
//     name={"italic"}
//     editor={editor}
//     fn={"toggleItalic"}
//     additionalClasses="editorIcon"
//     Icon={Italic}
//   />

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

export const Toolbar = ({editor, value, markup, notesMode }) => {
    const notes = value.current.notes || []
    setNoteId(notes.length)

    function crudNote(editor){
        if (editor.isActive('highlight')){
            //Removing note
            //Don't worry about decrementing noteIdx, more trouble then it's worth
            editor.chain().focus().toggleHighlight().run()
        }else{
            //Creating note
            editor.chain().focus().toggleHighlight().run()
            //Launch modal
            var note = Modal.getOrCreateInstance(document.getElementById('noteEditor'), {"focus": false})
            document.getElementById("note-idx").value = getNoteId();
            note.show();
        }
    }
  
    return (
      <div class="editor justify-content-between">
        <ButtonToolbar className="mb-3" aria-label="Text editor toolbar">
        <div class="dropdown">
        <button class="btn dropdown-toggle" type="button" id="heading" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(e)=>{e.preventDefault()}}>
            <TextSize />
        </button>
            <div class="dropdown-menu" aria-labelledby="heading">
                <a class="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleHeading({ level: 1 }).run()}}>H1</a>
                <a class="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run()}}>H2</a>
                <a class="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleHeading({ level: 3 }).run()}}>H3</a>
            </div>
        </div>
        <ButtonGroup className="me-2" aria-label="Text style">
        <button
          onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleBold().run()}}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className="btn"
         >
          <Bold iconClass={editor.isActive('bold') ? 'active' : ''}/>
        </button>
        <button
          onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleItalic().run()}}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className="btn"
        >
          <Italic iconClass={editor.isActive('italic') ? 'active' : ''}/>
        </button>
        <button
          onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleUnderline().run()}}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleUnderline()
              .run()
          }
          className="btn"
        >
          <IUnderline iconClass={editor.isActive('underline') ? 'active' : ''}/>
        </button>
        <button
          onClick={(e) => {e.preventDefault();
            editor.chain().focus().toggleStrike().run()}}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className="btn"
        >
          <Strikethrough iconClass={editor.isActive('strike') ? 'active' : ''}/>
        </button>
        </ButtonGroup>
        <ButtonGroup className="me-2" aria-label="Block style">
        <button
          onClick={(e) => {e.preventDefault();
            editor.chain().focus().toggleCode().run()}}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className="btn"
        >
          <CodeBlock iconClass={editor.isActive('code') ? 'active' : ''} />
        </button>
        <button
          onClick={(e) => {e.preventDefault(); editor.chain().focus().setParagraph().run()}}
          className="btn"
        >
        <Paragraph iconClass={editor.isActive('paragraph') ? 'is-active' : ''} />
        </button>
        <button
          onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleBulletList().run()}}
          className="btn"
        >
          <BulletList iconClass={editor.isActive('bulletList') ? 'active' : ''}/>
        </button>
        <button
          onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleOrderedList().run()}}
          className="btn"
        >
          <NumList iconClass={editor.isActive('orderedList') ? 'active' : ''} />
        </button>
        <button
          onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleBlockquote().run()}}
          className="btn"
        >
          <Blockquote iconClass={editor.isActive('blockquote') ? 'active' : ''} />
        </button>
        <button
          onClick={(e) => {e.preventDefault(); crudNote(editor)}}
          className="btn"
        >
          <Note iconClass={editor.isActive('highlight') ? 'active' : ''} />
        </button>
        </ButtonGroup>
        <button
          onClick={(e) => {e.preventDefault(); editor.chain().focus().undo().run()}}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
          className="btn"
        >
          <Undo iconClass={''} />
        </button>
        <button onClick={(e) => {e.preventDefault(); editor.chain().focus().unsetAllMarks().run()}}
        className="btn"
        >
          <Clear />
        </button>
        <button id="toolbarNoteGenerate" onClick={(e) => {e.preventDefault(); updateValuesFromEditor(editor, "article", value, markup)}}
        className="btn btn-outline"
        >
          Save
        </button>
        </ButtonToolbar>
      </div>
    )
  }
import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, Editor, Extension, getAttributes } from '@tiptap/react';
import { Plugin, PluginKey } from '@tiptap/pm/state'
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import {Bold, Italic, IUnderline, Strikethrough, CodeBlock, Blockquote, Undo, BulletList, NumList, Clear, Paragraph, TextSize, Note, Trash, AddLink} from './Icons'
import { splitAuthors } from './utils.js';
import { Col, Row } from 'react-bootstrap';
import { Modal } from 'bootstrap'
import { Tag, TagGroup, Input } from 'rsuite';

    let NoteId = 0
    const setNoteId = function(id){
        NoteId = id
    }
    const incrementNoteId = function(){
          NoteId += 1
    }
    const getNoteId = function(){
        return NoteId.valueOf()
    }

    const updateMarkup = function(value, markup){
        localStorage.setItem('tsk-value', JSON.stringify(value));

        let newMarkup = {"title":value.paperName,
            "authors": splitAuthors(value.paperAuthor),
            "abstract":value.abstract,
            "content":value.article,
            "submissionBy":{"name":value.submitName,"link":value.submitLink},
            "notes":value.notes,      //{"text":"",id:0}
            "references":value.references, //{"cite":"","doi":""} Grab references from value.doi
            "works":value.links,       //{"title":"","link":""}
            "tags":value.tags
        }
        markup.current = newMarkup
        const txt = JSON.stringify(markup.current, null, 2)
        document.getElementById("dispalyMarkup").innerText = txt
    }

    const validDOI = function(doi){
        const r = /10.\d{4,9}\/[-._;()/:A-Z0-9]+/gi
        return doi.match(r) != null
    }

    async function getReferences(value, markup){
        if (!validDOI(value.doi)){
            return
        }

        let references = []
        const url = "https://api.crossref.org/works/"+value.doi
        const response = await fetch(url);
        try{
            const data = await response.json(); //If not available returns "Resource not found."
            references = data["message"]["reference"]
            .filter(r=>validDOI(r["doi"])) // No DOI, throw out
            .map(r => {
                let title = r["article-title"] || r["volume-title"]
                return({"cite":title, "doi":r["key"]})
            });
        }catch(error){
            console.log(error)
            return
        }finally{
            value.references = references
            updateMarkup(value, markup)
        }
    }

   const updateValuesFromEditor = function (editor, key, value, markup){ 
    switch(key){
        case "abstract":
                value.current.abstract = editor.getHTML()
                break;
            case "article":
                //value.current.article = editor.getHTML()
                // Prose Mirror renderHTML is reseting note ids. So we're going to bypass it here.
                value.current.article = document.getElementById("noteArea").children[0].children[0].innerHTML
        }
        updateMarkup(value.current, markup)
    }

export function ClearForm(){
    document.getElementById("generator").reset();
    Array.from(document.getElementsByClassName("ql-editor")).forEach((el) => { el.innerHTML = "" })
    Array.from(document.getElementsByClassName("links")).forEach((el) => { el.value = "" })
}

export function SubmitForm({value, markup}){
    const abstract = new Editor({
        content: value.current.abstract,
        extensions: [
            Underline,
            TextStyle.configure(),
            StarterKit.configure({
              bulletList: {
                keepMarks: true,
                keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
              },
              orderedList: {
                keepMarks: true,
                keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
              },
            }),
          ],
        }
    )

    const article = new Editor({
        content: value.current.article,
        extensions: [
            InlineNote,
            NoteEdit,
            Underline,
            TextStyle.configure(),
            StarterKit.configure({
              bulletList: {
                keepMarks: true,
                keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
              },
              orderedList: {
                keepMarks: true,
                keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
              },
            }),
          ],
    })

    return(<form id="generator">
        <h4>Article Metadata</h4>
          <ArticleMetaData value={value} markup={markup} />
          <h4>Tags</h4>
          <div class="input-group my-2 tag-area"><Tags value={value} markup={markup} /></div>
          <br />
          <h4>Abstract</h4>
          <ToolBarNormal editor={abstract} value={value} markup={markup} />
          <EditorContent editor={abstract} />
          <br/>
          <h4>Article Text</h4>
          <ToolBarNotes editor={article} value={value} markup={markup} />
          <div id="noteArea">
          <EditorContent editor={article} />
          </div>
          <br/>
          <Links value={value} markup={markup} />
    </form>)
}

export const NoteEdit = Extension.create({
    name: 'NoteEdit',
  
    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey('NoteEdit'),
          props: {
            handleDoubleClick(view, pos, event) { 
                const id = event.target.id
                if(id && id.slice(0,7) == "inline-"){
                    const idx = id.slice(7, id.length)
                    var note = Modal.getOrCreateInstance(document.getElementById('noteEditor'), {"focus": false})
                    document.getElementById("note-idx").value = idx;
                    
                    const value = JSON.parse(localStorage.getItem("tsk-value"))
                    
                    if (value==null || value.notes==null){
                        note.show();
                        return
                    } 
                    
                    let text = ''
                    for(let i = 0; i < value.notes.length; i++){
                        if(value.notes[i].id === idx){
                            text = value.notes[i].text
                        } 
                    }
                    
                    document.getElementById("note-body").value = text;
                    note.show();
                }

            },
          },
        }),
      ]
    },
  })


const InlineNote = Highlight.extend( {
    priority: 1000,
    addAttributes() {
        return {
          ...this.parent?.(),
          id: {
            default: '',
            // Take the attribute values
            renderHTML: attributes => {
              // … and return an object with HTML attributes.
              if(attributes.id != ""){
                return {
                  id: attributes.id
                }
              }
              return {
                id: `inline-${getNoteId()}`,
              }
            },
            parseHTML: element => element.getAttribute('id'),
          },
          class:{
            default: "inlineNote",
          }
        }
      }
});

const ToolBarNormal = ({editor, value, markup }) => {
    return (
      <div class="editor justify-content-between">
        <ButtonToolbar className="mb-3" aria-label="Text editor toolbar">
        <div class="dropdown">
        <button class="btn dropdown-toggle" type="button" id="heading" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(e)=>{e.preventDefault()}}>
            <TextSize />
        </button>
            <div class="dropdown-menu" aria-labelledby="heading">
                <a class="dropdown-item" onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleHeading({ level: 1 }).run()}}>H1</a>
                <a class="dropdown-item" onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run()}}>H2</a>
                <a class="dropdown-item" onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleHeading({ level: 3 }).run()}}>H3</a>
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
          onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleStrike().run()}}
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
          onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleCode().run()}}
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
        <button onClick={(e) => {e.preventDefault(); updateValuesFromEditor(editor, "abstract", value, markup)}}
        className="btn btn-outline"
        >
          Save
        </button>
        </ButtonToolbar>
      </div>
    )
  }

const ToolBarNotes = ({editor, value, markup }) => {
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

export function NoteEditor({value, markup}){
    const closeModal = function (){
        const note = Modal.getOrCreateInstance(document.getElementById('noteEditor'), {"focus": false})
        document.getElementById('note-body').value = "";
        note.hide();
    }

    const submitNote = function(value,markup){
        const note = Modal.getOrCreateInstance(document.getElementById('noteEditor'), {"focus": false})
        const idx = document.getElementById('note-idx').value
        const val = document.getElementById('note-body').value
        var update = false

        const notes = value.notes.map(n => {
            if(n.id == idx){
                n.text = val
                update = true
            }
            return n
        })

        if (!update){
            notes.push({"id":idx, "text":val})
        }

        value.notes = notes
        updateMarkup(value, markup)

        document.getElementById('toolbarNoteGenerate').click() //Trigger an update to the article markup too

        document.getElementById('note-body').value = "";
        note.hide()
        incrementNoteId();
    }

    return(
    <div class="modal fade" id="noteEditor" tabindex="-1" role="dialog" aria-labelledby="noteEditor" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="noteEditor">Add a Note</h5>
        <input type="hidden" id="note-idx"/>
        <button type="button" class="btn close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <textarea id="note-body" row="10"></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Cancel</button>
        <button type="button" class="btn btn-primary" onClick={(e) => {submitNote(value.current ,markup)}}>Save</button>
      </div>
    </div>
  </div>
</div>
    )
}
  
export function ArticleMetaData({value, markup}){
    const handleChange = (event) => {
        switch (event.target.id){
            case "paperName":
                value.current.paperName = event.target.value
                updateMarkup(value.current, markup)
                return
            case "paperAuthor":
                value.current.paperAuthor = event.target.value
                updateMarkup(value.current, markup)
                return
            case "submitName":
                value.current.submitName = event.target.value
                updateMarkup(value.current, markup)
                return
            case "submitLink": 
                value.current.submitLink = event.target.value
                updateMarkup(value.current, markup)
                return
            case "doi": 
                value.current.doi = event.target.value
                getReferences(value.current, markup)
                return
        }
      };
    

    return (
        <>
        <div class="input-group my-2">
            <input class="form-control form-control-lg" type="text" id="paperName" name="paperName" placeholder="Name of paper" onBlur={handleChange} defaultValue={value.current.paperName} />
            </div>
            <div class="input-group my-2">
            <input class="form-control form-control-lg" type="text" id="paperAuthor" name="paperAuthor" placeholder="Author(s) comma seperated" onBlur={handleChange} defaultValue={value.current.paperAuthor}/>
            </div>
            <div class="input-group my-2">
            <input class="form-control form-control-lg" type="text" id="doi" name="doi" placeholder="DOI Number" onBlur={handleChange} defaultValue={value.current.doi} />
            </div>
            <div class="input-group my-1">
            <input class="form-control form-control-lg" type="text" id="submitName" name="submitName" placeholder="Your Name" onBlur={handleChange} defaultValue={value.current.submitName} />
            </div>
            <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text">https://</span>
  </div>
  <input type="text" class="form-control" aria-label="link to submitter's profile" id="submitLink" name="submitLink" placeholder="Link back to you" onBlur={handleChange} defaultValue={value.current.submitLink}/>
</div>
        </>
    )
}

const Tags = ({value, markup}) =>{
  const [tags, setTags] = useState(value.current.tags || []);
  const [typing, setTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const splitTags = (tagInput) => {
    let tagsGroup = tagInput.split(",");
    return tagsGroup.map(t => t.toLowerCase().trim())
  }

  const removeTag = tag => {
    const nextTags = tags.filter(item => item !== tag);
    setTags(nextTags);
    value.current.tags = nextTags
    updateMarkup(value.current, markup)
  };

  const addTag = () => {
    const nextTags = inputValue ? [...tags, ...splitTags(inputValue)] : tags;
    setTags(nextTags);
    setTyping(false);
    setInputValue('');
    value.current.tags = nextTags
    updateMarkup(value.current, markup)
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    setTyping(true);
  };

  const renderInput = () => {
    if (typing) {
      return (
        <Input
          className="form-control form-control-sm"
          size="xs"
          style={{ width: 70 }}
          value={inputValue}
          onChange={setInputValue}
          onBlur={addTag}
          onPressEnter={addTag}
        />
      );
    }

    return (
      <button
        className="btn"
        onClick={handleButtonClick}>
          <AddLink /></button>
    );
  };
  return (
    <TagGroup>
      {tags.map((item, index) => (
        <Tag key={index} closable onClose={() => removeTag(item)}>
          {item}
        </Tag>
      ))}
      {renderInput()}
    </TagGroup>
  );
};


const Links = ({value, markup}) => {
    
    const [inputFields, setInputFields] = useState(value.current.links 
        || [{link_title: '', link_url: ''}])

    const handleFormChange = (event) => {
        let data = [...inputFields];
        let index = parseInt(event.target.getAttribute("data-key"))
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
        value.links = data
        updateMarkup(value, markup)
     }

    const addLink = (e) => {
        e.preventDefault();
        let newfield = { link_title: '', link_url: '' }
        let data = [...inputFields, newfield]
        value.links = data
        updateMarkup(value, markup)
        setInputFields(data)
    }

    const removeLink = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        value.links = data
        updateMarkup(value, markup)
        setInputFields(data)
    }

    return (
        <div>
            <Row className={"justify-content-start"}>
            <Col md={3} sm={4}>
          <h4>Related Links</h4>
          </Col><Col sm={1}>
          <button onClick={addLink} className="btn">
            <AddLink iconClass={"addLink"} onClick={addLink}/>
            </button>
          </Col>
          </Row>
            {inputFields.map((input, index) => {
              return (
                <div class="input-group my-2">
                  <input
                    class="form-control form-control-lg links"
                    type="text"
                    name='link_title'
                    placeholder='Title'
                    data-key={index}
                    defaultValue={input.link_title}
                    onBlur={handleFormChange}
                  />
                  <input
                    class="form-control form-control-lg links"
                    type="text"
                    name='link_url'
                    placeholder='URL'
                    data-key={index}
                    defaultValue={input.link_url}
                    onBlur={handleFormChange}
                  />
                  <div class="input-group-append">
                        <button class="btn" type="button" onClick={(e) => {e.preventDefault(); removeLink(index)}}><Trash/></button>
                  </div>
                </div>
              )
            })}
        </div>
      );
}

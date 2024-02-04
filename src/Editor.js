import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, Editor } from '@tiptap/react';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import {Bold, Italic, IUnderline, Strikethrough, CodeBlock, Blockquote, Undo, BulletList, NumList, Clear, Paragraph, TextSize, Note, Trash, AddLink} from './Icons'
import { splitAuthors } from './utils.js';
import { Col, Row } from 'react-bootstrap';

    const updateMarkup = function(value, markup){
        let newMarkup = {"title":value.paperName,
            "authors": splitAuthors(value.paperAuthor),
            "abstract":value.abstract,
            "content":value.article,
            "submissionBy":{"name":value.submitName,"link":value.submitLink},
            "notes":[],      //{"text":"",id:0}
            "references":[], //{"cite":"","doi":""} Grab references from value.doi
            "works":[]       //{"title":"","link":""}
        }
        markup.current = newMarkup
        const txt = JSON.stringify(markup.current, null, 2)
        document.getElementById("dispalyMarkup").innerText = txt
    }

    const validDOI = function(doi){
        const r = new RegExp("/^10.\d{4,9}/[-._;()/:A-Z0-9]+$/i", "g")
        return r.test(doi)
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
            references = data["message"]["reference"].map(r => {
                return({"cite":r["article-title"], "doi":r["key"]})
            });
        }catch(error){
            console.log(error)
            return
        }finally{

        let newMarkup = {"title":value.paperName,
            "authors": splitAuthors(value.paperAuthor),
            "abstract":value.abstract,
            "content":value.article,
            "submissionBy":{"name":value.submitName,"link":value.submitLink},
            "notes":[],      //{"text":"",id:0}
            "references": references,
            "works":[]       //{"title":"","link":""}
        }
        markup.current = newMarkup
        const txt = JSON.stringify(markup.current, null, 2)
        document.getElementById("dispalyMarkup").innerText = txt
        }
    }

   const updateValuesFromEditor = function (editor, key, value, markup){ 
    switch(key){
        case "abstract":
                value.current.abstract = editor.getHTML()
                break;
            case "article":
                value.current.article = editor.getHTML()
        }
        updateMarkup(value.current, markup)
    }

export function SubmitForm({value, markup}){
    const abstract = new Editor({
        content: value.abstract,
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
        content: value.article,
        extensions: [
            InlineNote,
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

    return(<>
        <h4>Article Metadata</h4>
          <ArticleMetaData value={value} markup={markup} />
          <br/>
          <h4>Abstract</h4>
          <ToolBarNormal editor={abstract} value={value} markup={markup} />
          <EditorContent editor={abstract} />
          <br/>
          <h4>Article Text</h4>
          <ToolBarNotes editor={article} value={value} markup={markup} />
          <EditorContent editor={article} />
          <br/>
          <Links />
    </>)
}


const InlineNote = Highlight.extend( {
    priority: 1000,
    addStorage() {
        return {
          idx: 0,
        }
      },
    addAttributes() {
        return {
          ...this.parent?.(),
          id: {
            default: '',
            // Take the attribute values
            renderHTML: attributes => {
              // … and return an object with HTML attributes.
              return {
                id: `inline-${this.storage.idx}`,
              }
            },
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
        <button class="btn dropdown-toggle" type="button" id="heading" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <TextSize />
        </button>
            <div class="dropdown-menu" aria-labelledby="heading">
                <a class="dropdown-item" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</a>
                <a class="dropdown-item" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</a>
                <a class="dropdown-item" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</a>
            </div>
        </div>
        <ButtonGroup className="me-2" aria-label="Text style">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
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
          onClick={() => editor.chain().focus().toggleItalic().run()}
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
          onClick={() => editor.chain().focus().toggleUnderline().run()}
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
          onClick={() => editor.chain().focus().toggleStrike().run()}
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
          onClick={() => editor.chain().focus().toggleCode().run()}
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
          onClick={() => editor.chain().focus().setParagraph().run()}
          className="btn"
        >
        <Paragraph iconClass={editor.isActive('paragraph') ? 'is-active' : ''} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="btn"
        >
          <BulletList iconClass={editor.isActive('bulletList') ? 'active' : ''}/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="btn"
        >
          <NumList iconClass={editor.isActive('orderedList') ? 'active' : ''} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="btn"
        >
          <Blockquote iconClass={editor.isActive('blockquote') ? 'active' : ''} />
        </button>
        </ButtonGroup>
        <button
          onClick={() => editor.chain().focus().undo().run()}
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
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="btn"
        >
          <Clear />
        </button>
        <button onClick={() => updateValuesFromEditor(editor, "abstract", value, markup)}
        className="btn btn-outline"
        >
          Generate
        </button>
        </ButtonToolbar>
      </div>
    )
  }

const ToolBarNotes = ({editor, value, markup }) => {
    let noteIdx = 0

    function crudNote(editor, noteIdx){
        if (editor.isActive('highlight')){
            //Removing note
            //Don't worry about decrementing noteIdx, more trouble then it's worth
            editor.chain().focus().toggleHighlight().run()
        }else{
            //Creating note
            editor.chain().focus().command((noteIdx) => { editor.storage.idx = noteIdx}).toggleHighlight().run()
            noteIdx += 1
            //Launch modal
            alert("HELLO!")
        }
    }
  
    return (
      <div class="editor justify-content-between">
        <ButtonToolbar className="mb-3" aria-label="Text editor toolbar">
        <div class="dropdown">
        <button class="btn dropdown-toggle" type="button" id="heading" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <TextSize />
        </button>
            <div class="dropdown-menu" aria-labelledby="heading">
                <a class="dropdown-item" href="#" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</a>
                <a class="dropdown-item" href="#" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</a>
                <a class="dropdown-item" href="#" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</a>
            </div>
        </div>
        <ButtonGroup className="me-2" aria-label="Text style">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
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
          onClick={() => editor.chain().focus().toggleItalic().run()}
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
          onClick={() => editor.chain().focus().toggleUnderline().run()}
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
          onClick={() => editor.chain().focus().toggleStrike().run()}
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
          onClick={() => editor.chain().focus().toggleCode().run()}
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
          onClick={() => editor.chain().focus().setParagraph().run()}
          className="btn"
        >
        <Paragraph iconClass={editor.isActive('paragraph') ? 'is-active' : ''} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="btn"
        >
          <BulletList iconClass={editor.isActive('bulletList') ? 'active' : ''}/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="btn"
        >
          <NumList iconClass={editor.isActive('orderedList') ? 'active' : ''} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="btn"
        >
          <Blockquote iconClass={editor.isActive('blockquote') ? 'active' : ''} />
        </button>
        <button
          onClick={() => crudNote(editor, noteIdx)}
          className="btn"
        >
          <Note iconClass={editor.isActive('highlight') ? 'active' : ''} />
        </button>
        </ButtonGroup>
        <button
          onClick={() => editor.chain().focus().undo().run()}
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
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="btn"
        >
          <Clear />
        </button>
        <button onClick={() => updateValuesFromEditor(editor, "article", value, markup)}
        className="btn btn-outline"
        >
          Generate
        </button>
        </ButtonToolbar>
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
            <input class="form-control form-control-lg" type="text" id="paperName" name="paperName" placeholder="Name of paper" onBlur={handleChange} />
            </div>
            <div class="input-group my-2">
            <input class="form-control form-control-lg" type="text" id="paperAuthor" name="paperAuthor" placeholder="Author(s) comma seperated" onBlur={handleChange}/>
            </div>
            <div class="input-group my-2">
            <input class="form-control form-control-lg" type="text" id="doi" name="doi" placeholder="DOI Number" onBlur={handleChange} />
            </div>
            <div class="input-group my-1">
            <input class="form-control form-control-lg" type="text" id="submitName" name="submitName" placeholder="Your Name" onBlur={handleChange} />
            </div>
            <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text">https://</span>
  </div>
  <input type="text" class="form-control" aria-label="link to submitter's profile" id="submitLink" name="submitLink" placeholder="Link back to you" onBlur={handleChange}/>
</div>
        </>
    )
}


const Links = ({}) => {
    const [inputFields, setInputFields] = useState([
        {link_title: '', link_url: ''}
    ])

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
     }

    const addLink = () => {
        let newfield = { link_title: '', link_url: '' }
        setInputFields([...inputFields, newfield])
    }

    const removeLink = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
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
                <div class="input-group my-2" key={index}>
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    name='name'
                    placeholder='Title'
                    onBlur={handleFormChange}
                  />
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    name='age'
                    placeholder='URL'
                    onBlur={handleFormChange}
                  />
                  <div class="input-group-append">
                        <button class="btn" type="button" onClick={() => removeLink(index)}><Trash/></button>
                  </div>
                </div>
              )
            })}
        </div>
      );
}

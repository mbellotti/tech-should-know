import { Extension } from '@tiptap/react';
import { Plugin, PluginKey } from '@tiptap/pm/state'
import Highlight from '@tiptap/extension-highlight';
import { Modal } from 'bootstrap'
import { getNoteId,  } from '../../utils/notes';

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


export const InlineNote = Highlight.extend( {
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
import { splitAuthors } from './authors.js';
import { useReducer } from 'react';

export function useForceUpdate() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  return forceUpdate;
}

export const valueToMarkup = function(value){
    return {"title":value.paperName,
        "authors": splitAuthors(value.paperAuthor),
        "abstract":value.abstract,
        "content":value.article,
        "submissionBy":{"name":value.submitName,"link":value.submitLink},
        "notes":value.notes,      //{"text":"",id:0}
        "references":value.references, //{"cite":"","doi":""} Grab references from value.doi
        "works":value.links,       //{"title":"","link":""}
        "tags":value.tags
    }
}

export const updateMarkup = function(value, markup){
    localStorage.setItem('tsk-value', JSON.stringify(value));
    markup = valueToMarkup(value)
    const txt = JSON.stringify(markup, null, 2)
    document.getElementById("dispalyMarkup").innerText = txt
}

export const updateValuesFromEditor = function (editor, key, value, markup){ 
    switch(key){
        case "abstract":
                value.current.abstract = editor.getHTML()
                break;
            case "article":
                //value.current.article = editor.getHTML()
                // Prose Mirror renderHTML is reseting note ids. So we're going to bypass it here.
                value.current.article = document.getElementById("noteArea").children[0].children[0].innerHTML
        }
        updateMarkup(value.current, markup.current)
    }

export function ClearForm(){
        document.getElementById("generator").reset();
        Array.from(document.getElementsByClassName("ql-editor")).forEach((el) => { el.innerHTML = "" })
        Array.from(document.getElementsByClassName("links")).forEach((el) => { el.value = "" })
}
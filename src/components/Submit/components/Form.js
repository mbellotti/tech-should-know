import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, Editor} from '@tiptap/react';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';

import { ArticleMetaData } from './Metadata';
import { Links } from './Links';
import { Tags } from './Tags';
import { Toolbar } from './Toolbar.js'
import { InlineNote, NoteEdit } from './Notes/TipTapExt.js';

export function Submission({value, markup}){
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
          <Toolbar editor={abstract} value={value} markup={markup} notesMode={false} />
          <EditorContent editor={abstract} />
          <br/>
          <h4>Article Text</h4>
          <Toolbar editor={article} value={value} markup={markup} notesMode={true} />
          <div id="noteArea">
          <EditorContent editor={article} />
          </div>
          <br/>
          <Links value={value} markup={markup} />
    </form>)
}
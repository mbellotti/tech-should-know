import { Modal } from 'bootstrap'
import { incrementNoteId } from '../../utils/notes';
import { updateMarkup } from '../../utils/form';

export function EditorModal({value, markup}){
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
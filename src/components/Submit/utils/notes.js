let NoteId = 0

export const setNoteId = function(id){
        NoteId = id
    }

export const incrementNoteId = function(){
          NoteId += 1
    }

export const getNoteId = function(){
        return NoteId.valueOf()
}

export default NoteId
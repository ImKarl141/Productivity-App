import { useSelector, useDispatch } from 'react-redux'
import { AddNoteIcon } from '../icons'
import './Notes.css'
import { ShowNoteEdit } from '../features/NoteSlice'


const NotesMenu = () => {
  const { isEdit, noteItems } = useSelector((store) => store.note);
  // console.log(isEdit);
  const dispatch = useDispatch();

  //Create new Notes.

  //Add Tags from the list, figure out how to share the listOfTags into this component.

  return (
    <section className="notes-container">
      <div className="notes-overall">
        <div className='note-input-container' >
          {/*Ternary operator*/}
          {
            isEdit ?
              <div className='note-edit' onClick={() => dispatch(ShowNoteEdit())} >
                <form className='noteForm'>
                  <input
                    type="text"
                    placeholder='Title'
                    className='myInput'
                  />
                  <textarea
                    placeholder='Note content'
                    className='myInput myInput-content '>
                  </textarea>
                </form>
                <div className='note-buttons'>
                  <button className='close-btn'>Close</button>
                </div>
              </div> :
              <div className='note-placeholder' onClick={() => dispatch(ShowNoteEdit())} >
                <AddNoteIcon />
                <span>Create a note...</span>
              </div>
          }
        </div>
        <div className='note-list'>
          {
            noteItems.map((myNote) => {
              const { id, noteTitle, noteContent } = myNote;
              return (
                <div className='note-card' key={id}>
                  <p>{noteTitle}</p>
                  <p>{noteContent}</p>
                </div>
              )
            })
          }
        </div>
        {/* {noteItems.map((notes) => {
          const { id, noteTitle, noteContent } = notes
          // console.log(noteTitle);
          return (
            <div key={id} className='note-item'>
              <div>{noteTitle}</div>
              <div>{noteContent}</div>
            </div>
          )
        })} */}
        {/*Map through the list of notes*/}

      </div>
    </section>
  )
}
export default NotesMenu
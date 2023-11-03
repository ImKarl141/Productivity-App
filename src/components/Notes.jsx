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
        <div onClick={() => dispatch(ShowNoteEdit())} className='note-item'>
          <AddNoteIcon />
        </div>
        {noteItems.map((notes) => {
          const { id, noteTitle, noteContent } = notes
          // console.log(noteTitle);
          return (
            <div key={id} className='note-item'>
              <div>{noteTitle}</div>
              <div>{noteContent}</div>
            </div>
          )
        })}
        {/*Map through the list of notes*/}

        {/* <div className='note-item'>
          <AddNoteIcon />
        </div>
        
        <div className='note-item'>
          <AddNoteIcon />
        </div>
        <div className='note-item'>
          <AddNoteIcon />
        </div>
        <div className='note-item'>
          <AddNoteIcon />
        </div>
        <div className='note-item'>
          <AddNoteIcon />
        </div>
        <div className='note-item'>
          <AddNoteIcon />
        </div>
        <div className='note-item'>
          <AddNoteIcon />
        </div>
        <div className='note-item'>
          <AddNoteIcon />
        </div>
        <div className='note-item'>
          <AddNoteIcon />
        </div>
        <div className='note-item'>
          <AddNoteIcon />
        </div>
        <div className='note-item'>
          <AddNoteIcon />
        </div>
        <div className='note-item'>
          <AddNoteIcon />
        </div>
        <div className='note-item'>
          <AddNoteIcon />
        </div> */}
        {/* <div className='note-item-add'>
        </div> */}
        {/* <div className='note-item'>
          <div className='note-item-container'>
            <div className='note-item-title'>Title</div>
            <div className='note-item-content'>Note2</div>
          </div>
        </div>
        <div className='note-item'>Note 3</div>
        <div className='note-item'>Note 4</div>
        <div className='note-item'>Note 5</div>
        <div className='note-item'>Note 6</div>
        <div className='note-item'>Note 7</div>
        <div className='note-item'>Note 8</div>
        <div className='note-item'>Note 9</div>
        <div className='note-item'>Note 9</div> */}
      </div>
    </section>
  )
}
export default NotesMenu
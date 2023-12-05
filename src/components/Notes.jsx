import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AddNoteIcon, NoteListIcon, TaskNoteIcon, DeleteNoteIcon, PinNoteIcon } from '../icons'
import './Notes.css'
import { ShowNoteEdit, ShowNoteSettings } from '../features/NoteSlice'
import NoteEdit from './Note/NoteEdit'


const NotesMenu = () => {
  const { isEdit, noteItems, tag } = useSelector((store) => store.note);
  // console.log(isEdit);
  const dispatch = useDispatch();

  //Create new Notes.
  const [noteTitle, setNoteTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')

  //list of existing notes 
  const [listOfNotes, setListOfNotes] = useState(noteItems)
  const [listOfTags, setListOfTags] = useState(tag)

  //Tag colors and name
  const [tagColor, setTagColor] = useState(listOfTags[0].color)
  const [tagName, setTagName] = useState(listOfTags[0].nameTag)

  // const handleNoteSubmit = (e) => {
  //   e.preventDefault();
  //   if (!noteTitle) {
  //     return;
  //   }
  //   //Create new note
  //   const newNote = {
  //     id: Date.now(),
  //     noteTitle: noteTitle,
  //     noteContent: noteContent,
  //     noteTag: tagName,
  //     noteTagColor: tagColor,
  //     isSettings: noteMenu,
  //   }
  //   //merge with existing note list
  //   const updateNote = [...listOfNotes, newNote]

  //   setListOfNotes(updateNote)
  //   setNoteTitle('');
  //   setNoteContent('')
  // }

  //display note settings 
  // const HandleNoteSettings = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  // }

  //Add Tags from the list, figure out how to share the listOfTags into this component.

  return (
    <section className="notes-container">
      <div className="notes-overall">
        <div className='note-input-container' >
          {
            isEdit ?
              <NoteEdit /> :
              // <div className='note-edit' >
              //   <form className='noteForm' onSubmit={handleNoteSubmit}>
              //     <input
              //       id='note-title'
              //       type="text"
              //       placeholder='Title'
              //       className='myInput'
              //       value={noteTitle}
              //       onChange={(e) => {
              //         setNoteTitle(e.target.value)
              //       }}
              //     />
              //     <textarea
              //       placeholder='Note content'
              //       className='myInput myInput-content '
              //       value={noteContent}
              //       onChange={(e) => {
              //         setNoteContent(e.target.value)
              //       }}
              //     >
              //     </textarea>
              //   </form>
              //   <div className='note-buttons'>
              //     <div className='note-buttons'>
              //       <button className='notes-btn'>
              //         <NoteListIcon />
              //       </button>
              //       <select
              //         onChange={(e) => {
              //           const selectedTag = listOfTags.find((myTag) => myTag.id == e.target.value)
              //           setTagName(selectedTag.nameTag)
              //           setTagColor(selectedTag.color)
              //         }}
              //       >
              //         {
              //           listOfTags.map((myTags) => {
              //             const { id, nameTag } = myTags;
              //             return (
              //               <option key={id} value={id} >{nameTag}</option>
              //             )
              //           })
              //         }
              //       </select>
              //     </div>
              //     <div className='note-buttons-send'>
              //       <button
              //         onClick={handleNoteSubmit}
              //         className='notes-btn btn-save'>
              //         Save changes
              //       </button>
              //       <button
              //         className='notes-btn'
              //         onClick={() => dispatch(ShowNoteEdit())}>
              //         Close
              //       </button>
              //     </div>
              //   </div>
              // </div> :
              <div className='note-placeholder' onClick={() => dispatch(ShowNoteEdit())}>
                <AddNoteIcon />
                <span>Create a note...</span>
              </div>
          }
        </div>
        <div className='note-list'>
          {/*Map through the list of notes*/}
          {
            listOfNotes.map((myNote) => {
              // const [show, setShow] = useState(false);
              const { id, noteTitle, noteContent, noteTagColor, isSettings } = myNote;
              return (
                <div className='note-card' key={id}>
                  <span className='note-card-title'>{noteTitle}</span>
                  <span className='note-card-content'>{noteContent}</span>
                  <span className='note-tag' title={tagName} style={{ backgroundColor: noteTagColor }}>
                  </span>
                  <button className='noteDelete-btn' title='Delete Note' onClick={() => console.log(`${noteTitle} Note deleted`)}><DeleteNoteIcon /></button>
                  <button className='noteMakeTask-btn' title='Make a task' onClick={() => console.log(`${noteTitle} Task created`)}><TaskNoteIcon /></button>
                  <button className='notePin-btn' title='Pin note' onClick={() => console.log(`${noteTitle} Note pinned`)}><PinNoteIcon /></button>
                </div>
              )
            })
          }
        </div>
      </div>
    </section >
  )
}
export default NotesMenu
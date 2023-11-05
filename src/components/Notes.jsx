import { useSelector, useDispatch } from 'react-redux'
import { AddNoteIcon, NoteListIcon } from '../icons'
import './Notes.css'
import { ShowNoteEdit } from '../features/NoteSlice'
import { useState } from 'react'


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

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (!noteTitle) {
      return;
    }
    //Create new note
    const newNote = {
      id: Date.now(),
      noteTitle: noteTitle,
      noteContent: noteContent,
      noteTag: tagName,
      noteTagColor: tagColor,
    }
    //merge with existing note list
    const updateNote = [...listOfNotes, newNote]

    setListOfNotes(updateNote)
    setNoteTitle('');
    setNoteContent('')
  }

  //Add Tags from the list, figure out how to share the listOfTags into this component.

  return (
    <section className="notes-container">
      <div className="notes-overall">
        <div className='note-input-container' >
          {/*Ternary operator*/}
          {/* <label className='label-title' htmlFor="note-title" onClick={() => dispatch(ShowNoteEdit())}>
            <AddNoteIcon />
            <span>Create a note...</span>
          </label> */}
          {
            isEdit ?
              <div className='note-edit' >
                <form className='noteForm' onSubmit={handleNoteSubmit}>
                  <input
                    id='note-title'
                    type="text"
                    placeholder='Title'
                    className='myInput'
                    value={noteTitle}
                    onChange={(e) => {
                      setNoteTitle(e.target.value)
                    }}
                  />
                  <textarea
                    placeholder='Note content'
                    className='myInput myInput-content '
                    value={noteContent}
                    onChange={(e) => {
                      setNoteContent(e.target.value)
                    }}
                  >
                  </textarea>
                </form>
                <div className='note-buttons'>
                  <div className='note-buttons'>
                    <button className='notes-btn'>
                      <NoteListIcon />
                    </button>
                    <select
                      onChange={(e) => {
                        const selectedTag = listOfTags.find((myTag) => myTag.id == e.target.value)
                        setTagName(selectedTag.nameTag)
                        setTagColor(selectedTag.color)
                      }}
                    >
                      {
                        listOfTags.map((myTags) => {
                          const { id, nameTag } = myTags;
                          return (
                            <option key={id} value={id} >{nameTag}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div className='note-buttons-send'>
                    <button
                      onClick={handleNoteSubmit}
                      className='notes-btn btn-save'>
                      Save changes
                    </button>
                    <button
                      className='notes-btn'
                      onClick={() => dispatch(ShowNoteEdit())}>
                      Close
                    </button>
                  </div>
                </div>
              </div> :
              <div className='note-placeholder' onClick={() => dispatch(ShowNoteEdit())}>
                <AddNoteIcon />
                <span>Create a note...</span>
              </div>
          }
        </div>
        <div className='note-list'>
          {
            listOfNotes.map((myNote) => {
              const { id, noteTitle, noteContent, noteTag, noteTagColor } = myNote;
              return (
                <div className='note-card' key={id}>
                  <span className='note-card-title'>{noteTitle}</span>
                  <span className='note-card-content'>{noteContent}</span>
                  <span className='note-tag' style={{ backgroundColor: noteTagColor }}></span>
                  {/* <div className='note-tag-container'>
                  </div> */}
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
    </section >
  )
}
export default NotesMenu
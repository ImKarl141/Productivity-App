import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AddNoteIcon, NoteListIcon, TaskNoteIcon, DeleteNoteIcon, PinNoteIcon } from "../../icons"
import { ShowNoteEdit, ShowNoteSettings } from "../../features/NoteSlice"

const NoteEdit = () => {
  const { isEdit, isSettings, noteItems, tag } = useSelector((store) => store.note);
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

  //display note settings 
  const [noteMenu, setNoteMenu] = useState(false)

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
      isSettings: noteMenu,
    }
    //merge with existing note list
    const updateNote = [...listOfNotes, newNote]

    setListOfNotes(updateNote)
    setNoteTitle('');
    setNoteContent('');
    console.log(listOfNotes);
  }

  //display note settings 
  const HandleNoteSettings = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  }

  return (
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
            Save chan
          </button>
          <button
            className='notes-btn'
            onClick={() => dispatch(ShowNoteEdit())}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
export default NoteEdit
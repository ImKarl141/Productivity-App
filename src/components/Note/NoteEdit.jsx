import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NoteListIcon } from "../../icons"
import { SetNoteList, ShowNoteEdit } from "../../features/NoteSlice"
import axios from "axios"


const NoteEdit = () => {
  const { noteItems, tag, dbNotes, listOfTags, dbDefaultColors } = useSelector((store) => store.note);

  const [inputNote, setInputNote] = useState({
    note_name: '',
    note_desc: null,
    note_color: null,
  });

  const { note_name } = inputNote;

  const [remainText, setRemainText] = useState(255)

  const dispatch = useDispatch();

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    if (!note_name) {
      return;
    }
    try {
      await axios.post('http://localhost:8800/NoteList', inputNote)
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const handleChangeInput = (e) => {
    setInputNote((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className='note-edit' >
      <form className='noteForm' onSubmit={handleNoteSubmit}>
        <input
          id='note-title'
          name="note_name"
          type="text"
          placeholder='Title'
          className='myInput'
          onChange={handleChangeInput}
        />
        <textarea
          name="note_desc"
          placeholder='Note content'
          className='myInput myInput-content '
          onChange={handleChangeInput}
        >
        </textarea>
        <span className='text-indicator-note'>{remainText} characters left</span>
      </form>
      <div className='note-buttons'>
        <div className='note-buttons'>
          <button className='notes-btn'>
            <NoteListIcon />
          </button>
          <select
            name="note_color"
            onChange={handleChangeInput}
          >
            <option value={null}>Without color</option>
            {
              dbDefaultColors.map((color) => {
                const { id, color_name, color_value } = color;
                return (
                  <option key={id} value={id} style={{ backgroundColor: color_value }}>{color_name}</option>
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
    </div>
  )
}
export default NoteEdit
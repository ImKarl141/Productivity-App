import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NoteListIcon } from "../../icons"
import { SetNoteList, ShowNoteEdit, AddNote, ShowLastId } from "../../features/NoteSlice"
import axios from "axios"


const NoteEdit = () => {
  const { noteItems, tag, dbNotes, listOfTags, dbDefaultColors, lastId } = useSelector((store) => store.note);
  // console.log(dbTasks);

  const [inputNote, setInputNote] = useState({
    id: '',
    note_name: '',
    note_desc: '',
    note_color: null,
    is_pinned: false,
  });

  const { id, note_name, note_desc } = inputNote;

  const tempColor = useRef()
  // const lastTask = useRef()
  const [remainText, setRemainText] = useState(500)

  const dispatch = useDispatch();
  // console.log(dbNotes);

  // console.log(lastId);

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    if (!note_name) {
      return;
    }
    try {
      await axios.post('http://localhost:8800/NoteList', inputNote)
      // window.location.reload();
      // dispatch(ShowLastId(dbNotes));
      const nextId = dbNotes[dbNotes.length - 1].id;
      dispatch(AddNote({ ...inputNote, id: nextId + 1, color_value: tempColor.current }))

      setInputNote({
        note_name: '',
        note_desc: '',
        note_color: null,
      })

      //Clear color list
      const color_input = document.getElementById('note-color');
      color_input.value = '';
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setRemainText(500 - note_desc.length)
  }, [note_desc])

  const handleChangeInput = (e) => {
    setInputNote((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (e.target.name === "note_color") {
      if (e.target.value) {
        const noteColor = dbDefaultColors.find(color => color.id == e.target.value).color_value
        tempColor.current = noteColor;
        // console.log(noteColor);
      }
    }
  }
  // console.log(dbTasks[dbTasks.length - 1].id)

  return (
    <div className='note-edit' >
      <form className='noteForm' onSubmit={handleNoteSubmit}>
        <input
          id='note-title'
          name="note_name"
          value={note_name}
          maxLength={45}
          type="text"
          placeholder='Title'
          className='myInput'
          onChange={handleChangeInput}
        />
        <textarea
          name="note_desc"
          maxLength={500}
          value={note_desc}
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
            id="note-color"
            name="note_color"
            onChange={handleChangeInput}
          // value={color_value}
          >
            <option value=''>Without color</option>
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
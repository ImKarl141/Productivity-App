import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ShowNoteEdit, AddNote } from "../../features/noteSlice"
import axios from "axios"


const NoteEdit = () => {
  const { dbNotes, dbDefaultColors } = useSelector((store) => store.note);

  const [inputNote, setInputNote] = useState({
    id: '',
    note_name: '',
    note_desc: '',
    note_color: null,
    is_pinned: false,
  });

  const { id, note_name, note_desc } = inputNote;

  const tempColor = useRef()
  const [remainText, setRemainText] = useState(500)

  const dispatch = useDispatch();

  const showMessage = (idElement) => {
    const spawnMessage = document.getElementById(idElement);

    spawnMessage.style.display = "flex";

    setTimeout(() => {
      spawnMessage.style.display = "none";
    }, 3000)
  }

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    if (!note_name) {
      showMessage("emptyTitleNote")
      return;
    }
    try {
      await axios.post('https://todo-api-teal.vercel.app/NoteList', inputNote)
      if (dbNotes.length < 1) {
        dispatch(AddNote({ ...inputNote, id: 1, color_value: tempColor.current }))
      } else {
        const nextId = dbNotes[dbNotes.length - 1].id;
        dispatch(AddNote({ ...inputNote, id: nextId + 1, color_value: tempColor.current }))
      }


      setInputNote({
        note_name: '',
        note_desc: '',
        note_color: null,
      })

      const color_input = document.getElementById('note-color');
      color_input.value = '';
      showMessage("noteSubmitted")
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
      }
    }
  }

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
          className='myInput myInput-note'
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
          <div className="notes-btn make-list">Color:</div>
          <select
            id="note-color"
            name="note_color"
            onChange={handleChangeInput}
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
            Save Changes
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
import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AcceptUpdateIcon, CancelUpdateIcon } from "../../icons";
import { SetCurrentEditId } from "../../features/NoteSlice";


const NoteUpdate = () => {
  const { dbNotes, currentEditId, dbDefaultColors } = useSelector((store) => store.note);
  const dispatch = useDispatch();
  // console.log(currentEditId);


  //Get the color value in hex
  const colorValue = dbNotes.find(note => note.id === currentEditId).color_value;

  const [inputNote, setInputNote] = useState({
    note_name: dbNotes.find(note => note.id === currentEditId).note_name,
    note_desc: dbNotes.find(note => note.id === currentEditId).note_desc,
    //Iterate over the DefaultColors table to find the id of the color that matches the value
    note_color: dbDefaultColors.find(color => color.color_value == colorValue).id,
  })

  const { note_name, note_desc } = inputNote

  const handleChangeInput = (e) => {
    setInputNote((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    console.log(inputNote);
  }

  // const handleChangeColor = (e) => {
  //   setInputNote((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  // }

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    // if (!note_name) {
    //   return;
    // }
    try {
      await axios.put("http://localhost:8800/NoteList/" + currentEditId, inputNote)
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form className='note-card' onSubmit={handleNoteSubmit}>
      <input type="text"
        name="note_name"
        className='input-title'
        value={note_name}
        onChange={handleChangeInput}
      />
      <textarea type="text"
        name="note_desc"
        className='input-content'
        value={note_desc}
        onChange={handleChangeInput}
      />
      <span className='note-tag-edit' title={dbNotes.find(note => note.id === currentEditId).color_name} style={{ backgroundColor: colorValue }}></span>
      <button
        className='noteAccept-btn'
        title="Accept changes"
        onClick={handleNoteSubmit}
      >
        <AcceptUpdateIcon />
      </button>
      <button
        className='noteCancel-btn'
        type="button"
        title="Cancel changes"
        onClick={() => dispatch(SetCurrentEditId(''))}
      >
        <CancelUpdateIcon />
      </button>
      <select className="select-color">
        {
          dbDefaultColors.map(color => {
            const { id, color_name, color_value } = color;
            return (
              <option key={id} value={id}>{color_name}</option>
            )
          })
        }
      </select>
    </form>
  )
}
export default NoteUpdate
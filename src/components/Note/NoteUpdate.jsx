import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AcceptUpdateIcon, CancelUpdateIcon } from "../../icons";
import { SetCurrentEditId, SetNoteList } from "../../features/noteSlices";


const NoteUpdate = () => {
  const { dbNotes, currentEditId, dbDefaultColors } = useSelector((store) => store.note);
  const dispatch = useDispatch();
  const tempNote = dbNotes.find(note => note.id === currentEditId);
  const { color_value } = tempNote;
  const noValue = "No Color";
  // console.log(color_value);

  //Get the color value in hex
  const colorValue = color_value;

  const [inputNote, setInputNote] = useState({
    note_name: dbNotes.find(note => note.id === currentEditId).note_name,
    note_desc: dbNotes.find(note => note.id === currentEditId).note_desc,
    //Iterate over the DefaultColors table to find the id of the color that matches the value
    note_color: colorValue ? dbDefaultColors.find(color => color.color_value == colorValue).id : undefined,
    is_pinned: false,
  })

  const { note_name, note_desc, note_color } = inputNote
  // console.log(inputNote);

  const tempColor = useRef()

  const showMessage = (idElement) => {
    const spawnMessage = document.getElementById(idElement);

    spawnMessage.style.display = "flex";

    setTimeout(() => {
      spawnMessage.style.display = "none";
    }, 3000)
  }

  const handleChangeInput = (e) => {
    e.target.value ? setInputNote((prev) => ({ ...prev, [e.target.name]: e.target.value })) :
      setInputNote((prev) => ({ ...prev, [e.target.name]: undefined }));
    // e.target.value ? console.log("Is value") : console.log("No value");
    // setInputNote((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    // console.log(inputNote);
    if (e.target.name === "note_color") {
      if (e.target.value) {
        const noteColor = dbDefaultColors.find(color => color.id == e.target.value).color_value
        tempColor.current = noteColor;
        // console.log(noteColor);
      }
    }
  }

  // const handleChangeColor = (e) => {
  //   setInputNote((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  // }

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    if (!note_name) {
      showMessage("emptyTitleNote")
      return;
    }
    try {
      await axios.put("http://localhost:8800/NoteList/" + currentEditId, inputNote)
      // const newNote = dbNotes.find(note => note.id == currentEditId)
      const newNote = dbNotes.map((note) => {
        if (note.id == currentEditId) {
          return { ...note, note_name: note_name, note_desc: note_desc, note_color: note_color, color_value: tempColor.current }
        }
        return note
      })
      // console.log(newNote);
      dispatch(SetNoteList(newNote))
      dispatch(SetCurrentEditId(''))
      // console.log(newNote);
      // window.location.reload()
      showMessage("noteUpdated")
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
        maxLength={45}
        onChange={handleChangeInput}
      />
      <textarea type="text"
        name="note_desc"
        className='input-content'
        value={note_desc}
        onChange={handleChangeInput}
        maxLength={500}
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
      <select
        className="select-color"
        name="note_color"
        value={note_color}
        onChange={handleChangeInput}
      >
        <option value=''>Without Color</option>
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
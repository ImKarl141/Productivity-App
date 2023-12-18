import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AddNoteIcon, NoteListIcon, TaskNoteIcon, DeleteNoteIcon, PinNoteIcon, EditNoteIcon } from '../icons'
import './Notes.css'
import { ShowNoteEdit, ShowNoteSettings, SetNoteList, SetNoteColors, SetCurrentEditId, SetNoteCardView } from '../features/NoteSlice'
import NoteEdit from './Note/NoteEdit'
import axios from 'axios'
import NoteUpdate from './Note/NoteUpdate'



const NotesMenu = () => {
  const { isEdit, noteItems, tag, dbNotes, dbDefaultColors, currentEditId, isNoteCardView, noteCardId } = useSelector((store) => store.note);
  // console.log(dbNotes);
  const dispatch = useDispatch();

  //Fetching note list from database
  useEffect(() => {
    const fetchNoteList = async () => {
      try {
        const resp = await axios.get('http://localhost:8800/NoteList');
        dispatch(SetNoteList(resp.data))
      } catch (err) {
        console.log(err);
      }
    }
    const fetchNoteColors = async () => {
      try {
        const resp = await axios.get("http://localhost:8800/DefaultColors");
        dispatch(SetNoteColors(resp.data));
      } catch (err) {
        console.log(err);
      }
    }
    fetchNoteList();
    fetchNoteColors();
  }, [])

  //display note settings 
  // const HandleNoteSettings = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  // }

  // const [isPinned, setIsPinned] = useState(false)
  const isPinned = useRef(false)

  const handleNotePin = async (pin, id) => {

    if (!pin) {
      isPinned.current = true;
    } else {
      isPinned.current = false;
    }
    // console.log(isPinned);
    try {
      await axios.patch("http://localhost:8800/NoteList/" + id, isPinned)
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete("http://localhost:8800/NoteList/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const handleNoteEdit = (id) => {
    // dispatch(SetCurrentEditId(id))
  }

  //Add Tags from the list, figure out how to share the listOfTags into this component.

  return (
    <section className="notes-container">
      {
        isNoteCardView && (
          <div className='noteCard-onTop-container' onClick={() => dispatch(SetNoteCardView())}>
            <div className='noteCard-onTop'>
              <span className='noteCard-onTop-title'>{dbNotes.find(note => note.id === noteCardId).note_name}</span>
              <span className='noteCard-onTop-desc'>{dbNotes.find(note => note.id === noteCardId).note_desc}</span>
              <div className='noteCard-onTop-btn'>
                <button>Delete</button>
                <button className='noteCard-closeBtn'>Close</button>
              </div>
            </div>

          </div>
        )
      }
      <div className="notes-overall">
        <div className='note-input-container' >
          {
            isEdit ?
              <NoteEdit /> :
              <div className='note-placeholder' onClick={() => dispatch(ShowNoteEdit())}>
                <AddNoteIcon />
                <span>Create a note...</span>
              </div>
          }
        </div>
        <div className='note-list'>
          {/*Map through the list of notes*/}
          {
            dbNotes.map((note) => {
              const { id, note_name, note_desc, color_name, color_value, is_pinned } = note;
              if (is_pinned) {
                if (currentEditId === id) {
                  return (
                    <NoteUpdate key={id} />
                    // <form key={id} className='note-card'>
                    //   <input type="text"
                    //     className='input-title'
                    //     value={note_name}
                    //   />
                    //   <textarea type="text"
                    //     className='input-content'
                    //     value={note_desc}
                    //   />
                    // </form>
                  )
                } else {
                  return (
                    <div className='note-card' key={id}>
                      <span className='note-card-title' onClick={() => dispatch(SetNoteCardView(id))}>{note_name}</span>
                      <span className='note-card-content' onClick={() => dispatch(SetNoteCardView(id))} >{note_desc}</span>
                      <span className='note-tag' title={color_name} style={{ backgroundColor: color_value }}>
                      </span>
                      <button className='noteEdit-btn' title='Edit Note' onClick={() => dispatch(SetCurrentEditId(id))}><EditNoteIcon /></button>
                      <button className='noteDelete-btn' title='Delete Note' onClick={() => handleDeleteItem(id)}><DeleteNoteIcon /></button>
                      <button className='noteMakeTask-btn' title='Make a task' onClick={() => console.log(`${note_name} Task created`)}><TaskNoteIcon /></button>
                      <button
                        // id={id}
                        className='notePinned-btn'
                        title='Pin note'
                        onClick={() => handleNotePin(is_pinned, id)}
                      >
                        <PinNoteIcon />
                      </button>
                    </div>
                  )
                }
              }
            })
          }
          {
            dbNotes.map((note) => {
              const { id, note_name, note_desc, color_name, color_value, is_pinned } = note;
              if (!is_pinned) {
                if (currentEditId === id) {
                  return (
                    <NoteUpdate key={id} />
                    // <form key={id} className='note-card'>
                    //   <input type="text"
                    //     className='input-title'
                    //     value={note_name}
                    //   />
                    //   <textarea type="text"
                    //     className='input-content'
                    //     value={note_desc}
                    //   />
                    // </form>
                  )
                } else {
                  return (
                    <div className='note-card' key={id}>
                      <span className='note-card-title' onClick={() => dispatch(SetNoteCardView(id))} >{note_name}</span>
                      <span className='note-card-content' onClick={() => dispatch(SetNoteCardView(id))} >{note_desc}</span>
                      <span className='note-tag' title={color_name} style={{ backgroundColor: color_value }}>
                      </span>
                      <button className='noteEdit-btn' title='Edit Note' onClick={() => dispatch(SetCurrentEditId(id))}><EditNoteIcon /></button>
                      <button className='noteDelete-btn' title='Delete Note' onClick={() => handleDeleteItem(id)}><DeleteNoteIcon /></button>
                      <button className='noteMakeTask-btn' title='Make a task' onClick={() => console.log(`${note_name} Task created`)}><TaskNoteIcon /></button>
                      <button
                        // id={id}
                        className='notePin-btn'
                        title='Pin note'
                        onClick={() => handleNotePin(is_pinned, id)}
                      >
                        <PinNoteIcon />
                      </button>
                    </div>
                  )
                }
              }
            })
          }
        </div>
      </div>
    </section >
  )
}
export default NotesMenu
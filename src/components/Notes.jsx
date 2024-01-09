import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AddNoteIcon, DeleteNoteIcon, PinNoteIcon, EditNoteIcon } from '../icons'
import './Notes.css'
import { ShowNoteEdit, SetNoteList, SetNoteColors, SetCurrentEditId, SetNoteCardView, DeleteNote } from '../features/noteSlice'
import NoteEdit from './Note/NoteEdit'
import axios from 'axios'
import NoteUpdate from './Note/NoteUpdate'


const NotesMenu = () => {
  const { isEdit, dbNotes, currentEditId, isNoteCardView, noteCardId } = useSelector((store) => store.note);
  const { dbTasks } = useSelector((store) => store.task);
  const { menuToggle } = useSelector((store) => store.menu);
  const { Notes } = menuToggle;

  const dispatch = useDispatch();
  const isPinned = useRef(false)

  useEffect(() => {
    const fetchNoteData = async () => {
      try {
        const resp_color = await axios.get("https://todo-api-teal.vercel.app/DefaultColors");
        const resp_note = await axios.get('https://todo-api-teal.vercel.app/NoteList');
        dispatch(SetNoteList(resp_note.data))
        dispatch(SetNoteColors(resp_color.data));
      } catch (err) {
        console.log(err);
      }
    }
    fetchNoteData();
  }, [])

  //Toast message
  const showMessage = (idElement) => {
    const spawnMessage = document.getElementById(idElement);

    spawnMessage.style.display = "flex";

    setTimeout(() => {
      spawnMessage.style.display = "none";
    }, 3000)
  }

  const handleNotePin = async (pin, id) => {
    if (!pin) {
      isPinned.current = true;
      showMessage("notePinned")
    } else {
      isPinned.current = false;
      showMessage("noteUnpinned")
    }
    try {
      await axios.patch("https://todo-api-teal.vercel.app/NoteList/" + id, isPinned)
      const newNote = dbNotes.map((note) => {
        if (note.id == id) {
          return { ...note, is_pinned: isPinned.current }
        }
        return note;
      })
      dispatch(SetNoteList(newNote))
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteItem = async (id) => {
    if (dbNotes.length <= 1) {
      try {
        await axios.post("https://todo-api-teal.vercel.app/NoteList/ClearAll");
        const indexNote = dbNotes.findIndex(note => note.id == id);
        dispatch(DeleteNote(indexNote))
        showMessage("noteDeleted")
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.delete("https://todo-api-teal.vercel.app/NoteList/" + id);
        const indexNote = dbNotes.findIndex(note => note.id == id);
        dispatch(DeleteNote(indexNote))
        showMessage("noteDeleted")
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <section className={`notes-container ${Notes ? 'notes-container-active' : ''} `}>
      {
        isNoteCardView && (
          <div className='noteCard-onTop-container' onClick={() => dispatch(SetNoteCardView())}>
            <div className='noteCard-onTop' onClick={(e) => e.stopPropagation()}>
              <span className='noteCard-onTop-title'>{dbNotes.find(note => note.id === noteCardId).note_name}</span>
              <span className='noteCard-onTop-desc'>{dbNotes.find(note => note.id === noteCardId).note_desc}</span>
              <div className='noteCard-onTop-btn'>
                <button>Delete</button>
                <button className='noteCard-closeBtn' onClick={() => dispatch(SetNoteCardView())}>Close</button>
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
                <span className='note-create-placeholder'>Create a note...</span>
              </div>
          }
        </div>
        <div className='note-list'>
          {
            dbNotes.map((note) => {
              const { id, note_name, note_desc, color_name, color_value, is_pinned } = note;
              if (is_pinned) {
                if (currentEditId === id) {
                  return (
                    <NoteUpdate key={id} />
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
                      <button
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
                      <button
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
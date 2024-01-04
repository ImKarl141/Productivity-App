import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AddNoteIcon, NoteListIcon, TaskNoteIcon, DeleteNoteIcon, PinNoteIcon, EditNoteIcon } from '../icons'
import './Notes.css'
import { ShowNoteEdit, ShowNoteSettings, SetNoteList, SetNoteColors, SetCurrentEditId, SetNoteCardView, DeleteNote } from '../features/NoteSlice'
import NoteEdit from './Note/NoteEdit'
import axios from 'axios'
import NoteUpdate from './Note/NoteUpdate'
import { SetTaskList } from '../features/taskSlice'



const NotesMenu = () => {
  const { isEdit, noteItems, tag, dbNotes, dbDefaultColors, currentEditId, isNoteCardView, noteCardId } = useSelector((store) => store.note);
  const { dbTasks } = useSelector((store) => store.task);
  const { menuToggle } = useSelector((store) => store.menu);
  const { Menu, Task, Calendar, Notes } = menuToggle;
  // console.log(dbTasks);

  // console.log(dbNotes);
  const dispatch = useDispatch();
  const isPinned = useRef(false)

  //Fetching note list from database
  // useEffect(() => {
  //   const fetchNoteList = async () => {
  //     try {
  //       const resp = await axios.get('https://productivity-app-api-production.up.railway.app/NoteList');
  //       dispatch(SetNoteList(resp.data))
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   const fetchNoteColors = async () => {
  //     try {
  //       const resp = await axios.get("https://productivity-app-api-production.up.railway.app/DefaultColors");
  //       dispatch(SetNoteColors(resp.data));
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchNoteList();
  //   fetchNoteColors();
  // }, [])

  useEffect(() => {
    const fetchNoteData = async () => {
      try {
        const resp_color = await axios.get("https://productivity-app-api-production.up.railway.app/DefaultColors");
        const resp_note = await axios.get('https://productivity-app-api-production.up.railway.app/NoteList');
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
    // console.log(isPinned);
    try {
      await axios.patch("https://productivity-app-api-production.up.railway.app/NoteList/" + id, isPinned)
      const newNote = dbNotes.map((note) => {
        if (note.id == id) {
          return { ...note, is_pinned: isPinned.current }
        }
        return note;
      })
      // console.log(newNote);
      dispatch(SetNoteList(newNote))
      // const resp = await axios.get("https://productivity-app-api-production.up.railway.app/NoteList")
      // dispatch(SetNoteList(resp.data))
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteItem = async (id) => {
    if (dbNotes.length <= 1) {
      try {
        await axios.post("https://productivity-app-api-production.up.railway.app/NoteList/ClearAll");
        const indexNote = dbNotes.findIndex(note => note.id == id);
        dispatch(DeleteNote(indexNote))
        showMessage("noteDeleted")
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.delete("https://productivity-app-api-production.up.railway.app/NoteList/" + id);
        // const indexNote = dbNotes.map((note) => {
        //   if (note.id == id) {
        //     console.log(note);
        //   }
        // })
        const indexNote = dbNotes.findIndex(note => note.id == id);
        dispatch(DeleteNote(indexNote))
        showMessage("noteDeleted")
      } catch (err) {
        console.log(err);
      }
    }
  }

  // const selectedNote = dbNotes.find(note => note.id === 11)
  // console.log(selectedNote);

  const noteMakeTask = async (id) => {
    const selectedNote = dbNotes.find(note => note.id === id)
    const { note_name, note_desc } = selectedNote
    const lastTaskId = dbTasks[dbTasks.length - 1].id
    const newTask = {
      id: lastTaskId + 1,
      task_title: note_name,
      task_desc: note_desc,
      task_date: null,
      task_project: null,
      task_tag: null,
      focus_amount: 1,
      focus_finished: 0,
      is_checked: false,
    }
    // console.log("Make");
    try {
      await axios.post("https://productivity-app-api-production.up.railway.app/TaskCurrent/NewTaskFromNote", newTask)
      const resp = await axios.get("https://productivity-app-api-production.up.railway.app/TaskCurrent");
      dispatch(SetTaskList(resp.data))

      console.log("Task created");
    } catch (err) {
      console.log(err);
    }
    handleDeleteItem(id);
  }

  //Add Tags from the list, figure out how to share the listOfTags into this component.

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
                      {/* <button className='noteMakeTask-btn' title='Make a task' onClick={() => noteMakeTask(id)}><TaskNoteIcon /></button> */}
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
                      {/* <button className='noteMakeTask-btn' title='Make a task' onClick={() => noteMakeTask(id)}><TaskNoteIcon /></button> */}
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
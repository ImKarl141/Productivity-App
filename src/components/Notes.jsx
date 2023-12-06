import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AddNoteIcon, NoteListIcon, TaskNoteIcon, DeleteNoteIcon, PinNoteIcon } from '../icons'
import './Notes.css'
import { ShowNoteEdit, ShowNoteSettings, SetNoteList, SetNoteColors } from '../features/NoteSlice'
import NoteEdit from './Note/NoteEdit'
import axios from 'axios'


const NotesMenu = () => {
  const { isEdit, noteItems, tag, dbNotes, dbDefaultColors } = useSelector((store) => store.note);
  console.log(dbNotes);
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
  const HandleNoteSettings = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  }

  //Add Tags from the list, figure out how to share the listOfTags into this component.

  return (
    <section className="notes-container">
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
              const { id, note_name, note_desc, color_name, color_value } = note;
              return (
                <div className='note-card' key={id}>
                  <span className='note-card-title'>{note_name}</span>
                  <span className='note-card-content'>{note_desc}</span>
                  <span className='note-tag' title={color_name} style={{ backgroundColor: color_value }}>
                  </span>
                  <button className='noteDelete-btn' title='Delete Note' onClick={() => console.log(`${note_name} Note deleted`)}><DeleteNoteIcon /></button>
                  <button className='noteMakeTask-btn' title='Make a task' onClick={() => console.log(`${note_name} Task created`)}><TaskNoteIcon /></button>
                  <button className='notePin-btn' title='Pin note' onClick={() => console.log(`${note_name} Note pinned`)}><PinNoteIcon /></button>
                </div>
              )
            })
          }
        </div>
      </div>
    </section >
  )
}
export default NotesMenu
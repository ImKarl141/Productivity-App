import { useDispatch, useSelector } from 'react-redux';
import { ShowTaskEdit, ShowAddProjectEdit, ShowAddTagEdit, RemoveProjectItem, } from '../features/taskSlice';
import './Task.css'
import { AddTaskIcon, AllTasksIcon, CurrentTasksIcon, CompletedTasksIcon, AddProjectIcon, AddTagsIcon, EnterTaskIcon, CalendarIconTask, ProjectSettingsIcon, CancelIcon, TagSettingsIcon, EditListIcon, DeleteListIcon } from '../icons';
import TaskEdit from './Task/TaskEdit';
import ListProjects from './Task/ListProjects';
import ListTags from './Task/ListTags';
import ListTaskCurrent from './Task/ListTaskCurrent';
import ProjectEdit from './Task/ProjectEdit';
import TagEdit from './Task/TagEdit';
import { useEffect, useState } from "react";
import axios from "axios";
import TaskUpdate from './Task/TaskUpdate';

//taskItems and destructuring

const TaskMenu = () => {

  const { taskItems, isEdit, isTaskUpdate, addProjectEdit, projects, tags, addTagEdit } = useSelector((store) => store.task);

  const dispatch = useDispatch();
  //Edit task menu

  return (
    <section className='task-container'>
      {/* <h1 style={{ position: 'absolute', fontSize: '5rem', zIndex: '3', opacity: '0.5' }}>Continue with AddProject reducer</h1> */}
      <div className='task-overall'>
        <div className='overall-title'>
          <div className='task-title'><h1>Tasks</h1></div>
        </div>
        <div className='overall-myTask'>
          <a className='myTask-container-main box' id='All' href='#All'>
            <div className='myTask-container'>
              <AllTasksIcon />
              <p className='myTask-text'>All</p>
            </div>
            <div className='task-number'><span>{taskItems.length}</span></div>
          </a>
          <a className='myTask-container-main box' id='Current' href='#Current'>
            <div className='myTask-container'>
              <CurrentTasksIcon />
              <p className='myTask-text'>Current</p>
            </div>
            <div className='task-number'>0</div>
          </a>
          <a className='myTask-container-main box' id='Completed' href='#Completed'>
            <div className='myTask-container'>
              <CompletedTasksIcon />
              <p className='myTask-text'>Completed</p>
            </div>
            <div className='task-number'>0</div>
          </a>
        </div>
        {/* List of projects */}
        <ListProjects />
        <ListTags />
      </div>
      <ListTaskCurrent />
      {
        isEdit && <TaskEdit />
      }
      {
        isTaskUpdate && <TaskUpdate />
      }
    </section >
  )
}
export default TaskMenu;
import { useDispatch, useSelector } from 'react-redux';
import { SetTaskList, SetProjectList, SetTagList, SetCurrentView } from '../features/taskSlice';
import './Task.css'
import { AllTasksIcon, CurrentTasksIcon, CompletedTasksIcon } from '../icons';
import TaskEdit from './Task/TaskEdit';
import ListProjects from './Task/ListProjects';
import ListTags from './Task/ListTags';
import ListTaskCurrent from './Task/ListTaskCurrent';
import { useEffect, useState } from "react";
import axios from "axios";
import TaskUpdate from './Task/TaskUpdate';

//taskItems and destructuring

const TaskMenu = () => {

  const { dbTasks, dbProjects, dbTags, taskItems, isEdit, isTaskUpdate, addProjectEdit, projects, tags, addTagEdit, currentView } = useSelector((store) => store.task);
  // console.log(currentView);
  // console.log(dbTasks);
  // console.log("Updated");

  const dispatch = useDispatch();

  const { all, current, completed } = currentView;
  // console.log(all);

  //Edit task menu

  // Fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const task = await axios.get("http://localhost:8800/TaskCurrent")
        dispatch(SetTaskList(task.data))
        // console.log(task.data);

        const project = await axios.get("http://localhost:8800/ProjectList")
        dispatch(SetProjectList(project.data))

        const tag = await axios.get("http://localhost:8800/TagList")
        dispatch(SetTagList(tag.data))
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [])

  const test = false;


  return (
    <section className='task-container'>
      {/* <h1 style={{ position: 'absolute', fontSize: '5rem', zIndex: '3', opacity: '0.5' }}>Continue with AddProject reducer</h1> */}
      <div className='task-overall'>
        <div className='overall-title'>
          <div className='task-title'><h1>Tasks</h1></div>
        </div>
        <div className='overall-myTask'>
          <div className='myTask-container-main box' style={{ backgroundColor: all && "var(--pomodoroDark)" }} onClick={() => dispatch(SetCurrentView("all"))}>
            <div className='myTask-container'>
              <AllTasksIcon />
              <p className='myTask-text'>All</p>
            </div>
            <div className='task-number'><span>{dbTasks.length}</span></div>
          </div>
          <div className='myTask-container-main box' style={{ backgroundColor: current && "var(--pomodoroDark)" }} onClick={() => dispatch(SetCurrentView("current"))}>
            <div className='myTask-container'>
              <CurrentTasksIcon />
              <p className='myTask-text'>Current</p>
            </div>
            <div className='task-number'>0</div>
          </div>
          <div className='myTask-container-main box' style={{ backgroundColor: completed && "var(--pomodoroDark)" }} onClick={() => dispatch(SetCurrentView("completed"))}>
            <div className='myTask-container'>
              <CompletedTasksIcon />
              <p className='myTask-text'>Completed</p>
            </div>
            <div className='task-number'>0</div>
          </div>
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
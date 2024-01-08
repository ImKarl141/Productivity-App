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
  const { menuToggle } = useSelector((store) => store.menu);
  const { Menu, Task, Calendar, Notes } = menuToggle;
  // console.log(currentView);
  // console.log(dbTasks);
  // console.log("Updated");

  const dispatch = useDispatch();

  const { all, current, completed } = currentView;

  const myDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  })
  const currentDate = myDate.split("/").map(item => item.padStart(2, '0'));
  const [month, day, year] = currentDate

  // console.log(dbTasks.filter(task => task.is_checked == true).length);

  //Edit task menu

  // Fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const task = await axios.get("https://todo-api-teal.vercel.app/TaskCurrent")
        dispatch(SetTaskList(task.data))
        // console.log(task.data);

        const project = await axios.get("https://todo-api-teal.vercel.app/ProjectList")
        dispatch(SetProjectList(project.data))

        const tag = await axios.get("https://todo-api-teal.vercel.app/TagList")
        dispatch(SetTagList(tag.data))
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [])

  // const test = false;
  // console.log(dbTasks);

  return (
    <section className={`task-container ${Task ? 'task-container-active' : ''} `}>
      <section className='task-overall'>
        <div className='overall-title'>
          <div className='task-title'><h1>Tasks</h1></div>
        </div>
        <div className='overall-myTask'>
          <div
            className='myTask-container-main box'
            style={{ backgroundColor: all && "var(--pomodoroDark)" }}
            onClick={() => dispatch(SetCurrentView("all"))}
          >
            <div className='myTask-container'>
              <AllTasksIcon />
              <p className='myTask-text'>All</p>
            </div>
            <div className='task-number'><span>{dbTasks ? dbTasks.length : 0}</span></div>
          </div>
          <div
            className='myTask-container-main box'
            style={{ backgroundColor: current && "var(--pomodoroDark)" }}
            onClick={() => dispatch(SetCurrentView("current"))}
          >
            <div className='myTask-container'>
              <CurrentTasksIcon />
              <p className='myTask-text'>Current</p>
            </div>
            <div className='task-number'>{dbTasks ? dbTasks.filter(task => task.task_date == `${month}-${day}-${year}`).length : 0}</div>
          </div>
          <div
            className='myTask-container-main box'
            style={{ backgroundColor: completed && "var(--pomodoroDark)" }}
            onClick={() => dispatch(SetCurrentView("completed"))}
          >
            <div className='myTask-container'>
              <CompletedTasksIcon />
              <p className='myTask-text'>Completed</p>
            </div>
            <div className='task-number'>{dbTasks.filter(task => task.is_checked == true).length}</div>
          </div>
        </div>
        {/* List of projects */}
        <ListProjects />
        <ListTags />
      </section>
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
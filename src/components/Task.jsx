import { useDispatch, useSelector } from 'react-redux';
import { ShowTaskEdit } from '../features/taskSlice';
import { useEffect, useRef, useState, useEventListener } from 'react';
import { task } from '../data'
import './Task.css'
import { AddTaskIcon, AllTasksIcon, CurrentTasksIcon, CompletedTasksIcon, AddProjectIcon, AddTagsIcon } from '../icons';

//taskItems and destructuring

const TaskMenu = () => {
  const { taskItems, isEdit } = useSelector((store) => store.task);
  const dispatch = useDispatch();

  const [myButton, setMyButton] = useState(false)

  const [myList, setMyList] = useState([1, 2, 3, 4])

  const [myTask, setMyTask] = useState('')
  const [listOfTasks, setListOfTasks] = useState(taskItems)
  //Add a new tasks
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!myTask) {
      return;
    }
    const newTask = { id: Date.now(), title: myTask }
    const updateUser = [...listOfTasks, newTask]
    setListOfTasks(updateUser)
    setMyTask('')
  }

  //Edit task menu

  return (
    <section className='task-container'>
      <div className='task-overall'>
        {/* <button onClick={() => dispatch(ShowTaskEdit())}>Click me</button> */}
        <div className='overall-title'>
          <div className='task-title'><h1>Tasks</h1></div>
          <div className='task-quantity'><span>{listOfTasks.length}</span></div>
        </div>
        <div className='overall-myTask'>
          <button className='myTask-container-main box' >
            <div className='myTask-container'>
              <AllTasksIcon />
              <p className='myTask-text'>All</p>
            </div>
            <div className='task-number'>0</div>
          </button>
          <button className='myTask-container-main box'>
            <div className='myTask-container'>
              <CurrentTasksIcon />
              <p className='myTask-text'>Current</p>
            </div>
            <div className='task-number'>0</div>
          </button>
          <button className='myTask-container-main box'>
            <div className='myTask-container'>
              <CompletedTasksIcon />
              <p className='myTask-text'>Completed</p>
            </div>
            <div className='task-number'>0</div>
          </button>
        </div>
        {/* List of projects */}
        <div className='overall-list'>
          <div className='list-title'>
            <h2 className='list-title'>List of Projects</h2>
          </div>
          <button className='list-projects'>
            <div className='projects-container'>
              <div className='project-color'></div>
              <p className='myTask-text'>Name</p>
            </div>
            <div className='projects-number'>0</div>
          </button>
          <button className='addBtn add-project-btn' >
            <AddProjectIcon />
            <p className='myTask-text'>Add Project</p>
          </button>
        </div>
        <div className='overall-tags'>
          <div className='list-title'>
            <h2 className='list-title'>Tags</h2>
          </div>
          <div className='tags-container'>
            {/* <div>
              <button className='myTag' >
                <p className='myTags-text'>Tag 1</p>
              </button>
            </div>
            <div>
              <button className='myTag' >
                <p className='myTags-text'>Tag 2</p>
              </button>
            </div>
            <div>
              <button className='myTag' >
                <p className='myTags-text' title='Birthday Party for me'>Birthday Party for me</p>
              </button>
            </div> */}
            {/* <div>
              <button className='myTag' >
                <p className='myTask-text'>Tag 2</p>
              </button>
            </div> */}
            <div>
              <button className='addBtn add-tags-btn' >
                <AddTagsIcon />
                <p className='myTags-text'>Add Tag</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='task-focus'>
        <div >
          <button className='addBtn add-task-btn' onClick={() => dispatch(ShowTaskEdit())}>
            <AddTaskIcon />
            <p className='myTask-text'>Add Task</p>
          </button>
        </div>
        {/* <li className='list-tasks-item' key={id}>
          <input id='task' type="checkbox" name={title} />
          <label htmlFor="task" className='myTask-text'>{title}</label>
        </li> */}
        <ul className='list-tasks'>
          {listOfTasks.map((task) => {
            const { id, title } = task
            return (
              <li className='list-tasks-item' key={id}>
                <label htmlFor={id} className='myTask-text task-item-container'>
                  <input id={id} type="checkbox" name={title} />
                  <span className='checkmark'></span>
                  <p className='myTask-text input-text'>{title}</p>
                </label>
              </li>
            )
          })}
        </ul>
      </div>
      {
        isEdit && (
          <div className='task-details'>
            <form onSubmit={handleSubmit}>
              <label htmlFor="task">Task</label>
              <input
                type='text'
                className='task-input'
                value={myTask}
                onChange={(e) => setMyTask(e.target.value)}
              // value=''
              // onChange=''
              >
              </input>
            </form>
          </div>
        )
      }
    </section >
  )
}
export default TaskMenu;
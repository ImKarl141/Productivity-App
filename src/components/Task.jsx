import { useDispatch, useSelector } from 'react-redux';
import { ShowTaskEdit, ShowAddProjectEdit } from '../features/taskSlice';
import { useEffect, useRef, useState, useEventListener } from 'react';
// import { task } from '../data'
import './Task.css'
import { AddTaskIcon, AllTasksIcon, CurrentTasksIcon, CompletedTasksIcon, AddProjectIcon, AddTagsIcon, EnterTaskIcon, CalendarIconTask } from '../icons';

//taskItems and destructuring

const TaskMenu = () => {
  const { taskItems, isEdit, addProjectEdit, projects } = useSelector((store) => store.task);
  const dispatch = useDispatch();

  const [myButton, setMyButton] = useState(false)

  const [myList, setMyList] = useState([1, 2, 3, 4])

  //Input for tasks
  const [myTask, setMyTask] = useState('')
  const [listOfTasks, setListOfTasks] = useState(taskItems)

  //Inputs for projects
  const [myProject, setMyProject] = useState('');
  const [listOfProjects, setListOfProjects] = useState(projects);
  const [nameProject] = listOfProjects;
  console.log(nameProject.nameProject);


  //Add a new tasks
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (!myTask) {
      return;
    }
    //Create a new list base on the old + new
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
          {listOfProjects.map((project) => {
            const { id, nameProject } = project;
            return (
              <>{nameProject}</>
            )
          })}
          {
            addProjectEdit && (
              <form className='formTest'>
                <input className='myInputAddProject' type="text" />
              </form>
            )
          }
          <button className='addBtn add-project-btn' onClick={() => dispatch(ShowAddProjectEdit())} >
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
            const { id, title, dueDate, project } = task
            return (
              <li className='list-tasks-item' key={id}>
                <label htmlFor={id} className='myTask-text task-item-container'>
                  <div className='task-item-title'>
                    <input id={id} type="checkbox" name={title} />
                    <span className='checkmark'></span>
                    <p className='myTask-text input-text'>{title}</p>
                  </div>
                  <div className='task-item-details'>
                    <div className='task-item item-left'>
                      <CalendarIconTask />
                      <p className='myTask-text-details'>{dueDate}</p>
                    </div>
                    <div className='task-item'>
                      <span className='subtask-number'>1</span>
                      <p className='myTask-text-details'>Subtasks</p>
                    </div>
                    <div className='task-item item-right'>
                      <span className='project-color'></span>
                      <p className='myTask-text-details'>{project}</p>
                    </div>
                    {/* <span>List</span> */}
                    {/* <div className='project-color'></div> */}
                  </div>
                </label>
                <button className='task-item-btn'>
                  <EnterTaskIcon />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      {
        isEdit && (
          <div className='task-details'>
            <div className='task-details-task'>
              <h1>Task:</h1>
              <form onSubmit={handleTaskSubmit}>
                {/* <label htmlFor="tasks-title"></label> */}
                <input
                  id='title-task'
                  name='taskTitle'
                  className='myInput'
                  type="text"
                  placeholder='Title name'
                  value={myTask}
                  onChange={(e) => setMyTask(e.target.value)}
                />
              </form>
              <form onSubmit={(e) => e.preventDefault()}>
                <textarea id='description' name='taskDescription' type="text" placeholder='Description' className='myInput myInput-description' />
              </form>
              <div className='task-details-info'>
                <p className='details-text'>Due date</p>
                <input className='myInput-date' type="date" name='dueDate' />
              </div>
              <div className='task-details-info'>
                <p className='details-text'>List</p>
                <select name='Projects'>
                  <option value="1">Personal</option>
                  <option value="2">Programming</option>
                  <option value="3">Vacations</option>
                </select>
              </div>
              <div className='task-details-info'>
                <p className='details-text'>Tags</p>
                <select name='Tags'>
                  <option value="1">Tag1</option>
                  <option value="2">Tag2</option>
                  <option value="3">Tag3</option>
                </select>
              </div>
            </div>
            <div className='task-details-subtask'>
              <h1>Subtask:</h1>
              <button className='add-subtask-btn'>
                <AddTaskIcon />
                <p className='myTask-text'>Add Subtask</p>
              </button>
              {/* <div className='mySubtask'>
              </div> */}
            </div>
            <div className='task-details-button'>
              <button className='detailsBtn'>Delete Task</button>
              <button className='detailsBtn'>Save Changes</button>
            </div>
          </div>

        )
      }
    </section >
  )
}
export default TaskMenu;
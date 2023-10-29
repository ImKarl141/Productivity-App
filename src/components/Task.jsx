import { useDispatch, useSelector } from 'react-redux';
import { ShowTaskEdit, ShowAddProjectEdit, ShowAddTagEdit } from '../features/taskSlice';
import { useEffect, useRef, useState, useEventListener } from 'react';
// import { task } from '../data'
import './Task.css'
import { AddTaskIcon, AllTasksIcon, CurrentTasksIcon, CompletedTasksIcon, AddProjectIcon, AddTagsIcon, EnterTaskIcon, CalendarIconTask, ProjectSettingsIcon, CancelIcon } from '../icons';

//taskItems and destructuring

const TaskMenu = () => {
  const { taskItems, isEdit, addProjectEdit, projects, tags, addTagEdit } = useSelector((store) => store.task);
  const dispatch = useDispatch();

  const [myButton, setMyButton] = useState(false)

  const [myList, setMyList] = useState([1, 2, 3, 4])

  //Input for tasks
  const [myTask, setMyTask] = useState('')
  const [listOfTasks, setListOfTasks] = useState(taskItems)

  //Inputs for projects
  const [myProject, setMyProject] = useState('');
  const [listOfProjects, setListOfProjects] = useState(projects);
  // const [nameProject] = listOfProjects;
  // console.log(nameProject.nameProject);

  //Inputs for tags 
  const [myTag, setMyTag] = useState('');
  const [listOfTags, setListOfTags] = useState(tags);
  // const [nameTag] = listOfTags;

  //Project Color
  const [projectColor, setProjectColor] = useState('#FFFFFF')


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

  //Add a new project 
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!myProject) {
      return;
    }
    //Create a new list base on the old + new
    // const newProject = { id: Date.now(), nameProject: myProject, number: Math.floor((Math.random() * 5) + 1), color: projectColor };
    const newProject = { id: Date.now(), nameProject: myProject, color: projectColor };
    const updateProject = [...listOfProjects, newProject];
    setListOfProjects(updateProject)
    setMyProject('')
    setProjectColor('#FFFFFF')
  }

  const handleTagSubmit = (e) => {
    e.preventDefault();
    console.log('Tag Submitted');
  }

  //Edit task menu

  return (
    <section className='task-container'>
      <div className='task-overall'>
        {/* <button onClick={() => dispatch(ShowTaskEdit())}>Click me</button> */}
        <div className='overall-title'>
          <div className='task-title'><h1>Tasks</h1></div>
          {/* <div className='task-quantity'><span>{listOfTasks.length}</span></div> */}
        </div>
        <div className='overall-myTask'>
          <button className='myTask-container-main box' >
            <div className='myTask-container'>
              <AllTasksIcon />
              <p className='myTask-text'>All</p>
            </div>
            <div className='task-number'><span>{listOfTasks.length}</span></div>
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
            const { id, nameProject, color } = project;
            return (
              <button key={id} className='list-projects'>
                <div className='projects-container' title='Project name'>
                  <div className='project-color' style={{ backgroundColor: color }}></div>
                  <p className='myTask-text'>{nameProject}</p>
                </div>
                <div className='project-settings-btn' title='Options'>
                  <ProjectSettingsIcon />
                </div>
                {/* <div className='projects-container-settings'>
                  <div className='projects-number'>{number}</div>
                </div> */}
              </button>
            )
          })}
          {
            addProjectEdit && (
              <div className='cancel-btn-container'>
                <form className='project-form' onSubmit={handleProjectSubmit}>
                  <div className='color-picker-container'>
                    <input
                      id='color-picker'
                      name='color'
                      type="color"
                      className='default-colorPicker'
                      value={projectColor}
                      onChange={(e) => {
                        setProjectColor(e.target.value)
                        console.log(e.target.value);
                      }}
                    />
                    <div className='custom-colorPicker' style={{ backgroundColor: projectColor }}>

                    </div>
                  </div>
                  {/* <input
                  id='projectColor'
                  name='color'
                  className='color-selector'
                  type="color"
                // value='#ff0000'
                /> */}
                  <input
                    id='projectName'
                    name='nameProject'
                    type="text"
                    className='myInputAddProject'
                    value={myProject}
                    onChange={(e) => setMyProject(e.target.value)}
                    placeholder='Project name'
                  />
                </form>
                <button className='cancel-projects-btn' onClick={() => dispatch(ShowAddProjectEdit())}>
                  <CancelIcon />
                </button>
              </div>
            )
          }
          {
            !addProjectEdit && (
              <button className='addBtn add-project-btn' onClick={() => dispatch(ShowAddProjectEdit())} >
                <AddProjectIcon />
                <p className='myTask-text'>Add Project</p>
              </button>
            )
          }
        </div>
        <div className='overall-tags'>
          <div className='list-title'>
            <h2 className='list-title'>Tags</h2>
          </div>
          <div className='tags-container'>
            {listOfTags.map((tag) => {
              const { id, nameTag, color } = tag;
              return (
                <button key={id} className='myTag' style={{ backgroundColor: color }} title={nameTag}>
                  <span>{nameTag}</span>
                  {/* <p className='myTags-text'>{nameTag}</p> */}
                </button>
              )
            })}
          </div>
          {
            addTagEdit && (
              <div className='cancel-btn-container'>
                <form className='tag-form' onSubmit={handleTagSubmit}>
                  <input
                    id='tagName'
                    name='nameTag'
                    type="text"
                    className='myInputAddTag'
                    value={myTag}
                    onChange={(e) => setMyTag(e.target.value)}
                    placeholder='Tag name'
                  />
                </form>
                <button className='cancel-tags-btn' onClick={() => dispatch(ShowAddTagEdit())}>
                  <CancelIcon />
                </button>
              </div>
            )
          }
          {/* <div className='tags-container'>

          </div> */}
          {
            !addTagEdit && (
              <button className='addBtn add-tags-btn' onClick={() => dispatch(ShowAddTagEdit())}>
                <AddTagsIcon />
                <p className='myTask-text'>Add Tag</p>
              </button>
            )
          }
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
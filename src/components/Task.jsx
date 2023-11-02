import { useDispatch, useSelector } from 'react-redux';
import { ShowTaskEdit, ShowAddProjectEdit, ShowAddTagEdit } from '../features/taskSlice';
import { useEffect, useRef, useState, useEventListener } from 'react';
// import { task } from '../data'
import './Task.css'
import { AddTaskIcon, AllTasksIcon, CurrentTasksIcon, CompletedTasksIcon, AddProjectIcon, AddTagsIcon, EnterTaskIcon, CalendarIconTask, ProjectSettingsIcon, CancelIcon, ColorPickerIcon, CalendarIcon } from '../icons';

//taskItems and destructuring

const TaskMenu = () => {
  const { taskItems, isEdit, addProjectEdit, projects, tags, addTagEdit } = useSelector((store) => store.task);
  const dispatch = useDispatch();

  const [myButton, setMyButton] = useState(false)

  const [myList, setMyList] = useState([1, 2, 3, 4])

  //Input for tasks
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDate, setTaskDate] = useState('');
  const [taskProjectName, setTaskProjectName] = useState(projects[0].nameProject)
  const [taskProjectColor, setTaskProjectColor] = useState(projects[0].color)
  const [taskTag, setTaskTag] = useState(tags[0].nameTag)
  const [listOfTasks, setListOfTasks] = useState(taskItems)

  //Inputs for projects
  const [myProject, setMyProject] = useState('');
  const [listOfProjects, setListOfProjects] = useState(projects);
  // const [nameProject] = listOfProjects;

  //Inputs for tags 
  const [myTag, setMyTag] = useState('');
  const [listOfTags, setListOfTags] = useState(tags);
  // const [nameTag] = listOfTags;

  //Project Color
  const [projectColor, setProjectColor] = useState('#FFFFFF')


  //Tag Color 
  const [tagColor, setTagColor] = useState('#FFFFFF')

  //Add a new tasks
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle) {
      return;
    }
    //Create a new list base on the old + new
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      dueDate: taskDate,
      tag: taskTag,
      colorTag: taskTag.color,
      project: taskProjectName,
      projectColor: taskProjectColor,
    }
    const updateUser = [...listOfTasks, newTask]
    setListOfTasks(updateUser)
    setTaskTitle('')
    setTaskDescription('')
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
  //Add a new tag
  const handleTagSubmit = (e) => {
    e.preventDefault();
    if (!myTag) {
      return;
    }
    const newTag = { id: Date.now(), nameTag: myTag, color: tagColor };
    const updateTag = [...listOfTags, newTag];
    setListOfTags(updateTag);
    setMyTag('');
    setTagColor('#FFFFFF')
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
          <div className='projects-container'>
            {listOfProjects.map((project) => {
              const { id, nameProject, color } = project;
              return (
                <button key={id} className='list-projects'>
                  <div className='project-title-container' title='Project name'>
                    <div className='project-color' style={{ backgroundColor: color }}></div>
                    <p className='myTask-text'>{nameProject}</p>
                  </div>
                  <div className='project-settings-btn' title='Options'>
                    <ProjectSettingsIcon />
                  </div>
                </button>
              )
            })}
          </div>
          {
            addProjectEdit && (
              <div className='cancel-btn-container'>
                <form className='project-form' onSubmit={handleProjectSubmit}>
                  <div className='color-picker-container'>
                    <input
                      id='color-picker-project'
                      name='color'
                      type="color"
                      className='default-colorPicker'
                      value={projectColor}
                      onChange={(e) => {
                        setProjectColor(e.target.value)
                      }}
                    />
                    <div className='custom-colorPicker' style={{ backgroundColor: projectColor }}>
                    </div>
                  </div>
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
                </button>
              )
            })}
          </div>
          {
            addTagEdit && (
              <div className='cancel-btn-container'>
                <form className='tag-form' onSubmit={handleTagSubmit}>
                  <div className='color-picker-container'>
                    <input
                      id='color-picker-tag'
                      name='color'
                      type="color"
                      className='default-colorPicker'
                      value={tagColor}
                      onChange={(e) => {
                        setTagColor(e.target.value)
                      }}
                    />
                    <div className='custom-colorPicker' style={{ backgroundColor: tagColor }}>
                    </div>
                  </div>
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
        <div className='task-focus-add' >
          <button className='addBtn add-task-btn' onClick={() => dispatch(ShowTaskEdit())}>
            <AddTaskIcon />
            <p className='myTask-text'>Add Task</p>
          </button>
        </div>
        <ul className='list-tasks'>
          {listOfTasks.map((task) => {
            const { id, title, description, dueDate, tag, project, projectColor } = task
            return (
              <li key={id}>
                <label className='task-item-overall-container'>
                  <div className='task-item-container'>
                    <input className='default-checkbox' type="checkbox" />
                    <span className='checkmark'></span>
                    <div className='task-item-text'>
                      <span>{title}:</span>
                      <span className='task-item-description'>{description}</span>
                    </div>
                    <div className='task-item-details'>
                      {
                        dueDate && (
                          <>
                            <span title='Due date'><CalendarIconTask /></span>
                            <span title='Due date' className='next-item'>{dueDate}</span>
                          </>
                        )
                      }
                      {
                        project && (
                          <span className='next-item' title='Project'>
                            <span className='project-color' style={{ backgroundColor: projectColor }}></span>
                            {project}
                            {/* Find a way to grab the color, maybe with get element by name or something. I need to grab the color of that element */}
                          </span>
                        )
                      }
                      {
                        tag && (
                          <span title='Tag'>{tag}</span>
                        )
                      }
                    </div>
                  </div>
                  <button className='task-item-btn' >
                    <EnterTaskIcon />
                  </button>
                </label>
              </li>
            )
          })}
        </ul >
      </div >
      {
        isEdit && (
          <div className='task-details'>
            <div className='task-details-task'>
              <h1>Task:</h1>
              <form className='taskForm' onSubmit={handleTaskSubmit}>
                <input
                  id='title-task'
                  name='taskTitle'
                  className='myInput'
                  type="text"
                  placeholder='Title name'
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
                <textarea
                  id='description'
                  name='taskDescription'
                  type="text"
                  placeholder='Description'
                  className='myInput myInput-description'
                  value={taskDescription}
                  onChange={(e) => {
                    setTaskDescription(e.target.value)
                  }
                  }
                />

                <div className='task-details-info'>
                  <p className='details-text'>Due date</p>
                  <input
                    className='myInput-date'
                    type="date"
                    name='dueDate'
                    onChange={(e) => {
                      const [year, month, day] = e.target.value.split('-')
                      // console.log(`${day}-${month}-${year}`)
                      setTaskDate(`${month}-${day}-${year}`)
                      // console.log(e.target.value)
                    }}
                  />
                </div>
                <div className='task-details-info'>
                  <p className='details-text'>List</p>
                  <select
                    onChange={(e) => {
                      const selectedProject = listOfProjects.find((myProject) => myProject.id == e.target.value)
                      setTaskProjectName(selectedProject.nameProject)
                      setTaskProjectColor(selectedProject.color)
                    }
                    }
                  >
                    {listOfProjects.map((listProjects) => {
                      const { id, nameProject } = listProjects;
                      return (
                        <option key={id} value={id} >{nameProject}</option>
                      )
                    })}
                  </select>
                </div>
                <div className='task-details-info'>
                  <p className='details-text'>Tags</p>
                  <select
                    name='Tags'
                    onChange={(e) => {
                      setTaskTag(e.target.value)
                    }
                    }
                  >
                    {listOfTags.map((listTag) => {
                      const { id, nameTag } = listTag;
                      return (
                        <option key={id}>{nameTag}</option>
                      )
                    })}
                  </select>
                </div>
              </form>
            </div>
            <div className='task-details-subtask'>
              <h1>Subtask:</h1>
              <button className='add-subtask-btn'>
                <AddTaskIcon />
                <p className='myTask-text'>Add Subtask</p>
              </button>
            </div>
            <div className='task-details-button'>
              <button className='detailsBtn saveBtn' onClick={handleTaskSubmit}>Save Changes</button>
              <button className='detailsBtn' onClick={() => dispatch(ShowTaskEdit())}>Cancel Task</button>
              <button className='detailsBtn deleteBtn' >Delete Task</button>
            </div>
          </div>
        )
      }
    </section >
  )
}
export default TaskMenu;
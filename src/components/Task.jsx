import { useDispatch, useSelector } from 'react-redux';
import { ShowTaskEdit, ShowAddProjectEdit, ShowAddTagEdit, RemoveProjectItem, } from '../features/taskSlice';
import './Task.css'
import { AddTaskIcon, AllTasksIcon, CurrentTasksIcon, CompletedTasksIcon, AddProjectIcon, AddTagsIcon, EnterTaskIcon, CalendarIconTask, ProjectSettingsIcon, CancelIcon, TagSettingsIcon, EditListIcon, DeleteListIcon } from '../icons';
import TaskEdit from './Task/TaskEdit';
import ProjectEdit from './Task/ProjectEdit';
import TagEdit from './Task/TagEdit';
//taskItems and destructuring

const TaskMenu = () => {
  const { taskItems, isEdit, addProjectEdit, projects, tags, addTagEdit, } = useSelector((store) => store.task);

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
        <div className='overall-list'>
          <div className='list-title'>
            <h2 className='list-title'>List of Projects</h2>
          </div>
          <div className='projects-container'>
            {projects.map((project) => {
              const { id, nameProject, color } = project;
              return (
                <button key={id} className='list-projects' >
                  <a className='project-title-container' title='Project name' id={id} href={`#${id}`}>
                    <div className='project-color' style={{ backgroundColor: color }}></div>
                    <p className='myTask-text'>{nameProject}</p>
                  </a>
                  <div className='project-settings-btn' >
                    <span title='Edit' onClick={() => console.log(`${nameProject} Project edited`)}><EditListIcon /></span>
                    <span title='Delete' onClick={() => dispatch(RemoveProjectItem(id))} ><DeleteListIcon /></span>
                    {/* <ProjectSettingsIcon /> */}
                  </div>
                </button>
              )
            })}
          </div>
          {
            addProjectEdit && <ProjectEdit />
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
            {tags.map((tag) => {
              const { id, nameTag, color } = tag;
              return (
                <button key={id} className='myTag' style={{ backgroundColor: color }} title={nameTag}>
                  <span>{nameTag}</span>
                  <TagSettingsIcon />
                </button>
              )
            })}
          </div>
          {
            addTagEdit && <TagEdit />
          }
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
          <label htmlFor='title-task' className='addBtn add-task-btn' onClick={() => dispatch(ShowTaskEdit())}>
            <AddTaskIcon />
            <p className='myTask-text'>Add Task</p>
          </label>
        </div>
        <ul className='list-tasks'>
          {taskItems.map((task) => {
            const { id, title, description, dueDate, tag, project, projectColor } = task
            return (
              <li key={id}>
                {/* <button onClick={() => dispatch(RemoveTaskItem(id))}>Remove</button> */}
                <div className='task-item-overall-container'>
                  <div className='task-item-container'>
                    <input className='default-checkbox checkbox-test' type="checkbox" />
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
                </div>
              </li>
            )
          })}
        </ul >
      </div >
      {/*Fix the component by creating an store and a selector to prop drilling*/}
      {
        isEdit && <TaskEdit />
      }
    </section >
  )
}
export default TaskMenu;
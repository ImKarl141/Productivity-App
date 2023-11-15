import { useDispatch, useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import { ShowTaskEdit, ShowAddProjectEdit, ShowAddTagEdit, ChangeTitleInput, ChangeDescriptionInput, ChangeDateInput, ChangeProjectName, ChangeProjectColor, ChangeProjectNameInput, ChangeProjectColorInput, ChangeTagName, ChangeTagColor, AddTaskItem, RemoveTaskItem, AddProjectItem, RemoveProjectItem, AddTagItem, RemoveTagItem } from '../features/taskSlice';
import { useState } from 'react';
import './Task.css'
import { AddTaskIcon, AllTasksIcon, CurrentTasksIcon, CompletedTasksIcon, AddProjectIcon, AddTagsIcon, EnterTaskIcon, CalendarIconTask, ProjectSettingsIcon, CancelIcon, TagSettingsIcon, EditListIcon, DeleteListIcon } from '../icons';
import TaskEdit from './Task/TaskEdit';
import ProjectEdit from './Task/ProjectEdit';
import TagEdit from './Task/TagEdit';
//taskItems and destructuring

const TaskMenu = () => {
  const { taskItems, isEdit, addProjectEdit, projects, tags, addTagEdit, taskInput, taskProjectInput, taskTag, projectInput, tagInput } = useSelector((store) => store.task);

  // Inputs
  // const { taskTitle, taskDescription, taskDate } = taskInput
  // const { taskProjectName, taskProjectColor } = taskProjectInput
  const { nameProject, projectColor } = projectInput
  const { nameTag, tagColor } = tagInput

  const dispatch = useDispatch();

  //Input for tasks
  // const [listOfTasks, setListOfTasks] = useState(taskItems)

  //Inputs for projects
  // const [myProject, setMyProject] = useState('');
  // const [listOfProjects, setListOfProjects] = useState(projects);

  //Inputs for tags 
  // const [myTag, setMyTag] = useState('');
  // const [listOfTags, setListOfTags] = useState(tags);
  // const [nameTag] = listOfTags;

  //Project Color
  // const [projectColor, setProjectColor] = useState('#FFFFFF')

  //Tag Color 
  // const [tagColor, setTagColor] = useState('#FFFFFF')

  //Add a new tasks
  // const handleTaskSubmit = (e) => {
  //   e.preventDefault();
  //   if (!taskTitle) {
  //     return;
  //   }
  //   //Create a new list base on the old + new
  //   const newTask = {
  //     id: Date.now(),
  //     title: taskTitle,
  //     description: taskDescription,
  //     dueDate: taskDate,
  //     tag: taskTag,
  //     colorTag: taskTag.color,
  //     project: taskProjectName,
  //     projectColor: taskProjectColor,
  //   }
  //   const updateUser = [...taskItems, newTask]
  //   dispatch(AddTaskItem(updateUser))
  //   dispatch(ChangeTitleInput(''))
  //   dispatch(ChangeDescriptionInput(''))
  // }

  //Add a new project 
  // const handleProjectSubmit = (e) => {
  //   e.preventDefault();
  //   if (!nameProject) {
  //     return;
  //   }
  //   //Create a new list base on the old + new
  //   const newProject = { id: Date.now(), nameProject: nameProject, color: projectColor };
  //   const updateProject = [...projects, newProject];
  //   dispatch(AddProjectItem(updateProject))
  //   dispatch(ChangeProjectName(''))
  //   dispatch(ChangeProjectColor('#FFFFFF'))
  //   // setListOfProjects(updateProject)
  //   // setMyProject('')
  //   // setProjectColor('#FFFFFF')
  // }

  //Add a new tag
  // const handleTagSubmit = (e) => {
  //   e.preventDefault();
  //   if (!nameTag) {
  //     return;
  //   }
  //   const newTag = { id: Date.now(), nameTag: nameTag, color: tagColor };
  //   const updateTag = [...tags, newTag];
  //   dispatch(AddTagItem(updateTag))
  //   // setListOfTags(updateTag);
  //   dispatch(ChangeTagName(''))
  //   dispatch(ChangeTagColor('#FFFFFF'))
  //   // setMyTag('');
  //   // setTagColor('#FFFFFF')
  // }

  // Remove list element
  // const removeListItem = (id) => {
  //   const newList = projects.filter((project) => project.id !== id);
  //   dispatch(RemoveProjectItem());
  // }

  // Remove task element
  // const removeTaskITem = (id) => {
  //   const newTaskList = listOfProjects.filter((task) => task.id !== id);
  //   dispatch(AddTaskItem(newTaskList))
  // }


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
          {/* {
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
                        dispatch(ChangeProjectColor(e.target.value))
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
                    placeholder='Project name'
                    value={nameProject}
                    onChange={(e) => {
                      dispatch(ChangeProjectName(e.target.value))
                    }}
                  />
                </form>
                <button className='cancel-projects-btn' onClick={() => dispatch(ShowAddProjectEdit())}>
                  <CancelIcon />
                </button>
              </div>
            )
          } */}
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
          {/* {
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
                        dispatch(ChangeTagColor(e.target.value))
                        // setTagColor(e.target.value)
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
                    value={nameTag}
                    onChange={(e) => dispatch(ChangeTagName(e.target.value))}
                    placeholder='Tag name'
                  />
                </form>
                <button className='cancel-tags-btn' onClick={() => dispatch(ShowAddTagEdit())}>
                  <CancelIcon />
                </button>
              </div>
            )
          } */}
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
      {/* {
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
                  onChange={(e) => dispatch(ChangeTitleInput(e.target.value))
                  }
                />
                <textarea
                  id='description'
                  name='taskDescription'
                  type="text"
                  placeholder='Description'
                  className='myInput myInput-description'
                  value={taskDescription}
                  onChange={(e) => {
                    dispatch(ChangeDescriptionInput(e.target.value))
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
                      dispatch(ChangeDateInput(`${month}-${day}-${year}`))
                    }}
                  />
                </div>
                <div className='task-details-info'>
                  <p className='details-text'>List</p>
                  <select
                    onChange={(e) => {
                      const selectedProject = projects.find((projectInput) => projectInput.id == e.target.value)
                      dispatch(ChangeProjectNameInput(selectedProject.nameProject))
                      dispatch(ChangeProjectColorInput(selectedProject.color))
                    }
                    }
                  >
                    {projects.map((listProjects) => {
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
                      dispatch(ChangeTagInput(e.target.value))
                    }
                    }
                  >
                    {tags.map((listTag) => {
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
      } */}
    </section >
  )
}
export default TaskMenu;
import { useDispatch, useSelector } from 'react-redux';
import { ShowTaskEdit, ChangeTitleInput, ChangeDescriptionInput, ChangeDateInput, ChangeProjectNameInput, ChangeProjectColorInput, ChangeTagInput } from '../../features/taskSlice';
import { useState } from 'react';
import '../Task.css'

const TaskEdit = () => {
  const { taskItems, isEdit, addProjectEdit, projects, tags, addTagEdit, taskInput, taskProjectInput, taskTag } = useSelector((store) => store.task);
  const { taskTitle, taskDescription, taskDate } = taskInput
  const { taskProjectName, taskProjectColor } = taskProjectInput
  const dispatch = useDispatch();

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
    dispatch(ChangeTitleInput(''))
    dispatch(ChangeDescriptionInput(''))
  }

  return (
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
              // onChange={(e) => setTaskTitle(e.target.value)
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
                const selectedProject = listOfProjects.find((myProject) => myProject.id == e.target.value)
                dispatch(ChangeProjectNameInput(selectedProject.nameProject))
                dispatch(ChangeProjectColorInput(selectedProject.color))
                // setTaskProjectName(selectedProject.nameProject)
                // setTaskProjectColor(selectedProject.color)
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
                dispatch(ChangeTagInput(e.target.value))
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
export default TaskEdit;
import { useDispatch, useSelector } from 'react-redux';
import { ShowTaskEdit, ShowSubtaskEdit, ShowTaskUpdate, SetCurrentEditId } from '../../features/taskSlice';
import { AddTaskIcon } from '../../icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import '../Task.css'

const TaskUpdate = () => {
  const { dbTasks, dbProjects, dbTags, addSubtaskEdit, subtaskInput, currentEditId } = useSelector((store) => store.task);
  // Inputs
  const dispatch = useDispatch();
  // console.log(currentEditId);

  const temp_task = dbTasks.find(myTask => myTask.id === currentEditId)
  const { project_name, tag_name } = temp_task;
  // console.log(temp_task);

  //Default value of project and tag in case the assign fail.
  // if (project_name) {
  //   console.log("Project");
  // } else {
  //   console.log("Not project");
  // }

  // if (tag_name) {
  //   console.log("Tag");
  // } else {
  //   console.log("Not tag");
  // }

  //Assign the id for selecting the proper project/tag. If the task doesn't have one then assign an empty value.

  //Formatting date of task. If the task doesn't have a one then omit the formatting.
  // console.log(temp_task);
  const formatDate = (date) => {
    try {
      const [month, day, year] = date.split("-")
      return `${year}-${month}-${day}`
    } catch {
      console.log("Date not found");
      return
    }
  }

  const [inputTask, setInputTask] = useState({
    task_title: temp_task.task_title,
    task_desc: temp_task.task_desc,
    task_date: temp_task.task_date,
    task_project: project_name ?
      dbProjects.find(project => project.project_name === project_name).id : undefined,
    task_tag: tag_name ?
      dbTags.find(tag => tag.tag_name === tag_name).id : undefined,
  })





  const { task_title, task_desc, task_date, task_project, task_tag } = inputTask;
  // const projectId = dbProjects.find(project => project.project_name === task_project).id
  // console.log(projectId);


  // console.log(task_project);
  // console.log(task_tag);




  // Change of inputs
  const handleChangeInput = (e) => {
    e.target.value ? setInputTask((prev) => ({ ...prev, [e.target.name]: e.target.value })) :
      setInputTask((prev) => ({ ...prev, [e.target.name]: undefined }));
    console.log(typeof (e.target.value));
    console.log(inputTask);
    // setInputTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    // console.log(inputTask);
  }

  const handleClearValues = (name) => { //onclick make values undefined
    setInputTask((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleChangeInputDate = (e) => {
    // e.target.value ? console.log('Date added') :
    //   console.log('Empty value');
    if (e.target.value) {
      setInputTask((prev) => ({ ...prev, [e.target.name]: `${month}-${day}-${year}` }))
      const [year, month, day] = e.target.value.split('-')
    } else {
      setInputTask((prev) => ({ ...prev, [e.target.name]: '' }))
    }
  }

  // Submit inputs to endpoint
  const handleTaskUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8800/TaskCurrent/' + currentEditId, inputTask)
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete("http://localhost:8800/TaskCurrent/" + id)
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='task-details'>
      <div className='task-details-task'>
        <h1>Task:</h1>
        <form className='taskForm' onSubmit={handleTaskUpdate}>
          <input
            id='title-task'
            name='task_title'
            className='myInput'
            type="text"
            placeholder='Title name'
            value={task_title}
            onChange={handleChangeInput}
          // value={taskT}
          // onChange={(e) => dispatch(ChangeTitleInput(e.target.value))}
          />
          <textarea
            id='description'
            name='task_desc'
            type="text"
            placeholder='Description'
            className='myInput myInput-description'
            value={task_desc}
            onChange={handleChangeInput}
          />

          <div className='task-details-info'>
            <p className='details-text'>Due date</p>
            <input
              className='myInput-date'
              type="date"
              name='task_date'
              // value={task_date}
              value={formatDate(task_date)}
              onChange={handleChangeInputDate}
            />
          </div>
          <div className='task-details-info'>
            <p className='details-text'>List</p>
            <select
              name='task_project'
              value={task_project}
              // value={formatProjectInput(task_project)}
              onChange={handleChangeInput}
            >
              <option value={null}></option>
              {dbProjects.map((listProjects) => {
                const { id, project_name } = listProjects;
                return (
                  <option key={id} value={id} >{project_name}</option>
                )
              })}
            </select>
          </div>
          <div className='task-details-info'>
            <p className='details-text'>Tags</p>
            <select
              name='task_tag'
              value={task_tag}
              onChange={handleChangeInput}
            >
              <option></option>
              {dbTags.map((listTag) => {
                const { id, tag_name } = listTag;
                return (
                  <option key={id} value={id}>{tag_name}</option>
                )
              })}
            </select>
          </div>
        </form>
      </div>
      <div className='task-details-subtask'>
        <h1>Subtask:</h1>
        <button className='add-subtask-btn'
          onClick={() => dispatch(ShowSubtaskEdit())}
        >
          <AddTaskIcon />
          <p className='myTask-text'>Add Subtask</p>
        </button>
        {
          addSubtaskEdit && (
            <form >
              <label htmlFor="text">Input</label>
              <input id='text' type="text" />
            </form>
          )
        }
      </div>
      <div className='task-details-button'>
        <button className='detailsBtn saveBtn' onClick={handleTaskUpdate}>Save Changes</button>
        <button className='detailsBtn' onClick={() => dispatch(ShowTaskUpdate())}>Cancel Task</button>
        <button className='detailsBtn deleteBtn' onClick={() => handleDeleteTask(currentEditId)}>Delete Task</button>
      </div>
    </div>
  )
}
export default TaskUpdate;
import { useDispatch, useSelector } from 'react-redux';
import { ShowTaskEdit, ShowSubtaskEdit, SetTaskList, ChangeTitleInput, ChangeDescriptionInput, ChangeDateInput, ChangeProjectNameInput, ChangeProjectColorInput, ChangeTagInput, ChangeTagNameInput, ChangeTagColorInput, AddTaskItem } from '../../features/taskSlice';
import { AddTaskIcon } from '../../icons';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
// import '../Task.css'

const TaskEdit = () => {
  const dispatch = useDispatch();
  const { dbTasks, taskItems, subtaskTest, projects, dbProjects, dbTags, tags, taskInput, taskProjectInput, taskTagInput, addSubtaskEdit, subtaskInput } = useSelector((store) => store.task);
  // console.log(dbTasks);

  // Inputs
  const { taskTitle, taskDescription, taskDate } = taskInput
  const { taskProjectName, taskProjectColor } = taskProjectInput
  const { taskTagName, taskTagColor } = taskTagInput
  const { subtask } = subtaskInput

  const [remainText, setRemainText] = useState(256)

  const [inputTask, setInputTask] = useState({
    task_title: '',
    task_desc: '',
    task_date: '',
    task_project: null,
    task_tag: null,
    focus_amount: 1,
    is_checked: false,
  })

  const { task_title, task_desc, task_date } = inputTask;

  // const { nameProject, projectColor } = projectInput

  //Update the remain text in the description form
  useEffect(() => {
    setRemainText(255 - task_desc.length)
  }, [task_desc])


  // Change of inputs
  const handleChangeInput = (e) => {
    setInputTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleChangeDesc = (e) => {
    setInputTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    // setRemainText(remainText - task_desc.length)
  }

  const handleChangeInputDate = (e) => {
    const [year, month, day] = e.target.value.split('-')
    setInputTask((prev) => ({ ...prev, [e.target.name]: `${month}-${day}-${year}` }))
  }


  // const q = "SELECT t.id, t.task_title, t.task_desc, t.task_date, t.focus_amount, t.is_checked, p.project_name, p.project_color, tg.tag_name, tg.tag_color FROM `TaskCurrent` t LEFT JOIN `ProjectList` p ON t.task_project = p.id LEFT JOIN `TagList` tg ON t.task_tag = tg.id";
  // Submit inputs to endpoint
  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (!task_title) {
      return
    }
    try {
      await axios.post('http://localhost:8800/TaskCurrent', inputTask)
      // window.location.reload()
      const resp = await axios.get('http://localhost:8800/TaskCurrent')
      dispatch(SetTaskList(resp.data))
      setInputTask({
        task_title: '',
        task_desc: '',
        task_date: null,
        task_project: null,
        task_tag: null,
        focus_amount: 1,
        is_checked: false,
      })

      //Clear calendar
      const date_input = document.getElementById('date-id');
      date_input.value = '';

      //Clear project and tag options
      const project_input = document.getElementById('project-id');
      project_input.value = '0';

      const tag_input = document.getElementById('tag-id');
      tag_input.value = '0';

      // console.log("Reset");
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubtaskSubmit = (e) => {
    e.preventDefault();
    if (!subtask) {
      return;
    }
    console.log('Form sended');
  }

  return (
    <div className='task-details'>
      {/* <div className='test'>Hello</div> */}
      <div className='task-details-task'>
        <h1>Task:</h1>
        <form className='taskForm' onSubmit={handleTaskSubmit}>
          <input
            id='title-task'
            name='task_title'
            // className='myInput'
            className={task_title.length >= 45 ? 'myInput errorTitle' : 'myInput'}
            type="text"
            placeholder='Title name'
            value={task_title}
            maxLength={45}
            onChange={handleChangeInput}
          // value={taskT}
          // onChange={(e) => dispatch(ChangeTitleInput(e.target.value))}
          />
          <div className='descForm-container'>
            <textarea
              id='description'
              name='task_desc'
              type="text"
              placeholder='Description'
              value={task_desc}
              className='myInput myInput-description'
              // className={task_title.length >= 45 ? 'myInput-description errorDesc' : 'myInput-description'}
              onChange={handleChangeDesc}
              maxLength={255}
            // value={taskDescription}
            // onChange={(e) => {dispatch(ChangeDescriptionInput(e.target.value))}}
            />
            <span className='text-indicator'>{remainText} characters left</span>
          </div>

          <div className='task-details-info'>
            <p className='details-text'>Due date</p>
            <input
              id='date-id'
              className='myInput-date'
              type="date"
              name='task_date'
              // value={task_date}
              onChange={handleChangeInputDate}
            // onChange={(e) => {
            //   const [year, month, day] = e.target.value.split('-')
            //   dispatch(ChangeDateInput(`${month}-${day}-${year}`))
            // }}
            />
          </div>
          <div className='task-details-info'>
            <p className='details-text'>Project</p>
            <select
              id='project-id'
              name='task_project'
              onChange={handleChangeInput}
            >
              <option value=''></option>
              {dbProjects.map((listProjects) => {
                const { id, project_name } = listProjects;
                return (
                  <option key={id} value={id} >{project_name}</option>
                )
              })}
            </select>
          </div>
          <div className='task-details-info'>
            <p className='details-text'>Tag</p>
            <select
              id='tag-id'
              name='task_tag'
              onChange={handleChangeInput}
            >
              <option value=''></option>
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
      {/* <div className='task-details-subtask'>
        <h1>Subtask:</h1>
        <button className='add-subtask-btn'
          onClick={() => dispatch(ShowSubtaskEdit())}
        >
          <AddTaskIcon />
          <p className='myTask-text'>Add Subtask</p>
        </button>
        {
          addSubtaskEdit && (
            <form onSubmit={handleSubtaskSubmit} >
              <label htmlFor="text">Input</label>
              <input id='text' type="text" />
            </form>
          )
        }
      </div> */}
      <div className='task-details-button'>
        <button className='detailsBtn saveBtn' onClick={handleTaskSubmit}>Create Task</button>
        <button className='detailsBtn cancelBtn' onClick={() => dispatch(ShowTaskEdit())}>Cancel Task</button>
        {/* <button className='detailsBtn deleteBtn' >Delete Task</button> */}
      </div>
    </div>
  )
}
export default TaskEdit;
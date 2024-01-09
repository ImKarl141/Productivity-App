import { useDispatch, useSelector } from 'react-redux';
import { ShowTaskEdit, SetTaskList } from '../../features/taskSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import '../Task.css'

const TaskEdit = () => {
  const dispatch = useDispatch();
  const { dbProjects, dbTags, subtaskInput } = useSelector((store) => store.task);

  // Inputs
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

  //Toast message
  const showMessage = (idElement) => {
    const spawnMessage = document.getElementById(idElement);

    spawnMessage.style.display = "flex";

    setTimeout(() => {
      spawnMessage.style.display = "none";
    }, 3000)
  }



  //Update the remain text in the description form
  useEffect(() => {
    setRemainText(255 - task_desc.length)
  }, [task_desc])


  const handleChangeInput = (e) => {
    setInputTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleChangeDesc = (e) => {
    setInputTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleChangeInputDate = (e) => {
    const [year, month, day] = e.target.value.split('-')
    setInputTask((prev) => ({ ...prev, [e.target.name]: `${month}-${day}-${year}` }))
  }


  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (!task_title) {
      showMessage("emptyTitle")
      return
    }
    try {
      await axios.post('https://todo-api-teal.vercel.app/TaskCurrent', inputTask)
      const resp = await axios.get('https://todo-api-teal.vercel.app/TaskCurrent')
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

      showMessage("taskSubmitted")

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
      <div className='task-details-task'>
        <h1>Task:</h1>
        <form className='taskForm' onSubmit={handleTaskSubmit}>
          <input
            id='title-task'
            name='task_title'
            className={task_title.length >= 45 ? 'myInput errorTitle' : 'myInput'}
            type="text"
            placeholder='Title name'
            value={task_title}
            maxLength={45}
            onChange={handleChangeInput}
          />
          <div className='descForm-container'>
            <textarea
              id='title-description'
              name='task_desc'
              type="text"
              placeholder='Description'
              value={task_desc}
              className='myInput myInput-description'
              onChange={handleChangeDesc}
              maxLength={255}
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
              onChange={handleChangeInputDate}
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
      <div className='task-details-button'>
        <button className='detailsBtn saveBtn' onClick={handleTaskSubmit}>Create Task</button>
        <button className='detailsBtn cancelBtn' onClick={() => dispatch(ShowTaskEdit())}>Cancel Task</button>
      </div>
    </div>
  )
}
export default TaskEdit;
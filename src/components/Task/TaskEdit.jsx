import { useDispatch, useSelector } from 'react-redux';
import { ShowTaskEdit, ShowSubtaskEdit, ChangeTitleInput, ChangeDescriptionInput, ChangeDateInput, ChangeProjectNameInput, ChangeProjectColorInput, ChangeTagInput, ChangeTagNameInput, ChangeTagColorInput, AddTaskItem, } from '../../features/taskSlice';
import { AddTaskIcon } from '../../icons';
// import '../Task.css'

const TaskEdit = () => {
  const { taskItems, subtaskTest, projects, tags, taskInput, taskProjectInput, taskTagInput, addSubtaskEdit, subtaskInput } = useSelector((store) => store.task);

  // Inputs
  const { taskTitle, taskDescription, taskDate } = taskInput
  const { taskProjectName, taskProjectColor } = taskProjectInput
  const { taskTagName, taskTagColor } = taskTagInput
  const { subtask } = subtaskInput

  // const { nameProject, projectColor } = projectInput

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
      subtask: [],
      dueDate: taskDate,
      tag: taskTagName,
      colorTag: taskTagColor,
      project: taskProjectName,
      projectColor: taskProjectColor,
    }
    const updateUser = [...taskItems, newTask]
    dispatch(AddTaskItem(updateUser))
    dispatch(ChangeTitleInput(''))
    dispatch(ChangeDescriptionInput(''))
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
                dispatch(ChangeTagNameInput(e.target.value))
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
        {
          subtaskTest.map((mySubtask) => {
            const { id, subtask } = mySubtask
            return (
              <div key={id}>
                <input id={subtask + id} type="checkbox" />
                <label htmlFor={subtask + id}>{subtask}</label>
              </div>
            )
          })
        }
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
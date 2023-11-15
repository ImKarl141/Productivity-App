import { useDispatch, useSelector } from 'react-redux';
import { ShowTaskEdit, ShowAddProjectEdit, ShowAddTagEdit, ChangeTitleInput, ChangeDescriptionInput, ChangeDateInput, ChangeProjectName, ChangeProjectColor, ChangeProjectNameInput, ChangeProjectColorInput, ChangeTagName, ChangeTagColor, AddTaskItem, RemoveTaskItem, AddProjectItem, RemoveProjectItem, AddTagItem, RemoveTagItem } from '../../features/taskSlice';
import { AddTaskIcon, AllTasksIcon, CurrentTasksIcon, CompletedTasksIcon, AddProjectIcon, AddTagsIcon, EnterTaskIcon, CalendarIconTask, ProjectSettingsIcon, CancelIcon, TagSettingsIcon, EditListIcon, DeleteListIcon } from '../../icons';

const ProjectEdit = () => {
  const { taskItems, isEdit, addProjectEdit, projects, tags, addTagEdit, taskInput, taskProjectInput, taskTag, projectInput, tagInput } = useSelector((store) => store.task);

  // Inputs
  // const { taskTitle, taskDescription, taskDate } = taskInput
  // const { taskProjectName, taskProjectColor } = taskProjectInput
  const { nameProject, projectColor } = projectInput
  // const { nameTag, tagColor } = tagInput

  const dispatch = useDispatch();

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!nameProject) {
      return;
    }
    //Create a new list base on the old + new
    const newProject = { id: Date.now(), nameProject: nameProject, color: projectColor };
    const updateProject = [...projects, newProject];
    dispatch(AddProjectItem(updateProject))
    dispatch(ChangeProjectName(''))
    dispatch(ChangeProjectColor('#FFFFFF'))
    // setListOfProjects(updateProject)
    // setMyProject('')
    // setProjectColor('#FFFFFF')
  }
  return (
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
}
export default ProjectEdit;
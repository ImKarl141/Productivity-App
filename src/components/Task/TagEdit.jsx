import { useDispatch, useSelector } from 'react-redux';
import { ShowTaskEdit, ShowAddProjectEdit, ShowAddTagEdit, ChangeTitleInput, ChangeDescriptionInput, ChangeDateInput, ChangeProjectName, ChangeProjectColor, ChangeProjectNameInput, ChangeProjectColorInput, ChangeTagName, ChangeTagColor, AddTaskItem, RemoveTaskItem, AddProjectItem, RemoveProjectItem, AddTagItem, RemoveTagItem } from '../../features/taskSlice';
import { AddTaskIcon, AllTasksIcon, CurrentTasksIcon, CompletedTasksIcon, AddProjectIcon, AddTagsIcon, EnterTaskIcon, CalendarIconTask, ProjectSettingsIcon, CancelIcon, TagSettingsIcon, EditListIcon, DeleteListIcon } from '../../icons';


const TagEdit = () => {

  const { taskItems, isEdit, addProjectEdit, projects, tags, addTagEdit, taskInput, taskProjectInput, taskTag, projectInput, tagInput } = useSelector((store) => store.task);

  // Inputs
  // const { taskTitle, taskDescription, taskDate } = taskInput
  // const { taskProjectName, taskProjectColor } = taskProjectInput
  // const { nameProject, projectColor } = projectInput
  const { nameTag, tagColor } = tagInput

  const dispatch = useDispatch();

  const handleTagSubmit = (e) => {
    e.preventDefault();
    if (!nameTag) {
      return;
    }
    const newTag = { id: Date.now(), nameTag: nameTag, color: tagColor };
    const updateTag = [...tags, newTag];
    dispatch(AddTagItem(updateTag))
    // setListOfTags(updateTag);
    dispatch(ChangeTagName(''))
    dispatch(ChangeTagColor('#FFFFFF'))
    // setMyTag('');
    // setTagColor('#FFFFFF')
  }

  return (
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
}
export default TagEdit